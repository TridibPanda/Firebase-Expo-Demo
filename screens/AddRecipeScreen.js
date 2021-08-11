import React, { useState,useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    Platform,
    Image,
    Button,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Input from '../components/Input';
import Firebase, { db } from '../config/Firebase';


const Height = Dimensions.get('window').height > 660;
const Width = Dimensions.get('window').width > 360;


const AddRecipeScreen = (props) => {

    const [pickedImage, setPickedImage] = useState('');
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [direction, setDirection] = useState('');
    const [progress, setProgress] = useState(0);
    const [imageId, setImageId] = useState(Math.random());

   
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(
            Permissions.CAMERA_ROLL,
            Permissions.CAMERA
        );
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        setPickedImage(image.uri);

        const response = await fetch(image.uri);
        const blob = await response.blob();
        var ref = Firebase.storage()
            .ref()
            .child(`RecipeImage/` + `${imageId}.jpeg`);
        await ref.put(blob).on(
            'state_changed',
            (snapshot) => {
                const progress = snapshot.bytesTransferred / snapshot.totalBytes;
                console.log(progress);
                setProgress(progress);
                setTimeout(() => {
                    if (progress === 1) {
                        return Alert.alert('', ' Image upload completed', [
                            {
                                text: 'Okay',
                                onPress: (setProgress(0)),
                            },
                        ]);
                    }
                }, 2000);
            },
            (error) => console.log(error)
        );
    };

    const submit = async() => {
        var uid = await AsyncStorage.getItem('uid');
        var ref = Firebase.storage()
        	.ref()
        	.child(`RecipeImage/` + `${imageId}.jpeg`);
        const image = await ref.getDownloadURL();

        db.collection('RecipeList')
					.doc(`${imageId}recipe`)
					.set({
						recipeName: recipeName,
						ingredients: ingredients,
						direction: direction,
						uid: uid,
						image: image,
                        recipeId:`${imageId}recipe`
					})
					.then(function (docRef) {
						console.log('Document saved');
                        props.navigation.navigate('HomeScreen');
					})
					.catch(function (error) {
						console.error('Error adding document: ', error);
					});
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: "#000" }}>
                <View style={styles.icnTxtContainer}>
                    <View >
                        <Ionicons
                            name='ios-arrow-back'
                            size={40}
                            color='#fff'
                            onPress={() => props.navigation.goBack()}
                        />
                    </View>
                    <TouchableOpacity onPress={submit}>
                        <View>
                            <Text
                                style={styles.topMostTxt}
                            >
                                Done
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={styles.headerMargin}>
                        <Text style={styles.headerText}>Add Recipe</Text>
                    </View>

                    <View style={styles.imagePreview}>
                        {progress !== 0 ?
                            <Text style={styles.topMostTxt} >{Math.round(progress * 100)}%</Text> :
                            <Image style={styles.image} source={{ uri: pickedImage }} />}
                    </View>
                    <Button
                        title="Take Image"
                        color={'#0690c2'}
                    onPress={takeImageHandler}
                    />

                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder={'Recipe Name'}
                            keyboardType="default"
                            autoCapitalize="none"
                            onChange={(name) => setRecipeName(name)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder={'Recipe Ingredients'}
                            keyboardType="default"
                            autoCapitalize="none"
                            numberOfLines={4}
                            multiline={true}
                            onChange={(ingredients) => setIngredients(ingredients)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder={'Recipe Direction'}
                            keyboardType="default"
                            autoCapitalize="none"
                            numberOfLines={4}
                            multiline={true}
                            onChange={(direction) => setDirection(direction)}
                        />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerMargin: {
        marginVertical: Height ? 5 : 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 35,
        marginLeft: Width ? 15 : 10,
    },
    inputContainer: {
        width: '90%',
        marginTop: Height ? 2 : 0,
    },
    input: {
        padding: 8,
    },
    passwordContainer: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 35,
        borderColor: '#777',
        height: 42,
        marginBottom: Height ? 5 : 5,
    },
    passwordText: {
        flex: 1,
        color: '#fff',
        padding: 10,
        fontSize: 17,
    },
    buttonSignup: {
        borderRadius: 25,
        width: '90%',
        backgroundColor: '#0690c2',
        marginTop: 10
    },
    buttonSignupText: {
        padding: Height ? 15 : 10,
        textAlign: 'center',
        color: "white",
        fontSize: 15,
    },
    buttonLogin: {
        borderRadius: 25,
        width: '90%',
        marginVertical: 5,
    },
    buttonLoginText: {
        textAlign: 'center',
        color: '#fff',
        padding: Height ? 15 : 10,
        fontSize: 15,
    },
    bottomText: {
        // marginTop: Height ? 0 : 15,
        // paddingHorizontal: 15,
        textAlign: 'center',
        color: '#7E8084',
        fontSize: Width ? 13 : 10,
    },
    icnTxtContainer: {
        flexDirection: 'row',
        marginTop: Height ? 30 : 30,
        justifyContent: 'space-between',
        marginHorizontal: Width ? 12 : 12,
    },
    topMostTxt: {
        fontSize: 20,
        color: '#d19d00'
    },
    imagePreview: {
        height: 200,
        width: '95%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        alignSelf: 'center',
        margin: Dimensions.get('window').height * 0.02
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default AddRecipeScreen;
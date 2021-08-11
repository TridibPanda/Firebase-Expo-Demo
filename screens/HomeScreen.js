import React, { useState, useEffect,useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	TouchableWithoutFeedback,
	TextInput,
	Keyboard,
	FlatList,
	ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Firebase,{ db } from '../config/Firebase';

const Height = Dimensions.get('window').height > 660;
const Width = Dimensions.get('window').width > 360;


const HomeScreen = (props) => {
	const [listData, setListData] = useState([]);

	const datafn = () => {
		var data = [];
		db.collection('RecipeList')
			.get().then(function (querySnapshot) {
				if (!querySnapshot.empty) {
					querySnapshot.forEach(function (doc) {
						console.log(doc.id, ' => ', doc.data(), '*******');
						data.push(doc.data());
					});
					setListData(data);
				}
			})

	};
	useEffect(() => {
		datafn();
	}, [datafn])

	const emptyComponent = () => {
		return (
			<View style={{ marginTop: Dimensions.get('window').height * 0.4, alignItems: 'center' }}>
				<Text style={styles.emptyText}>No recipe found</Text>
			</View>
		);
	};

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('RecipeDetailsScreen', { recipeId: item.recipeId })}>
				<ImageBackground
					source={{ uri: item.image }}
					style={styles.bgImage}
				>
					<View style={styles.titleContainer}>
						<Text style={styles.title} numberOfLines={1}>
							{item.recipeName}
						</Text>
					</View>
				</ImageBackground>
			</TouchableOpacity>
		)
	}
	const logoutfn = async()=>{
		try {
			await Firebase.auth()
				.signOut()
				.then(async () => {
					
					await AsyncStorage.removeItem('uid');
					props.navigation.navigate('LoginScreen')
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={() => props.navigation.navigate('AddRecipeScreen')}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Add Recipe</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => props.navigation.navigate('EditProfileScreen')}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Edit Profile</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={logoutfn}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Log-out</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.list}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={listData}
					keyExtractor={(item, index) => item.id}
					renderItem={renderItem}
					style={{ width: '100%' }}
					ListEmptyComponent={emptyComponent}
				/>
			</View>
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		backgroundColor: "#80a1ad"
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 25
	},
	button: {
		borderRadius: 20,
		width: '27%',
		backgroundColor: '#d19d00',
		marginTop: 10
	},
	buttonText: {
		padding: Height ? 15 : 10,
		textAlign: 'center',
		color: "white",
		fontSize: 12,
	},
	list: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
		marginBottom: 80
	},
	emptyText: {
		color: "white",
		fontSize: 15,
	},
	item: {
		height: 200,
		width: '100%',
		backgroundColor: '#f5f5f5',
		borderRadius: 10,
		overflow: 'hidden',
		marginVertical: 10
	},
	bgImage: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
	},
	titleContainer: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		paddingVertical: 5,
		paddingHorizontal: 12
	},
	title: {
		fontSize: 20,
		color: 'white',
		textAlign: 'center'
	}
});

export default HomeScreen;
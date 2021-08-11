import React, { useState } from 'react';
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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Input from '../components/Input';
import Firebase,{db} from '../config/Firebase';

const Height = Dimensions.get('window').height > 660;
const Width = Dimensions.get('window').width > 360;


const SignupScreen = (props) => {

	const [secure, setSecure] = useState(true);
    const [name, setName] = useState('');
	const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
	const [password, setPassword] = useState('');

	const changeEntry = () => {
		setSecure((prevState) => !prevState);
	};
    const validation = () => {
		if (
			name === '' &&
			email === '' &&
			phone === "" &&
			password === '' &&
            location === ''
			
		) {
			alert('Please fill all the field');
		} else if (name === '') {
			alert('Please enter your fullname ');
		} else if (email === '') {
			alert('Please enter your email ');
		} else if (
			!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email
			)
		) {
			alert('Please enter valid email address');
		} else if (password === '') {
			alert('Please enter your password ');
		} else if (!password.match(/^.*(?=.*\d).*$/)) {
			alert('Password should contain number');
		} else if (!password.match(/^.*(?=.*[A-Z]).*$/)) {
			alert('Password should contain uppercase');
		} else if (password.length < 6) {
			alert('Password should be atleast 6 character');
		}else if (phone === "") {
			alert('Please enter your phone number');
		}
        else if (location === "") {
			alert('Please enter your location');
		}
		else return true;
	};
const Signupfn = ()=>{
    let dataSet = validation();
    if(dataSet){
        Firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				console.log(result);
				db.collection('Users')
					.doc(`${result.user.uid}`)
					.set({
						name: name,
						email: email,
						phone: phone,
						uid: result.user.uid,
						location: location,
					})
					.then(function (docRef) {
						console.log('Document saved');
					})
					.catch(function (error) {
						console.error('Error adding document: ', error);
					});

				AsyncStorage.setItem('uid', result.user.uid);
				props.navigation.navigate('HomeScreen');
			})
			.catch((error) => {
				alert(error);
				console.log(error);
			});
    }
}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <ScrollView style={{backgroundColor:"#000"}}>
			<View style={styles.container}>
				<View style={styles.headerMargin}>
					<Text style={styles.headerText}>Signup</Text>
				</View>
				<View style={styles.inputContainer}>
					<Input
						style={styles.input}
						placeholder={'Name'}
						keyboardType="default"
						autoCapitalize="none"
						onChange={(name) => setName(name)}
					/>
				</View>
                <View style={styles.inputContainer}>
					<Input
						style={styles.input}
						placeholder={'Email'}
						keyboardType="email-address"
						autoCapitalize="none"
						onChange={(email) => setEmail(email)}
					/>
				</View>
                <View style={styles.inputContainer}>
					<Input
						style={styles.input}
						placeholder={'Phone'}
						keyboardType="phone-pad"
						autoCapitalize="none"
                        maxLength = {10}
						onChange={(phone) => setPhone(phone)}
					/>
				</View>
                <View style={styles.inputContainer}>
					<Input
						style={styles.input}
						placeholder={'Location'}
						keyboardType="default"
						autoCapitalize="none"
						onChange={(location) => setLocation(location)}
					/>
				</View>
				<View style={styles.passwordContainer}>
					<TextInput
						style={styles.passwordText}
						placeholder="Password"
						keyboardType="default"
						secureTextEntry={secure}
						autoCapitalize="none"
						placeholderTextColor="white"
						onChangeText={(password) => {
							setPassword(password);
						}}
					/>
					<Ionicons
						style={{ padding: 10 }}
						size={23}
						name={secure ? 'ios-eye-off' : 'ios-eye'}
						onPress={changeEntry}
						color="#fff"
					/>
				</View>
				<TouchableOpacity
					onPress={Signupfn}
					style={styles.buttonSignup}
				>
					<Text style={styles.buttonSignupText}>Sign up</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonLogin}
					onPress={() => props.navigation.navigate('LoginScreen')}
				>
					
						<Text style={styles.buttonLoginText}>Login</Text>
					
				</TouchableOpacity>
				<View
					style={{
						marginBottom: Dimensions.get('window').height * 0.05,
						marginHorizontal: Dimensions.get('window').height * 0.03,
					}}
				>
					<Text style={styles.bottomText}>
						By clicking sign up, you agree to our terms and condition which include our privacy policy without reservation
					</Text>
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
		marginVertical: Height ? 50 : 20,
	},
	headerText: {
		color: '#fff',
		fontSize: 35,
		marginLeft: Width ? 15 : 10,
	},
	inputContainer: {
		width: '90%',
		marginTop: Height ? 0 : 0,
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
        marginTop:10
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
	}
});

export default SignupScreen;
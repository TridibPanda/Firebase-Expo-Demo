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
	KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import Firebase, { db } from '../config/Firebase';
import { login } from '../store/actions/Auth';

const Height = Dimensions.get('window').height > 660;
const Width = Dimensions.get('window').width > 360;


const LoginScreen = (props) => {

	const [secure, setSecure] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const changeEntry = () => {
		setSecure((prevState) => !prevState);
	};

	const handleLogin = () => {
		dispatch(login(email,password,props.navigation));
		// Firebase.auth()
		// 	.signInWithEmailAndPassword(email, password)
		// 	.then((result) => {

		// 		AsyncStorage.setItem('uid', result.user.uid);
		// 		props.navigation.navigate('HomeScreen');

		// 	})
		// 	.catch((error) => alert(error));

	}


	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
			<ScrollView style={{ backgroundColor: "#000" }}>
				<View style={styles.container}>
			<View style={styles.headerMargin}>
				<Text style={styles.headerText}>Signin</Text>
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
				onPress={handleLogin}
				style={styles.buttonLogin}
			>
				<Text style={styles.buttonLoginText}>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.buttonSignup}
				onPress={() => props.navigation.navigate('SignupScreen')}
			>
				<Text style={styles.buttonSignupText}>Sign up</Text>
			</TouchableOpacity>
			<View
				style={{
					marginBottom: Dimensions.get('window').height * 0.05,
					marginHorizontal: Dimensions.get('window').height * 0.03,
				}}
			>
				<Text style={styles.bottomText}>
					By clicking Log In, you agree to our terms and condition which include our privacy policy without reservation
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
		backgroundColor: "#000"
	},
	headerMargin: {
		marginVertical: Height ? 100 : 20,
		alignItems: 'center',
	},
	headerText: {
		color: '#fff',
		fontSize: 35,
		marginLeft: Width ? 15 : 10,
	},

	inputContainer: {
		width: '90%',
		alignSelf: 'center',
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
		borderColor: '#fff',
		height: 42,
		marginBottom: Height ? 5 : 5,
	},
	passwordText: {
		flex: 1,
		color: '#fff',
		padding: 10,
		fontSize: 17,
	},
	buttonLogin: {
		borderRadius: 25,
		width: '90%',
		backgroundColor: '#0690c2',
		marginTop: 10
	},
	buttonLoginText: {
		padding: Height ? 15 : 10,
		textAlign: 'center',
		color: "white",
		fontSize: 15,
	},
	buttonSignup: {
		borderRadius: 25,
		width: '90%',
		marginVertical: 5,
	},
	buttonSignupText: {
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

export default LoginScreen;
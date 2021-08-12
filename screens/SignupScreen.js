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
	Modal,
	ActivityIndicator,
	Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import Firebase, { db } from '../config/Firebase';
import { signup } from '../store/actions/Auth';

const Height = Dimensions.get('window').height > 660;
const Width = Dimensions.get('window').width > 360;


const SignupScreen = (props) => {

	const [secure, setSecure] = useState(true);
	const [name, setName] = useState({ field: '', check: false });
	const [email, setEmail] = useState({ field: '', check: false });
	const [phone, setPhone] = useState({ field: '', check: false });
	const [location, setLocation] = useState({ field: '', check: false });
	const [password, setPassword] = useState({ field: '', check: false });
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();
	const changeEntry = () => {
		setSecure((prevState) => !prevState);
	};

	const Signupfn = () => {
		if (name.field && email.field && password.field && phone.field && location.field) {
			setVisible(true);
			dispatch(signup(name.field, email.field, password.field, phone.field, location.field, props.navigation));
			setTimeout(() => {
				setVisible(false);
			}, 2000)



			// Firebase.auth()
			// 	.createUserWithEmailAndPassword(email.field, password.field)
			// 	.then((result) => {
			// 		console.log(result);
			// 		db.collection('Users')
			// 			.doc(`${result.user.uid}`)
			// 			.set({
			// 				name: name.field,
			// 				email: email.field,
			// 				phone: phone.field,
			// 				uid: result.user.uid,
			// 				location: location.field,
			// 			})
			// 			.then((docRef) => {
			// 				console.log(docRef, 'Document saved');
			// 				AsyncStorage.setItem('uid', result.user.uid);
			// 				props.navigation.navigate('HomeScreen');
			// 				setVisible(false);
			// 			})
			// 			.catch((error) => {
			// 				console.error('Error adding document: ', error);
			// 			});
			// 	})
			// 	.catch((error) => {
			// 		alert(error);
			// 		setVisible(false);
			// 		console.log(error);
			// 	});
		} else {
			name.field ? null : setName({ field: '', check: true });
			email.field ? null : setEmail({ field: '', check: true })
			password.field ? null : setPassword({ field: '', check: true })
			phone.field ? null : setPhone({ field: '', check: true })
			location.field ? null : setLocation({ field: '', check: true })
		}
	}
	const Emailfn = (email) => {
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		) ? setEmail({ field: email, check: false }) : setEmail({ field: '', check: true })
	};
	const verifyPermissions = async () => {
		const result = await Permissions.askAsync(
			Permissions.LOCATION
		);
		if (result.status !== 'granted') {
			Alert.alert(
				'Insufficient permissions!',
				'You need to grant Location permission to fetch your current location.',
				[{ text: 'Okay' }]
			);
			return false;
		}
		return true;
	};
	const currentLocation = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}
		let location = await Location.getCurrentPositionAsync({});
		let address = await Location.reverseGeocodeAsync({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude
		})
		console.log(address, "location");
		setLocation({ field: `${address[0].city},${address[0].subregion},${address[0].region}-${address[0].postalCode},${address[0].country}`, check: false })
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
			<ScrollView style={{ backgroundColor: "#000" }}>
				<Modal visible={visible} transparent={true} animationType="slide">
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#0690c2" />
					</View>
				</Modal>
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
							onChange={(name) => (name ? setName({ field: name, check: false }) : setName({ field: '', check: true }))}
						/>
						{name.check ? <Text style={styles.errortext}>Enter your full name </Text> : null}
					</View>
					<View style={styles.inputContainer}>
						<Input
							style={styles.input}
							placeholder={'Email'}
							keyboardType="email-address"
							autoCapitalize="none"
							onChange={(email) => Emailfn(email)}
						/>
						{email.check ? <Text style={styles.errortext}>Enter valid email address </Text> : null}
					</View>
					<View style={styles.inputContainer}>
						<Input
							style={styles.input}
							placeholder={'Phone'}
							keyboardType="phone-pad"
							autoCapitalize="none"
							maxLength={10}
							onChange={(phone) => (phone ? setPhone({ field: phone, check: false }) : setPhone({ field: '', check: true }))}
						/>
						{phone.check ? <Text style={styles.errortext}>Enter your phone number </Text> : null}
					</View>
					{/* <View style={styles.inputContainer}>
						<Input
							style={styles.input}
							placeholder={'Location'}
							keyboardType="default"
							autoCapitalize="none"
							onChange={(location) => setLocation(location)}
						/>
					</View> */}
					<View style={{ ...styles.passwordContainer, marginBottom: location.check ? 0 : 5 }}>
						<TextInput
							style={styles.passwordText}
							placeholder="Location"
							keyboardType="default"
							autoCapitalize="none"
							placeholderTextColor="white"
							onChangeText={(location) => (location ? setLocation({ field: location, check: false }) : setLocation({ field: '', check: true }))}
							value={location.field}
						/>
						<Ionicons
							style={{ padding: 10 }}
							size={20}
							name='ios-location'
							onPress={currentLocation}
							color="#fff"
						/>
					</View>
					{location.check ? <Text style={{ ...styles.errortext, padding: 5 }}>Enter your location </Text> : null}
					<View style={{ ...styles.passwordContainer, marginBottom: password.check ? 0 : 5 }}>
						<TextInput
							style={styles.passwordText}
							placeholder="Password"
							keyboardType="default"
							secureTextEntry={secure}
							autoCapitalize="none"
							placeholderTextColor="white"
							onChangeText={(password) => (password.length > 7 ? setPassword({ field: password, check: false }) : setPassword({ field: '', check: true }))}
						/>
						<Ionicons
							style={{ padding: 10 }}
							size={23}
							name={secure ? 'ios-eye-off' : 'ios-eye'}
							onPress={changeEntry}
							color="#fff"
						/>
					</View>
					{password.check ? <Text style={{ ...styles.errortext, padding: 5 }}>Password should be atleast 8 character </Text> : null}
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
		// marginTop: Height ? 0 : 0,
	},
	input: {
		padding: 8,
	},
	errortext: {
		color: '#a61d02',
		fontSize: 14,
		alignSelf: 'center',
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
		marginTop: 5,
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
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
});

export default SignupScreen;
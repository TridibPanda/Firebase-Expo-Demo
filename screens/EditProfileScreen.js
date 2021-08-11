import React, { useState, useEffect } from 'react';
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
	Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Input from '../components/Input';
import { db } from '../config/Firebase';

const Height = Dimensions.get('window').height > 660;
const Width = Dimensions.get('window').width > 360;


const EditProfileScreen = (props) => {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState();
	const [location, setLocation] = useState('');


	const submit = async() => {
		const userId = await AsyncStorage.getItem('uid');
		 db.collection("Users")
			.doc(`${userId}`)
			.update({
				name: name,
				email: email,
				phone: phone,
				location: location,
			})
			.then(() => props.navigation.goBack())
			.catch((error) => console.log(error));
	};
	const result = async() => {
		const userId = await AsyncStorage.getItem('uid');
		db.collection('Users')
			.doc(userId)
			.get().then(function (doc) {
				setName(doc.data().name);
				setEmail(doc.data().email);
				setPhone(doc.data().phone);
				setLocation(doc.data().location)
			}).catch((error) => {
				console.log(error);
			})
	}
	useEffect(() => {
		result();
	}, [])

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
						<Text style={styles.headerText}>Edit Details</Text>
					</View>
					<View style={styles.inputContainer}>
						<Input
							style={styles.input}
							placeholder={'Name'}
							keyboardType="default"
							autoCapitalize="none"
							onChange={(name) => setName(name)}
							value={name}
						/>
					</View>
					<View style={styles.inputContainer}>
						<Input
							style={styles.input}
							placeholder={'Email'}
							keyboardType="email-address"
							autoCapitalize="none"
							// onChange={(email) => setEmail(email)}
							value={email}
						/>
					</View>
					<View style={styles.inputContainer}>
						<Input
							style={styles.input}
							placeholder={'Phone'}
							keyboardType="phone-pad"
							autoCapitalize="none"
							maxLength={10}
							onChange={(phone) => setPhone(phone)}
							value={phone}
						/>
					</View>
					<View style={styles.inputContainer}>
						<Input
							style={styles.input}
							placeholder={'Location'}
							keyboardType="default"
							autoCapitalize="none"
							onChange={(location) => setLocation(location)}
							value={location}
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
});

export default EditProfileScreen;
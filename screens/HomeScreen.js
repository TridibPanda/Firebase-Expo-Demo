import React, { useState, useEffect, useCallback } from 'react';
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
	BackHandler,
	ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import Firebase, { db } from '../config/Firebase';
import { recipes} from '../store/actions/Recipes';
import { logout, get } from '../store/actions/Auth';
const Height = Dimensions.get('window').height > 660;
const Width = Dimensions.get('window').width > 360;


const HomeScreen = (props) => {
	// const [listData, setListData] = useState([]);

	const listData = useSelector(state => state.recipes.recipes);
	const dispatch = useDispatch();

	const datafn = () => {
		dispatch(recipes());
		dispatch(get());
		// var data = [];
		// db.collection('RecipeList')
		// 	.get().then((querySnapshot) => {
		// 		if (!querySnapshot.empty) {
		// 			querySnapshot.forEach((doc) => {
		// 				data.push(doc.data());
		// 			});
		// 			setListData(data);
		// 		}
		// 	})

	};
	useEffect(() => {
		datafn();
		
	}, [])

	const logoutfn = () => {
		dispatch(logout());
		// try {
		// 	await Firebase.auth()
		// 		.signOut()
		// 		.then(async () => {

		// 			await AsyncStorage.removeItem('uid');
		// 			props.navigation.navigate('LoginScreen')
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// } catch (error) {
		// 	console.log(error);
		// }
	}
	const edit = () =>{
		
		props.navigation.navigate('EditProfileScreen')
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
					onPress={edit}
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
				{listData.map((item, index) => {
					return (
						<TouchableOpacity style={styles.item} key={index} onPress={() => props.navigation.navigate('RecipeDetailsScreen', { recipeId: item.recipeId })}>
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
				})}
				{/* <FlatList
					showsVerticalScrollIndicator={false}
					data={listData}
					keyExtractor={(item, index) => item.id}
					renderItem={renderItem}
					style={{ width: '100%' }}
					ListEmptyComponent={emptyComponent}
				/> */}
			</View>
		{/* // 	<View style={{ marginTop: Dimensions.get('window').height * 0.4, alignItems: 'center' }}>
		// 	<Text style={styles.emptyText}>No recipe found</Text>
		// </View> */}

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
		flexDirection: 'row',
		// justifyContent: 'space-around',
		alignItems: 'flex-start',
		padding: 15,
		marginBottom: 80,
		flexWrap: 'wrap',

	},
	emptyText: {
		color: "white",
		fontSize: 15,
	},
	item: {
		height: 100,
		width: 150,
		backgroundColor: '#f5f5f5',
		borderRadius: 10,
		overflow: 'hidden',
		margin: 5,
		borderColor: '#fff',
		borderWidth: 1
	},
	bgImage: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
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
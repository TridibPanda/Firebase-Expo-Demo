import Firebase, { db } from '../../config/Firebase';
import AsyncStorage from '@react-native-community/async-storage';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE = 'UPDATE';
export const GET = 'GET';
export const LOCAL  = 'LOCAL';

export const signup = (name, email, password, phone, location) => {
    return dispatch => {
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
                    .then((docRef) => {
                        console.log('Document saved');
                        AsyncStorage.setItem('uid', result.user.uid);
                        // navigation.navigate('HomeScreen');
                        dispatch({ type: SIGNUP, uid: result.user.uid })
                    })
                    .catch((error) => {
                        console.error('Error adding document: ', error);
                    });
            })
            .catch((error) => {
                alert(error);
                console.log(error);
            });
    }
};

export const login = (email, password) => {
    return dispatch => {
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => {

                AsyncStorage.setItem('uid', result.user.uid);
                // navigation.navigate('HomeScreen');
                dispatch({ type: LOGIN, uid: result.user.uid })

            })
            .catch((error) => alert(error));
    }
};

export const logout = () => {
    return dispatch => {
        Firebase.auth()
            .signOut()
            .then(async () => {

                await AsyncStorage.removeItem('uid');
                // navigation.navigate('LoginScreen');
                dispatch({ type: LOGOUT, uid: '' })
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
export const local = () => {
    return async dispatch => {
        const userId = await AsyncStorage.getItem('uid');
        dispatch({ type: LOCAL, uid: userId })
    }
};

export const update = (name,email,phone,location,navigation) => {
    return async dispatch => {
        const userId = await AsyncStorage.getItem('uid');
		 db.collection("Users")
			.doc(`${userId}`)
			.update({
				name: name,
				email: email,
				phone: phone,
				location: location,
			})
			.then(() =>{
                navigation.goBack();
                dispatch({type: UPDATE, details:{
                    name: name,
                    email: email,
                    phone: phone,
                    location: location,
                } })
            } )
			.catch((error) => console.log(error));
    }
};

export const get = () => {
    return async dispatch => {
        const userId = await AsyncStorage.getItem('uid');
			db.collection('Users')
			.doc(userId)
			.get().then((doc)=> {
                dispatch({type: GET, details: doc.data() })
			}).catch((error) => {
				console.log(error);
			})
    }
};
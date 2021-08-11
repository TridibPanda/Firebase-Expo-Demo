import React, {useEffect } from 'react';
import {
	View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const InitialScreen = (props) => {
    const result = async()=>{
        const uid = await AsyncStorage.getItem('uid');
        if(uid){
            props.navigation.navigate('HomeScreen');	
        }else{
            props.navigation.navigate('LoginScreen');
        }
    };
    useEffect(()=>{  
        result();
    },[result])

    return (
        <View style={styles.screen}>
          <ActivityIndicator size="large" color='#0690c2' />
        </View>
      );
};
const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:"#80a1ad"
    }
  });

export default InitialScreen;
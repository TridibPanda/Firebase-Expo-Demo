import React, {useEffect } from 'react';
import {
	View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { useDispatch } from 'react-redux';

import { local } from '../store/actions/Auth';

const InitialScreen = (props) => {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(local());
  },[]);

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
import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardType,
} from "react-native";

const Height = Dimensions.get("window").height > 660;
const Width = Dimensions.get("window").width > 360;

const Input = (props) => {
  return (
    <View style={styles.input}>
      <TextInput
        {...props}
        placeholderTextColor="white"
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        secureTextEntry={props.secureTextEntry}
        maxLength={props.maxLength}
        underlineColorAndroid="transparent"
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        textAlignVertical={props.textAlignVertical}
        style={{ ...styles.inputText, ...props.style }}
        placeholder={props.placeholder}
        onChangeText={props.onChange}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 5,
    borderRadius: 35,
  },
  inputText: {
    padding: Height ? 10 : 5,
    borderColor: "white",
    color: "white",
    borderWidth: 1,
    borderRadius: 35,
    backgroundColor: "transparent",
    fontSize: 17,
  },
});

export default Input;
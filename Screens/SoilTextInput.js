import React, { memo } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../Auth_Core/theme";

const SoilTextInput = ({ errorText, ...props }) => {
    const {height}=Dimensions.get('screen')
  return (<View style={{...styles.container,height:props.height,marginVertical:height*0.034}}>
    <Input
      style={{...styles.input}}
      selectionColor={'#8CC63E'}
      underlineColor="transparent"
      mode="outlined"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>)
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12
  },
  input: {
    backgroundColor: theme.colors.surface
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4
  }
});

export default React.memo(SoilTextInput);

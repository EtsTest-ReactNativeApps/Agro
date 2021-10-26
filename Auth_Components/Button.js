import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../Auth_Core/theme";

const Button = ({ mode, style, children, ...props }) => (
  <PaperButton 
    style={{...styles.button,backgroundColor:mode === 'outlined'?null:'#8CC63E'}}
    mode={mode}
    {...props}
  >
    <Text style={{...styles.text,color:mode === 'outlined'?'#5E5E5E':'white'}}>{children}</Text>
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    borderRadius:20,
    
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26
  }
});

export default memo(Button);

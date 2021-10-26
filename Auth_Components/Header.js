import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../Auth_Core/theme";

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    color: '#5E5E5E',
    fontWeight: "bold",
    paddingVertical: 14
  }
});

export default memo(Header);

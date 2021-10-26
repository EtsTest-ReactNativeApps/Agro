import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { theme } from '../Auth_Core/theme';
import Colors from '../constants/Colors';

const Logo = () => (
  <View style={{width: 200,height: 200,borderBottomLeftRadius:15,overflow:'hidden',
    borderBottomRightRadius:15}}>
  <Image source={require('../Auth_assets/logo.png')} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 5,
    
  },
});

export default memo(Logo);

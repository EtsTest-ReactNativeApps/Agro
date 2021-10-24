import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Header = ({ children, navigation }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrowleft" size={24} />
            </TouchableOpacity>
            {children}
        </View>
    );
};
export default Header;


const styles = StyleSheet.create({
    header: {
        width: Dimensions.get("screen").width *.9,
        alignSelf: "center",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
    },
});


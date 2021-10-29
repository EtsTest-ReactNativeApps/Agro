import React,{memo,useState,useEffect} from "react";
import { View,StyleSheet,Text,Animated,Image,Dimensions,LogBox } from "react-native";

const styles = StyleSheet.create({
    splashContainer:{
        flex:1,
        backgroundColor:'skyblue',
        alignItems:'center',
    },
    splashImg:{
        width:180,
        height:180,
    },
    splashText:{
        fontSize:30,
        color:'black',
        fontFamily:'KaushanScript-Regular',
    },
    logoText:{
        textAlign:'center',
        color:'black',
        fontWeight:'bold',
        fontFamily:'SecularOne-Regular',
    }
});

const TeamScreen = ({ navigation })=>{
    
    useEffect(()=>{
        LogBox.ignoreAllLogs(true);
        const timer = setTimeout(()=>{
            navigation.navigate("AuthLoadingScreen");
        },3500);
        return ()=>clearTimeout(timer);
    },[navigation]);

    const screenHeight = Dimensions.get('window').height;

    const fadeAnim = useState(new Animated.Value(0))[0]
    const springPos = useState(new Animated.Value(0))[0]

    useEffect(()=>{
        Animated.parallel([
            Animated.spring(
                springPos,
                {
                    toValue:screenHeight/2-90,
                    friction:2,
                    tension:15,
                    useNativeDriver:true,
                }
            ),
            Animated.timing(
                fadeAnim,
                {
                    toValue:1,
                    duration:2500,
                    useNativeDriver:true,
                }
            )
        ]).start();
    },[springPos])


    return (
        <View style={styles.splashContainer}>
            <Animated.View style={{
                top:0,
                transform:[
                    {translateY:springPos}
                ]
            }}>
                <Text style={styles.logoText}> Developed by </Text>
                <Image source={require('../constants/codex.png')} style={styles.splashImg}/>
            </Animated.View>
            <Animated.View style={{
                position:'absolute',
                top:screenHeight/2+90,
                opacity:fadeAnim,
            }}>
                <Text style={styles.splashText}>Team c0d3x</Text>
            </Animated.View>
        </View>
    )
}

export default memo(TeamScreen);
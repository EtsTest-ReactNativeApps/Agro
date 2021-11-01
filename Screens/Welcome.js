import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions, BackHandler, Text } from 'react-native';

import Antdesign from 'react-native-vector-icons/AntDesign';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Headline from "./component/Header/index";
import { NavigationEvents } from 'react-navigation';

const Welcome = ({ navigation }) => {

    const [ activeState, setActiveState ] = useState({
        title: "Kronia App",
        description: "Exclusively for Agriculture and Farming",
        id: 1,
        src: require('../constants/slider1.png')
    });
    
    
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    // not used.
    function onSwipe(gestureName, gestureState) {
        const { SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        // console.log(gestureName, 'gestureName')
        switch (gestureName) {
          case SWIPE_LEFT:
            moveAhead()
            break;
          case SWIPE_RIGHT:
            moveBack()
            break;
        }
    };

    function moveAhead(){
        if(activeState.id < 3){
            let nextId = activeState.id + 1;
            const newItem = stages[nextId];
            setActiveState({ title: newItem.title, id: newItem.id, src: newItem.src, description: newItem.description });
        }else {
            navigation.navigate("HomeScreen");
        }
    };
    function moveBack(){
        if(activeState.id > 1){
            let nextId = activeState.id - 1;
            const newItem = stages[nextId];
            setActiveState({ title: newItem.title, id: newItem.id, src: newItem.src, description: newItem.description });
        }
    };
    const backAction = (isFocused) => {
        if(activeState == 0){
          BackHandler.exitApp();
          return true;
        }else {
          return false;
        }
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress",backAction);
        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [BackHandler ]);

    function skip(){
        navigation.navigate("HomeScreen")
    };

    const stages = {
        1:{
            id: 1,
            title: "Kronia App",
            description: "Exclusively for Agriculture and Farming",
            src: require('../constants/slider1.png')
        },
        2:{
            id: 2,
            title: "Advice for your crops and farms ",
            description: "Get acquianted with right information",
            src: require('../constants/slider2.png')
        },
        3:{
            id: 3,
            title: "Detect crop diseases",
            description: "Upload crop images to detect the disease",
            src: require('../constants/farming.png')
        },
    };

    const RenderIndicators = ({ id }) => {
        if(id === activeState.id){
            return <View style={styles.activeIndicator} />
        }else {
            return <View style={styles.indicator} />
        }
    };

    function onSwipeRight(){
        moveBack();
    };

    function onSwipeLeft(){
        moveAhead();
    };

    function getScreenStyle(id){
        let styleList=[styles.screenBg1,styles.screenBg2,styles.screenBg3]
        return styleList[id-1];
    }
    return (
        <View style={[styles.root,getScreenStyle(activeState.id)]}>
            <GestureRecognizer
                style={styles.imageContainer}
                onSwipeRight={onSwipeRight}
                onSwipeLeft={onSwipeLeft}
            >
                <Image source={activeState.src} style={styles.img} />
                <View style={{...styles.title,alignItems:'center'}}>
                    <Text style={{ textAlign: "center",fontWeight:'bold',color:'black',fontSize: 20}}>
                        {activeState.title}
                    </Text>
                    <Text style={{ textAlign: "center",fontSize:15,color: "black",marginTop:15}}>
                        {activeState.description}
                    </Text>
                </View>
            </GestureRecognizer>
            <View style={styles.footer}>
                <View style={styles.routeContainer}>
                    <View>
                        <TouchableOpacity onPress={skip} style={styles.skipButton}>
                            <Text style={{ color: "#494949",letterSpacing:1.3,fontSize: 17 }}>
                                SKIP
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={moveAhead}
                    >
                        <View style={{width:20,height:20,transform:[{'rotate':'180deg'}]}}>
                            <Image style={{width:'100%',height:'100%',tintColor:'white'}} 
                            source={require('../constants/next.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.indicatorContainer}>
                    {Object.keys(stages).map(item => (
                        <RenderIndicators key={item} id={stages[item].id} />
                    ))}
                    {/*<Normaltext style={{ marginHorizontal: 4,  fontSize: 13 }}>*/}
                    {/*    <Normaltext style={{ color: "#F16943" }}>{activeState.id}</Normaltext>*/}
                    {/*    <Normaltext style={{ color: "rgba(65, 37, 73, 0.5)" }}>/3</Normaltext>*/}
                    {/*</Normaltext>*/}
                </View>
            </View>
        </View>
    );
};
export default React.memo(Welcome);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems:'center',
    },
    screenBg1:{
        backgroundColor:'#C7F0AF'
    },
    screenBg2:{
        backgroundColor:'#5BE2BC'
    },
    screenBg3:{
        backgroundColor:'#A5F1A1'
    },
    title: {
        marginVertical: 20

    },
    img: {
        alignSelf: "center",
        resizeMode: "contain",
        width: "100%",
        height: "100%",

    },
    imageContainer: {
        width: Dimensions.get("screen").width*0.6,
        height: Dimensions.get("screen").height * 0.5,
    },
    footer: {
        width: Dimensions.get("screen").width,
        marginTop:Dimensions.get("screen").height * 0.1
    },
    routeContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        alignItems: "center"
    },
    button: {
        backgroundColor: "#00AA35",
        borderRadius: 100,
        padding: 16,
        elevation: 2,
    },
    activeIndicator: {
        width: 8,
        height: 8,
        marginHorizontal:2,
        borderRadius: 10,
        backgroundColor: "black"
    },
    indicator: {
        width: 8,
        height: 8,
        marginHorizontal: 2,
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    },
    indicatorContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    skipButton: {
        borderRadius: 100,
        padding: 2,
        color: "rgba(65, 37, 73, 0.5)",
        marginVertical: 4
    }
});


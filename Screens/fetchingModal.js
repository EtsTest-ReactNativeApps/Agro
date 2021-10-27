import React, { useCallback, useState } from "react";
import { Pressable,PermissionsAndroid,Text, View, Platform, Dimensions, ToastAndroid } from "react-native";
import { RippleLoader } from "react-native-indicator";
import Modal from "react-native-modal";

import ImagePicker, { launchCamera, launchImageLibrary } from "react-native-image-picker"

const FetchingModal = props => {
    const [modal,setModal]=useState(true)
    const width=Dimensions.get('screen').width
    const height=Dimensions.get('screen').height
    
    return <Modal
            style={{justifyContent:'center',alignItems:'center'}}
            isVisible={props.modalVisible}
            hasBackdrop={true}
            style={{alignItems:'center'}}
            backdropColor={'#292828'}
            animationOut={'zoomOut'}
            animationOutTiming={600}
            animationInTiming={400}
            animationIn='zoomIn'
            backdropOpacity={0.5} 
                >
                <View style={{
                    width:width*0.9,
                    height:height*0.25,
                    backgroundColor:'white',
                    borderRadius:15,
                    justifyContent:'center',
                    alignItems:'center'}}>

                    <RippleLoader  
                    strokeWidth={4} 
                    size={Dimensions.get('screen').width*.13} color={'#8CC63E'} />

                    <Text style={{marginTop:15,fontFamily:'Sora-Regular',color:'#3C3A3A'}}>
                        Fetching, please wait ...
                    </Text>
                    
                </View>
        </Modal>
}

export default React.memo(FetchingModal)
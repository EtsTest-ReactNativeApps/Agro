import React, { useCallback, useState } from "react";
import { Pressable,PermissionsAndroid,Text, View, Platform, Dimensions, ToastAndroid } from "react-native";
import { RippleLoader } from "react-native-indicator";
import { Modal } from "react-native-paper";

import ImagePicker, { launchCamera, launchImageLibrary } from "react-native-image-picker"

const ModalComponent = props => {
    const [detecting,setDetecting]=useState(false)
    const [invalid,setInvalid] = useState(false)
    const [modal,setModal]=useState(true)
    const [check,setCheck]=useState(false)
    const width=Dimensions.get('screen').width
    const height=Dimensions.get('screen').height
    const url = props.name === 'rice' ?"https://pytorch-annual2.herokuapp.com/getRice" : 
    props.name === 'wheat' ? 'https://pytorch-annual.herokuapp.com/getWheatDisease' : 
    props.name === 'corn' ?'https://pytorch-annual3.herokuapp.com/getCorn' : 
    props.name === 'leaf' ? 'https://pytorch-annual.herokuapp.com/getLeafDisease' :
    props.name === 'fruit' ? 'https://pytorch-annual.herokuapp.com/getLeafDisease' : null

    const [continuePressed,setContinuePressed]=useState(false)
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: 'Camera Permission',
                message: 'App needs camera permission',
              },
            );
            // If CAMERA Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            return false;
          }
        } else return true;
      };
    
      const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'External Storage Write Permission',
                message: 'App needs write permission',
              },
            );
            // If WRITE_EXTERNAL_STORAGE Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            alert('Write permission err', err);
          }
          return false;
        } else return true;
      };
      
      const captureImage = async (type) => {
        let options = {
          mediaType: type,
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
          videoQuality: 'low',
          durationLimit: 30, //Video max duration in seconds
          saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
          launchCamera(options, (response) => {
            console.log('Response = ', response);
    
            if (response.didCancel) {
              alert('User cancelled camera picker');
              return;
            } else if (response.errorCode == 'camera_unavailable') {
              alert('Camera not available on device');
              return;
            } else if (response.errorCode == 'permission') {
              alert('Permission not satisfied');
              return;
            } else if (response.errorCode == 'others') {
              alert(response.errorMessage);
              return;
            }
            console.log('base64 -> ', response.assets[0].base64);
            console.log('uri -> ', response.assets[0].uri);
            console.log('width -> ', response.assets[0].width);
            console.log('height -> ', response.assets[0].height);
            console.log('fileSize -> ', response.assets[0].fileSize);
            console.log('type -> ', response.assets[0].type);
            console.log('fileName -> ', response.assets[0].fileName);
            // props.navigation.navigate('DetailScreen',{uri:response.assets[0].uri})
            setDetecting(true)
            detectImage(response.assets[0].uri)
            return {}
          });
        }
      };
    
      const chooseFile = (type) => {
        let options = {
          mediaType: type,
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
        };
        launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          console.log('base64 -> ', response.assets[0].base64);
            console.log('uri -> ', response.assets[0].uri);
            console.log('width -> ', response.assets[0].width);
            console.log('height -> ', response.assets[0].height);
            console.log('fileSize -> ', response.assets[0].fileSize);
            console.log('type -> ', response.assets[0].type);
            console.log('fileName -> ', response.assets[0].fileName);
            // props.navigation.navigate('DetailScreen',{uri:response.assets[0].uri})
            setDetecting(true);
            detectImage(response.assets[0])
          return {}
        });
      };
    const detectImage = useCallback((image)=>{
      try{
        var formdata = new FormData();
        var value = props.name === 'wheat' || props.name === 'rice' || props.name === 'corn' || 
                    props.name === 'leaf' ? 'leaf' : props.name === 'fruit' ? 'fruit' : null
        const data={
          uri:image.uri,
          type:image.type,
          name:image.fileName
        }
        formdata.append("image", data);
        formdata.append("value", value);
        var requestOptions = {
          method: 'POST',
          body: formdata,
          headers:{
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
          },
          redirect: 'follow'
        };

        fetch('https://pytorch-annual.herokuapp.com/getPlantNet', requestOptions)
          .then(response => response.json())
          .then(res=>{
              if  (res.result === 'Invalid Image'){
                setDetecting(false)
                props.setPressed(false)
                alert(`This Image is not of a ${props.name}`)
                return {}
              }else{
                return fetch(url, requestOptions)
              }})
            .then(res=>res.json())
            .then(data=>{            
              console.log(data);
              props.navigation.navigate('DetailScreen',{
              uri:image.uri,
              detect:data.result,
              name:props.name})
              props.setPressed(false)
              return {}
          })
        }catch(err){
        console.log('error',err)
        ToastAndroid.show('Error in detecting .')
      }

    })
    return <Modal
            style={{justifyContent:'center',alignItems:'center'}}
            contentContainerStyle={{width:width*0.75,borderRadius:20,height:height*0.20,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}
                animationType='slide'
                transparent={true}
                visible={modal} 
                >
            {!detecting?<View style={{width:width*0.75,height:height*0.20,justifyContent:'flex-start',alignItems:'center'}}>
                <Pressable onPress={()=>{captureImage('photo')}} android_ripple={{color:'grey'}} style={{width:width*0.9,height:height*0.25*0.35,borderBottomWidth:0.5,borderBottomColor:'grey',
                justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontFamily:'Sora-Regular',fontSize:15,color:'#008AF5'}}>Launch Camera</Text>
                </Pressable>
                <Pressable onPress={()=>{chooseFile('photo')}} android_ripple={{color:'grey'}} style={{width:width*0.9,height:height*0.25*0.35,borderBottomWidth:0.5,borderBottomColor:'grey',
                justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontFamily:'Sora-Regular',fontSize:15,color:'#008AF5'}}>Upload from Gallery</Text>
                </Pressable>
                <Pressable onPress={()=>{setModal(false)}} android_ripple={{color:'grey'}} style={{width:width*0.9,height:height*0.25*0.3,borderBottomColor:'grey',
                justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontFamily:'Sora-Regular',fontSize:15,color:'#313131'}}>Cancel</Text>
                </Pressable>
               </View>:<View style={{
                        width:width*0.75,
                        height:height*0.20,
                        justifyContent:'center',
                        alignItems:'center'}}>

                        <RippleLoader  
                        strokeWidth={4} 
                        size={Dimensions.get('screen').width*.13} color={'#8CC63E'} />

                        <Text style={{marginTop:15,fontFamily:'Sora-Regular',color:'#3C3A3A'}}>
                            Detecting, please wait ...
                        </Text>
                        
                    </View>}
        </Modal>
}

export default React.memo(ModalComponent)
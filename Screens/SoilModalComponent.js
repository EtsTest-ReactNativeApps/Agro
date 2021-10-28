import React, { useCallback, useState } from "react";
import { Pressable,PermissionsAndroid,Text, View, Platform, Dimensions, ToastAndroid } from "react-native";
import { RippleLoader } from "react-native-indicator";
import ImagePicker, { launchCamera, launchImageLibrary } from "react-native-image-picker"
import Modal from 'react-native-modal'
const SoilModalComponent = props => {
    const [detecting,setDetecting]=useState(false)
    const [invalid,setInvalid] = useState(false)
    const [modal,setModal]=useState(true)
    const [check,setCheck]=useState(false)
    const width=Dimensions.get('screen').width
    const height=Dimensions.get('screen').height
    const url = ''

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
        const data={
          uri:image.uri,
          type:image.type,
          name:image.fileName
        }
        formdata.append("image", data);
        var requestOptions = {
          method: 'POST',
          body: formdata,
          headers:{
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
          },
          redirect: 'follow'
        };

        fetch('https://pytorch-annual.herokuapp.com/getSoil', requestOptions)
          .then(response => response.json())
          .then(res=>{
              if  (res.result === 'Invalid Image'){
                setDetecting(false)
                props.setSoilModalVisible(false);
                props.setModalVisible(false)
                setDetecting(false)
                alert(`This Image is not of a soil`)
                return {}
              }else{
                props.setSoilModalVisible(false);
                props.setModalVisible(false)
                setDetecting(false)
                props.navigation.navigate('CropDetailScreenViaImage',
                {uri:image.uri,weatherData:props.data,soilType:`${res.result} Soil`})
              }})            
          }catch(err){
          console.log('error',err)
          ToastAndroid.show('Error in detecting .')
        }

      })
return      <Modal
            onBackdropPress={()=>{props.setSoilModalVisible(false)}}
            style={{justifyContent:'center',alignItems:'center'}}
            isVisible={props.soilModalVisible}
            hasBackdrop={true}
            style={{alignItems:'center'}}
            backdropColor={'#292828'}
            animationOut={'zoomOut'}
            animationOutTiming={600}
            animationInTiming={400}
            animationIn='zoomIn'
            backdropOpacity={0.5}  
                >
            {!detecting?<View style={{
                width:width*0.75,
                height:height*0.18,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'white',
                borderRadius:15,}}>
                <Pressable onPress={()=>{captureImage('photo')}} android_ripple={{color:'grey'}} style={{width:width*0.75,height:height*0.25*0.35,borderBottomWidth:0.5,borderBottomColor:'#DBD7D7',
                justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontFamily:'Sora-Regular',fontSize:15,color:'#008AF5'}}>Launch Camera</Text>
                </Pressable>
                <Pressable onPress={()=>{chooseFile('photo')}} android_ripple={{color:'grey'}} style={{width:width*0.75,height:height*0.25*0.35,
                justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontFamily:'Sora-Regular',fontSize:15,color:'#008AF5'}}>Upload from Gallery</Text>
                </Pressable>
                </View>:<View style={{
                        width:width*0.75,
                        height:height*0.20,
                        backgroundColor:'white',
                        borderRadius:15,
                        justifyContent:'center',
                        alignItems:'center'}}>

                        <RippleLoader  
                        strokeWidth={4} 
                        size={Dimensions.get('screen').width*.13} color={'#8CC63E'} />

                        <Text style={{marginTop:15,fontFamily:'Sora-Regular',color:'#3C3A3A'}}>
                            Detecting Soil, please wait ...
                        </Text>
                        
                    </View>}
        </Modal>
}

export default React.memo(SoilModalComponent)
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions,FlatList,Image,ImageBackground,Pressable,StyleSheet,Text, ToastAndroid, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { TextInput as Input } from "react-native-paper";
import SoilTextInput from "./SoilTextInput";


const SoilFormComponentModal = props => {
    const {width,height}=Dimensions.get('screen')
    const [statePressed,setStatePressed]=useState('SD')

    const [nitro,setNitro]=useState({value:'',error:''})
    const [potash,setPotash]=useState({value:'',error:''})
    const [phospo,setPhospo]=useState({value:'',error:''})
    const checErrNitro = () => {
        if (!nitro.value){
            setNitro({...nitro,error:'enter nitrogen'})
        }
    }
    const checErrPhospo = () => {
        if (!phospo.value){
            setPhospo({...phospo,error:'enter phosphorus'})
        }
    }
    const checErrPotash = () => {
        if (!potash.value){
            setPotash({...potash,error:'enter potassium'})
        }
    }
    
    const continuePressed = () => {
        checErrPotash()
        checErrPhospo()
        checErrNitro()
        if ((potash.value && phospo.value && nitro.value) && ((potash.value + phospo.value + nitro.value) < 100)){
            props.navigation.navigate('CropDetailScreen',{
            soilType:props.soil,
            weatherData:props.weatherData,
            npk:[nitro.value,phospo.value,potash.value]
            })
            props.setModalVisible(false);
            props.setSoilFormModalVisible(false)
            props.setSoil('')
        }else if(potash.error || phospo.error || nitro.error){
            
        }else{
            alert('Values must add upto below 100')
        }
        return {};
    }
    return <View style={{ flex:1  }}>
                <Modal
                onBackdropPress={()=>{
                    props.setModalVisible(false);
                    props.setSoilFormModalVisible(false)}}
                    isVisible={props.soilFormModalVisible}
                    hasBackdrop={true}
                    style={{alignItems:'center'}}
                    backdropColor={'#292828'}
                    animationOut={'slideOutDown'}
                    animationOutTiming={600}
                    animationInTiming={400}
                    animationIn='slideInRight'
                    backdropOpacity={0.5}
                    >
                    
                      <View 
                        style={{
                          width:width,
                          height:height*0.6,
                          marginTop:height*0.35,
                          paddingHorizontal:width*0.03,
                          paddingBottom:10,
                          paddingTop:20,
                          borderTopLeftRadius:20,
                          borderTopRightRadius:20,
                          backgroundColor:'#FCFCFC',
                          alignItems:'center',
                          elevation:5,
                          shadowColor:'black',
                          shadowOffset:{width:0,height:4},
                          shadowRadius:3,
                          shadowOpacity:0.3
                        }}>
                           <Text style={{fontFamily:'Sora-Regular',textAlign:'center',marginVertical:15,fontWeight:'500',color:'#605959',fontSize:15}}>
                                {`Fill the ${props.soil} attributes`}
                            </Text>
                          <SoilTextInput
                          height={height*0.05}
                          label="Nitrogen"
                          returnKeyType="next"
                          value={nitro.value}
                          onChangeText={text => {setNitro({ value: text, error: "" });checErrNitro()}}
                          error={!!nitro.error}
                          errorText={nitro.error}
                          autoCapitalize="none"
                          keyboardType="number-pad" />

                          <SoilTextInput
                          height={height*0.05}
                          label="Phosophorus"
                          returnKeyType="next"
                          value={phospo.value}
                          onChangeText={text => {setPhospo({ value: text, error: "" });checErrPhospo()}}
                          error={phospo.error}
                          errorText={phospo.error}
                          autoCapitalize="none"
                          keyboardType="number-pad" />

                          <SoilTextInput
                          height={height*0.05}
                          label="Potassium"
                          returnKeyType="next"
                          value={potash.value}
                          onChangeText={text => {setPotash({ value: text, error: "" });checErrPotash()}}
                          error={!!potash.error}
                          errorText={potash.error}
                          autoCapitalize="none"
                          keyboardType="number-pad" />
                                                      
                            <Pressable
                            disabled={
                                nitro.error && phospo.error && potash.error?true:false
                            }
                              onPress={continuePressed}
                              android_ripple={{color:'grey'}} style={{
                                overflow:'hidden',
                              width:width*0.95,
                              height:height*0.06,
                              marginTop:height*0.04,
                              borderRadius:5,                       
                              elevation:3,
                              justifyContent:'center',
                              alignItems:'center',
                              backgroundColor:'#8CC63E',
                              shadowColor:'black',
                              shadowOffset:{width:0,height:4},
                              shadowOpacity:0.4,
                              shadowRadius:4}}>
                                  <Text style={{fontFamily:'Sora-Regular',
                                  letterSpacing:1,fontWeight:'bold',fontSize:16,color:'white'}}>
                                  Continue
                                  </Text>
                          </Pressable>
                          </View>
                    </Modal>
              </View>
}


export default React.memo(SoilFormComponentModal)

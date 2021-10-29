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
    const [ph,setPh]=useState({value:'',error:''})
    const checErrNitro = () => {
        if (!nitro.value){
            setNitro({...nitro,error:'enter nitrogen'})
            return true
        }else{
            return false
        }
    }
    const checErrPhospo = () => {
        if (!phospo.value){
            setPhospo({...phospo,error:'enter phosphorus'})
            return true
        }else{
            return false
        }
    }
    const checErrPotash = () => {
        if (!potash.value){
            setPotash({...potash,error:'enter potassium'})
            return true
        }else{
            return false
        }
    }
    const checErrPh = () => {
        if (!ph.value){
            setPh({...ph,error:'enter ph '})
            return true
        }else if(parseInt(ph.value)<=14 && parseInt(ph.value)>0){
            return false
        }else{
            setPh({...ph,error:'ph must be between 0 and 14'})
            return true
        }
    }

    const fetchData = useCallback((npk)=>{
        props.setSoilFetchingModalVisible(true)
        try{
            const uploadData={
                nitro:npk[0],  // nitrogen percentage
                phosp:npk[1],  // nitrogen percentage 
                potash:npk[2],  // nitrogen percentage  
                temp:props.weatherData.current.temperature, 
                humid:props.weatherData.current.humidity, 
                ph:npk[3],
                rain:props.weatherData.current.precip 
            }
            console.log(uploadData)
            var myHeaders = new Headers();
            var raw = JSON.stringify(uploadData)
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };
              
            fetch("https://pytorch-annual.herokuapp.com/getCrop", requestOptions)
            .then(res=>res.json())
            .then(response => {
                console.log(response);
                props.setSoilFetchingModalVisible(false);
                const crops=[response.result.recommended,response.result.similar]
                props.navigation.navigate('CropRecommender',{crops:crops})
                setNitro({value:'',error:''})
                setPotash({value:'',error:''})
                setPhospo({value:'',error:''})
                setPh({value:'',error:''})
                props.setModalVisible(false);
                props.setSoilFormModalVisible(false)
                props.setSoil('')
            })
            .catch(err=>{
                console.log(err)
                props.setModalVisible(false);
                props.setSoilFetchingModalVisible(false);
                throw err
            })
        }catch(err){
            console.log('error',err)
            props.setModalVisible(false);
            props.setSoilFetchingModalVisible(false);
            ToastAndroid.show('Error in fetching crops.')
        }
        
    })

    const continuePressed = async () => {
        const er1=checErrPotash()
        const er2=checErrPhospo()
        const er3=checErrNitro()
        const er4=checErrPh()
        if ( er1  || er2  || er3 || er4){
            return {}
        }else{
            console.log(parseFloat(potash.value)+ parseFloat(phospo.value) + parseFloat(nitro.value) + parseFloat(ph.value) )
            if ((parseFloat(potash.value) + parseFloat(phospo.value) + parseFloat(nitro.value)) < 100.00){
                const npk=[parseFloat(potash.value),parseFloat(phospo.value),parseFloat(nitro.value),parseFloat(ph.value)]
                await fetchData(npk)
            }else{
                alert('Values must add upto below 100 %')
            }
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
                          height:height*0.75,
                          marginTop:height*0.25,
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
                           <Text style={{fontFamily:'Sora-Regular',textAlign:'center',marginVertical:5,fontWeight:'500',color:'#605959',fontSize:15}}>
                                {`Fill the ${props.soil} attributes`}
                            </Text>
                          <SoilTextInput
                          height={height*0.05}
                          label="Nitrogen %"
                          returnKeyType="next"
                          value={nitro.value}
                          onChangeText={text => {setNitro({ value: text, error: "" })}}
                          error={!!nitro.error}
                          errorText={nitro.error}
                          autoCapitalize="none"
                          keyboardType="number-pad" />

                          <SoilTextInput
                          height={height*0.05}
                          label="Phosophorus %"
                          returnKeyType="next"
                          value={phospo.value}
                          onChangeText={text => {setPhospo({ value: text, error: "" });}}
                          error={phospo.error}
                          errorText={phospo.error}
                          autoCapitalize="none"
                          keyboardType="number-pad" />

                          <SoilTextInput
                          height={height*0.05}
                          label="Potassium %"
                          returnKeyType="next"
                          value={potash.value}
                          onChangeText={text => {setPotash({ value: text, error: "" });}}
                          error={!!potash.error}
                          errorText={potash.error}
                          autoCapitalize="none"
                          keyboardType="number-pad" />

                          <SoilTextInput
                          height={height*0.05}
                          label="Ph"
                          returnKeyType="next"
                          value={ph.value}
                          onChangeText={text => {setPh({ value: text, error: "" });}}
                          error={!!ph.error}
                          errorText={ph.error}
                          autoCapitalize="none"
                          keyboardType="number-pad" />
                                                      
                            <Pressable
                            disabled={
                                nitro.error && phospo.error && potash.error && ph.error?true:false
                            }
                              onPress={continuePressed}
                              android_ripple={{color:'grey'}} style={{
                                overflow:'hidden',
                              width:width*0.95,
                              height:height*0.06,
                              marginTop:height*0.09,
                              borderRadius:5,                       
                              elevation:2,
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

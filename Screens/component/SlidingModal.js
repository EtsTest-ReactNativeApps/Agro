import React, { useCallback, useEffect, useState } from "react";
import { Dimensions,FlatList,Image,ImageBackground,Pressable,Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Modal from "react-native-modal";


const SlidingModal = props => {
    const {width,height}=Dimensions.get('screen')
    const data=[{source:require('./clayey.jpeg'),type:'Clayey Soil'},{source:require('./red.jpeg'),type:'Red Soil'},
                {source:require('./loamy.jpeg'),type:'Loamy Soil'},{source:require('./black.jpeg'),type:'Black Soil'}]
    console.log('MODAL ->',props.modalVisible)
    const [statePressed,setStatePressed]=useState('SD')
    const [soil,setSoil]=useState('')
    const keyExtractor = useCallback((item,index)=>index);
    const renderItem = useCallback(({item})=>
      (<View style={{alignItems:'center',marginRight:15}}>
        <Pressable disabled={statePressed === 'SG'?true:false} 
        onPress={()=>setSoil(item.type)}
        style={{width:width*0.23,height:width*0.23,borderRadius:15,overflow:'hidden',
        opacity:statePressed === 'SG'?0.7:1}}>
          <ImageBackground style={{width:'100%',height:'100%',alignItems:'flex-end'}} source={item.source} >
            {item.type === soil ?<View style={{width:16,height:16,marginRight:10,marginVertical:10}}>
              <Image source={require('../../constants/tick.png')} style={{width:'100%',height:'100%'}} />
            </View>:null}
          </ImageBackground>
        </Pressable>
        <Text style={{fontFamily:'Sora-SemiBold',fontWeight:'400',marginTop:5,fontSize:13,color:'#313131'}}>{item.type}</Text>
      </View>))
    return <View style={{ flex:1  }}>
                <Modal
                onBackdropPress={()=>{props.setModalVisible(false)}}
                    isVisible={props.modalVisible}
                    hasBackdrop={true}
                    style={{alignItems:'center'}}
                    backdropColor={'#292828'}
                    animationOut={'slideOutDown'}
                    animationOutTiming={600}
                    animationInTiming={400}
                    animationIn='slideInUp'
                    backdropOpacity={0.5}
                    >
                    
                      <View 
                        // onTouchStart={e=> {
                        //   if (e.nativeEvent.pageY > height*0.25 && e.nativeEvent.pageY < height*0.6)
                        //   props.setModalVisible(false)
                        // }}                        
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
                          <View style={{width:'100%',height:'80%',alignItems:'center'}}>
                            <Text style={{fontFamily:'Sora-Regular',fontWeight:'900',color:'#605959',fontSize:17}}>
                                Choose Soil
                            </Text>
                            <Pressable 
                            onPress={()=>setStatePressed('SD')}
                            style={{
                              width:'95%',
                              marginTop:height*0.03,
                              height:height*0.08,
                              padding:15,
                              borderRadius:10,
                              borderWidth:statePressed === 'SD' ? 1 : 0,
                              borderColor:statePressed === 'SD' ? '#1492E6' : null,
                              elevation:5,
                              flexDirection:'row',
                              alignItems:'center',
                              justifyContent:'space-between',
                              backgroundColor:'white',
                              shadowColor:'black',
                              shadowOffset:{width:0,height:4},
                              shadowRadius:3,
                              shadowOpacity:0.3}} >
                                
                                <Text style={{fontFamily:'Sora-SemiBold',fontWeight:'bold',color:'#313131',fontSize:16}}>
                                  Choose from the soil data
                                </Text>
                                <View style={{
                                  width:25,
                                  height:25,
                                  backgroundColor:statePressed === 'SD'?'white':'#F5F5F5',
                                  borderRadius:50,
                                  borderWidth:1,
                                  borderColor:statePressed === 'SD'?'#1492E6':'#D8D8D8',
                                  justifyContent:'center',
                                  alignItems:'center'}}>
                                   {statePressed === 'SD'?<View style={{width:15,height:15,borderRadius:15,backgroundColor:'#1492E6'}}>
                                    </View>:null}
                                </View>
                            </Pressable>
                            <FlatList 
                            style={{width:width*.95*.95,marginTop:height*0.03}}
                            horizontal 
                            showsHorizontalScrollIndicator={false} 
                            data={data} 
                            renderItem={renderItem} keyExtractor={keyExtractor} />
                            <Pressable 
                            onPress={()=>{setStatePressed('SG');setSoil('')}}
                            style={{
                              width:'95%',
                              marginTop:height*0.04,
                              height:height*0.08,
                              padding:15,
                              borderRadius:10,
                              borderWidth:statePressed === 'SG' ? 1 : 0,
                              borderColor:statePressed === 'SG' ? '#1492E6' : null,
                              elevation:5,
                              flexDirection:'row',
                              alignItems:'center',
                              justifyContent:'space-between',
                              backgroundColor:'white',
                              shadowColor:'black',
                              shadowOffset:{width:0,height:4},
                              shadowRadius:3,
                              shadowOpacity:0.3}} >
                                
                                <Text style={{fontFamily:'Sora-SemiBold',fontWeight:'bold',color:'#313131',fontSize:16}}>
                                  Choose from the camera / gallery
                                </Text>
                                <View style={{
                                  width:25,
                                  height:25,
                                  backgroundColor:statePressed === 'SG'?'white':'#F5F5F5',
                                  borderRadius:50,
                                  borderWidth:1,
                                  borderColor:statePressed === 'SG'?'#1492E6':'#D8D8D8',
                                  justifyContent:'center',
                                  alignItems:'center'}}>
                                   {statePressed === 'SG'?<View style={{width:15,height:15,borderRadius:15,backgroundColor:'#1492E6'}}>
                                    </View>:null}
                                </View>
                            </Pressable>
                            </View>
                            <Pressable
                            disabled={statePressed === 'SG'?false:soil?false:true}
                              onPress={async ()=>{
                                
                                await props.setModalVisible(false)
                                if (statePressed === 'SD'){
                                  props.navigation.navigate('CropDetailScreen',{
                                    soilType:soil,
                                    weatherData:props.weatherData
                                  })
                                }else{
                                  props.setSoilModalVisible(true)
                                }
                                return {}
                                }}
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

export default React.memo(SlidingModal)

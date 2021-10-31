import ButtonP from "../Auth_Components/Button";
import React,{  useEffect, useRef, useState } from "react";
import {View, Button,Pressable,Image,Text,Modal, StyleSheet, TouchableNativeFeedback, ToastAndroid, SafeAreaView, ActivityIndicator, Alert, Dimensions, ImageBackground, ScrollView,} from "react-native"
import WeatherModal from "./WeatherModal";
import SlidingModal from "./component/SlidingModal";
import SoilModalComponent from "./SoilModalComponent";
import SoilFormComponentModal from "./SoilFormComponentModal";
import SoilFetchingModal from "./SoilFetchingModal";

const Dashboard = props => {
    
    const [wind,setWind]=useState('')
    const [temp,setTemp]=useState('')
    const [rain,setRain]=useState('')
    const [modalVisible,setModalVisible]=useState(false)
    const [soilModalVisible,setSoilModalVisible]=useState(false)
    const [soilFormModalVisible,setSoilFormModalVisible]=useState(false)
    const [soilFetchingModalVisible,setSoilFetchingModalVisible]=useState(false)
    const [soil,setSoil]=useState('')
    const [data,setData]=useState(null)
    const width=Dimensions.get('screen').width
    const height = Dimensions.get('screen').height       
    return (<SafeAreaView  style={{flex:1}}>
              <ScrollView style={{width:width,height:height*1.2,backgroundColor:'#8CC63E'}}>
                <View style={{width:width,height:width*0.78*(293/414),alignItems:'center'}}>
                  <ImageBackground style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'space-between'}} source={require('../constants/backg.png')}>
                    <View style={{width:width,height:height*0.08,padding:10,alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
                      <Pressable onPress={()=>props.navigation.toggleDrawer()} style={{width:height*0.04,height:height*0.04}}>
                        <Image style={{width:'100%',height:'100%'}} source={require('../constants/menu.png')} />
                      </Pressable>
                      <Text style={{fontFamily:'Sora-Regular',fontWeight:'700',color:'white',fontSize:17}}>
                        Monitoring Status
                      </Text>

                    </View>
                    <View style={{width:width*0.85,padding:15,justifyContent:'center',flexDirection:'row',alignItems:'center',height:height*0.23,zIndex:0,marginTop:height*0.06,borderRadius:25,backgroundColor:'white',
                  shadowOffset:{width:0,height:3},shadowColor:'black',elevation:4,shadowOpacity:0.38}}>
                    <Pressable 
                    onPress={()=>{
                      // props.navigation.navigate('CropRecommender')
                      setModalVisible(true)
                    }}
                    style={{height:height*0.15,width:width*0.85*0.45,justifyContent:'space-between',alignItems:'center'}}>
                      <View style={{width:width*0.15,height:width*0.15}}>
                        <Image style={{width:'100%',height:'100%'}} source={require('../constants/sprout.png')} />
                      </View>
                      <Text style={{fontFamily:'Sora-Regular',textAlign:'center',fontSize:15,color:'#3C3A3A'}}>Press for crop advisor</Text>
                    </Pressable>
                    <View style={{width:1,height:height*0.18,backgroundColor:'#E5E5E5',marginHorizontal:width*0.03}}>
                      </View>
                    <View style={{height:height*0.15,width:width*0.85*0.45,alignItems:'center',justifyContent:'space-around'}}>
                      <View style={{width:'100%',height:'30%'}}>
                        <View style={{flexDirection:'row',height:height*0.15*0.45}}>
                          <View style={{width:width*0.11,height:width*0.11}}>
                            <Image style={{width:'100%',height:'100%'}} source={require('../constants/rain.png')} />
                          </View>
                          <View style={{width:width*0.85*0.45*0.2,height:height*0.15*0.4,marginLeft:10}}>
                            <Text style={{fontFamily:'Sora-Regular',fontSize:12,color:'#635F5F'}}>Rain</Text>
                            <Text style={{fontFamily:'Sora-Regular',fontSize:13,marginTop:height*0.15*0.4*0.05,color:'#635F5F'}}>
                              {rain >= 0 ? rain : '--'} %
                            </Text>
                          </View>
                        </View>
                        </View>
                        <View style={{width:'100%',height:'30%'}}>
                        <View style={{flexDirection:'row',height:height*0.15*0.45,}}>
                          <View style={{alignItems:'center'}}>
                            <View style={{width:width*0.11,height:width*0.11,alignItems:'center',paddingBottom:5}}>
                              <Image style={{width:'100%',height:'100%'}} source={require('../constants/sun.png')} />
                            </View>
                            <Text style={{fontFamily:'Sora-Regular',fontSize:12,color:'#635F5F',paddingBottom:10}}>
                              {temp >=0 || temp <0 ? temp : '--'} °C
                            </Text>
                          </View>
                          <View style={{alignItems:'center',marginLeft:width*.08}}>
                            <View style={{width:width*0.11,height:width*0.11}}>
                              <Image style={{width:'100%',height:'100%'}} source={require('../constants/wind.png')} />
                            </View>
                            <Text style={{fontFamily:'Sora-Regular',fontSize:12,color:'#635F5F',paddingBottom:10}}>
                                {wind >=0 || wind<0 ? wind : '--'} mph
                              </Text>
                          </View>
                        </View>                          
                        </View>
                    </View>

                  </View>
                  </ImageBackground>
                  
                </View>
                
                <View style={{
                  width:width,
                  zIndex:0,
                  height:height*.75,
                  backgroundColor:'#FCFCFC',
                  paddingHorizontal:15,
                  borderTopLeftRadius:25,
                  borderTopRightRadius:25}}>
                    <View style={{marginTop:height*0.11}}>
                      <Text style={{fontFamily:'Sora-Bold',marginBottom:25,marginTop:10,textAlign:'left',fontSize:18,color:'#544F4F'}}>
                        Detect Disease
                      </Text>
                      <Text style={{fontFamily:'Sora-Regular',fontSize:14,color:'#615E5E'}}>Plants</Text>
                      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
                      <Pressable 
                        onPress={()=>props.navigation.navigate('PreDetectScreen',{name:'wheat',data:data})}
                        style={{width:width*0.28,height:width*0.25*(135/110),shadowOffset:{width:0,height:3},
                        backgroundColor:'white',borderRadius:15,justifyContent:'space-around',alignItems:'center',
                        shadowColor:'black',elevation:4,shadowOpacity:0.38}}>
                          <View style={{width:width*0.14,height:width*0.14}}>
                              <Image style={{width:'100%',height:'100%'}} source={require('../constants/wheat.png')} />
                            </View>
                            <Text style={{fontFamily:'Sora-Regular',fontSize:12,color:'#635F5F'}}>Wheat</Text>
                          </Pressable>
                          <Pressable 
                          onPress={()=>props.navigation.navigate('PreDetectScreen',{name:'rice',data:data})}
                          style={{width:width*0.28,height:width*0.25*(135/110),shadowOffset:{width:0,height:3},
                        backgroundColor:'white',borderRadius:15,justifyContent:'space-around',alignItems:'center',
                        shadowColor:'black',elevation:4,shadowOpacity:0.38}}>
                          <View style={{width:width*0.14,height:width*0.14}}>
                              <Image style={{width:'100%',height:'100%'}} source={require('../constants/rice.png')} />
                            </View>
                            <Text style={{fontFamily:'Sora-Regular',fontSize:12,color:'#635F5F'}}>Rice</Text>
                          </Pressable>
                          <Pressable 
                          onPress={()=>props.navigation.navigate('PreDetectScreen',{name:'corn',data:data})}
                          style={{width:width*0.28,height:width*0.25*(135/110),shadowOffset:{width:0,height:3},
                        backgroundColor:'white',borderRadius:15,justifyContent:'space-around',alignItems:'center',
                        shadowColor:'black',elevation:4,shadowOpacity:0.38}}>
                          <View style={{width:width*0.14,height:width*0.14}}>
                              <Image style={{width:'100%',height:'100%'}} source={require('../constants/corn.png')} />
                            </View>
                            <Text style={{fontFamily:'Sora-Regular',fontSize:12,color:'#635F5F'}}>Corn</Text>
                          </Pressable>
                      </View>
                      
                      <Text style={{fontFamily:'Sora-Regular',fontSize:14,marginTop:15,color:'#615E5E'}}>Leaves {'&'} Fruits</Text>
                      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
                        <Pressable 
                        onPress={()=>props.navigation.navigate('PreDetectScreen',{name:'leaf',data:data})}
                        style={{width:width*0.28,height:width*0.25*(135/110),shadowOffset:{width:0,height:3},
                        backgroundColor:'white',borderRadius:15,justifyContent:'space-around',alignItems:'center',
                        shadowColor:'black',elevation:4,shadowOpacity:0.38}}>
                          <View style={{width:width*0.14,height:width*0.14}}>
                              <Image style={{width:'100%',height:'100%'}} source={require('../constants/leaf.png')} />
                            </View>
                            <Text style={{fontFamily:'Sora-Regular',fontSize:12,color:'#635F5F'}}>Leafes</Text>
                          </Pressable>
                          <Pressable 
                          onPress={()=>props.navigation.navigate('PreDetectScreen',{name:'fruit',data:data})}
                          style={{width:width*0.28,height:width*0.25*(135/110),shadowOffset:{width:0,height:3},
                        backgroundColor:'white',borderRadius:15,justifyContent:'space-around',alignItems:'center',
                        shadowColor:'black',elevation:4,shadowOpacity:0.38}}>
                          <View style={{width:width*0.14,height:width*0.14}}>
                              <Image style={{width:'100%',height:'100%'}} source={require('../constants/fruit.png')} />
                            </View>
                            <Text style={{fontFamily:'Sora-Regular',fontSize:12,color:'#635F5F'}}>Fruits</Text>
                          </Pressable>
                          <Pressable 
                          onPress={()=>props.navigation.navigate('PreDetectScreen',{name:'cotton',data:data})}
                          style={{width:width*0.28,height:width*0.25*(135/110),shadowOffset:{width:0,height:3},
                        backgroundColor:'white',borderRadius:15,justifyContent:'space-around',alignItems:'center',
                        shadowColor:'black',elevation:4,shadowOpacity:0.38}}>
                          <View style={{width:width*0.14,height:width*0.14}}>
                              <Image style={{width:'100%',height:'100%'}} source={require('../constants/cotton.png')} />
                            </View>
                            <Text style={{fontFamily:'Sora-Regular',fontSize:12,color:'#635F5F'}}>Cotton</Text>
                          </Pressable>
                          
                      </View>
                      <View style={{width:'100%',marginTop:15}}>
                        <Pressable 
                        onPress={()=>props.navigation.navigate('PreDetectScreen',{name:'okra',data:data})}
                        style={{width:'100%',height:width*0.2*(135/110),shadowOffset:{width:0,height:3},
                        backgroundColor:'white',borderRadius:15,justifyContent:'space-around',alignItems:'center',
                        shadowColor:'black',elevation:4,shadowOpacity:0.38}}>
                          <View style={{width:width*0.14,height:width*0.14}}>
                              <Image style={{width:'100%',height:'100%'}} source={require('../constants/okra.png')} />
                            </View>
                            <Text style={{fontFamily:'Sora-Regular',fontSize:14,color:'#635F5F'}}>Okra Leafes</Text>
                          </Pressable>
                          </View>
                    </View>                  
                </View>
              </ScrollView>

              <WeatherModal 
              setWind={setWind} 
              setTemp={setTemp} 
              setRain={setRain}
              setData={setData} 
              {...props} />

              <SlidingModal 
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              setSoil={setSoil}
              soil={soil}
              setSoilModalVisible={setSoilModalVisible}
              setSoilFormModalVisible={setSoilFormModalVisible}
              weatherData={data}
              {...props}   /> 

              <SoilModalComponent
              soilModalVisible={soilModalVisible}
              setSoilModalVisible={setSoilModalVisible}
              setModalVisible={setModalVisible}
              data={data}
              {...props} /> 

              <SoilFormComponentModal
              setSoilFetchingModalVisible ={setSoilFetchingModalVisible}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              soilFormModalVisible={soilFormModalVisible}
              setSoilFormModalVisible={setSoilFormModalVisible}
              setSoil={setSoil}
              soil={soil}
              setSoilModalVisible={setSoilModalVisible}
              weatherData={data}
              {...props} />  

              <SoilFetchingModal 
              soilFetchingModalVisible={soilFetchingModalVisible}/>

            </SafeAreaView>)
                

}

export default React.memo(Dashboard);
import React from 'react';

import { Image, Platform, View, Text } from 'react-native';
import Colors  from '../constants/Colors';

import { theme } from '../Auth_Core/theme';
import { useSelector } from 'react-redux';



const Drawer = props => {
    const user = useSelector(state=>state.auths)
    console.log('USER',user)
    return  <View style={{width:'100%',height:'40%',backgroundColor:Colors.primary,justifyContent:'flex-start',padding:8}}>
                <View style={{width:50,
                height:50,
                borderRadius:50,
                marginVertical:15,
                backgroundColor:'white',
                justifyContent:'center',
                shadowColor:'black',
                shadowOffset:{width:10,height:10},
                shadowRadius:10,
                elevation:5,
                alignItems:'center'}}>
                <Text style={{fontFamily:'Sora-SemiBold',fontSize:28,color:'#8CC63E'}}>{user.email.substring(0,1)}</Text>
                </View>
                <View style={{flexDirection:'row',width:'90%',justifyContent:'flex-start',alignItems:'center'}}>
                    <Text style={{fontFamily:'Sora-SemiBold',fontSize:15,color:'white'}}> Name - 
                        <Text numberOfLines={1} style={{fontFamily:'Sora-Regular',letterSpacing:1,fontSize:15,color:'white'}}>
                            {" "+user.name.toUpperCase()}
                         </Text> 
                    </Text>
                
                </View>
            </View>
};

export default Drawer
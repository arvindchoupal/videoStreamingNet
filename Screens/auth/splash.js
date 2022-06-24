import React,{useEffect} from 'react'
import {Text,View,Image,Dimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height,width} = Dimensions.get('screen')


export const Splash = ({navigation})=>{
    
    const gettoken = async () => {
        try {
          const token = await AsyncStorage.getItem('token')
          if(token !== null) {
   
            navigation.navigate('homeScreens',{
                token
            }
            )
           
          }
          else {
            navigation.navigate('signupScreens')
          }
        } catch(e) {
          
         console.log(e)
        }
      }

      useEffect(()=>{
          gettoken()
      })
    return(
        <View style={{height,width,justifyContent:'center',alignItems:'center'}} >
            <Image source={require('../../Images/logo.png')} style={{height:80,width:80}}/>
        </View>
    )
}
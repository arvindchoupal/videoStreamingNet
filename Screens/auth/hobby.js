
import React,{useState} from 'react'
import {Dimensions, Text, View, StyleSheet, Image, ImageBackground, StatusBar, Pressable } from 'react-native'

import { Art,Career,Dance,Music, Sports } from './singing';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const {height,width} =Dimensions.get('screen')


function MyTabs({data}) {
 

  return (
    <Tab.Navigator  screenOptions={{ tabBarActiveTintColor:'red', tabBarItemStyle:{ width:width*.25,}, tabBarScrollEnabled:true,  tabBarLabelStyle:{color:'white'},tabBarContentContainerStyle:{backgroundColor:'black'}
    }}>
      <Tab.Screen name="Art" component={Art} initialParams={data}
      />
      <Tab.Screen name="Music" component={Music} initialParams={data} />
      <Tab.Screen name="Dance" component={Dance} initialParams={data} />
      <Tab.Screen name="Sports" component={Sports} initialParams={data}/>
      <Tab.Screen name="Career" component={Career} initialParams={data} />
    </Tab.Navigator>
  );
}

export const Hobby = ({route})=>{
 


    return (
      <View  style={{height,width}}>
       <StatusBar  translucent ={false} backgroundColor={'black'}/>
       <View style={{backgroundColor:'black',height:height*.2,justifyContent:'center',alignItems:'center'}}>
       <Text style={{color:'white',fontSize:23,fontWeight:'700'}}>
         Select Your Hobbies
         </Text>
         <Text style={{color:'white',fontSize:13,paddingHorizontal:width*.22,textAlign:'center',paddingTop:12}}>
         Select from the hobbies below to meet peoples like you.
         </Text>
       </View>
 
       <MyTabs data = {route.params}/>
       </View>
    )
}
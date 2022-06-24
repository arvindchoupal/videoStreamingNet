import React from 'react'
import {Text,View,Dimensions,Image,Pressable,StatusBar,FlatList} from 'react-native'

const {height,width}= Dimensions.get('screen')
const server = 'https://6fc6-2409-4055-41b-d612-5ca2-e5a5-2ed2-a682.ngrok.io'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Latest from '../targetedScreens/latest';
import { Server } from './server';

const Tab = createMaterialTopTabNavigator();


function MyTabs({navigation,user}) {
    console.log(user)
    return (
      <Tab.Navigator 
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12,color:'black' },
        tabBarItemStyle: { width: width*.5 },
        tabBarStyle: { backgroundColor: '#ededeb' }}}
      >
        <Tab.Screen name="Media" component={User_Media} initialParams={{user:user}} />
        <Tab.Screen name="Reviews" component={Latest} initialParams={user= user} />
      
      </Tab.Navigator>
    )}

const User_Media = ({route})=>{
    console.log('user media')

const user = route.params.user
console.log(user)
    return(
        <View style={{width,paddingHorizontal:10}}>
        <FlatList
         data={user.hobbies}
         numColumns={3}
         renderItem={({item})=>{
            return(
                <Image source={{uri:`${server}/profile/${user.profilepicture}`}} style={{height:100,width:100,borderRadius:10,margin:10}} />
            )

         }} />
    </View>
    )
}
export const User_Profile = ({route,navigation})=>{
    console.log('profile data route')
    console.log(route.params.my)
    const user = route.params.user
    const my = route.params.my
    return(
        <View style={{height,width,backgroundColor:'#ededeb'}}>
           <View style={{paddingHorizontal:width*.1,alignItems:'center',paddingTop:height*.03}}>
               <Image source={{uri:`${Server}/profile/${route.params.user.profilepicture}`}} style={{height:60,borderRadius:20,width:55}}/>
            <Text style={{fontSize:15,fontWeight:'700',paddingTop:5}}>
                {user.name}
            </Text>


             <Text style={{fontSize:14}}>
               Intersted in {user.hobbies.map((item,index)=>  index + 1  == user.hobbies.length ? item : item + ', '
               )}
            </Text>
        <View style={{flexDirection:'row',justifyContent:'center',width:width*.5,paddingHorizontal:width*.5}} >
            <Pressable style={{margin:10, backgroundColor:'black',width:width*.25,height:width*.1,justifyContent:'center',alignItems:'center',paddingVertical:5,paddingHorizontal:10,borderRadius:8,marginTop:15}} onPress={()=>navigation.navigate('chat',{user:user,"my":my})}>
                 <Text style={{color:'white'}}>
                     Message
                 </Text>
            </Pressable>

            <Pressable style={{margin:10,backgroundColor:'black',width:width*.25,height:width*.1,justifyContent:'center',alignItems:'center',paddingVertical:5,paddingHorizontal:10,borderRadius:8,marginTop:15}} >
                 <Text style={{color:'white'}}>
                    Favourate
                 </Text>
            </Pressable>
         </View>
         <View style={{width,height:'100%'}} >

         <MyTabs user = {user}/>
         </View>

           </View>


          




        </View>
    )
}
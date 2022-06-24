import React, { useState ,useEffect}  from "react";
import {Text,View,Dimensions,BackHandler, FlatList,Pressable,ImageBackground} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Media from "./media";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Latest from "./latest";
const {height,width}= Dimensions.get('window')
import { StatusBar } from "expo-status-bar";
import Top from "../homeScreens/home";
import { Server } from "../homeScreens/server";
const Tab = createMaterialTopTabNavigator();
const server = 'https://6fc6-2409-4055-41b-d612-5ca2-e5a5-2ed2-a682.ngrok.io'
function MyTabs({navigation,targetedhobby}) {
 
  return (
    <Tab.Navigator 
    screenOptions={{
      tabBarLabelStyle: { fontSize: 12,color:'white' },
      tabBarItemStyle: { width: width*.33 },
      tabBarStyle: { backgroundColor: 'black' }}}
    >
      <Tab.Screen name="top" component={Targetedhoby} initialParams={{"targetedhobby":targetedhobby}}/>
      <Tab.Screen name="latest" component={Latest} />
      {/* <Tab.Screen name="media" component={Media} /> */}
    </Tab.Navigator>
  )}

const Targetedhoby = ({navigation,route})=>{
  const hobby = route.params.hobby
  const users = route.params.users
  const my = route.params.my


  return (
    <View style={{flex:1,height:height,width:width}}>
      <View>
      <FlatList
        
            data={ users.filter((item) => {
              
             return  item.hobbies.includes(hobby)
            })}
           
            contentContainerStyle={{flexGrow:1, justifyContent: "flex-start"}}
            renderItem={({item,inde})=>{
              let status = item.status
             
              
              console.log(item)
              
              return(
            

                <View style={{flexDirection:'column'}}>
                <View style={{flexDirection:'row',backgroundColor:'grey'}}>
                
                <View style={{backgroundColor:'black',height:width*.32,width:width*.32,margin:2}}>
                  {/* <Pressable onPress={()=>{navigation.navigate('targetedhoby',{"selectedhobby":thobby,"users":finalArray}
                

              )}} > */}

              <Pressable onPress={()=>{
                navigation.navigate('userprofile',{"user":item,'my':my})
              }}>
                  <ImageBackground source={{uri:`${Server}/profile/${item.profilepicture}`}} style={{height:width*.32,justifyContent:"flex-end",width:width*.32,padding:5}}> 
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                 <View style={{flexDirection:'row',alignItems:"center"}}>
                    <View style={{height:height*.01,width:height*.01,backgroundColor: status === "active"? "green":"red",borderRadius:5,margin:5}} />
                    <Text style={{color:'white'}}>{item.name}</Text>
                    </View>
                    <Text style={{color:'white', fontSize:10}}>{item.distance}Km</Text></View>
                  </ImageBackground>
                  </Pressable>
                  </View>
                </View> 
                </View>
               



              )}}
              keyExtractor={inde=>inde._id}
             numColumns={3}
              
              />
              </View>
    </View>
  )              

}
    

const T_tab =({route,navigation})=>{
 

  
  const [screen,setscreen] = useState("grey")
  const targetedhobby = route.params.selectedhobby
  const users = route.params.users
  const my = route.params.my
  

  useEffect(() => {
    const backAction = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
          }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  
  
  return (
    <View>
    <View style={{backgroundColor:'black', width:width,height:height*.1,alignItems:'center',flexDirection:'row'}} >
    <Text style={{color:'white',marginTop:25,fontWeight:'bold',fontSize:15,marginLeft:25}}>Hobbizo</Text>
   </View>
   <View style={{height,width:width}}>
   <Tab.Navigator 
    screenOptions={{
      tabBarLabelStyle: { fontSize: 12,color:'white' },
      tabBarItemStyle: { width: width*.33 },
      tabBarStyle: { backgroundColor: 'black' }}}
    >
      <Tab.Screen name="top" component={Targetedhoby} initialParams={{"users":users,"hobby":targetedhobby,"my":my}}/>
      <Tab.Screen name="latest" component={Latest} initialParams={{"users":users,"hobby":targetedhobby,"my":my}} />
      <Tab.Screen name="media" component={Media} initialParams={{"users":users,"hobby":targetedhobby,"my":my}} />
    </Tab.Navigator>
   </View>
   </View>
   
   
  )
}
export default T_tab;
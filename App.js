import React from 'react'
import {Text,View,ImageBackground,FlatList,Dimensions} from  'react-native'
import Signup from './Screens/auth/signup'
import Name from './Screens/auth/name'
import Age from './Screens/auth/age'
import store from './src/app/store'
import Start from './Screens/auth/Start'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import Counter from './src/features/counter/Counter'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Hobby } from './Screens/auth/hobby'
import { Profilepic } from './Screens/auth/profilepic'
import Home from './Screens/homeScreens/home'
import { Splash } from './Screens/auth/splash'
import T_tab from './Screens/targetedScreens/targetedhobbies'
import { Profile } from './Screens/homeScreens/myprofile'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons  from 'react-native-vector-icons/Ionicons'
import Fontisto  from 'react-native-vector-icons/Fontisto'
import { ModalPortal } from 'react-native-modals';
import { User_Profile } from './Screens/homeScreens/userprofile'
import Blood from './Screens/homeScreens/blood'
import  Chat  from './Screens/homeScreens/chat'
import Messages from './Screens/homeScreens/meesages'

const BottomTab = createMaterialBottomTabNavigator();

function MybottomTabs() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Blood" component={Blood} />
    </BottomTab.Navigator>
  );
}
const {height,width} = Dimensions.get('screen') 

const Stack = createNativeStackNavigator();
const Homes = createNativeStackNavigator();

function Authcheck (){
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false,
    }}>
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="homeScreens" component={Homestack} />
      <Stack.Screen name="signupScreens" component={Signupstack} />
    
</Stack.Navigator>
  )
  
}


function Signupstack (){
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false,
    }}>
      <Stack.Screen name="start" component={Start} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="name" component={Name} />
      <Stack.Screen name="age" component={Age} />
      <Stack.Screen name="hobby" component={Hobby} />
      <Stack.Screen name="homeScreens" component={Homestack} />
      
      <Stack.Screen name="profilepic" component={Profilepic} />
</Stack.Navigator>
  )
  
}


const HomeNavigation = createNativeStackNavigator();


function HomeNav ({route}){
  console.log(route.params)
  return (
    <HomeNavigation.Navigator screenOptions={{
      headerShown:false,
    }}>
      <HomeNavigation.Screen name="home" component={Home} initialParams={{
        token:route.params.token
      }

      }/>
      <HomeNavigation.Screen name="targetedhobby" component={T_tab} />
      <HomeNavigation.Screen name="userprofile" component={User_Profile} />
      <HomeNavigation.Screen name="chat" component={Chat} />
</HomeNavigation.Navigator>
  )
  
}

function Homestack ({route}){
  
console.log('homestack')
  return (
    <BottomTab.Navigator 
     screenOptions={{
      headerShown:false, }}
      activeColor="white"
      inactiveColor="grey"
      
      barStyle={{ backgroundColor: 'black',paddingBottom:10 }}>
    <BottomTab.Screen 
    options= {{
      tabBarLabel: 'Home',
      tabBarIcon: ({ color }) => (
        <Ionicons name="home" color={color} size={26} />
      ),
    }}
    
    name="homenav" component={HomeNav} initialParams={
      {
        token:route.params.token
      }
    
    } />

 <BottomTab.Screen 
 options={{
  tabBarLabel: 'Profile',
  tabBarIcon: ({ color }) => (
    <Ionicons name="md-person" color={color} size={26} />
  ),
}}


name="myprofile" component={Profile} 


initialParams={
      {
        token:route.params.token
      }
    }
    
    
    />


    

<BottomTab.Screen name="blood" component={Blood} 
 options={{
  tabBarLabel: 'Blood',
  tabBarIcon: ({ color }) => (
    <Fontisto name="blood-drop" color={color} size={26} />
  ),
}}

initialParams={
      {
        token:route.params.token
      }
    } />

<BottomTab.Screen name="messages" component={Messages} 
 options={{
  tabBarLabel: 'Messages',
  tabBarIcon: ({ color }) => (
    <Ionicons name="ios-chatbox" color={color} size={26} />
  ),
}}

initialParams={
      {
        token:route.params.token
      }
    } />
    
</BottomTab.Navigator>
  )
  
}

const App = ()=>{

return (
  <Provider store={store}>
     <NavigationContainer>
   <Authcheck/>
   <ModalPortal />
    </NavigationContainer>
  </Provider>
)
}

export default App
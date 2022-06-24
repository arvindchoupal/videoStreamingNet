import React, { useState, useEffect ,useRef} from "react";
import {  Alert, FlatList,BackHandler, Text,TouchableOpacity,StatusBar, Image,Button,View,Dimensions,AppState,StyleSheet,SafeAreaView, ImageBackground, Pressable,ScrollView } from "react-native";
import { GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';
import Geolocation from '@react-native-community/geolocation';
import messaging from '@react-native-firebase/messaging';
import Ionicons  from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from "./myprofile";
import Latest from "../targetedScreens/latest";
import {Server} from './server'
import Blood from "./blood";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
const BottomTab = createBottomTabNavigator();

function MybottomTabs() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={Home2} />
      <BottomTab.Screen name="Blood" component={Blood} />
    </BottomTab.Navigator>
  );
}




const {height,width} = Dimensions.get('screen')
const Home = ({route,navigation}) => {
console.log('home')
 
  const [long,setlong] = useState() 
  const [lat,setlat] = useState() 
 const token = route.params.token

  const [mydata,setmydata] = useState()
  const [refresh,setrefresh] = useState()
  const [users,setusers] = useState([])
  

Geolocation.getCurrentPosition((p)=>{
  setlat(p.coords.latitude)
  setlong(p.coords.longitude)
})
useEffect(() => {
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
}, []);
  const getmydata = async() => {
  console.log('get my data me gusha')
    await fetch(`${Server}/user/detail`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         token:token
         
        })
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setmydata(json)
        console.log('mydata milgya api se')
       
      }
      
      )
      .catch((error) => {
        console.error(error);
      });
  };



  const getusers2 = async () => {
    
console.log('enter in get users')
   await fetch(`${Server}/users/list`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user": "send users"
       
      })
    })
    .then((response) => response.json())
      .then((data) => setusers(data)

    
    
     
    )
      .catch(err => console.error(err));
      
}

useEffect(()=>{
  console.log('use effect real')
  getmydata()
  getusers2()
},[refresh])
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
 
  var R = 6371; // radius of earth
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  
  return d.toFixed(1);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}



var finalArray = [];

for (var i = 0; i < users.length; i++) {

  if(mydata){if (users[i].name != mydata.name) {


    const value = getDistanceFromLatLonInKm(
      
      lat,long,
      users[i].latitude,
      users[i].longitude
    );
   
    finalArray.push({
 
     "name":users[i].name,
     "profilepicture": users[i].profilepic,
     "distance":value,
     "hobbies":users[i].hobbies,
     "_id":users[i]._id,
     "token":users[i].token
    });

  }}

}

  return (
    
   <View style={{height,width,backgroundColor:'#171716'}}>
    
     <StatusBar backgroundColor={'#2b2b2a'} />
    
    {console.log('render me gusaa ')}
       {mydata ? 

       <View style={{height,width,justifyContent:'space-between'}}>
       { console.log(mydata)}
        <View>
        
        <View style={{height:height*.1, flexDirection:'row',width,backgroundColor:'#2b2b2a',alignItems:'center',padding:20,elevation:5,zIndex:5,shadowColor:'grey',shadowOpacity:5,shadowOffset:{height:2,width:3}}}>
           <Pressable onPress={()=>navigation.navigate('myprofile')} >
           
           <Image source={ mydata.profilepic.includes('https')? {uri:mydata.profilepic}:{uri: `${Server}/profile/${mydata.profilepic}`}} style={{height:30,width:30,borderRadius:30}} />
           
           </Pressable>
           
           <Text style={{color:'white',fontSize:16,paddingLeft:10,fontWeight:'800'}}>
              Hobbizo
           </Text>

       </View>
        
       <ScrollView>
      <FlatList
        data={mydata.hobbies}
        renderItem={({ item}) => {
         const thobby = item
               
           
          return <View >

            <View style={{width:width,flexDirection:'row',backgroundColor:'#171716',height:height*.05,alignItems:'center',padding:5}}>
            <Text style={{color:'white'}}> Hobies - 
              {item} </Text>

            </View>

            <View style={{width:width,alignItems:'flex-start'}}>

           
          
            <FlatList
            horizontal
            data={ finalArray.filter((user)=> user.hobbies.includes(item))
           }
           
            contentContainerStyle={{flexGrow:1, justifyContent: "flex-start"}}
            renderItem={({item})=>{
              let status = item.status 
            
               
              return(
            

                <View style={{flexDirection:'column',flexWrap:'wrap-reverse'}}>
                  <View style={{flexDirection:'row',backgroundColor:'black',margin:2}}>
                  
                  <View style={{height:width*.32,width:width*.32}}>
                 <Pressable onPress={()=>{navigation.navigate('targetedhobby',{
                   "my": mydata,
                   "selectedhobby":thobby,
                   "users":finalArray,
                  }
                )}} >
                    <ImageBackground source={ {uri:`${Server}/profile/${item.profilepicture}`}} style={{height:width*.32,justifyContent:"flex-end",width:width*.32,padding:5}}> 
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
              keyExtractor={item=>item._id}
             
              
              />
              </View>
            </View>
        }
      }
      keyExtractor={item=> item._id}
      />
       </ScrollView>

       </View>
       
    
      
     
        </View>
          
       : null }
      
     
    
   </View>
 
  )
}
export default Home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "white",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
    padding: 10,
  },
  textWelcome: {
    fontSize: 18,
    backgroundColor: "#095b93",
    padding: 10,
    color: "white",
  },
  grid: {
    //   display: 'grid',
    //   gridTemplateColumns: "repeat(3, minmax(0, 1fr))"
  },
  input: {
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#dbdbdb",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 15,
    paddingBottom: 12,
    color: "#546c64",
    borderRadius: 30,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
  itemContainer: {
    // width: size,
    // height: size,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: "lightblue",
  },
  button2: {
    marginTop: 15,
    marginBottom: 10,
    width: 150,
    borderRadius: 999,
    marginLeft: "auto",
    marginRight: "auto",
  },
});




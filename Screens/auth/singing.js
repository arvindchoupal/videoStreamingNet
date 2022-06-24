
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import React,{useState,useEffect} from 'react'
import {Dimensions, FlatList, KeyboardAvoidingView ,TextInput, Alert,Text, View, StyleSheet,  Image, ImageBackground, StatusBar, Pressable } from 'react-native'
import {Server} from '../homeScreens/server'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
const mynewhobbies = []
const {height,width} = Dimensions.get('window')



const Next = (user)=>{
  navigation = useNavigation()
navigation.navigate
}

const Art = ({route})=>{
  const [data,setdata] = useState()
const navigation = useNavigation()

  
  const[ clickitem,setclickitem] = useState([])
  const [refresh,setrefresh] =useState(false)

  const Art = [{name:'Painting'},{name:'Theater'},{name:'Crafting'},{name:'Pottery'},{name:'Gardening'},{name:'Fashion'},{name:'Makeup'}]
 const user = route.params.user

 useEffect(()=>{
  
  console.log('its google user')
  setdata({
   'user': {...user,'hobbies':mynewhobbies}
   
})


},[refresh])

 
    return (
      <View style={{width ,flex:1,height,justifyContent:'center',paddingVertical:height*.1,paddingHorizontal:width*.1
    }}>

<FlatList
   data={Art}
   numColumns={4}
  
   renderItem={({item})=>{

      
       return(
        <Pressable onPress={()=>{
            setrefresh(!refresh)
             
            if (mynewhobbies.includes(item.name)){
                mynewhobbies.splice(mynewhobbies.indexOf(item.name), 1);
            
              }
            else { mynewhobbies.push(item.name)
          }
           
        }
             
        } style={{margin:5,padding:5,borderRadius:7,backgroundColor: mynewhobbies.includes(item.name) ? 'green' : 'white'}} >
          
              
        
               <Text style={{color: mynewhobbies.includes(item.name) ? 'white':'grey'}}>
           {item.name}
               </Text>
              
       
               </Pressable>
       )
   }}

   extraData={refresh}
      
   />
   {data ?<Pressable onPress={()=>{
    navigation.navigate('profilepic',{data})}} style={{backgroundColor:'black' , width:width*.8,alignItems:'center',padding:5,borderRadius:15}} >
<Text style={{color:'white',fontSize:17}}>
  Next
</Text>
</Pressable>: null }

      </View>
    )
}


const Music = ({route})=>{
  const [data,setdata] = useState()
const navigation = useNavigation()

  const[ clickitem,setclickitem] = useState([])
  const [refresh,setrefresh] =useState(false)
 
  const Music = [{name:'Poetry'},{name:'jazz'},{name:'opera'},{name:'Vocal Carnatic'},{name:'Musical Instrur'},{name:'Vocal Hindustani Classical'}]
  const user = route.params.user

  useEffect(()=>{
  
    console.log('its google user')
    setdata({
     'user': {...user,'hobbies':mynewhobbies}
     
  })
  
 
 },[refresh])
 
    return (
      <View style={{width ,flex:1,height,justifyContent:'center',paddingVertical:height*.1,paddingHorizontal:width*.1
    }}>

<FlatList
   data={Music}
   numColumns={4}
  
   renderItem={({item})=>{
   
      
       return(
        <Pressable onPress={()=>{
            setrefresh(!refresh)
             
            if (mynewhobbies.includes(item.name)){
                mynewhobbies.splice(mynewhobbies.indexOf(item.name), 1);
              
              }
            else { mynewhobbies.push(item.name)
          }
           
        }
             
        } style={{margin:5,padding:5,borderRadius:7,backgroundColor: mynewhobbies.includes(item.name) ? 'green' : 'white'}} >
          
              
        
               <Text style={{color: mynewhobbies.includes(item.name) ? 'white':'grey'}}>
           {item.name}
               </Text>
              
       
               </Pressable>
       )
   }}

   extraData={refresh}
      
   />
<Pressable onPress={()=>{navigation.navigate('profilepic',{data})}} style={{backgroundColor:'black' , width:width*.8,alignItems:'center',padding:5,borderRadius:15}} >
<Text style={{color:'white',fontSize:17}}>
  Next
</Text>
</Pressable>
      </View>
    )
}


const Dance = ({route})=>{
const navigation = useNavigation()
const [data,setdata] = useState()
  
  const[ clickitem,setclickitem] = useState([])
  const [refresh,setrefresh] =useState(false)
  
  const Dance = [{name:'Kathak'},{name:'Hiphop'},{name:'Jumba'},{name:'Bharat Natyam'},{name:'Kathakali'},{name:'Manipuri'},{name:'Jazz'},{name:'Indian Bollywood'},{name:'Odissi'}]
  const user = route.params.user

  useEffect(()=>{
  
    console.log('its google user')
    setdata({
     'user': {...user,'hobbies':mynewhobbies}
     
  })
  
 
 },[refresh])

 
    return (
      <View style={{width ,flex:1,height,justifyContent:'center',paddingVertical:height*.1,paddingHorizontal:width*.1
    }}>

<FlatList
   data={Dance}
   numColumns={4}
  
   renderItem={({item})=>{
 
      
       return(
        <Pressable onPress={()=>{
            setrefresh(!refresh)
             
            if (mynewhobbies.includes(item.name)){
                mynewhobbies.splice(mynewhobbies.indexOf(item.name), 1);
              
              }
            else { mynewhobbies.push(item.name)
          }
           
        }
             
        } style={{margin:5,padding:5,borderRadius:7,backgroundColor: mynewhobbies.includes(item.name) ? 'green' : 'white'}} >
          
              
        
               <Text style={{color: mynewhobbies.includes(item.name) ? 'white':'grey'}}>
           {item.name}
               </Text>
              
       
               </Pressable>
       )
   }}

   extraData={refresh}
      
   />
<Pressable onPress={()=>{navigation.navigate('profilepic',{data})}} style={{backgroundColor:'black' , width:width*.8,alignItems:'center',padding:5,borderRadius:15}} >
<Text style={{color:'white',fontSize:17}}>
  Next
</Text>
</Pressable>
      </View>
    )
}


const Sports = ({route})=>{
const navigation = useNavigation()
const [data,setdata] = useState()

  const[ clickitem,setclickitem] = useState([])
  const [refresh,setrefresh] =useState(false)
 
  const Sports = [{name:'Cricket'},{name:'Gym'},{name:'Football'},{name:'Cycling'},{name:'Sketting'},{name:'Bedminton'},{name:'Tennis'},{name:'Archery'},{name:'Video games'}]
 
  const user = route.params.user

  useEffect(()=>{
  
     console.log('its google user')
     setdata({
      'user': {...user,'hobbies':mynewhobbies}
      
   })
   
  
  },[refresh])

 
    return (
      <View style={{width ,flex:1,height,justifyContent:'center',paddingVertical:height*.1,paddingHorizontal:width*.1
    }}>

<FlatList
   data={Sports}
   numColumns={4}
  
   renderItem={({item})=>{
 
      
       return(
        <Pressable onPress={()=>{
            setrefresh(!refresh)
             
            if (mynewhobbies.includes(item.name)){
                mynewhobbies.splice(mynewhobbies.indexOf(item.name), 1);
              
              }
            else { mynewhobbies.push(item.name)
          }
           
        }
             
        } style={{margin:5,padding:5,borderRadius:7,backgroundColor: mynewhobbies.includes(item.name) ? 'green' : 'white'}} >
          
              
        
               <Text style={{color: mynewhobbies.includes(item.name) ? 'white':'grey'}}>
           {item.name}
               </Text>
              
       
               </Pressable>
       )
   }}

   extraData={refresh}
      
   />
<Pressable onPress={()=>{navigation.navigate('profilepic',{data})}} style={{backgroundColor:'black' , width:width*.8,alignItems:'center',padding:5,borderRadius:15}} >
<Text style={{color:'white',fontSize:17}}>
  Next
</Text>
</Pressable>
      </View>
    )
}
const Career = ({route})=>{
  const navigation = useNavigation()
  const [data,setdata] = useState()
  const[ clickitem,setclickitem] = useState([])
  const [refresh,setrefresh] =useState(false)

  const Career = [{name:'Computer programming'},{name:'Accounts'},{name:'Arts'},{name:'Artificial inteligence'},{name:'Graphic design'},{name:'Big data'},{name:'Data science'}]
   
 
  const user = route.params.user

  useEffect(()=>{
  
    console.log('its google user')
    setdata({
     'user': {...user,'hobbies':mynewhobbies}
     
  })
  
 
 },[refresh])
 
    return (
      <View style={{width ,flex:1,height,justifyContent:'center',paddingVertical:height*.1,paddingHorizontal:width*.1
    }}>

<FlatList
   data={Career}
   numColumns={4}
  
   renderItem={({item})=>{
 
      
       return(
        <Pressable onPress={()=>{
            setrefresh(!refresh)
             
            if (mynewhobbies.includes(item.name)){
                mynewhobbies.splice(mynewhobbies.indexOf(item.name), 1);
            
              }
            else { mynewhobbies.push(item.name)
          }
           
        }
             
        } style={{margin:5,padding:5,borderRadius:7,backgroundColor: mynewhobbies.includes(item.name) ? 'green' : 'white'}} >
          
              
        
               <Text style={{color: mynewhobbies.includes(item.name) ? 'white':'grey'}}>
           {item.name}
               </Text>
              
       
               </Pressable>
       )
   }}

   extraData={refresh}
      
   />
<Pressable onPress={()=>{navigation.navigate('profilepic',{data})}} style={{backgroundColor:'black' , width:width*.8,alignItems:'center',padding:5,borderRadius:15}} >
<Text style={{color:'white',fontSize:17}}>
  Next
</Text>
</Pressable>
      </View>
    )
}


export {Art,Music,Sports,Dance,Career}
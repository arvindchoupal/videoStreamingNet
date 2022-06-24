import React,{useRef,useState} from 'react'
import {Text,TouchableOpacity,Pressable, View,ImageBackground,FlatList,Dimensions,Image,StatusBar} from  'react-native'
import CoursellImage  from '../../components/coursellImage'
import logo from '../../Images/logo.png'
const {height,width} = Dimensions.get('screen') 



const Start = ({navigation})=>{
  

  
return (
<View style={{height:height,width:width,backgroundColor:'black'}}>
<StatusBar  translucent ={true} backgroundColor={'transparent'}/>

<View style={{paddingHorizontal:10,paddingTop:15, flexDirection:'row' ,justifyContent:'space-between',backgroundColor:'transparent',position:'absolute',zIndex:5,top:0,right:0,left:0,marginTop:StatusBar.currentHeight}}>
        <View>
          <Image source={require('../../Images/logo.png')} style={{height:40,width:35}} />
        </View>
        
         
        <View style={{flexDirection:'row',backgroundColor:'transparent'}}> 
         <Text style={{color:'white',fontWeight:'bold',margin:7,paddingRight:5}}>
       PRIVACY
         </Text>
          <Text style={{color:'white',fontWeight:'bold',margin:7,paddingRight:15}}>
           SIGN IN
         </Text>
        </View>
   
   
    </View>
 <CoursellImage/>
 
 
  <View style={{width,alignItems:'center'}}>
    <TouchableOpacity style={{backgroundColor:'#ff2a00',width:width*.8,height:height*0.05,justifyContent:'center',alignItems:'center'}} onPress={()=>{
  navigation.navigate('signup')
    }} >
      <Text style={{color:'white',fontSize:14}}>
        GET STARTED
       </Text>
    </TouchableOpacity>
  </View>


  </View>


)
}

export default Start
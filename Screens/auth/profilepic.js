import { NavigationContainer } from '@react-navigation/native';
import React,{useEffect, useState} from 'react'
import {Text,View,Dimensions,Button,Pressable,Image,StatusBar, TextInput, TouchableOpacity,Alert} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation } from '@react-navigation/native'
import Geolocation from '@react-native-community/geolocation';
import {Server} from '../homeScreens/server'
import { Colors } from '../../Images/colors';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import { Modal, ModalContent,SlideAnimation} from 'react-native-modals';
const {height,width} = Dimensions.get('window')






export const Profilepic = ({route})=>{


  const [model_visible,setmodel_visibl] =useState(false)
  const [long,setlong] = useState() 
  const [gender,setGender] = useState('male')
  const [lat,setlat] = useState() 
  const [image,setimage] = useState()
  const navigation = useNavigation()
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [selectedblood, setSelectedblood] = useState('A+')
    const user = route.params.data.user
  console.log(user)
 
    const [pic,setpic] = useState()
    const [imsasset,setassest] = useState()
    const [disable,setdisable] =useState(true)
    Geolocation.getCurrentPosition( (s) =>{
      
           setlat(s.coords.latitude)
           setlong(s.coords.longitude)
    })
    const home = async () => {
   
      const token = user.id

      try {
          await AsyncStorage.setItem('token', String(token))
          console.log('token saved')
        } catch (e) {
          console.log('token error')
          console.log(e)
        }
    
    const formdata = new FormData()
   if(pic) {
    formdata.append('profile', {
    
        uri: imsasset.assets[0].uri,
        type: imsasset.assets[0].type,
        name: imsasset.assets[0].fileName
      
    })}else{
      formdata.append('profilepic',user.photo)
    }
    formdata.append('name',user.name)
    formdata.append('birthdate',date.toUTCString())
    formdata.append('token',user.id)
    formdata.append('gender',gender)
    formdata.append('blood',selectedblood)
    formdata.append('longitude',long)
    formdata.append('latitude',lat)
    user.hobbies.forEach((item) => {
      
      formdata.append('hobbies',item)
   })

    let resP = await fetch(`${Server}/user/signup`,
     
      {
        method: 'post',
        body: formdata,
        headers: {
         
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    let respjson = await resP.json();

  
    
 navigation.navigate('homeScreens',{
   token : user.id})
      
      };


      const Save= () =>{
        if(pic || user.photo){
          if (moment(new Date()).format('LL') != moment(date).format('LL') ) {
           home()
          } else {
            Alert.alert('Hobbizo','Select Your Birthdate')
          }
        }else{
          Alert.alert('Hobbizo','please upload photo')
        }
       
      }
 
    

    const camera = async()=>{
        const result = await launchCamera()
  
        const r = result.assets
      
        const imguri = r[0].uri
        setassest(result)
        setpic(imguri)
     setmodel_visibl(false)
        setdisable(false)
    }

    const imageLibrary = async()=>{
       const result = await launchImageLibrary()
       const r = result.assets
       const imguri = r[0].uri
       setassest(result)
 
       setmodel_visibl(false)
        setpic(imguri)
        setdisable(false)


            
    }
    return (

<View style={{flex:1}}>
  <StatusBar backgroundColor={Colors.primery} />
  <View style={{ backgroundColor:'blue', 
  flex:1,
   flexDirection:'row',
   paddingHorizontal:15,
   paddingTop:15
   }}>
    {pic ? <Image source={{uri:pic}} style={{height:40,width:40,borderRadius:100,borderWidth:2,borderColor:'white'}} /> :
    <Image source={user.photo ==null ? require('../../Images/profile_demo.jpg'):{uri:user.photo}} style={{height:40,width:40,borderRadius:100,borderWidth:2,borderColor:'white'}} /> }
   <View style={{marginLeft:15}}>
    <Text style={{fontWeight:'600',color:'white'}}>
     {user.givenName}
      </Text>

      <Text style={{color:'white'}}>
   {user.familyName}
      </Text>
   </View>

  </View>

  <View style={{alignItems:'center', backgroundColor:'white',position:'absolute',height:height*.8,borderTopLeftRadius:height*.07,borderTopRightRadius:height*.07,bottom:0,left:0,right:0}}>
      <TouchableOpacity onPress={()=>{
        setmodel_visibl(true)}}   style={{ justifyContent:'center',alignItems:'center', backgroundColor:Colors.primery,borderRadius:height*.15,height:height*.15,width:height*.15,marginTop:-60,borderWidth:4,borderColor:'white'}} >
      {pic ?<Image source={{uri:pic}}resizeMode={'cover'} style={{height:height*.14,width:height*.14,borderRadius:100}} /> : <Icon name='camera-plus' size={50} color="white" />}
       </TouchableOpacity>

       <Text style={{color:'black',fontWeight:'500',fontSize:20,marginTop:8}}>
        Upload Your Photo
       </Text>

       <View style={{width,paddingHorizontal:30,paddingTop:15}}>
  <Text style={{color:'black',marginVertical:10,fontWeight:'400'}}>
    Gender 
  </Text>
<RadioForm
  radio_props={[{label:'Male  ',value:'Male'},{label:'Female',value:'Female'}]}
  initial={0}
  buttonSize ={15}
  
  labelColor={'black'}
  formHorizontal={true}
  labelHorizontal={true}
 
  animation={true}
  onPress={(value) => {
    setGender(value)
    
    }}
/>
<View style={{marginTop:10}}>
<Text style={{color:'black',marginVertical:10,fontWeight:'400'}}>
    Birthdate
  </Text>
  <TouchableOpacity onPress={()=>{
    setOpen(true)
  }} >
    <Text>
   { moment(date).format('LL')}
    </Text>
</TouchableOpacity>
</View>

 
  <DatePicker
       modal={true}
       mode ={'date'}
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />


    <View style={{marginTop:30}}>
      <Text style={{color:'black'}}>
        Blood Group
      </Text>

      <Picker
      mode='dropdown'
  selectedValue={selectedblood}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedblood(itemValue)
  }>
  <Picker.Item label="A+" value="A+" />
  <Picker.Item label="O+" value="O+" />
  <Picker.Item label="B+" value="B+" />
  <Picker.Item label="AB+" value="AB+" />
  <Picker.Item label="A-" value="A-" />
  <Picker.Item label="O-" value="O-" />
  <Picker.Item label="B-" value="B-" />
  <Picker.Item label="AB-" value="AB-" />
</Picker>
    </View>
  </View>
  <TouchableOpacity style={{backgroundColor:Colors.primery,width:width*.7,padding:8,alignItems:'center',marginTop:height*.1}} onPress={Save
} >
  <Text style={{color:'white'}}>
    Save
  </Text>

</TouchableOpacity>
<Modal
  
  visible={model_visible}
 
  onTouchOutside={() => {setmodel_visibl(false)}}
  modalAnimation={ new SlideAnimation ({
    slideFrom: 'bottom',
   
    initialValue: 0,
   
  })}
  rounded={true}
>
  <ModalContent>
      <View style={{width:width*.6,height:height*.18,elevation:5,borderWidth:0.2,borderColor:'white',shadowColor:'grey',padding:30}}>
        
       <TouchableOpacity onPress={camera} style={{flexGrow:1,justifyContent:'center'}} >
        <Text style={{fontSize:16,color:'black'}}>Open Camera</Text>
       </TouchableOpacity>
     
       <TouchableOpacity style={{flexGrow:1,justifyContent:'center',}} onPress={imageLibrary} >
        <Text style={{fontSize:16,color:'black'}}>Open Gallery</Text>
       </TouchableOpacity>

  
        </View>
  </ModalContent>
</Modal>
  </View>

 


</View>


//         <View style={{height,width,paddingHorizontal:15,justifyContent:'space-between', alignItems:'center'}}>

// <View style={{alignItems:'center',paddingTop:height*.2}}>
//             <View style={{position:'absolute',top:0,right:0,left:0,alignItems:'center',justifyContent:'center',height:height*.08,elevation:2,shadowColor:'grey',shadowOffset:{height:3}}}>
//                 <Text>
//                     Profile Photo
//                 </Text>
//             </View>
          
//             <View style={{borderColor:"black" ,borderRadius:100,borderWidth:1,height:100,width:100,padding:2,alignItems:'center',justifyContent:'center'}}>
// <Image source={{uri:pic != ''? pic :null }} style={{height:100,width:100,borderRadius:100}} />
//             </View>
          

//           <View style={{paddingHorizontal:width*.09,alignItems:'center'}}>

//             <Text style={{fontSize:18,marginTop:height*.05,textAlign:'center'}}>
//                 A Photo Of You 
//             </Text>
            

//             <Text style={{fontSize:14,marginTop:height*.05,textAlign:'center'}}>
//                Please make sure your photo clearly shows your face
//             </Text>
//             </View>
//             <Pressable onPress={camera} style={{marginTop:height*.05, backgroundColor:'black' , width:width*.8,alignItems:'center',padding:5,borderRadius:15}} >
//                 <Text style={{color:'white'}}>
//                     Take Photo 
//                 </Text>
//                 </Pressable>

//                 <Pressable onPress={imageLibrary} style={{backgroundColor:'black' , width:width*.8,alignItems:'center',marginVertical:10,padding:5,borderRadius:15}} >
//                 <Text style={{color:'white'}}>
//                    Choose Gallery
//                 </Text>
//                 </Pressable>
                

//                 </View> 


//                 <View>
//                 <Pressable disabled={disable} onPress={home} style={{backgroundColor:'black' , width:width*.8,alignItems:'center',padding:5,borderRadius:15}} >
// <Text style={{color:'white',fontSize:17}}>
//   Next
// </Text>
// </Pressable>
//                     </View> 
               

           
//         </View>
    )
}
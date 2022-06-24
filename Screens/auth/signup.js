
import React,{useState,createContext} from 'react'
import {Text,View,StyleSheet,Dimensions,Image,ImageBackground,Pressable} from 'react-native'

import logo from '../../Images/logo.png'
import welcome from '../../Images/welcome.jpg'
import { GoogleSignin ,statusCodes} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

const {height,width} = Dimensions.get('screen')



const Signup = ({navigation})=>{

    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          const user = userInfo.user
          console.log(user)
         

       navigation.navigate('hobby',{
          'user': user
        //  "name":userInfo.user.name,
        //  'token':userInfo.user.id,
        //    'profilepicture' : userInfo.user.photo
        
      })
        } catch (error) {
            console.log('google err')
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log('user cncld')
            console.log(error)
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log('google processing')
            console.log(error)
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log('google play service err')
            console.log(error)
          } else {
            // some other error happened
            console.log(error)
          }
        }
      };
    
    const [gender,setgender]= useState('gender')
    console.log(gender)

    
    return(
     
    
   
<ImageBackground source={welcome} style={{height:height}}>
   <View style={styles.top}>
     <View style={{alignItems:'center'}}>
         <Image source={logo} style={{height:60,width:50}} />
         <Text style={{fontSize:25,letterSpacing:4}}>
        Blast
         </Text>
     </View>


     <View style={styles.middle}>
         <Text style={{fontWeight:'bold',color:'white',fontWeight:'800'}}>
             Welcome!
             Choose Your Gender :
         </Text>
     </View>

      <View style={styles.buttonview}>
       <Pressable style={styles.button} onPress={()=>{
            setgender('male')
           navigation.navigate('name',{"gender":"male",
         
           })}}>
          <Text style={{color:'black',fontWeight:'500'}}>
            I am man
          </Text>
       </Pressable>
         <View style={{width:width*.02}}/>
       <Pressable style={styles.button} onPress={()=>{
           setgender('female')
           
           navigation.navigate('name',{"gender":"female",
     
        })
           
           }}>
          <Text style={{color:'black',fontWeight:'500'}}>
            I am woman
          </Text>
       </Pressable>
      </View>


       <View style={styles.googleview}>
           <Pressable style={styles.google} onPress={signIn}>
               <Text style={{color:'white'}}>
                   Login With Google
               </Text>
           </Pressable>
       </View>


       <View style={styles.bottem}>
           <Text style={{fontSize:12}}>
               By Signing you're agree to our terms and condition
           </Text>
       </View>

  </View>
   </ImageBackground>

  
    
 
    )
}

const styles = StyleSheet.create({
    top:{
height:height,
marginTop:height*.3

    },
    middle:{
        alignItems:'center',
        marginTop:height*.25,
        height:height*.03,
      
        
    },
    buttonview:{
        flexDirection:'row',
        paddingHorizontal:35,
        marginTop:height*.02
    },
    button:{
        backgroundColor:'white',
        borderRadius:5,
        width:width*.4,
        paddingVertical:15,
        alignItems:'center'
    },
    google:{
        borderWidth:1,
        alignItems:'center',
        padding:13,
        borderColor:'white',
        borderRadius:10
    },
    bottem:{
       alignItems:'center',
       marginTop:height*.07
       
    },
    googleview:{
        marginTop:height*.04,
        marginHorizontal:35
    }
})

export default Signup

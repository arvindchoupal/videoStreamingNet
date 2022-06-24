
import React,{useState,useContext, createFactory, useEffect} from 'react'
import { Text,KeyboardAvoidingView,Alert, View, StyleSheet, Dimensions, Image, ImageBackground, StatusBar, Pressable ,TextInput} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import messaging from '@react-native-firebase/messaging';
import { timeConversion } from 'geolib';
import { Time } from 'react-native-gifted-chat';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
const { height, width } = Dimensions.get('screen')



const Age = ({navigation,route}) => {
const {name,gender} = route.params
const [token,settoken] =useState('')
    const [age,setage] = useState('')

useEffect(()=>{
    const month = new Date().getMonth() + 1
    new Date().getFullYear()+ month  + new Date().getDate()  
    const time = new Date().getTime()
     const ml = new Date().getMilliseconds() 
     settoken(time + ml)
     console.log(token)
},[]
)



  
   
    return (
        
        <View >
            <StatusBar backgroundColor={'black'} />
            < KeyboardAvoidingView behavior='height' enabled={true}   style={{ height, backgroundColor: 'black', paddingVertical: height * .06, paddingHorizontal: width * .12, justifyContent: 'space-between' }}>
            <View>
           
                <View style={{ backgroundColor: 'grey', height: 3 }}>
                    <View style={{ backgroundColor: 'red', width: width * .6, height: 4 }} />
                    </View>
                    <View style={{ paddingTop: height * .04, height: height * .3 }}>

                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', paddingBottom: 6 }}>
                          What's Your Age?🥳
                        </Text>
                        <View style={{ backgroundColor: 'white', borderRadius: 9 }}>
                            <TextInput keyboardType='number-pad' placeholder='Age' onChangeText={(t)=>{
                                setage(t)
                            }} value={age} />
                        </View>

                    


                    </View>
               
            </View>
            <Pressable onPress={()=>{
                if(age != ''){
                navigation.navigate('hobby',{ "gender":gender,
                "age":age,
               "name":name,
               'token':token
              
            })
              
           } 
           else{
               Alert.alert('Blast','Fill Data')
           }
           }} >
                 <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={age == "" ?[ 'black','black','black' ]:['#f26633', '#f53b2a', '#f26005']} style={{   borderColor:'white', padding: 2,height:height*.05,alignItems:'center',borderWidth:age == ""?1: 0,borderRadius:8,justifyContent:'center' }}>
                <Text style={{ color: 'white' }}>
                    Next
                </Text>
               </LinearGradient>
            </Pressable>
            
           </ KeyboardAvoidingView>

        </View>

    )
}



export default Age
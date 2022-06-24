
import React,{useState} from 'react'
import {KeyboardAvoidingView ,TextInput, Alert,Text, View, StyleSheet, Dimensions, Image, ImageBackground, StatusBar, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { useSelector ,useDispatch} from 'react-redux';
import { addName } from '../../src/features/userdata/userdata';
const { height, width } = Dimensions.get('screen')







const Name = ({navigation,route}) => {
    const {gender} = route.params
    const myname = useSelector(state=>state.userdata.name)
    const dispatch = useDispatch()
   const [name,setname] = useState('')
    console.log(name)
    return (
        <View >
            <StatusBar backgroundColor={'black'} />
           < KeyboardAvoidingView behavior='height' enabled={true}   style={{ height, backgroundColor: 'black', paddingVertical: height * .06, paddingHorizontal: width * .12, justifyContent: 'space-between' }}>
            <View>

                <View style={{ backgroundColor: 'grey', height: 3 }}>
                    <View style={{ backgroundColor: 'red', width: width * .3, height: 4 }} />
                    </View>
                    <View style={{ paddingTop: height * .04, height: height * .3 }}>

                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', paddingBottom: 6 }}>
                            First Name🥳
                        </Text>

                        <View style={{ backgroundColor: 'white', borderRadius: 9 }}>
                            <TextInput placeholder='first name' onChangeText={(t)=>{
                                setname(t)
                            }}  />
                        </View>

                    </View>
               
            </View>

            
            <Pressable onPress={()=>{

              
                if(name != ''){
                navigation.navigate('age',{
                "gender":gender,
                "name": name,
           
        })}
        else {Alert.alert('Hobbizo','Fill All Data')}
    
    }} >
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={name == "" ?[ 'black','black','black' ]:['#f26633', '#f53b2a', '#f26005']} style={{   borderColor:'white', padding: 2,height:height*.05,alignItems:'center',borderWidth:name == ""?1: 0,borderRadius:8,justifyContent:'center' }}>
                <Text  style={{ color: 'white' }}  >
                    Next
                </Text>
                </LinearGradient> 
            </Pressable>
            </KeyboardAvoidingView>

        </View>

    )
}

export default Name
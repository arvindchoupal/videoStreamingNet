import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import {Picker} from '@react-native-picker/picker';
// import AnimatedLottieView from 'lottie-react-native'
// import { useDispatch } from 'react-redux'; //
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigatorParams } from '../../stack/params';
// type NavigatorProp = StackNavigationProp<NavigatorParams, keyof NavigatorParams>;
import{ Colors }from '../../Images/colors'
import LottieView from 'lottie-react-native';
const {height,width} = Dimensions.get('window')

export default function Blood() {
  const [selectedblood, setSelectedblood] = useState('Select Blood Group')
//   const dispatch = useDispatch()
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex:1,alignItems:'center',backgroundColor:Colors.secondery}}>
      <StatusBar translucent backgroundColor="transparent" barStyle='light-content' />
      <View style={{height:height*.18,backgroundColor:Colors.primery,width,alignItems:'center',justifyContent:'flex-end'}}>
      <Text style={{width,textAlign:'center',color:'white',letterSpacing:1,fontWeight:'600',fontSize:17,marginBottom:30}}>
        SEARCH
      </Text>
      
      <View style={{backgroundColor:'white',height:height*.07,width:width*.8,borderRadius:10,marginBottom:-20}}>
      <Picker
      mode='dropdown'
  selectedValue={selectedblood}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedblood(itemValue)
  }>
  <Picker.Item label="Select Blood Group" value="null" />
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
<View style={{width:width*.6,height:height*.6}}>
      <LottieView
        source={require('../../files/json/98723-search-users.json')}
        colorFilters={[
          {
            keypath: 'button',
            color: '#F00000',
          },
          {
            keypath: 'Sending Loader',
            color: '#F00000',
          },
        ]}
        autoPlay
        loop
      />
     
    </View>

    <Text style={{color:'white',fontSize:17,marginTop:-80}}>
        Search any blood group
      </Text>

      <Text numberOfLines={4} style={{color:'white',fontSize:12,marginTop:5,fontWeight:'200',textAlign:'center',width:width*.8}}>
        You can contact nearest person to donate blood that you need. 
      </Text>

      
      </View>
  )
}


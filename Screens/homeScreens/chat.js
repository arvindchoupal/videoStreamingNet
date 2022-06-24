import React,{useState,useEffect,useCallback} from 'react'
import {Text,View,Dimensions, Button,BackHandler,Alert} from 'react-native'
import { Actions,
  ActionsProps,GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage"

const {height,width} = Dimensions.get('window')






const Chat = ({route,navigation})=>{
const [mydata,setmydata] =useState()
const myid = route.params.my.token
const profiletoken =route.params.user.token


 const sendnoti = (message)=>{
  console.log('notfi')
  fetch ('http://15.206.28.55:8060/send-noti',{
    method:'post',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    
      "msg":message,
      "token":profiletoken,
      "sender": mydata.myname
    
    })
  })
}
 


  useEffect(()=>{
    console.log('1')
    getData()
    console.log('2')
  
  },[])


  const getData = async () => {
    console.log('const getdata')
    try {
    setmydata(route.params.my)
      console.log("mydat"+ myid)
      console.log('3')
    
      //new realtime

      const docid = myid >  profile.token ? profile.token + '-' + myid :  myid+ '-' +profile.token
      console.log(docid)
      console.log(4)

    const messageRef = firestore().collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt','desc')
       
console.log(messageRef._collectionPath._parts)
      messageRef.onSnapshot((querysnap)=>{
      const allmsg = querysnap.docs.map(docsnap=>{
        const data = docsnap.data()
        if(data.createdAt){
        return {
          ...docsnap.data(),
          createdAt:docsnap.data().createdAt.toDate()
        }
      }else {
        return{
        ...docsnap.data(),
        createdAt:new Date()
        }
      }

      })
      
      setMessages(allmsg)
    })

    

      
      
      
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }
    const [messages, setMessages] = useState([]);
    const profile = route.params.user

    const getAllMessages = async ()=>{


      console.log("getallmsg")
      const docid = myid >  profile.id ? profile.id + '-' + myid :  myid+ '-' +profile.id 
      console.log('myid:' + myid)
      const querysnap = await firestore().collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt','desc')
      .get()
      const allmsg = querysnap.docs.map(docsnap=>{
        return {
          ...docsnap.data(),
          createdAt:docsnap.data().createdAt.toDate()
        }
      })
      
      setMessages(allmsg)
    }

    // useEffect(()=>{
    //   getAllMessages()
    // },[])
    function renderActions(props) {
      return (
        <Actions
          {...props}
          options={{
            ['Send Image']: handlePickImage,
          }}
          icon={() => (
            <Icon name={'attachment'} size={28} color={AppTheme.colors.primary} />
          )}
          onSend={args => console.log(args)}
        />
      )
    }








const onSend = (messagesArray ) => {
  const msg = messagesArray[0]
  const mymsg = {

  ...msg,
  sentBy:myid,
  sentTo :profile.token,
  createdAt:new Date()
  }
 setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
 const docid = myid >  profile.token? profile.token + '-' + myid :  myid+ '-' +profile.token
 console.log('profile id' + docid)
 console.log(mymsg)
  firestore()
  .collection('chatrooms')
  .doc(docid)
  .collection('messages')
  .add({
   ...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})
  
  .then(() => {
    console.log('User added!');
  });

  // sendnoti(msg)
}

useEffect(()=>{
  console.log('if condition')
  if (mydata){
    console.log('if condition in')
  // getAllMessages()    not real time chat

}
},[])




 return (
   <>
   {mydata ? <View style={{flex:1}}>
   <View style={{height:height*0.08,width:width,backgroundColor:'#2b2b2a',flexDirection:'row',alignItems:'center'}}>
       <Text style={{color:'white',fontSize:16,paddingLeft:10}}>
           {profile.name}
       </Text>
       </View>
<GiftedChat
messages={messages}
// renderActions = {renderActions}
onSend={messages => onSend(messages)}
user={{
_id: myid,
}}
/>







</View>:<Button title={'send data'} />}
</>     
    )
}


export default Chat
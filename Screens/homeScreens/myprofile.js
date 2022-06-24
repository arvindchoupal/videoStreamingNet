import React, { useEffect, useState } from 'react'
import {Text,View,Dimensions,ScrollView,Image,FlatList,ImageBackground,Pressable} from 'react-native'
import { Server } from './server'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const {height,width} = Dimensions.get('screen')
export const Profile = ({route})=>{
    const [pic,setpic] = useState('')
    const [imsasset,setassest] = useState()
    const [disable,setdisable] =useState(true)
    const [currenthobby,setcuurenthoby] = useState()
    console.log('welcome in my profile')
  const {token }= route.params

  const dummymedia = [{
      "media":'https://www.mensjournal.com/wp-content/uploads/mf/the_15_most_important_exercises_for_men_main.jpg?quality=70&strip=all'
     ,'id' : 1
    },
    {
        "media":'https://www.mensjournal.com/wp-content/uploads/mf/the_15_most_important_exercises_for_men_main.jpg?quality=70&strip=all'
       ,'id' : 2
      },


]
  
    const [mydata,setmydata] = useState()
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
              console.log('data milgya api se')
            }
            
            )
            .catch((error) => {
              console.error(error);
            });
        };

        useEffect(()=>{
            getmydata()
        },[])


         const imageLibrary = async()=>{
       const result = await launchImageLibrary()
       const r = result.assets
       const imguri = r[0].uri
       setassest(result)
     
        setpic(imguri)
        setdisable(false)
            console.log(r)

            
    }
    return(
        <ScrollView style={{flex:1,width,backgroundColor:'white',borderColor:'white',borderWidth:3}}>
          {mydata ? 
          <View>
          
          <View style={{ flexDirection:'row', height:height*.25,paddingLeft:width*.1,paddingTop:height*.05,paddingRight:width*.25}}>
                <Image source={mydata ? {uri:`${Server}/profile/${mydata.profilepic}`}:require('../../Images/logo.png')} style={{borderRadius:10, height:height*.15,width:height*.13}}/>
                   
                     <View style={{   justifyContent:'center',padding:15,height:height*.15}}>
                     <Text style={{fontSize:20,fontWeight:'800',color:'black'}}>
                           {mydata.name}
                           </Text>
                           <Text>
                           Intersted in {mydata.hobbies.map((item,index)=>  index + 1  == mydata.hobbies.length ? item : item + ', '
               )}        </Text>
                   
                    </View>
                    </View>



                    <View style={{flexDirection:'row',height:height*.1,width,paddingLeft:width*.1}}>
                          <View style={{width:width*.3,height:height*.1}} >
                              <Text style={{fontSize:19,fontWeight:'800',color:'black'}}>
                              
                                  {mydata.blood ? mydata.blood : NaN }
                              </Text>
                              <Text style={{fontSize:14,color:'grey'}}>
                              
                              Blood Group
                          </Text>
                          </View>


                          <View style={{width:width*.3,height:height*.1}} >
                              <Text style={{fontSize:19,fontWeight:'800',color:'black'}}>
                              
                                  {mydata.age ? mydata.age : NaN }
                              </Text>
                              <Text style={{fontSize:14,color:'grey'}}>
                              
                             Age 
                          </Text>
                          </View>


                          <View style={{width:width*.3,height:height*.1}} >
                              <Text style={{fontSize:19,fontWeight:'800',color:'black'}}>
                              
                                  {mydata.reviews ? mydata.reviews.length : NaN }
                              </Text>
                              <Text style={{fontSize:14,color:'grey'}}>
                              
                              Reviews
                          </Text>
                          </View>
                    </View>
             
                    
                    <View style={{paddingLeft:width*.1}}>
                          <Text style={{fontSize:15,fontWeight:'700'}}>
                              Media   ------------------------------
                          </Text>


                         < ScrollView>
                              <FlatList
                                data={mydata.media ? mydata.media : mydata.hobbies}
                                numColumns= {3}
                                renderItem= {({item,})=>{

                                    return (
                                        <View style={{height: width*.32,width:width*.25,shadowColor: "#000000",
                                        shadowOffset: {
                                          width: 2,
                                          height: 3,
                                        },
                                        shadowOpacity:  0.18,
                                        shadowRadius: 4.59,
                                        elevation: 5,
                                        marginTop:25,
                                        marginRight:10
                                        
                                        }}>
                                               
                                       {mydata.media ? 
                                       <Pressable >
                                       <ImageBackground source={{uri:`${Server}/profile/${mydata.profilepic}`}}  style={{ justifyContent:'flex-end',alignItems:'center',paddingBottom:5,  height: width*.32,width:width*.25 ,margin:5,borderRadius:10,overflow:'hidden',marginTop:25,opacity:0.89}}> 
                                       <Text style={{color:'white',fontWeight:'600'}}>
                                           {item}


                                         <MaterialCommunityIcons name={'file-image-plus'} size={18} />
                                       </Text>
                                   </ImageBackground>
                                    
                                   </Pressable>
                                    
                                    :
                                  <Pressable  onPress={async()=>{
                                    const result = await launchImageLibrary()
                                    const r = result.assets
                                    const imguri = r[0].uri
                                    setassest(result)
                                  setcuurenthoby(item)
                                     setpic(imguri)
                                     setdisable(false)
                                         console.log(r)




                                  } } >
                                    <View style={{height:width*.32,width:width*.25,}}>
                                       
                                      {  pic && currenthobby == item ?
                                          <ImageBackground source={{uri:pic}}  style={{ justifyContent:'flex-end',alignItems:'center',paddingBottom:5,  height: width*.32,width:width*.25 ,margin:5,borderRadius:10,overflow:'hidden',marginTop:25,opacity:0.89}}> 
                                                     
                                      </ImageBackground> : 
                                      <View style={{justifyContent:'flex-end',alignItems:'center',paddingBottom:5,  height: width*.32,width:width*.25 ,margin:5,borderRadius:10,overflow:'hidden',marginTop:25,opacity:0.89}}>
                                        <MaterialCommunityIcons name={'file-image-plus'} size={100} />
                                        <Text>
                                        {item}
                                        </Text>
                                        </View>
                                    
                                    }


                                  
                                    </View>
                                    </Pressable>
                                    }
                                        
                                     </View>
                                    )
                                }
                                }
                                />

<View style={{marginRight:10,marginTop:35}}>
                                <Pressable style={{ backgroundColor:'black',alignItems:'center',padding:8,borderRadius:10}} >
                                    <Text style={{color:'white',size:18}}>
                                       View Gallery
                                    </Text>
                                </Pressable>
                                </View>


                            <View style={{marginRight:10,marginTop:10}}>
                                <Pressable style={{ backgroundColor: pic ? '#3471eb': 'black',alignItems:'center',padding:8,borderRadius:10}} >
                                    <Text style={{color:'white',size:18}}>
                                        Save
                                    </Text>
                                </Pressable>
                                </View>

                              
                          </ScrollView>
                    </View>
            
                    
            </View> :null } 
        </ScrollView>
    )
}
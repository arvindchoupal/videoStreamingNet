import React,{useRef,useState} from 'react'
import {Text,View,ImageBackground,FlatList,Dimensions,Image,StatusBar} from  'react-native'


const {height,width} = Dimensions.get('screen') 
const CoursellImage = ()=>{
  const flat = useRef()
  const [position,setposition] = useState(0)
  const data = [
    {
  'bgimage':'https://i.pinimg.com/736x/2b/eb/ba/2bebba92ec9c00c0d5bdbf0357b4f402.jpg',
'title':'Feel alone in your life',
'subtitle':''
  },
  {
    'bgimage':'https://i.pinimg.com/originals/44/c1/b2/44c1b27adffcd3199765786372a99a5c.jpg',
  'title':'Try us to find your choice',
  'subtitle':''
    },
    {
      'bgimage':'https://wallpaperaccess.com/full/2806355.jpg',
    'title':'',
    'subtitle':''
      }
    ]

  
return (
<View style={{width:width,backgroundColor:'black'}}>
<StatusBar  translucent ={true} backgroundColor={'transparent'}/>
    <View style={{width:width}}>
  <FlatList
  data={data}
  ref={flat}
  showsHorizontalScrollIndicator={false}
  horizontal
  onScroll={(item)=>{

var posit = item.nativeEvent.contentOffset.x
setposition( parseInt(parseInt(posit)/parseInt(width) ))


  }}
  pagingEnabled
  renderItem={({item})=>{
    

    return(
    <ImageBackground source={  {uri:item.bgimage}} style={{width:width,height:height*.8,justifyContent:'flex-end'}} >
     
    
    
    <View style={{justifyContent:'center',width,alignItems:'center',paddingHorizontal:width*.15,opacity:1.0}}>
      <Text style={{color:'white',fontSize:32,fontWeight:'900',textAlign:'center',opacity:1,marginBottom:height*.05}}>
        {item.title}
      </Text>

      <Text style={{fontSize:14,textAlign:'center',color:'white', fontWeight:'500',paddingTop:10}}>
        {item.subtitle}
      </Text>
    </View>

    
     
  

  </ImageBackground>)
  }}
  keyExtractor={item=>item.subtitle}
  />
  </View>

  <View style={{height:50,width,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
  {data.map((ite,i)=>{
  
  
 
    return(
      <View key={i} style={{backgroundColor:position==i?'white':'grey',height:8,width:8,borderRadius:15,margin:6}}/>
  )})}
  </View>
  </View>


)
}

export default CoursellImage
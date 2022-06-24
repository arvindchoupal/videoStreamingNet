import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement} from "./counterSlice";
import {View,Text,Button} from 'react-native'



const Counter = ()=>{
    const count = useSelector(state=> state.counter.value)
const dispatch = useDispatch()
return(
    <View>
        <Button title='add' onPress={()=>dispatch(increment())}/>
          <Text>
            {count}
         </Text>  

         <Button title='sub' onPress={()=>dispatch(decrement())}/>
          <Text>
            {count}
         </Text>  
    </View>
)

}

export default Counter
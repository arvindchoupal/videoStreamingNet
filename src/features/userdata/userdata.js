import { createSlice } from '@reduxjs/toolkit'

export const userDetailsSlice = createSlice({
    name: 'userdata',
    initialState:{
        name: '',
        age : '',
        gender : '',
        profilepicture: '',
        token : ''

        
    },

    reducers:{
        addName:(state,payload )=>{
            
            state.name = payload.payload
        }
    }
   
})

export const {addName} = userDetailsSlice.actions

export default userDetailsSlice.reducer
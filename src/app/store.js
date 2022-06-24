import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../features/counter/counterSlice'
import userdata from '../features/userdata/userdata'
export default configureStore({
  reducer: {
  counter: counterSlice,
  userdata:userdata
  }
})
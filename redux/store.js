import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../redux/slices'


export const store = configureStore({
  reducer: {
    todos: todosReducer,
    
 }
})
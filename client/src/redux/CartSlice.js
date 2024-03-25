import { createSlice } from '@reduxjs/toolkit';

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartItems:[],
        total:0,
        tax:8,
    },
    reducers:{
        addProduct:(state,action)=>{
            const findCartItem=state.cartItems.find((item)=> item._id === action.payload._id);
            if (findCartItem){
                findCartItem.quantity=findCartItem.quantity+1; 
            }

            else{
                  state.cartItems.push(action.payload);
            }

            state.total = state.total + action.payload.price;
        },
        deleteCart:(state,action)=>{
            const newCartItems=state.cartItems.filter((item) => item._id !== action.payload._id);
            state.cartItems = newCartItems;

            state.total = state.total - (action.payload.price * action.payload.quantity);
        },
        increase:(state,action)=>{
           const findCartItem = state.cartItems.find((item) => item._id === action.payload._id);
           findCartItem.quantity += 1;
           state.total += findCartItem.price; 
        },
        decrease:(state,action)=>{
            const findCartItem=state.cartItems.find((item)=>item._id===action.payload._id);
            if (findCartItem.quantity<=1){
                 if (window.confirm("Ürünü silmek istediğinizden eminmisiniz")){
                    state.cartItems = state.cartItems.filter((item)=> item._id !== action.payload._id);
                    state.total -= findCartItem.price * findCartItem.quantity;
                 }
            }
            else{
               findCartItem.quantity-=1;
               state.total -= findCartItem.price;  
            }

        },
        deleteAllCart:(state,action)=>{
           state.cartItems = [];
           state.total=0;
        }
    },
})


export const {addProduct,deleteCart,deleteAllCart,increase,decrease} = cartSlice.actions;
export default cartSlice.reducer;
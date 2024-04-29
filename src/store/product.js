import { createSlice } from '@reduxjs/toolkit';
import { kuwazawa_productDB, kuwazawa_cartDB } from '@/assets/firebase'

const productSlice = createSlice({
    name:"products",
    initialState : {
        products : [], 
        carts: []    
    },
    reducers : {
        initProducts(state, action){
            state.products = action.payload
        },
        initCarts(state, action){
            state.carts = action.payload
        },
    }
})

export const { initProducts, initCarts } = productSlice.actions;

export const fetchProducts = ()=> async dispatch => {
    try {
        kuwazawa_productDB.on('value', (snapshot)=>{
        const productsObj = snapshot.val()
        const productsArr = Object.entries(productsObj).map(([key, value]) => {
            return { key:key, ...value }; 
        });
        dispatch(initProducts(productsArr))
      })
      kuwazawa_cartDB.on('value', (snapshot)=>{
        const cartsObj = snapshot.val()
        let cartsArr = null;
        if (cartsObj) {
            cartsArr = Object.values(cartsObj)
        } else {
            cartsArr = []
        }
        dispatch(initCarts(cartsArr))
      })
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

export default productSlice.reducer;
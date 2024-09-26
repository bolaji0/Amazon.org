import {createSlice} from "@reduxjs/toolkit";

const initialState={
    products:[],
    userInfo:null,
    searchResults:[],
}

export const amazonSlice = createSlice({
    name: 'amazon',
    initialState,
    reducers: { 
        // ****************** Add Product To Cart Start ********************** //

        addToCart: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
        },

        // ****************** Add Product To Cart End ********************** //
        // ****************** Increment Product  Start ********************** //

        incrementQuantity:(state, action)=> {
            const item = state.products.find((item) => item.id === action.payload);
            item.quantity++
        },

        // ****************** Increment Product  End ********************** //
        // ****************** Decrement Product Start ********************** //

        decrementQuantity:(state, action)=> {
            const item = state.products.find((item) => item.id === action.payload);
            if(item.quantity === 1){
                item.quantity = 1
            }else{
                item.quantity--
            }
        },

        // ****************** Decrement Product End ********************** //
        // ****************** Remove from Cart Start ********************** //

        deleteItem:(state, action)=> {
            state.products = state.products.filter((item)=> item.id !== action.payload)
        },

        // ****************** Remove from Cart End ********************** //
        // // ****************** Clear Cart Start ********************** // //
        
        resetCart:(state)=>{
            state.products=[];
        },

        // // ****************** Clear Cart End ********************** // //
        // // ****************** Reducer authentication start here ********************** // //

        setUserInfo:(state, action) => {
            state.userInfo = action.payload
        },

        // // ****************** Reducer authentication End here ********************** // //
        // // ****************** Log out user  ********************** // //

        logOut:(state)=>{
            state.userInfo=null;
        },

        // // ****************** LogOut End here ********************** // //
        // // ****************** Search Start here ********************** // //

        setSearchResults: (state, action) => {
            // Assuming action.payload contains the search results array
            state.searchResults = action.payload;
            
        }

        // // ****************** Search End here ********************** // //


    },
});


export const {addToCart,deleteItem,resetCart,incrementQuantity,decrementQuantity, setUserInfo, logOut, setSearchResults} = amazonSlice.actions;
export default amazonSlice.reducer;

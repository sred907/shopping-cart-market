
import { ADD_TO_CART, SUB_QUANTITY, ADD_QUANTITY, ADD_ITEMS, SET_SORTING_ID, SET_PRODUCT_TYPE, SET_BRANDS, SET_TAGS } from '../actions/actionTypes';


const initState = {
    items: [],
    addedItems:[],
    total: 0,
    sortingId: 0,
    productType: "mug",
    brands: ["All"],
    tags: ["All"]

}

const cartReducer= (state = initState, action)=>{
    if(action.type === ADD_ITEMS){
        return {
            ...state,
            items: [...action.data]
        }
    }

    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return {
                ...state,
                 total: state.total + addedItem.price 
            }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }

    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }

    if(action.type === SUB_QUANTITY){  
        let addedItem = state.items.find(item => item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type === SET_SORTING_ID) {
        return {
            ...state,
            sortingId: action.id
        }
    }

    if(action.type === SET_PRODUCT_TYPE) {
        return {
            ...state,
            productType: action.product
        }
    }

    if(action.type === SET_BRANDS) {
        let newBrands = action.brands.slice(0);
        return {
            ...state,
            brands: newBrands
        }
    }

    if(action.type === SET_TAGS) {
        let newTags = action.tags.slice(0);
        return {
            ...state,
            tags: newTags
        }
    }

    return state;
}

export default cartReducer;

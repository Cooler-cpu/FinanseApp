import {SET_BALANSE, FETCH_BALANSE, FETCH_SPENDINGS, PUSH_SPENDING } from './types'

const initialState = {
    balanse: 0,
    fetchedSpendings: []
}

export const dataReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_BALANSE:

            return { ...state, balanse : state.balanse = action.payload}

        case FETCH_BALANSE:

            return {...state, balanse: action.payload} 


        case PUSH_SPENDING:

            let tempSpendings = state.fetchedSpendings;
            tempSpendings.push(action.payload);

            console.log("action",tempSpendings);

            //return {...state, fetchedSpendings: state.fetchedSpendings = [action.payload]}
            return {...state, fetchedSpendings:[...tempSpendings] }


        case FETCH_SPENDINGS:
            
            return { ...state, fetchedSpendings: action.payload }

        default: return state
    }

}
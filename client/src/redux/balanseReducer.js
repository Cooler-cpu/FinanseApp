import {SET_BALANSE, FETCH_BALANSE, FETCH_SPENDINGS } from './types'

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

        case FETCH_SPENDINGS:
            
            return { ...state, fetchedSpendings: action.payload }

        default: return state
    }

}
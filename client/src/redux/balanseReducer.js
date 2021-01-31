import {
    SET_BALANSE, 
    FETCH_BALANSE, 
    FETCH_SPENDINGS, 
    FETCH_EARNINGS, 
    FETCH_TODAY_RECORDS,
    FETCH_ALL_RECORDS,
    PUSH_SPENDING, 
    PUSH_EARNING,
    PUSH_TODAY_RECORDS,
    PUSH_ALL_RECORDS
} from './types'

const initialState = {
    balanse: 0,
    fetchedSpendings: [],
    fetchedEarnings: [],
    allRecords: [],
    todayRecords: []
}

export const dataReducer = (state = initialState, action) => {

    switch(action.type){
        // set balanse client 
        case SET_BALANSE:

            return { ...state, balanse: state.balanse = action.payload }

        // fetch balanse server
        case FETCH_BALANSE:

            return { ...state, balanse: action.payload } 

        // push data spend client, and send it on BD in action.js func pushSpending()
        case PUSH_SPENDING:

            let tempSpendings = state.fetchedSpendings;
            tempSpendings.push(action.payload);

            return {...state, fetchedSpendings: [...tempSpendings]}

        //push data earn client, and send it on BD in action.js func pushEarning()
        case PUSH_EARNING:

            let tempEarnings = state.fetchedEarnings;
            tempEarnings.push(action.payload);

            return {...state, fetchedEarnings: [...tempEarnings]}

        //push data spend/earn only on client
         case PUSH_TODAY_RECORDS:

            let TempTodayRecords = state.todayRecords;
            TempTodayRecords.push(action.payload);
            
            return {...state, todayRecords: [...TempTodayRecords]}

        //push data spend/earn only on client
        case PUSH_ALL_RECORDS:

            let TempAllRecords = state.allRecords;
            TempAllRecords.push(action.payload)

           return {...state, allRecords: [...TempAllRecords]}
        
        //fetch data today records spend/earn, action.js func todayRecords()
        case FETCH_TODAY_RECORDS:

            return { ...state, todayRecords: action.payload }

        //fetch data all records spend/earn, action.js func AllRecords()
        case FETCH_ALL_RECORDS:

            return { ...state, allRecords: action.payload}

        //fetch data spendings
        case FETCH_SPENDINGS:
            
            return { ...state, fetchedSpendings: action.payload }

        //fetch data earnings
        case FETCH_EARNINGS:

            return { ...state, fetchedEarnings: action.payload  }


        default: return state
    }

}
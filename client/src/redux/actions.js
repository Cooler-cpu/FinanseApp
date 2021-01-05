import {SET_BALANSE, FETCH_BALANSE, FETCH_SPENDINGS} from './types'
import axios from 'axios'
import userIdGetter from '../API/userIdGetter';


export function setBalanse(balanse){
    return{
        type: SET_BALANSE,
        payload: balanse
    }
}

export function setBalanseFetch(){
    return async dispatch => {

        const userData = userIdGetter();
        const userID = userData.userId;

        try{
            const respone = await axios.post('/api/profile', {userID})
            const json = await respone["data"];

            const FetchBalanse = json.items[0].balanse;

            dispatch( {type: FETCH_BALANSE, payload: Number(FetchBalanse)})

        }catch(e){
            console.log(`Axios spend balanse request failed: ${e}`);
        }
    }
}

export function fetchSpendings(){
    return async dispatch => {

        const userid = userIdGetter();

        try{
            const response = await axios.post('/api/getSpendings', { userID: userid})
            const json = await response["data"];

            dispatch( {type: FETCH_SPENDINGS, payload: json})
              console.log('Returned data:', json);
         } catch (e) {
         console.log(`Axios request failed: ${e}`);
         }
     }
}
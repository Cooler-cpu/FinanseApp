import {SET_BALANSE, FETCH_BALANSE, FETCH_SPENDINGS, PUSH_SPENDING} from './types'
import axios from 'axios'
import userDataGetter from '../API/userDataGetter';


import M from 'materialize-css'

export function setBalanse(balanse){
    return{
        type: SET_BALANSE,
        payload: balanse
    }
}

export function setBalanseFetch(){

    return async dispatch => {

        const userData = userDataGetter();
        const userID = userData.userId;

        try{
            const respone = await axios.post('/api/profile', {userID})
            const json = await respone["data"];

            console.log(json)

            const FetchBalanse = json.items[0].balanse;

            dispatch( {type: FETCH_BALANSE, payload: Number(FetchBalanse)})

        }catch(e){
           
            console.log(`Axios spend balanse request failed: ${e}`);
        }
    }
}


export function fetchSpendings(){
    return async dispatch => {

        const userid = userDataGetter();

        try{
            const response = await axios.post('/api/getSpendings', { userID: userid})
            const json = await response["data"];

            dispatch( {type: FETCH_SPENDINGS, payload: json})
              console.log('Returned data:', json);
         } catch (e) {
         console.log(`Axios request failed in fetchSpendings: ${e}`);
         } 
     }
}


export function pushSpending(cost, category, note){
    return async dispatch => {

        const userData = userDataGetter();
        const userID = userData.userId;


        const dataSpend = {
        _id: userID, 
        date: String(new Date()),
        cost: cost, 
        category: category, 
        note: note
        }


        try{
            const response = await axios.post('/api/addSpending', {cost, category, note, userID})
            const json = await response;

            dispatch( {type: PUSH_SPENDING, payload: dataSpend})

        } catch(e){
        console.log(`Axios request failed in pushSpendings: ${e}`);

        M.toast({html: "Неправильно введенные данные про расход"});

        }
    }
}
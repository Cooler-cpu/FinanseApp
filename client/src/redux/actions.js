import {
    SET_BALANSE, 
    FETCH_BALANSE, 
    FETCH_SPENDINGS, 
    FETCH_EARNINGS, 
    FETCH_ALL_RECORDS,
    FETCH_TODAY_RECORDS,
    PUSH_SPENDING, 
    PUSH_EARNING, 
    PUSH_TODAY_RECORDS,
    PUSH_ALL_RECORDS
} from './types'
import axios from 'axios'

import userDataGetter from '../API/userDataGetter';
import {BalanseSetter} from '../API/BalanseSetterAPI'

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


// export function fetchSpendings(){
//     return async dispatch => {

//         const userid = userDataGetter();

//         try{
//             const response = await axios.post('/api/getSpendings', { userID: userid})
//             const json = await response["data"];

//             dispatch( {type: FETCH_SPENDINGS, payload: json})
//               console.log('Returned data:', json);
//          } catch (e) {
//          console.log(`Axios request failed in fetchSpendings: ${e}`);
//          } 
//      }
// }


function selectionSortDate(arr){
    for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
        let indexMin = i;
        for (let j = i + 1; j < l; j++) {
            if (arr[indexMin].date > arr[j].date) {
                indexMin = j;
            }
        }
        if (indexMin !== i) {
            [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
        }
    }
   return arr;
};


export function AllRecords(){
    return async dispatch => {
        const userid = userDataGetter();

        try{
            const responseSpenings = await axios.post('/api/getSpendings', { userID: userid});
            const responseEarnings = await axios.post('/api/getEarnings', { userID: userid});
            
            dispatch({type: FETCH_SPENDINGS, payload: responseSpenings.data});
            dispatch({type: FETCH_EARNINGS, payload: responseEarnings.data});

            Array.prototype.push.apply(responseSpenings.data, responseEarnings.data);

            const sortArr = selectionSortDate(responseSpenings.data);

            dispatch( {type: FETCH_ALL_RECORDS, payload: sortArr});
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
            const json = await response; //get error

            dispatch( {type: PUSH_SPENDING, payload: dataSpend})
            dispatch( {type: PUSH_TODAY_RECORDS, payload: dataSpend})
            dispatch( {type: PUSH_ALL_RECORDS, payload: dataSpend})
        } catch(e){
            console.log(`Axios request failed in pushSpendings /api/addSpending: ${e}`);
            M.toast({html: "Неправильно введенные данные про расход"});
        }

        try{
            const response = await axios.post('/api/profile', {userID})
            const dataUser = await response;
            const balanse = await dataUser.data.items[0].balanse;
            const balanseReducer = Number(balanse) - Number(cost);
            BalanseSetter(balanseReducer);
            dispatch( {type: SET_BALANSE, payload: Number(balanseReducer)})
        }catch(e){
            console.log(`Axios request failed in pushSpendings /api/profile: ${e}`);
        }
    }
 }

 export function pushEarning(cost, category, note){
    return async dispatch => {
        const userData = userDataGetter();
        const userID = userData.userId;

        const dataEarn = {
            _id: userID, 
            date: String(new Date()),
            cost: cost, 
            category: category, 
            note: note,
            type: "earn"
        }

        try{
            const response = await axios.post('/api/addEarning', {cost, category, note, userID})
            const json = await response; //get error

            dispatch( {type: PUSH_EARNING, payload: dataEarn})
            dispatch( {type: PUSH_TODAY_RECORDS, payload: dataEarn})
            dispatch( {type: PUSH_ALL_RECORDS, payload: dataEarn})

        }catch(e){
            console.log(`Axios request failed in func pushSpendings /api/addEarning: ${e}`);
        }

        try{
            const response = await axios.post('/api/profile', {userID})
            const dataUser = await response;
            const balanse = await dataUser.data.items[0].balanse;
            const balanseReducer = Number(balanse) + Number(cost);
            BalanseSetter(balanseReducer);
            dispatch( {type: SET_BALANSE, payload: Number(balanseReducer)})
        }catch(e){
            console.log(`Axios request failed in func pushSpendings /api/profile: ${e}`)
        }
    }
 }


export function todayRecords(){
    return async dispatch => {

        const userData = await userDataGetter();
        const userID = userData.userId;

        const date = new Date();
        const DayEnd = date.getDate();
        const YearEnd = date.getFullYear();
        const MonthEnd = date.getMonth();
        const DateStart = new Date(YearEnd, MonthEnd, DayEnd );
        const DateEnd = new Date(YearEnd, MonthEnd, DayEnd + 2);

        try{
            const responseSpends = await axios.post('/api/getRecordSpends/toDate', {userID, DateStart, DateEnd})
            const responseEarns = await axios.post('/api/getRecordEarns/toDate' , {userID, DateStart, DateEnd})
            
            Array.prototype.push.apply(responseSpends.data,responseEarns.data); 
            const sortArr = selectionSortDate(responseSpends.data);

            dispatch( {type: FETCH_TODAY_RECORDS, payload: sortArr});

        }catch(e){
            console.log(`Axios request failed in getRecordSpend/toDate: ${e}`);
        }

    }
}



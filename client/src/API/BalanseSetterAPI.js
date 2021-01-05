import axios from 'axios';
import userIdGetter from './userIdGetter'


function balanseSetter (data){

   const userData = userIdGetter();
   const userID = userData.userId;

    try {
        axios.post('/api/balanseSet', { data, userID })
        .then(res => {
        
        })
      } catch (e) {
        console.log(` Axios request failed: ${e}`);
      }
    
}

export default balanseSetter;
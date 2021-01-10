import axios from 'axios';
import userDataGetter from './userDataGetter'

import M from 'materialize-css'

export const  BalanseSetter = (data) => {

  const userData = userDataGetter();
  const userID = userData.userId;


  try {
      axios.post('/api/balanseSet', { data, userID })
      .then(res => {

        M.toast({html: "Баланс установлен"});

      }).catch(err => {
        
         M.toast({html: "Неправильно введенный данные"})

      })
    } catch (e) {
      console.log(` Axios request failed: ${e}`);
    }



}


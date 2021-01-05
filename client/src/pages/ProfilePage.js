import React, { useEffect, useState, Component , setState} from 'react'

import userIdGetter from '../API/userIdGetter'

function ProfilePage(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  

    useEffect(() =>{

      const userData = userIdGetter();
      console.log(userData.userId);
      const userID = userData.userId;

      fetch('/api/profile', {method: 'POST', body:JSON.stringify({
        userID
    }),headers:{'content-type': 'application/json'}})
    .then(function (response) {
       // alert(response.status); // 200

        return response.json();
    })
    .then(function (data) {
      //  console.log(data);
        setIsLoaded(true);
        setItems(data.items);
    })
    .catch(alert);
    }, [])


    console.log("items", items);

    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div>
  
            <ul className="collection with-header">
                
                 {items.map((item, index) => (
                <ul key={item.id}>
                  <li className="collection-header" key={item.index}> Эмеил:  {item.name} 
                  </li>
                  <li className="collection-header" key={item.index}> Баланс: {item.balanse}
                  </li>
                </ul>
                ))} 
            </ul> 
        </div>
      );
    }
}

export default ProfilePage;
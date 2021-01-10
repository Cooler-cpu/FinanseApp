import React from 'react'
import './MainPageStyle/index.css';

import OperationAdd from '../components/OperationAdd';
import OperationDisplay from '../components/OperationDisplay'
import Sidebar from '../components/Sidebar'


function Content(){
    return(
        <div className="content">

           <OperationAdd></OperationAdd>
           
           <OperationDisplay></OperationDisplay>
           
        </div>
    )
}


export const MainPage = () => {
    return (
    <div>
        <div className="page-box">

            <Sidebar/>
      
            <Content/>

        </div>
    </div>
    )
}




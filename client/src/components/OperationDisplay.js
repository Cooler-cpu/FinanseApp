import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {fetchSpendings} from '../redux/actions'
import Button from '@material-ui/core/Button';


const OperationDisplayMenuTooday = props => {
    return(
    
    <div className="operation_view_last_item_body">
        За сегодня
    </div>
         
    )
}


const OperationDisplayMenuAll = props => {


    const content = props.dataSpending.map((item, index) =>
    
    <div key={item._id} className="operation_view_item_body">
    
        <div className="operation_view_item_info">

            <span>{item.date.slice(0, 10)}</span>
            <p className="operation_view_item_info_category">
                {item.category}
            </p>

            <div className="operation_view_item_info_description">
                <p>{item.note}</p>
            </div>

        </div>
        <div className="operation_view_item_info_cost">
            <p>{item.cost} ₽</p>
        </div>
        
    </div>
  );

    return(

    <div>
        {content}
    </div>

    )
}


const OperationDisplayMenu = props => {
    const display = props.display;
    const dataSpending = props.dataSpending;


        if (display) {
            return( 

                <OperationDisplayMenuAll dataSpending={dataSpending}/>

            )
          }
        else{

          return (
         
                <OperationDisplayMenuTooday dataSpending={dataSpending}/>

          )

        }
}


const navItemStyles = {
    border: "1px dotted #333",
    lineHeight: '31px'
  };
  

const OperationDisplay = ( {props} ) => 
{
    const [display, setDisplay] = useState(false);
    const dataNow = new Date().getDate();

    const Spends = useSelector(state => state.data.fetchedSpendings)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpendings());
      }, []);

    return(
        <div className="dash_board_from__box">
            <div className="dashBoardViewOperations">
                <div className="dashBoardViewOperations_nav">

                       <div className="dashBoardViewOperations_nav_item ViewOperationNavItem1" >

                            <Button className="OperationsButton" onClick={() => setDisplay(0)}>Записи за {dataNow} января</Button>
                            
                        </div>

                        <div className="dashBoardViewOperations_nav_item ViewOperationNavItem2" >

                            <Button className="OperationsButton" onClick={() => setDisplay(1)}>Все записи</Button>

                        </div>

                </div>

                <div className="dashBoardViewOperations_display">
                
                    <OperationDisplayMenu display={display} dataSpending={Spends}/>
                 
                </div>
            </div>
        </div>
    )

}

export default OperationDisplay
import React, { useEffect, useState } from 'react';

//redux
import {useDispatch} from 'react-redux'
import {todayRecords, AllRecords} from '../redux/actions'
import {connect} from 'react-redux'

//UX
import Button from '@material-ui/core/Button';

import styled from 'styled-components';

const ButtonRow = styled.button`
    color: #000000;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 1px solid #20B2AA;
    border-radius: 3px;

    &:hover {
        color: #CD853F;
        background-color: #E0FFFF;
        cursor: pointer;
      }
`;

const ButtonHide = styled.button`
    color: #000000;
        font-size: 1em;
        margin: 1em;
        padding: 0.25em;
        border: 1px solid #20B2AA;
        border-radius: 20px;

        &:hover {
            color: #CD853F;
            background-color: #E0FFFF;
            cursor: pointer;
        }
`




const OperationGetRowButton = props => {

    const max_row = props.max_row;
    const onlyHideButtonState = props.onlyHideButtonState;

    const [buttonHideState, buttonHideStateSet] = useState(false); 


    const handleButtonOnclick = () => {
        props.onHandleButtonOnclick(max_row + 5);
        buttonHideStateSet(true);
    }

    const handleButtonHideOnclick = () => {
        props.onHandleButtonOnclick(4);
        buttonHideStateSet(false);
    }

    if(onlyHideButtonState){
        return(
        <div className="operation_view_item_body">
             <ButtonHide 
                    onClick={handleButtonHideOnclick}
                    >
                    Скрыть все
            </ButtonHide>
        </div>
        )
    }else{
        return(
            <div className="operation_view_item_body">
                <ButtonRow
                onClick={handleButtonOnclick}
                >
                    Загрузить еще записи
                </ButtonRow>

                {buttonHideState ? (
                <div>
                    <ButtonHide 
                    onClick={handleButtonHideOnclick}
                    >
                    Скрыть
                    </ButtonHide>
                </div>
                ) : null}
            </div>
        )
    }
}


const OperationRow = props => {
    const category = props.data.category;
    const date = props.data.date;
    const note = props.data.note;
    const type = props.data.type;

    if(type === "earn"){
        var cost = <p style={{color: "green"}}>{props.data.cost}</p>
    }else{
        var cost = <p>{props.data.cost}</p>
    }

    return(
        <div className="operation_view_item_body">
             <div className="operation_view_item_info">
                 <span>
                     {date.slice(0, 10)}
                </span>
                 <p className="operation_view_item_info_category">
                     {category}
                 </p>
                 <div className="operation_view_item_info_description">
                     <p>{note}</p>
                 </div>
             </div>
             <div className="operation_view_item_info_cost">
                    {cost}
             </div>
         </div>
    )
}   


const OperationDisplayMenuTooday = props => {

        let Records = props.Records;

        const rows = [];
        const buttonGetRow = [];
        let RecordIndex = 0;

        const [max_row, max_rowSet] = useState(4);

        const handleButtonOnclick = (max_row) => {
            max_rowSet(max_row)
        }

        Records.map((item, index) => {
            if(index <= max_row){
            rows.push(
                <OperationRow 
                    key={item._id}
                    data={item}
                />
                )
            }
              RecordIndex = index; 
        });
          if(RecordIndex > max_row){
         buttonGetRow.push(
         <OperationGetRowButton 
            onHandleButtonOnclick={handleButtonOnclick} 
            max_row={max_row}
            record_index={RecordIndex}
            onlyHideButtonState={false}
            />
            );
         }
        else{
          if(RecordIndex > 4)
                
                buttonGetRow.push(
                <OperationGetRowButton 
                onHandleButtonOnclick={handleButtonOnclick} 
                max_row={max_row}
                record_index={RecordIndex}
                onlyHideButtonState={true}
                />
                )
        }

        return(
            <div>
                {rows}
                {buttonGetRow}
            </div>
        )

}



const OperationDisplayMenu = props => {
    const display = props.display;
    const allRecords = props.allRecords;
    const todayRecords = props.todayRecords;


        if (display) {
            return( 

                <OperationDisplayMenuTooday Records={allRecords}/>

            )
          }
        else{

          return (
         
                <OperationDisplayMenuTooday Records={todayRecords}/>
          )

        }

}
  

const OperationDisplay = ( { allRecords, TodayRecords} ) => 
{
    const [display, setDisplay] = useState(false);
    const dataNow = new Date().getDate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(todayRecords());
        dispatch(AllRecords());
    }, []);

    return(
        <div className="dash_board_from__box">
            <div className="dashBoardViewOperations">
                <div className="dashBoardViewOperations_nav">
                       <div className="dashBoardViewOperations_nav_item ViewOperationNavItem1" >
                             {display ? 
                                <Button className="OperationsButton"  
                                onClick={() => setDisplay(0)}>
                                    Записи за {dataNow} января
                                </Button>   
                             : 
                                <Button className="OperationsButton" style={{ background: 'radial-gradient(white, #FFA9A1)'}}
                                onClick={() => setDisplay(0)}>
                                    Записи за {dataNow} января
                                </Button>} 

                        </div>
                        <div className="dashBoardViewOperations_nav_item ViewOperationNavItem2" >
                            {display ? 
                                <Button className="OperationsButton" 
                                style={{ background: 'radial-gradient(white, #FFA9A1)'}}  
                                onClick={() => setDisplay(1)}>
                                    Все записи
                                </Button>
                             : 
                                <Button className="OperationsButton"
                                onClick={() => setDisplay(1)}>
                                    Все записи
                                </Button>} 
                        </div>
                </div>
                <div className="dashBoardViewOperations_display">
                    <OperationDisplayMenu display={display}  allRecords={allRecords} todayRecords={TodayRecords}/>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {

    return {
        allRecords: state.data.allRecords,
        TodayRecords: state.data.todayRecords
    }
}
export default connect(mapStateToProps, null)(OperationDisplay)


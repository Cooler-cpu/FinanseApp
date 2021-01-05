import React from 'react'
import {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import ModalWindow from '../components/ModalWindow'

// import ValuteImg from '../iconsValute.png';

import ValuteImg from '../img/iconsValute.png';

//redux 
import {setBalanseFetch} from '../redux/actions'
import {useDispatch, useSelector} from 'react-redux'


const Sidebar = ( {syncBalanse} ) => {

    const dispatch = useDispatch();
    const balanse = useSelector(state => state.data.balanse)

    useEffect(() =>{
        dispatch(setBalanseFetch());
    })
    
    return(

        <div className="sidebar">
            <div className="sidebar-box" >
                <div className="sidebar-box_info">
                    <div className="sidebar-box_info_balance">
                        <p className="text_underline">Баланс:</p>
                        <div className="sidebar-box_info_balance__currently">
                    
                            <p> {syncBalanse} </p>
    
                            <img src={ValuteImg} alt="pizza1" className="valute_item-preview"/>

                        </div>
                    </div>
                </div>
                
                <div className="button-modal_balanse__open">
                    <ModalWindow buttonOpenModalName="Добавить счет"/>
                </div>
            </div>
        </div>

    )

}


const mapStateToProps = state => {

    return {
        syncBalanse: state.data.balanse
    }
}


export default connect(mapStateToProps, null)(Sidebar)
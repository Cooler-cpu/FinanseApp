import React from 'react'
import {useEffect} from 'react';
import {connect} from 'react-redux'
import ModalWindow from '../components/ModalWindow'
import {NavLink} from 'react-router-dom'


import ValuteImg from '../img/iconsValute.png';

//redux 
import {setBalanseFetch} from '../redux/actions'
import {useDispatch} from 'react-redux'


const Sidebar = ( {syncBalanse} ) => {

    const dispatch = useDispatch();

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
                    <ModalWindow buttonOpenModalName="Изменить баланс"/>
                </div>

                <div className="button-add_target__open">

                <NavLink to="/target">
                    <a class="atuin-btn">Добавить цель</a>
                </NavLink>
                       
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
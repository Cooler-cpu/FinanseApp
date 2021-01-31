import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hooks' 
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

import piechartImg from '../img/piechart.png';

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()

    const {loading, error, request, clearError} = useHttp()
    const  [form, setForm] = useState({      // get the current state of the form
        email: '', password: ''
    })

    // if error object changes throw message on client
    useEffect( () => { // if have a error 
        message(error)
        clearError()
    }, [error, message, clearError])  // add dependencies

    useEffect(() => {
        window.M.updateTextFields()
      }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})  // get data from the form, transfer it from api
    }

    // registration api
    const registerHandler = async () =>{  
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data', data)
            message(data.message)     // message as a result of successful registration
        } catch (e) {

        }
    }
    // login api
    const loginHandler = async () => {
        try{                                                                 // if user login
            const data = await request('/api/auth/login', 'POST', {...form}) //get json with the token and user id 
            auth.login(data.token, data.userId)    
        } catch (e){
            console.log("error login handler", e);
        }
    }

    return (
        //<div className="row">
        <div className="row">
                <div className="auth_logo">
             
                    <h1 className="auth_logo_fst">
                        Finanse
                    </h1>
                    <h1 className="auth_logo_sec">
                        Guru
                    </h1>
     
                    <div className="auth_logo_label">
                        <p>Домашняя бухгалтерия онлайн</p>
                    </div>
                </div>

                

                <div className="auth_display_wrapper">

                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Авторизация</span>
                            <div>
                                <div className="input-field">
                                    <input placeholder="Введите email" 
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    onChange = {changeHandler}
                                    autoComplete="off"
                                    />
                                    <label htmlfor="first_name">email</label>
                                </div>
                                <div className="input-field">
                                    <input placeholder="Введите пароль" 
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange = {changeHandler}
                                    autoComplete="off"
                                    />
                                    <label htmlfor="first_name">password</label>
                                </div>
                            </div>
                            <div className="card-action">
                                <button className="btn yellow darken-4" 
                                style={{marginRight: 10}}
                                disabled={loading}
                                onClick={loginHandler}
                                >
                                    Sign in
                                </button>
                                <button 
                                className="btn grey lighten-1 black-text"
                                onClick={registerHandler}
                                disabled={loading}
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="display_main_info">
                        <div className="display_main_info_wrapper">
                            <div className="display_main_info_img">
                                <img src={piechartImg} alt="pizza1" className="valute_item-preview"/>
                            </div>
                            <div className="display_main_info_label">
                                <h1>Узнайте, на что уходят <br/> Ваши деньги</h1>
                            </div>
                        </div>
                        <div className="display_main_info_label-signUp">
                                <h1>Чтобы начать работу, пожалуйста, зарегистрируйтесь..</h1>
                                <h1>Регистрация бесплатна и потребует нескольких секунд</h1>
                        </div>
                    </div>

                </div>
                {/* <div className="footer-logo">
                    <p>© FinanseGuru ™ 2020-2021</p>
                </div> */}
        </div>
    )
}
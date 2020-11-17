import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hooks' 
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

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
            //console.log(data.token, data.userId);
            auth.login(data.token, data.userId)    
        } catch (e){
            console.log("error login handler", e);
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>FinanseGuru</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Input email" 
                                id="email"
                                type="text"
                                name="email"
                                className="yellow-input"
                                onChange = {changeHandler}
                                />
                                <label htmlfor="first_name">email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Input password" 
                                id="password"
                                type="password"
                                name="password"
                                className="yellow-input"
                                onChange = {changeHandler}
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
        </div>
        </div>
    )
}
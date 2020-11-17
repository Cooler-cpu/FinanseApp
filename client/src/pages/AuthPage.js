import React, { useState } from 'react'
import {useHttp} from '../hooks/http.hooks'

export const AuthPage = () => {
    const {loading, error, request} = useHttp()
    const  [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () =>{
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data', data)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>FinanseGuru</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authenticated</span>
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
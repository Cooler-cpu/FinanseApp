import React from 'react'
import Button from '@material-ui/core/Button';
import {BalanseSetter} from '../API/BalanseSetterAPI'

import {connect} from 'react-redux'
import {setBalanse} from '../redux/actions'

import {useState} from 'react'


const ModalWindowUIEditBalanse = (props) => {
    
    const [form, setForm] = useState({      
        balanse: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})  
    }

    const handleSubmit = event => {
        const balanse = Number(form.balanse);
        BalanseSetter(balanse);
        props.setBalanse(balanse);

    }


    return(
        <div className="modal">
            <form>
                <label className="modal-form_balanse__label">
                Введите баланс:
                <input type="number" name="balanse" onChange={changeHandler} />
                </label>
                
                <Button value="Отправить" variant="contained" color="primary" onClick={handleSubmit}>
                Записать
                </Button>
            </form>
            
        </div>
    )
}



const mapDispatchToProps = {
    setBalanse
}

export default connect(null, mapDispatchToProps)(ModalWindowUIEditBalanse)
import React from 'react'
import Button from '@material-ui/core/Button';
import balanseSetter from '../API/BalanseSetterAPI'

import {connect} from 'react-redux'
import {setBalanse} from '../redux/actions'

class ModalWindowUIEditBalanse extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        
        const balanse = Number(this.state.value);

        console.log(this.props.setBalanse(balanse));
    
        balanseSetter(this.state.value);
        event.preventDefault();
        this.setState( {value: ''}) 
    }

    render(){
        return(
            <div className="modal">
                <form onSubmit={this.handleSubmit}>
                    <label className="modal-form_balanse__label">
                    Введите баланс:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                   
                    <Button  type="submit" value="Отправить" variant="contained" color="primary">
                    Записать
                    </Button>
                </form>
               
            </div>
        )
    }
}


const mapDispatchToProps = {
    setBalanse
}

export default connect(null, mapDispatchToProps)(ModalWindowUIEditBalanse)
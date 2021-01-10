import React, { Component, useEffect } from 'react';
import balanseSetter from '../API/BalanseSetterAPI'

// TextField Input UI
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Button UI
import Button from '@material-ui/core/Button';

// redux
import {setBalanseFetch} from '../redux/actions'
import {useDispatch} from 'react-redux'
import {pushSpending} from '../redux/actions'


const OperationAdd_Spending = ( {props} ) => {

        const dispatch = useDispatch();

        const [valuesCost, setValues] = React.useState({
            note: '',
            cost: '',
            category: '',
        });
    
        const handleChange = (prop) => (event) => {
            setValues({ ...valuesCost, [prop]: event.target.value});
        }

        const ButtonEvent = (e) => {


            //dispatch(setBalanseFetch(valuesCost.cost));
            dispatch(pushSpending(valuesCost.cost, valuesCost.category, valuesCost.note));

            console.log(valuesCost.note);
            console.log(valuesCost.cost);
            console.log(valuesCost.category);  
        };



    return(

        <div className="operationAdd_form">
            <div className="operationAdd_form_inputNode">
                <div className="operationAdd_form_inputNode_title">
                    <p>Примечание: </p>
                </div>
                <form className="operationAdd_form__Input" noValidate autoComplete="off">
                    <TextField 
                    id="filled-basic" 
                    label="" 
                    variant="filled" 
      
                    value={valuesCost.note}
                    onChange={handleChange('note')}
                    />

                    <TextField
                        id="standard-number"
                        label="Цена"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange('cost')}
                    />
                    
                </form>
               
            </div>

        
         <div className="operationAdd_form_inputNode">
            <div className="operationAdd_form_inputNode_title">
                    <p>Категория: </p>
                </div>
                <div className="operationAdd_form__Input">
        
                        <FormControl>
                            <Select
                            value={valuesCost.category}
                            onChange={handleChange('category')}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value="">
                                <em value={'Без категории'}>Без категории</em>
                    
                            </MenuItem>
                            <MenuItem value={'Жилье'}>Жилье</MenuItem>
                            <MenuItem value={'Отдых'}>Отдых</MenuItem>
                            <MenuItem value={'Питание'}>Питание</MenuItem>
                            <MenuItem value={'Покупки'}>Покупки</MenuItem>
                            <MenuItem value={'Связь'}>Связь</MenuItem>
                            <MenuItem value={'Транспорт'}>Транспорт</MenuItem>
                            </Select>
                            <FormHelperText>Категория затрат</FormHelperText>

                        
                        </FormControl>
                        <Button onClick={ButtonEvent} variant="contained" >Записать</Button> 
                    </div>
            </div> 
        
        </div>
    )
}

const OperationAdd_Salary = props => {
    const dispatch = useDispatch();

        const [valuesCost, setValues] = React.useState({
            note: '',
            cost: '',
            category: '',
        });
    
        const handleChange = (prop) => (event) => {
            setValues({ ...valuesCost, [prop]: event.target.value});
        }

        const ButtonEvent = (e) => {


            //dispatch(setBalanseFetch(valuesCost.cost));
            //dispatch(pushSpending(valuesCost.cost, valuesCost.category, valuesCost.note));

            console.log(valuesCost.note);
            console.log(valuesCost.cost);
            console.log(valuesCost.category);  
        };

    return(

        <div className="operationAdd_form">
            <div className="operationAdd_form_inputNode" style={{marginTop: 8 + 'px'}}>
                <div className="operationAdd_form_inputNode_title">
                    <p>Примечание: </p>
                </div>
                <form className="operationAdd_form__Input" noValidate autoComplete="off">
                    <TextField 
                    id="filled-basic" 
                    label="" 
                    variant="filled" 
      
                    value={valuesCost.note}
                    onChange={handleChange('note')}
                    />

                    <TextField
                        id="standard-number"
                        //label="Цена"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        
                        onChange={handleChange('cost')}
                    />
                    
                </form>
               
            </div>

        
         <div className="operationAdd_form_inputNode" style={{marginTop: 8 + 'px'}}>
            <div className="operationAdd_form_inputNode_title">
                    <p>Категория: </p>
                </div>
                <div className="operationAdd_form__Input">
        
                        <FormControl>
                            <Select
                            value={valuesCost.category}
                            onChange={handleChange('category')}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value="">
                                <em value={'Без категории'}>Без категории</em>
                    
                            </MenuItem>
                            <MenuItem value={'Зарплата'}>Зарплата</MenuItem>
                            <MenuItem value={'Другое'}>Другое</MenuItem>
                            </Select>
                            <FormHelperText>Категория затрат</FormHelperText>

                        
                        </FormControl>
                        <Button onClick={ButtonEvent} variant="contained" >Записать</Button> 
                    </div>
            </div> 
        
        </div>
    )    
}

const OperationAddForm = props => {
    const display = props.display;

        if (display) {
            return( 
            <OperationAdd_Spending/>
            )
          }
        else{

          return (
            <OperationAdd_Salary/>
          )

        }
}


export default class OperationAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            display: true,
            color1: "#FFF",
            color2: "#FFF",
            background_color1: "#EF852F",
            background_color2: "#EF852F",
            border_color: "#EF852F",

        };
    }


    HandleClicker1 = () => {
        this.setState(({ display }) => (
            {display: true,
             color1: "#FFF",
             background_color1: "#FFF",
             color2: "#FFF",
             background_color2: "#EF852F",
             border_color: "#EF852F"
            }
        ));
    }

    HandleClicker2 = () => {
        this.setState(({ display }) => (
            {display: false,
                color1: "#FFF",
                background_color1: "#EF852F",
                color2: "#7FFF00",
                background_color2: "#FFF",
                border_color: "#7FFF00"
            }
        ));
    }


    render() {
        return(
            
            <div className="dash_board_from__box" style={{border: "5px solid " + this.state.border_color, borderRadius: 5}}>  
                <div className="operationAdd">
                    {/* <OperationNav/> */}
                    <div className="operationAdd_nav" style={{ backgroundColor: this.state.border_color}}>
                        <div className="operationAdd_nav_block block_border" onClick={this.HandleClicker1} style={{background: this.state.border_color, color: this.state.color1}}>
                            <p>Расход</p>

                        </div>
                        <div className="operationAdd_nav_block" onClick={this.HandleClicker2} style={{background: this.state.background_color2, color: this.state.color2}}>
                            <p>Доход</p>
                        </div>
                    </div>
                   {

                    this.state.display ? <OperationAddForm display={true}/> : <OperationAddForm display={false}/>
                   
                   }
                   {/* <OperationAddForm/> */}
                </div>         
            </div>
        )
    }

}

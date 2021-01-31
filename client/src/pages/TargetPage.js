import React from 'react'
import styled from 'styled-components';

import {connect} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

//img

import arrow from '../img/icons8-стрелка-48.png';
import deleteButton from '../img/icons8-удалить-40.png'

function SidebarTarget(){
  return(
    <div className="sidebar sidebar-target">
      <p>Финансовые цели удобны, когда требуется накопить сумму на какую-то серьезную трату.
Добавьте собственные цели или воспользуйтесь примерами ниже.</p>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  width: {
    minWidth: 80,
    paddingRight: 0,
  },
  width2: {
    maxWidth: 140,
  },
  formColor: {
    backgroundColor: '#F5FFFA',
    borderRadius: 10
  },
  button:{
    width: 100,
    background: 'linear-gradient(to top left, powderblue, pink)',
    fontWeight: 'bold'
  }
  
}));

const ArrowGradient = styled.div`
  background-image: url(${arrow});
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  position: relative;
  margin-right: 10px;
`

const DeleteButton = styled.div`
  background-image: url(${deleteButton});
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  position: relative;
  margin-left: 40px;
`


function TargetAdd( props ){

  const classes = useStyles();

  const [stateTarget, setValues] = React.useState({
    TargetName: '',
    TargetCost: '',
    month: '',
    year: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...stateTarget, [prop]: event.target.value});

  }

  const ButtonEvent = (e) => {

    console.log(stateTarget);

  }


  return(
      <div className="content target_content">
        <div className="pagetitle">
                  Финансовые цели
        </div>
         
        <div className="target_form">
          
            <div className="target_form_box">

              <h1>Новая цель</h1>
              

              <div className="input-field_title">
                <p>Название </p>
              </div>

              <div class="input-field inline">
                
    
                <input id="email_inline" 
                type="email" 
                class="validate"
                value={stateTarget.TargetName}
                onChange={handleChange('TargetName')}
                />
                <label for="email_inline"></label>

              </div>

              <TextField
              
              id="outlined-number"
              label="Сумма для цели"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleChange('TargetCost')}
              />

              <div className="balanse_current">
                <h1>Сумма вашего баланса: </h1>

                <h1>{props.balanse}</h1>

              </div>
              

              <div className="progress-form_box">


                  <div className="progress-form_box__note">
                    <p>Дата окончания</p>
                  </div>

                  <div className="progress-form_box__date">
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-native-label-placeholder">
                        
                      </InputLabel>
                      <NativeSelect
                        value={stateTarget.month}
                        
                        className={classes.formColor}
                        onChange={handleChange('month')}
                      >
                        <option value={'01'}>Январь</option>
                        <option value={'02'}>Февраль</option>
                        <option value={'03'}>Март</option>
                        <option value={'04'}>Апрель</option>
                        <option value={'05'}>Май</option>
                        <option value={'06'}>Июнь</option>
                        <option value={'07'}>Июль</option>
                        <option value={'08'}>Август</option>
                        <option value={'09'}>Сентябрь</option>
                        <option value={'10'}>Октябрь</option>
                        <option value={'11'}>Ноябрь</option>
                        <option value={'12'}>Декабрь</option>

                      </NativeSelect>
                      <FormHelperText>месяц</FormHelperText>
                    </FormControl>
               

                    <FormControl className={classes.width, classes.formControl}>
                      <InputLabel shrink htmlFor="age-native-label-placeholder">
                        
                      </InputLabel>
                      <NativeSelect
                        value={stateTarget.year}
                        onChange={handleChange('year')}
                        className={classes.formColor}
                      >
                        <option value={'2021'}>2021</option>
                        <option value={'2022'}>2022</option>
                        <option value={'2023'}>2023</option>
                        <option value={'2024'}>2024</option>
                        <option value={'2025'}>2025</option>
                        <option value={'2026'}>2026</option>
                        <option value={'2026'}>2027</option>
                        <option value={'2028'}>2028</option>
                        <option value={'2029'}>2029</option>
                        <option value={'2030'}>2030</option>
                        <option value={'2031'}>2031</option>
                        <option value={'2032'}>2032</option>

                      </NativeSelect>
                      <FormHelperText>год</FormHelperText>
                    </FormControl>

                    <ArrowGradient/>

                  </div>  

                  <div className="progress-form_box__cost progress-form_box__date">

                    <TextField
                    id="outlined-number"
                    label="Ежемесячная сумма"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    className={classes.width2}
                    />
                  </div>  

                   

              </div>
            </div>   

            
            <div className="target-save__buton">

                    <Button onClick={ButtonEvent} size="medium" color="primary" className={classes.button}>
                      Сохранить
                    </Button>

                    <DeleteButton className="deleteButton"></DeleteButton>

            </div> 


        </div>
      </div>
  )
}


function TargetPage( {syncBalanse} ){
    
      return (
      <div>
        
            <div className="page-box">

                <TargetAdd balanse={syncBalanse}/>
                <SidebarTarget/>

            </div>
      </div>
      );
}

const mapStateToProps = state => {

  return {
      syncBalanse: state.data.balanse
  }
}

export default connect(mapStateToProps, null)(TargetPage)


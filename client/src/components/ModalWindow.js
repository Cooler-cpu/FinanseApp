import React from 'react'
import ModalPortal from '../Portal/ModalPortal'
import ModalWindowUIEditBalanse from '../components/ModalWindowUIEditBalanse';
import Button from '@material-ui/core/Button';

class ModalWindow extends React.Component{
    constructor(props){
        super(props);
        this.state = {showModal: false};

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    handleShow(){
        this.setState({showModal: true});
    }

    handleHide(){
        this.setState({showModal:false});
    }

    render(){
        const modal = this.state.showModal ? (
            <ModalPortal>

                <ModalWindowUIEditBalanse/>
                
   

                <Button onClick={this.handleHide} className="close-modal__button" variant="contained" color="primary">
                Закрыть
                </Button>

            </ModalPortal>
        ) : null;

        return (
            <div className="app">

                    <a className="waves-effect waves-light btn" onClick={this.handleShow}>{this.props.buttonOpenModalName}</a>

                {modal}
                 
            </div>
        )
    }
}

export default ModalWindow
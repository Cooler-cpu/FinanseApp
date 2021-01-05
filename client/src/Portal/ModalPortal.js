import React  from 'react'
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class ModalPortal extends React.Component {
    constructor(props){
        super(props);
        this.el = document.createElement('div');
    }
  
    // Append the element into the DOM on mount.
    componentDidMount(){
        modalRoot.appendChild(this.el);
    }
  
    componentWillUnmount(){
        modalRoot.removeChild(this.el);
    }
  
    render(){
        // Use a portal to render the children into the element
        return ReactDOM.createPortal(
            this.props.children,
            // A DOM element
            this.el, 
        );
    }
  }


export default ModalPortal
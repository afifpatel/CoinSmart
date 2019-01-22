import React, { Component } from 'react';
import {Modal,ButtonToolbar,Button,Form,FormGroup,FormControl,ControlLabel,Glyphicon} from 'react-bootstrap';

export default class AddMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newMessage: "",
            messages: this.props.message_list.slice(),
            showing: false,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.onChange=this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillReceiveProps(nextProps, nextState){
            if(nextProps.message_list !== this.props.message_list){
                this.setState({messages:nextProps.message_list});
            }
        }

    showModal() {
        this.setState({ showing: true });
    }

    hideModal() {
        this.setState({ newMessage:"",showing: false });
    }
    
    onChange(e){
        //update state on change
        this.setState({newMessage : e.target.value})
    }

    submit(e) {
        //add new message to message board
        e.preventDefault();
        this.hideModal();
        const form = document.forms.postMessage;
        console.log(`Message posted ${form.text.value}` );
        const newMessage ={
            id: 1 + Math.random(),
            message: this.state.newMessage.slice(),
            votes: 76
        };

        //copy current list of messages
        const message_list = this.state.messages.slice();

        //add new message to message list
        message_list.push(newMessage);
        
        //update localStorage
        localStorage.setItem("messages", JSON.stringify(message_list));

        //update state with new message list
        this.setState({
            messages : message_list.slice(),
            newMessage : ""
        });

        window.location.reload();
    }

    render(){
        return (
            <div onKeyDown={e => e.stopPropagation()}>
                <Button bsStyle="primary" style={{float : "right", marginBottom: "10px"}} onClick={this.showModal}><Glyphicon glyph="plus" /> Post New Message</Button>
                <Modal show={this.state.showing} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form name="postMessage">
                        <FormGroup>
                            <ControlLabel>Message</ControlLabel>
                            <FormControl name="text" componentClass="textarea" placeholder="Enter Message..." 
                                         value={this.state.newMessage} onChange={this.onChange}/>
                        </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonToolbar>
                            <Button type="button" bsStyle="primary"  onClick={this.submit} disabled={!this.state.newMessage.length}>Post</Button>
                            <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }

}


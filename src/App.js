import React, { Component } from 'react';
import {Table, Glyphicon, ButtonToolbar,Button, Panel, Col} from 'react-bootstrap';
import AddMessage  from './AddMessage.js';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      messages: []
    }
    this.upVote=this.upVote.bind(this);
    this.downVote=this.downVote.bind(this);
  }

  componentDidMount(){
    this.hydrateStateWithLocalStorage();
    setTimeout(()=>{
      let message_list = JSON.parse(localStorage.getItem("messages"))
      message_list.forEach(element => {
        element.votes--;
      });

      localStorage.setItem("messages", JSON.stringify(message_list));
      window.location.reload();
    },900000)
  }


  hydrateStateWithLocalStorage() {
    // console.log("Local Storage", localStorage.messages)
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let message = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          message = JSON.parse(message);
          //Filter top 50 votes 
          message= message.sort( (a,b) => b.votes-a.votes).slice(0,50);
          localStorage.setItem("messages",  JSON.stringify(message));
          this.setState({ [key]: message });

        } catch (e) {
          // handle empty string
          this.setState({ [key]: message });
        }
      }
    }
  }

  upVote(id){
    let message_list = JSON.parse(localStorage.getItem("messages"));
    let message_index = message_list.findIndex(x => x.id === id);
    message_list[message_index].votes++;

    localStorage.setItem("messages",JSON.stringify(message_list));
    window.location.reload();
    // console.log("Up Voted id", message );
  }

  downVote(id){
    let message_list = JSON.parse(localStorage.getItem("messages"));
    let message_index = message_list.findIndex(x => x.id === id);
    message_list[message_index].votes--;

    localStorage.setItem("messages",JSON.stringify(message_list));
    window.location.reload();
    // console.log("Down Voted", id);
  }

  render() {
    
    return (
        <div className="container-fluid" style={{marginTop : "20px"}}>
          <Panel bsStyle="info">
            <Panel.Heading>
              Message Board
            </Panel.Heading>
            <Panel.Body>
              <Col sm={12} >
                <AddMessage message_list={this.state.messages}/>
              </Col>
              <Col sm={12} >
                {this.state.messages.length !==0 ?
                <MessageTable messages={this.state.messages} upVote={this.upVote} downVote={this.downVote}/>
                :
                <p>Message board is empty. Please post a message</p>}
              </Col>
            </Panel.Body>
          </Panel>
        </div>
        
    );
  }
}

function MessageTable(props){

  const messageRows = props.messages.map( i => <MessageRow key={i.id} row_value={i} upVote={props.upVote} downVote={props.downVote}/>)
  
  return(
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th style={{width : "70%"}}>Message</th>
          <th style={{width : "20%"}}>Votes</th>
          <th style={{width : "10%", Align:"center"}}>Action</th>
          {/* <th></th> */}
        </tr>
      </thead>
      <tbody>{messageRows}</tbody>
    </Table>
  )

}

const MessageRow = (props) => {
  
  function onUpVote(){
    props.upVote(props.row_value.id)
  }
  function onDownVote(){
    props.downVote(props.row_value.id)
  }

  return(
    <tr>
      <td>{props.row_value.message}</td>
      <td>{props.row_value.votes}</td>
      <td>
        <ButtonToolbar>
          <Button bsSize="small" bsStyle="success" onClick={onUpVote}><Glyphicon glyph="thumbs-up" /></Button>
          <Button bsSize="small" bsStyle="danger" onClick={onDownVote}><Glyphicon glyph="thumbs-down" /></Button>
        </ButtonToolbar>
      </td>
    </tr>
  )

}



export default App;


    //Initialize random message board
    // console.log("At render state", this.state);
    // localStorage.removeItem("messages");
    // let message_list=[];
    //     for( let i=0; i<100; i++){
    //     let newMessage ={
    //       id: 1 + Math.random(),
    //       message: Math.random().toString(36).substring(7) ,
    //       votes: Math.round(Math.random() * (100 - 0) + 0)
    //   }
    // message_list.push(newMessage)
    // };
    // localStorage.setItem("messages",JSON.stringify(message_list));

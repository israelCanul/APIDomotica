import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCa1oVDevhEEIbPmqnO94O_RhyT2RFP8e4",
    authDomain: "domoticafamiliacanul.firebaseapp.com",
    databaseURL: "https://domoticafamiliacanul.firebaseio.com",
    projectId: "domoticafamiliacanul",
    storageBucket: "domoticafamiliacanul.appspot.com",
    messagingSenderId: "812354704853"
  };
firebase.initializeApp(config);
const db = firebase.firestore();


class Home extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
    this.renderRooms = this.renderRooms.bind(this);
  }
  componentWillMount(){
    let that = this;
    // Initialize Cloud Firestore through Firebase

    db.collection("Habitacion")
    .onSnapshot(function(querySnapshot) {
      var habitaciones = [];
        querySnapshot.forEach(function(doc) {
            habitaciones.push({id : doc.id , value : doc.data()});
        });
      //console.log("Current data: ", doc && doc.data());
      that.setState({data : habitaciones});
    });
  }
  componentDidMount(){

  }
  changeLever(room,id,estado,e){
    // console.log(room);
    // console.log(id);
    // console.log(estado);
    room.value[id].Estado = estado;
    db.collection("Habitacion").doc(room.id).update(room.value)
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }
  renderRooms(){
    let that = this;
    if(this.state.data != null){
      return this.state.data.map((item,id)=>{

        let room = item.id;
        let items = _.values(item.value);
        let controls = [];
        items.map((child,id)=>{
          //console.log(child);
          if(typeof child === 'object'){
            controls.push(
              <div className="row">
                <div className="col s2 m1"><i className={`material-icons ${child.Activo?child.Estado?"green-text":"red-text":"grey-text"}`} >flash_on</i></div>
                <div className="col s10 m5 black-text">
                  {child.id }
                </div>
                <div className="col s10 m5 offset-s2 blue-grey-text">
                  {child.Descripcion}
                </div>
                <div className="col s12 m1 ">


                      {child.Activo?
                        <a onClick={this.changeLever.bind(that,item,child.id,!child.Estado)} className="btn btn-floating pulse"><i className="material-icons">power_settings_new</i></a>
                        :
                        <a  className="btn btn-floating grey"><i className="material-icons">power_settings_new</i></a>
                      }



                </div>
              </div>
            );
          }
        });
        return (
          <li>
            <div className="collapsible-header" data-collapsible="expandable">
              <i className="material-icons">vpn_key</i>
              {room}
              <span className="badge">{items.length - 2} Controles</span></div>
            <div className="collapsible-body">
              {controls}
            </div>
          </li>
        );
      });
    }
  }
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h4>
            Control
            </h4>
            <blockquote>
              Aqui se encuentran las habitaciones Dadas de Alta.
            </blockquote>
          </div>
          <div className="col s12">
            <ul className="collapsible" data-collapsible="accordion">
              {this.renderRooms()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('app'));

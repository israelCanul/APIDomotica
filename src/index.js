import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';
import Item from './item_controls';
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
            controls.push(<Item fi={db} item={item} child={child} id={id} />);
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

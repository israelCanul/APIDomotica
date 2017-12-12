import React,{Component} from 'react';
import ReactDOM from 'react-dom';


class Item extends Component{
  constructor(props){
    super(props);
    this.state = {
      message : '',
      showMessage : false,
    }
    this.changeMessage = this.changeMessage.bind(this);
  }
  changeMessage(){
    let that = this;
    //that.setState({showMessage : false});
    setTimeout(()=>{
      that.setState({showMessage : false,showMessage : false});
    },3000);
  }
  changeLever(room,id,estado,e){
    let that = this;
    room.value[id].Estado = estado;
    this.props.fi.collection("Habitacion").doc(room.id).update(room.value)
    .then(function() {
        Materialize.toast('successfully written '+room.value[id].id, 4000); 
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }
  render(){
    let {child,id,item} = this.props;
    return(
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
                <a onClick={this.changeLever.bind(this,item,child.id,!child.Estado)} className="btn btn-floating pulse"><i className="material-icons">power_settings_new</i></a>
                :
                <a  className="btn btn-floating grey"><i className="material-icons">power_settings_new</i></a>
              }
        </div>
      </div>
    );
  }
}
export default Item;

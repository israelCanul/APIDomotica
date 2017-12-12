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
      <div className="card" style={{minHeight : "200px"}}>
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src="images/office.jpg" />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            <i className={`material-icons ${child.Activo?child.Estado?"green-text":"red-text":"grey-text"}`} >flash_on</i>
            {child.id }
            <i className="material-icons right">more_vert</i>
          </span>
          <p>{child.Descripcion}</p>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i></span>
          <p>
          <i className={`material-icons ${child.Activo?child.Estado?"green-text":"red-text":"grey-text"} left`} >flash_on</i>
          {`${child.id} - ${child.Activo?child.Estado?"Activo":"Inactivo":"No Disponible"}`}
          </p>
          <div className="chip">{`${child.type==1?"Contacto":child.type==2?"Apagador":""}`}</div>
          <p>
          {child.customValue}
          </p>
          {child.Activo?
            <a title="Activa/Desactivar" onClick={this.changeLever.bind(this,item,child.id,!child.Estado)} className="btn btn-floating pulse"><i className="material-icons">power_settings_new</i></a>
            :
            <a title="desactivado" className="btn btn-floating grey"><i className="material-icons">power_settings_new</i></a>
          }
        </div>
      </div>
    );
  }
}
export default Item;



// <div className="row">
//   <div className="col s2 m1 cont"><i className={`material-icons ${child.Activo?child.Estado?"green-text":"red-text":"grey-text"}`} >flash_on</i></div>
//   <div className="col s7 m5 black-text cont">
//     {child.id }
//   </div>
//   <div className="col s10 m5 offset-s2 blue-grey-text hide-on-small-only">
//     {child.Descripcion}
//   </div>
//   <div className="col s3 m1 ">
//         {child.Activo?
//           <a onClick={this.changeLever.bind(this,item,child.id,!child.Estado)} className="btn btn-floating pulse"><i className="material-icons">power_settings_new</i></a>
//           :
//           <a  className="btn btn-floating grey"><i className="material-icons">power_settings_new</i></a>
//         }
//   </div>
// </div>

var React = require('react');
var DefaultLayout = require('./layouts/default');


class HelloMessage extends React.Component {
  constructor(props){
    super(props);

  }
  componentWillMount(){

  }
  componentDidMount(){

  }
  render() {

      return(
      <DefaultLayout config={this.props.config}  title={"Mi titulo"}>
          <div id="app">Hello {this.props.name}</div>
      </DefaultLayout>
      );


  }
}

module.exports = HelloMessage;

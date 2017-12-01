var React = require('react');




class DefaultLayout extends React.Component {
  constructor(props){
    super(props);

  }
  componentDidMount(){

  }
  render() {

    return (
      <html>
        <head><title>{this.props.title}</title>

        </head>
        <body>{this.props.children}</body>
      </html>
    );
  }
}

module.exports = DefaultLayout;

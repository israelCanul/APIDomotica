var React = require('react');

class DefaultLayout extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>{this.props.title}</title>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"></link>


        </head>
        <body>
          {this.props.children}
          <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
          <script src="http://localhost:8080/js/common.js" charset="utf-8"></script>
          <script src="http://localhost:8080/js/index.js" charset="utf-8"></script>
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;

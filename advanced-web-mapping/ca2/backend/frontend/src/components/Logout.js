import React from 'react';

class Logout extends React.Component {
    componentDidMount() {
      this.props.onLogout();
    }
  
    render() {
      return (
        <div className="container mt-3">
          <h1>Logging out...</h1>
        </div>
      );
    }
  }
export default Logout
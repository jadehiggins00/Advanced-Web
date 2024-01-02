import React from 'react';

class Logout extends React.Component {
    componentDidMount() {
        if (typeof this.props.onLogout === 'function') {
          this.props.onLogout().then(() => {
            this.props.navigate('/login');
          }).catch(err => {
            console.error('Logout failed', err);
          });
        } else {
          console.error('onLogout prop is not a function or undefined');
        }
      }
      

  render() {
    return (
      <div className="container mt-3">
        <h1>Logging out...</h1>
      </div>
    );
  }
}

export default Logout;

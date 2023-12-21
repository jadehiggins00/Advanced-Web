import React, { Component } from "react";

export default class BirdHides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birdhides: []
    };
  }

  componentDidMount() {
    fetch('/api/birdhides/')
      .then(response => response.json())
      .then(data => {
        this.setState({ birdhides: data });
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }

  render() {
    const { birdhides } = this.state;

    return (
      <div>
        <h2>Bird Hides</h2>
        <ul>
          {birdhides.map(birdhide => (
            <li key={birdhide.id}>{birdhide.name} - {birdhide.location}</li>
          ))}
        </ul>
      </div>
    );
  }
}

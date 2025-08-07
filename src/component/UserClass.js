import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}, // Initialize as empty object
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/nillmishra");
    const json = await data.json();

    this.setState({
      userInfo: json,
    });

    console.log(json);
  }

  render() {
    const { name, location, login, avatar_url } = this.state.userInfo || {};

    return (
      <div className="user-card-container">
        <div className="user-card">
          <img src={avatar_url} alt="User Avatar" className="user-avatar" />
          <h2 className="user-name">Name: {name || "N/A"}</h2>
          <h3 className="user-location">Location: {location || "N/A"}</h3>
          <h4 className="user-contact">Contact: {login || "N/A"}</h4>
        </div>
        <div className="user-card">
          <img src={avatar_url} alt="User Avatar" className="user-avatar" />
          <h2 className="user-name">Name: {name || "N/A"}</h2>
          <h3 className="user-location">Location: {location || "N/A"}</h3>
          <h4 className="user-contact">Contact: {login || "N/A"}</h4>
        </div>
        <div className="user-card">
          <img src={avatar_url} alt="User Avatar" className="user-avatar" />
          <h2 className="user-name">Name: {name || "N/A"}</h2>
          <h3 className="user-location">Location: {location || "N/A"}</h3>
          <h4 className="user-contact">Contact: {login || "N/A"}</h4>
        </div>
        
      </div>
    );
  }
}

export default UserClass;

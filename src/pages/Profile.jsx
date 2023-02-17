import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import './Styles/Profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
    };
  }

  componentDidMount() {
    getUser().then((profile) => {
      this.setState({ profile });
    });
  }

  render() {
    const { profile } = this.state;
    return (
      <div>
        <Header />
        <main className="containerProfile">
          <section className="page-profile">
            <img data-testid="profile-image" src={ profile.image } alt={ profile.name } />
            <h3>{profile.name}</h3>
            <p>{profile.email}</p>
            <p>{profile.description}</p>
            <Link className="linkToEdit" to="/profile/edit">  ➡Edite seu perfil⬅</Link>
          </section>
        </main>
      </div>
    );
  }
}

export default Profile;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Styles/Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      image: '',
      name: '',
    };
  }

  componentDidMount() {
    getUser().then(({ name, image }) => {
      this.setState({
        image,
        name,
      });
    });
  }

  render() {
    const { name, image } = this.state;
    return (
      <header className="header" data-testid="header-component">
        <section className="header-bar">
          <img src={ image } alt={ name } />
          <p
            className="header-user"
            data-testid="header-user-name"
          >
            { `Bem vindo, ${name}` }
          </p>
          <nav className="slider-menu">
            <Link
              className="link"
              data-testid="link-to-search"
              to="/search"
            >
              {' '}
              🔍
              Search
              {' '}

            </Link>
            <Link
              className="link"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              {' '}
              ⭐
              Favorites
              {' '}

            </Link>
            <Link
              className="link"
              data-testid="link-to-profile"
              to="/profile"
            >
              {' '}
              👤
              Profile
              {' '}

            </Link>
          </nav>
        </section>
      </header>
    );
  }
}

export default Header;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import './Styles/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      onOff: true,
      name: '',
      loading: false,
    };
  }

  callCreateUser = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { name } = this.state;
    createUser({ name }).then(() => {
      const { history } = this.props;
      history.push('/search');
    });
  }

  enableButton = ({ target }) => {
    const value = 3;
    if (target.value.length >= value) {
      return this.setState({
        onOff: false,
        name: target.value,
      });
    }
    this.setState({ onOff: true });
  }

  render() {
    const { onOff, loading } = this.state;
    if (loading) {
      return (<div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>);
    }
    return (
      <main className="container">
        <h1 className="trybeTunes">🎶TrybeTunes🎶</h1>
        <section className="loginPage" data-testid="page-login">
          <p className="login-user-name">Nome Do Usuario:</p>
          <form className="login-form">
            <input
              className="inputName"
              data-testid="login-name-input"
              type="text"
              onChange={ this.enableButton }
            />
          </form>
          <button
            className="confirm-login"
            disabled={ onOff }
            data-testid="login-submit-button"
            name="send"
            type="submit"
            onClick={ this.callCreateUser }
          >
            🎉Entrar
          </button>
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.bool.isRequired,
};

export default Login;

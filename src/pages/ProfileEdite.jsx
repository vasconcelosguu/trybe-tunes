import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import './Styles/ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      disabled: true,
    };
  }

  componentDidMount() {
    getUser().then((profile) => {
      const { name, email, description, image } = profile;
      this.setState({ name, email, description, image });
    });
  }

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.turnOnButton);
  }

  ValidateEmailInput = (email, regex) => !!(regex.test(email))

  turnOnButton = () => {
    const { image, name, email, description } = this.state;
    const rgx = /\S+@\S+\.\S+/;
    const checkTheEmail = this.ValidateEmailInput(email, rgx);
    if (image && name && checkTheEmail && description) {
      console.log('chegou');
      this.setState({ disabled: false });
    } else {
      console.log('n chegou');
      this.setState({ disabled: true });
    }
  }

  sendUserInformations = (e) => {
    e.preventDefault();
    const { image, name, email, description } = this.state;
    updateUser({ name, email, image, description }).then(() => {
      const { history } = this.props;
      history.push('/profile');
    });
  }

  render() {
    const { name, email, description, disabled, image } = this.state;
    return (
      <div data-testid="page-profile-editn">
        <Header />
        <main className="mainProfileEdit">
          <form className="formEditProfile">
            Insira link da sua foto:
            <input
              className="inputNewName"
              name="image"
              type="text"
              data-testid="edit-input-image"
              defaultValue={ image }
              onChange={ this.onInputChange }
            />
            Insira novo nome:
            <input
              className="inputNewName"
              name="name"
              defaultValue={ name }
              onChange={ this.onInputChange }
              type="text"
              data-testid="edit-input-name"
            />
            Insira seu e-mail
            <input
              className="inputNewName"
              name="email"
              type="text"
              data-testid="edit-input-email"
              defaultValue={ email }
              onChange={ this.onInputChange }
            />
            Insira sua descrição:
            <textarea
              className="inputNewName"
              name="description"
              data-testid="edit-input-description"
              defaultValue={ description }
              onChange={ this.onInputChange }
            />
          </form>
          <button
            className="confirmChanges"
            type="submit"
            disabled={ disabled }
            data-testid="edit-button-save"
            onClick={ this.sendUserInformations }
          >
            ✨Salvar✨
          </button>
        </main>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;

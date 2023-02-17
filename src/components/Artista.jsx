import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Styles/Artista.css';

class Artista extends Component {
  render() {
    const { artist } = this.props;
    return (
      <div className="albumSong">
        <Link
          className="linkSong"
          to={ `/album/${artist.collectionId}` }
          data-testid={ `link-to-album-${artist.collectionId}` }
        >
          <img
            src={ artist.artworkUrl100 }
            alt={ artist.collectionName }
          />
          <p>Album:</p>
          <p>{ artist.collectionName }</p>
        </Link>
      </div>
    );
  }
}

Artista.propTypes = {
  artist: PropTypes.object,
}.isRequired;

export default Artista;

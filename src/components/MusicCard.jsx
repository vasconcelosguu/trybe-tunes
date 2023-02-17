import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Styles/MusicCard.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { songInfo } = this.props;
    const { trackId } = songInfo;
    getFavoriteSongs().then((songs) => {
      const checked = songs.some((song) => song.trackId === trackId);
      this.setState({ checked });
    });
  }

  addAndRemoveFavorite = ({ target }) => {
    this.setState({ loading: true }, () => {
      const { songInfo, takeMyFavoritesSongs } = this.props;
      if (target.checked) {
        addSong(songInfo).then(() => {
          this.setState({ loading: false, checked: true });
        });
      } else {
        removeSong(songInfo).then(() => {
          this.setState({ loading: false, checked: false }, takeMyFavoritesSongs);
        });
      }
    });
  }

  render() {
    const { loading, checked } = this.state;
    const { songInfo } = this.props;
    const { previewUrl, trackName, trackId } = songInfo;
    return (
      <>
        {loading && (<div className="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
                     </div>)}
        {!loading && (
          <main className="cardBlock">
            <section className="">
              <p>{trackName}</p>
              <audio src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </section>
            <input
              className="heart"
              onChange={ this.addAndRemoveFavorite }
              type="checkbox"
              id={ trackId }
              checked={ checked }
            />
            <label className="heartLabel" htmlFor={ trackId }> ❤</label>
          </main>
        )}
      </>
    );
  }
}

MusicCard.propTypes = {
  songInfo: PropTypes.object,
}.isRequired;

export default MusicCard;

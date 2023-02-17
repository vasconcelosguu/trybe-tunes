import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumInfo: [],
      artistName: '',
      albumName: '',
    };
  }

  componentDidMount() {
    this.generateSongs();
  }

  generateSongs = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    getMusics(id).then((result) => {
      this.setState({ albumInfo: result.filter((_item, i) => i > 0),
        artistName: result[0].artistName,
        albumName: result[0].collectionName,
      });
    });
  };

  render() {
    const { albumInfo, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="album-name">{albumName}</h3>
        <h3 data-testid="artist-name">{artistName}</h3>
        {albumInfo.map((songInfo) => (
          <MusicCard
            key={ songInfo.trackId }
            songInfo={ songInfo }
          />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Album;

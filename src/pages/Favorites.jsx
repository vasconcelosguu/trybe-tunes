import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      loading: false,
    };
  }

  componentDidMount = () => this.takeMyFavoritesSongs()

  takeMyFavoritesSongs = () => {
    this.setState({ loading: true });
    getFavoriteSongs().then((songs) => {
      this.setState({ songs, loading: false });
    });
  }

  render() {
    const { songs, loading } = this.state;
    if (loading) return <h4>Carregando...</h4>;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h2>⭐Suas Musicas Favoritas:⭐</h2>
        {songs.map((song) => (<MusicCard
          key={ song.trackId }
          songInfo={ song }
          takeMyFavoritesSongs={ this.takeMyFavoritesSongs }
        />))}
      </div>
    );
  }
}

export default Favorites;

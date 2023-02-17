import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Artista from '../components/Artista';
import './Styles/Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      onOff: true,
      input: '',
      loading: false,
      albums: [],
    };
  }

  searchSong = (e) => {
    const { input, albums } = this.state;
    this.setState({
      loading: true,
      preview: input,
    });
    e.preventDefault();
    searchAlbumsAPI(input).then((songOrBand) => {
      this.setState({
        input: '',
        loading: false,
        albums: songOrBand,
      });
    });
    if (albums.length === 0) {
      this.setState({ noResults: 'Nenhum álbum foi encontrado' });
    }
  }

  check = ({ target }) => {
    const minCharacteres = 2;
    this.setState({
      onOff: target.value.length < minCharacteres,
      input: target.value,
    });
  }

  render() {
    const { onOff, input, loading, albums, noResults, preview } = this.state;
    if (loading) {
      return (
        <div className="lds-roller">
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
      <>
        <h1 className="trybeTunes">🎶TrybeTunes🎶</h1>
        <div data-testid="page-search">
          <Header />
          <form>
            <input
              className="search"
              type="text"
              placeholder="Insira um álbum/artista🎶"
              data-testid="search-artist-input"
              onChange={ this.check }
              value={ input }
            />
          </form>
          <button
            className="buttonSearch"
            data-testid="search-artist-button"
            type="submit"
            disabled={ onOff }
            onClick={ this.searchSong }
          >
            🔎Pesquisar
          </button>
          {albums.length === 0 && <p>{noResults}</p>}
          {albums.length > 0 && (
            <main className="cardBox">
              <div className="card">
                {albums.map((artist) => (
                  <Artista
                    key={ artist.collectionId }
                    artist={ artist }
                  />
                ))}
              </div>
            </main>
          )}
        </div>
      </>
    );
  }
}

export default Search;

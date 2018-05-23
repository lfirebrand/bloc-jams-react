import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './Album.css';
import {Icon} from 'react-materialize';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
        album: album,
        currentSong: album.songs[0],
        currentTime: 0,
        duration: album.songs[0].duration,
        volume: 0.9,
        isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    }

    componentDidMount() {
      this.eventListeners = {
        timeupdate: e => {
          this.setState({ currentTime: this.audioElement.currentTime });
        },
        durationchange: e => {
          this.setState({ duration: this.audioElement.duration });
        },
        volumeupdate: e => {
          this.setState({ currentVolume: this.audioElement.duration });
        }
      };
      this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
    }

    componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
    }

    play() {
      this.audioElement.play();
      this.setState({ isPlaying: true });
    }

    pause() {
      this.audioElement.pause();
      this.setState({ isPlaying: false });
    }

    setSong(song) {
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song });
    }

    handleSongClick(song) {
      const isSameSong = this.state.currentSong === song;
      if (this.state.isPlaying && isSameSong) {
        this.pause();
      } else {
        if (!isSameSong) { this.setSong(song); }
        this.play();
      }
    }

    handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }

    handleNextClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex + 1);
      const newSong = this.state.album.songs[newIndex];

      if (newIndex < this.state.album.songs.length) {
      this.setSong(newSong);
      this.play();
    } else {
      this.setSong(this.state.album.songs[0]);
      this.play();
    }
  }

    handleTimeChange(e) {
      const newTime = this.audioElement.duration * e.target.value;
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime: newTime });
    }

    formatTime(e) {
      if (e){
        const minutes = Math.floor(e / 60);
        let seconds = Math.floor(e % 60);
        seconds = ((seconds) < 10) ? ("0" + seconds) : (seconds);
        const newTime = (minutes) + ":" + (seconds);
        return newTime;
      }
      else {
        return "-:--";
      }
    }

    handleVolumeChange(e) {
      const newVolume = e.target.value;
      this.audioElement.volume = newVolume;
      this.setState({ volume: newVolume });
    }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} />
            <h2 id="album-title">{this.state.album.title}</h2>
            <h4 className="artist">{this.state.album.artist}</h4>
            <div id="release-info"><p>{this.state.album.releaseInfo}</p></div>
        </section>
      <section className="songs">
        <table id="song-list" class="responsive-table">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-colum" />
          </colgroup>
          <thead>
            <tr>
              <th>Track</th>
              <th>Song</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.album.songs.map( (song, index) =>
              <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                <td className="song-actions">
                  <span className="song-number" data-title="Track Number">{index + 1}</span>
                </td>
                <td className="song-title" data-title="Song">{song.title}</td>
                <td className="song-duration" data-title="Duration">{this.formatTime(song.duration)}</td>
                <button className={this.state.isPlaying && this.state.currentSong === song ? 'waves-effect waves-light btn btn-active' : 'waves-effect waves-light btn'}>
                <Icon small>{this.state.isPlaying && this.state.currentSong === song ? 'pause' : 'play_arrow'}</Icon>
                </button>
              </tr>
              )
            }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          formatTime={this.formatTime(this.state.currentTime)}
          duration={this.audioElement.duration}
          formatDuration={this.formatTime(this.state.duration)}
          volume={this.state.volume}
          newVolume={this.state.newVolume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
        </section>
      </section>
    );
  }
}

export default Album;

import React, { Component } from 'react';
import './PlayerBar.css';
import {Icon} from 'react-materialize';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button id="previous" class="waves-effect waves-light btn" onClick={this.props.handlePrevClick}>
            <Icon>skip_previous</Icon>
          </button>
          <button id="play-pause" class="waves-effect waves-light btn" onClick={this.props.handleSongClick}>

            <Icon>{this.props.isPlaying ? 'pause' : 'play_arrow'}</Icon>
          </button>
          <button id="next" class="waves-effect waves-light btn" onClick={this.props.handleNextClick}>
            <Icon>skip_next</Icon>
          </button>
        <br></br>
        </section>
        <section id="time-control">
          <div className="current-time">{this.props.formatTime}</div>
          <input
            type="range"
            className="seek-bar"
            value={(this.props.currentTime / this.props.duration) || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
        <div className="total-time">{this.props.formatDuration}</div>
        </section>
        <br></br>
        <section id="volume-control">
          <table>
          <tr>
          <td>
          <Icon>volume_down</Icon>
          </td>
          <td>
          <input
            type="range"
            className="seek-bar"
            value={(this.props.volume) || 0}
            max="1"
            min="0"
            step="0.1"
            onChange={this.props.handleVolumeChange}
            />
          </td>
          <td>
          <Icon>volume_up</Icon>
          </td>
          </tr>
        </table>
        </section>
      </section>
    );
  }
}

export default PlayerBar;

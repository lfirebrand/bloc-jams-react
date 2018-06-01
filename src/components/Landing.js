import React from 'react';
import './Landing.css';
import {Icon, Row, Col} from 'react-materialize';

const Landing = () => (
  <div>
  <header>
  <h1>Welcome to Bloc Jams</h1>
  </header>

  <section className="parallax-image">
  <span className="cta-header">Start Listening</span>
  <a href="/library" className="cta">
  <Icon medium>play_arrow</Icon>
  </a>
  </section>


    <section className="landing">

    <h1 className="hero-title">Turn the music up!</h1>
  <section className="selling-points">
    <Row>
    <div className="point">
      <Col s={4}>
      <Icon large>music_note</Icon>
      <h4 className="point-title">Choose your music</h4>
      <p className="point-description grey-text text-darken-3 lighten-3">The world is full of music; why should you have to listen to music that someone else chose?</p>
      </Col>
      </div>
    <div className="point">
      <Col s={4}>
      <Icon large>not_interested</Icon>
      <h4 className="point-title">Unlimited, streaming, ad-free</h4>
      <p className="point-description">No arbitrary limits. No distractions.</p>
      </Col>
    </div>
    <div className="point">
      <Col s={4}>
      <Icon large>mobile_friendly</Icon>
      <h4 className="point-title">Mobile enabled</h4>
      <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
      </Col>
    </div>
    </Row>
    </section>
    </section>
  </div>
);

export default Landing;

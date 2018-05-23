import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import {Navbar, NavItem, Icon} from 'react-materialize';

var Logo = <img src={"/assets/images/bloc_jams_logo.png"} alt="Bloc Jams Logo" />

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav class="lime">
          <Navbar brand={Logo} right>
            <NavItem href="/"><Icon>home</Icon></NavItem>
            <NavItem href="/library"><Icon>library_music</Icon></NavItem>
          </Navbar>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;

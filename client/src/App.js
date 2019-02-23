import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/users/users';
import Products from './components/products/products';
import PostForm from './components/posts/postforms';
import Header from './components/header/header';
import Footer from './components/footer/footer';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/*<Users />*/}
          <PostForm />
        </header>
        <Products />
        <Footer />
      </div>
    );
  }
}

export default App;

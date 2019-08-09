import React from 'react';
import {Provider} from 'react-redux'
import store, {history} from './store/store'
import { Route, Switch,Router } from 'react-router-dom';
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Feed from './components/Feed/Feed'
import Login from './components/Login/Login'
import Registration from './components/Register/Register'
import AddArticle from './components/AddArticle/AddArticle';
import ArticlePage from './components/ArticlePage/ArticlePage';
import Settings from './components/ProfilePage/ProfilePage';
import './styles.css'

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/feed' component={Feed}/>
          <Route path='/register' component={Registration}/>
          <Route path='/add' component={AddArticle}/>
          <Route path='/profile' component={Settings}/>
          <Route path='/article/:slug' component={ArticlePage}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

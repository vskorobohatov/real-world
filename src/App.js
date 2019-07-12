import React from 'react';
import {Provider} from 'react-redux'
import store, {history} from './store/store'
import { Route, Switch,Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Registration from './components/Register/Register'
import AddArticle from './components/AddArticle/AddArticle';
import ArticlePage from './components/ArticlePage/ArticlePage';
import './styles.css'
import Container  from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
  container:{
    backgroundColor:"white",
    padding:"0px",
    paddingBottom:"25px",
    minHeight:"85vh",
    borderRadius:"10px",
    marginBottom:"20px"
  },
}));


function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <Router history={history}>
        <Container className={classes.container}>
          <Header/>
          <div className="siteName">Real world</div>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Registration}/>
            <Route path='/add' component={AddArticle}/>
            <Route path='/article/:id' component={ArticlePage}/>
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;

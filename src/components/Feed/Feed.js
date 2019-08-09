import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Article from '../Article/Article';
import { createStructuredSelector } from 'reselect';
import { getAllArticles } from '../../selectors/getAllArticles';
import { getAllTags } from '../../selectors/getAllTags';
import { getUser } from '../../selectors/getUser';
import { loadArticles } from '../../actions/loadArticles';
import { loadTags } from '../../actions/loadTags';
import { bindActionCreators } from 'redux';

const useStyles = makeStyles(theme => ({
  button: {
    marginBottom: theme.spacing(2),
    border:"1px solid #5CB85C",
    color:"#5CB85C"
  },
  input: {
    display: 'none',
  },
  links:{
    textDecoration:"none",
    color: "white"
  },
  tagCol:{
    paddingLeft:"5px !important", 
    margin:"0px",
  },
  tagBlock:{
    padding:"5px",
  },
  tagTitle:{
    padding:"8px",
    margin:"0px"
  },
  tag:{
    fontSize:"10px",
    borderRadius:"20px",
    marginRight:"5px"
    
  },
}));

async function getApiArticles(state){
  return fetch('http://localhost:3000/api/articles/feed', {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + state.token
    }
  })
  .then(response => response.json())
  .then(data => {
    return data.articles
  });
}
async function getApiTags(){
  return fetch('http://localhost:3000/api/tags', {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    return data.tags
  });
}

function Feed(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    activeTag: '',
    articles: [],
    isLogged: props.user.User.isLogged,
    tags: [],
    token: props.user.User.token
  });

  async function updateData() {
    const articles = await getApiArticles(state);
    const tags = await getApiTags();
    // props.loadArticles(articles);
    // props.loadTags(tags);
    setState({ ...state, articles, tags });
  }

  useEffect(() => {
    updateData();
  },[]);
  
  const filteredArticles = state.articles.filter(item => item.tagList.includes(state.activeTag));
  const filteredArticlesList = filteredArticles.map((item, id)=>{
    return <Article item={item} key={id}/>
  });
  const ArticlesList = state.articles.map((item, id)=>{
    return <Article item={item} key={id}/>
  });

  const TagsList = state.tags.map((item, id)=>{
    return <Button key={id} variant="outlined" className={classes.tag} onClick={event => setState({...state, activeTag:item})}>{item}</Button>
  });
  
    return (
      <Container>
        <Grid container maxwidth="lg" spacing={3}>
          {state.activeTag !== '' ? (
          <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
            {filteredArticlesList}
          </Grid>
          ):(
            <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
            {ArticlesList}
          </Grid>
          )}
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3} className={classes.tagCol}>
            <div className={classes.tagBlock}>
            <h3 className={classes.tagTitle}>Popular tags:</h3>
              {TagsList} 
            <Button color="secondary" onClick={event => setState({...state, activeTag:''})}>Reset</Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
}
const mapDispatchToProps =  dispatch => bindActionCreators({
  loadArticles,
  loadTags
},dispatch);

const mapStateToProps = createStructuredSelector({
  articles: getAllArticles,
  tags: getAllTags,
  user: getUser
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
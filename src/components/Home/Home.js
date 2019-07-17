import React, { useState } from "react";
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

function Home(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    activeTag: "",
    articles: "",
    isLogged: props.user.User.isLogged,
    tags: props.user.Articles.tags,
  });
  
  state.articles = props.articles.filter(item => item.tags.includes(state.activeTag));

  const ArticlesList = state.articles.map((item, id)=>{
    return <Article item={item} key={id}/>
  });
  const TagsList = state.tags.map((item, id)=>{
    return <Button key={id} variant="outlined" className={classes.tag} onClick={event => setState({...state, activeTag:item.name})}>{item.name}</Button>
  });
  
    return (
      <Container>
        {state.isLogged ? (
            <Link to="/add" className={classes.links} >
              <Button variant="outlined" className={classes.button}>
                Add
              </Button>
            </Link>
          ):(
            <></>
          )}
        <Grid container maxwidth="lg" spacing={3}>
          <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
            {ArticlesList}
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3} className={classes.tagCol}>
            <div className={classes.tagBlock}>
            <h3 className={classes.tagTitle}>Popular tags:</h3>
              {TagsList} 
            <Button color="secondary" onClick={event => setState({...state, activeTag:""})}>Reset</Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
}

const mapStateToProps = createStructuredSelector({
  articles: getAllArticles,
  tags: getAllTags,
  user: getUser
})

export default connect(mapStateToProps)(Home)
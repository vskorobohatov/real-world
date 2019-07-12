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
import { getLogged } from '../../selectors/getLogged';

const useStyles = makeStyles(theme => ({
  button: {
    marginBottom: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  links:{
    textDecoration:"none",
    color: "white"
  },
  tagTitle:{
    padding:"8px",
    margin:"0px"
  }
}));

function Home(props) {
  const classes = useStyles();
  const [activeTag, setActiveTag]= useState("");
  const articles = props.articles.filter(article => article.tags.includes(activeTag));
  const isLogged = props.isLogged;
  const tags = props.tags;


  const ArticlesList = articles.map((item, id)=>{
    return <Article item={item} key={id}/>
  });
  const TagsList = tags.map((item, id)=>{
    return <Button key={id} onClick={event => setActiveTag(item.name)}>{item.name}</Button>
  });
  
    return (
      <Container>
        {isLogged ? (
            <Link to="/add" className={classes.links} >
              <Button variant="outlined" color="primary" className={classes.button}>
                Add
              </Button>
            </Link>
          ):(
            <></>
          )}
        <Grid container spacing={3}>
          <Grid item xs={10}>
            {ArticlesList}
          </Grid>
          <Grid item xs={2}>
            <h3 className={classes.tagTitle}>Popular tags:</h3>
              {TagsList} 
            <Button color="secondary" onClick={event => setActiveTag("")}>Reset</Button>
          </Grid>
        </Grid>
      </Container>
    );
}

const mapStateToProps = createStructuredSelector({
  articles: getAllArticles,
  tags: getAllTags,
  isLogged: getLogged
})

export default connect(mapStateToProps)(Home)
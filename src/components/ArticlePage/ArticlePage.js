import React from "react";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { deleteArticle } from '../../actions/deleteArticle'
import Container from '@material-ui/core/Container';
import { createStructuredSelector } from 'reselect';
import { getAllArticles } from '../../selectors/getAllArticles';
import { getLogged } from '../../selectors/getLogged';
import { bindActionCreators } from 'redux';
import { Typography, Button, Grid } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1),
      },
      button:{
        width:"100%",
        height:"100%"
      },
      tag:{
        color:"grey",
        fontSize: "13px"
      },
      links:{
        textDecoration:"none"
      }
}));

function ArticlePage(props) {
    const classes = useStyles();
    const article = props.articles.find(item => item.id === parseInt(props.match.params.id));
    const isLogged = props.isLogged;
    return (
        <Container>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    {article.title}
                </Typography>
                <Typography component="p">
                    {article.body}
                </Typography>
                <Divider/>
                <Grid container>
                  <Grid item xs={11}>
                  <Typography component="p" className={classes.tag}>
                    {article.tags}
                  </Typography>
                </Grid>  
                  <Grid item xs={1}>
                  {isLogged ?(
                    <Link to="/" className={classes.links} >
                      <Button variant="outlined" className={classes.button} onClick={event => props.deleteArticle(article.id)}>Delete</Button>
                    </Link>):(<></>)
                  }
                  </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

const mapStateToProps = createStructuredSelector({
  articles: getAllArticles,
  isLogged: getLogged
})
const mapDispatchToProps =  dispatch => bindActionCreators({
  deleteArticle,
},dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage)
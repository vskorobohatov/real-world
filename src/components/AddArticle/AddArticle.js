import React, { useState } from "react";
import { connect } from 'react-redux'
import { addArticle } from '../../actions/addArticle'
import { addTag } from '../../actions/addTag'
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  links:{
    textDecoration:'none'
  }
}));

function AddArticle(props) {
  const classes = useStyles();
  const [state, setState] = useState({
      id:Math.floor(Math.random() * (100000 - 0 + 1)) + 0,
      title:"",
      body:"",
      tags:[],
      author:""
  });
  function submit(){
    props.addArticle(state);
    const tags = state.tags.split(',');
    tags.map((item)=>{
      return props.addTag({name:item})
    });  
  }
  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add an article
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            value={state.title}
            required
            fullWidth
            id="Title"
            label="Title"
            name="title"
            onChange={event => setState({...state,title:event.target.value})}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            value={state.body}
            multiline
            required
            fullWidth
            name="text"
            label="Text"
            type="text"
            id="body"
            onChange={event => setState({...state,body:event.target.value})}
          />
          <TextField
            variant="outlined"
            placeholder="Tag1, tag2..."
            margin="normal"
            value={state.tags}
            fullWidth
            id="tags"
            label="Tags"
            name="tags"
            onChange={event => setState({...state,tags:event.target.value})}
          />
          <Link to="/" className={classes.links} >
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={event=>{submit()}}
            >
             Add
            </Button>
          </Link>
      </div>
    </Container>
  );
}

const mapStateToProps = state =>({
  articles:state
})

const mapDispatchToProps =  dispatch => bindActionCreators({
  addArticle,
  addTag
},dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle)
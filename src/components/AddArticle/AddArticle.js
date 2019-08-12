import React, { useState } from "react";
import { connect } from 'react-redux'
import { addArticle } from '../../actions/addArticle'
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getUser } from '../../selectors/getUser';
import { createStructuredSelector } from 'reselect';

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
      title:"",
      body:"",
      tags:[],
  });
  function submit(){
    fetch('http://localhost:3000/api/articles', {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify({
        article:{
          title: state.title,
          body: state.body,
          tagList: state.tags.split(',')
        }
      })
    }).then(alert("Your article was added successfully"))
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
      </div>
    </Container>
  );
}

const mapSelectorToProps = createStructuredSelector({
  user: getUser
});

const mapStateToProps = state =>({
  articles: state,
})

const mapDispatchToProps =  dispatch => bindActionCreators({
  addArticle,
},dispatch)

export default connect(mapStateToProps, mapDispatchToProps, mapSelectorToProps)(AddArticle)
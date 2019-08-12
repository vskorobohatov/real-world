import React, {useState} from "react";
import { connect } from 'react-redux'
import { log } from '../../actions/log'
import { createUser } from '../../actions/createUser'
import { bindActionCreators } from 'redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
    marginTop: theme.spacing(2),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  links:{
    textDecoration:'none',
    width:"100%"
  },
  label:{
    marginBottom:theme.spacing(1),
  }
}));

function Register(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    isLogged:"",
    username:"",
    email:"",
    password:""
  });
  
  function register(){ 
    fetch('http://localhost:3000/api/users', {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user:{
          username: state.username,
          email: state.email,
          password: state.password
        }
      })
    }).then(response=>response.json()).then(response=>signUp(response))
  }

  function signUp(response){
    if(response.user){
      localStorage.setItem("token", response.user.token)
      props.createUser(response.user);
      props.log(true);
      props.history.push("/");
    }else if(response.errors.username){
      alert("Username " + response.errors.username);
    }else{
      alert("Email " + response.errors.email);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.label}>
          Sign up
        </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="UserName"
                variant="outlined"
                required
                fullWidth
                value={state.username}
                id="userName"
                label="User Name"
                autoFocus
                onChange={event => setState({...state, username:event.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={state.email}
                onChange={event => setState({...state, email:event.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={state.password}
                onChange={event => setState({...state, password:event.target.value})}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={register}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <Link to="/login" className={classes.links} >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
      </div>
    </Container>
  );
}

const mapStateToProps = state =>({
  user:state
})

const mapDispatchToProps =  dispatch => bindActionCreators({
  createUser,
  log
},dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)
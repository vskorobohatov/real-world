import React, {useState} from "react";
import { connect } from 'react-redux'
import { log } from '../../actions/log'
import { bindActionCreators } from 'redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  links:{
    textDecoration:'none',
    width:"100%"
  },
}));

function Login(props) {
  const classes = useStyles();
  let isLogged = props.user.User.isLogged;
  let email = props.user.User.email;
  let password = props.user.User.password;
  const [state, setState]=useState({
    email:"",
    password:""
  });
  function signIn(){
    if(state.email===email && state.password===password ){
      isLogged = true;
      props.log(isLogged);
      props.history.push("/");
    }else{
      alert("Incorrect email or password!");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={event => setState({...state, email:event.target.value})}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={event => setState({...state, password:event.target.value})}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signIn}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <Link to="/register" className={classes.links} >
                "Don't have an account? Sign Up"
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
  log
},dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
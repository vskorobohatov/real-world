import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { log } from '../../actions/log'
import { bindActionCreators } from 'redux';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  links:{
      textDecoration:"none",
      color: "black"
  },
  
}));

function Header(props) {
    const classes = useStyles();
    let isLogged  = props.articles.Articles.isLogged;

    function logout(event){
        isLogged = false;
        props.log(isLogged);
    }

    return (
        <div className={classes.root}>
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/" className={classes.links} >
                        Home
                    </Link>
                </Typography>
                {isLogged ? (
                        <Button onClick={logout} color="inherit">Logout</Button>
                  ):(
                    <>
                      <Link to="/login" className={classes.links} >
                        <Button color="inherit">Login</Button>
                      </Link>
                      <Link to="/register" className={classes.links} >
                        <Button color="inherit">Register</Button>
                      </Link>                      
                    </>
                )}
            </Toolbar>
        </AppBar>
        </div>
    );
}
const mapStateToProps = state =>({
    articles:state
  })
  
  const mapDispatchToProps =  dispatch => bindActionCreators({
    log
  },dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header)
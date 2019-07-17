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
    maxWidth:"1280px",
    margin:"0px auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  links:{
      textDecoration:"none",
      color: "#5CB85C"
  },
  appBar:{
    paddingLeft:"16px",
    paddingRight:"16px",
    boxShadow:"none !important",
    color:"black",
    backgroundColor:"white"
  },
  siteTitle:{
    backgroundColor: "#5CB85C",
    boxShadow:"inset 0 8px 8px -8px rgba(0, 0, 0, 0.3), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3)",
    fontSize:"60px",
    textAlign:"center",
    padding:"50px",
    color:"white",
    textShadow:"0px 1px 3px rgba(0, 0, 0, 0.3)",
    marginBottom: theme.spacing(2)
  }
}));

function Header(props) {
    const classes = useStyles();
    let isLogged  = props.user.User.isLogged;

    function logout(event){
        isLogged = false;
        props.log(isLogged);
    }

    return (
      <>
        <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/" className={classes.links} >
                        Home
                    </Link>
                </Typography>
                {isLogged ? (
                  <>
                    <Link to="/profile" className={classes.links} >
                      <Button className={classes.links}>Profile</Button>
                    </Link>
                    <Link to="/" className={classes.links} >
                      <Button onClick={logout} className={classes.links}>Logout</Button>
                    </Link>
                  </>    
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
        <div className={classes.siteTitle}><b>Real world</b></div>
        </>
    );
}
const mapStateToProps = state =>({
    articles:state,
    user:state
  })
  
  const mapDispatchToProps =  dispatch => bindActionCreators({
    log
  },dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header)
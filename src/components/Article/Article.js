import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider"
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import { getUser } from '../../selectors/getUser';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    border:"1px solid rgba(0, 0, 0, 0.12)",
    borderRadius:"5px"
  },
  tag:{
    color:"grey",
    fontSize: "13px"
  },
  links:{
    textDecoration:"none",
    paddingLeft:"10px"
  },
  divider:{
    marginTop:"10px",
    marginBottom:"10px",
  },
  author:{
    fontSize:"15px",
    color:"grey"
  },
  modal:{
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius:"5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
  profileImg:{
    height: 140,
    width: 140,
    borderRadius:"50%",
  }
}));

function Article(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const body = props.item.body.substring(0, 200);
  const [state] = useState({
    isLogged: props.user.User.isLogged,
    token: props.user.User.token,
  });
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const follow = () => {
    fetch('http://localhost:3000/api/profiles/'+props.item.author.username+'/follow', {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.token
      }
    }).then(response => response.json())
    .then(data => {
      //console.log(data)
    });
  };
  
  return (
      <div className={classes.root}>
        <Typography variant="h5" component="h5">
          {props.item.title}
        </Typography>
        <Typography className={classes.author}>
          Author: 
          <Button onClick={handleOpen} className={classes.author}>
            {props.item.author.username}
          </Button>
        </Typography>
        <Typography component="p">
          {body}...
        </Typography>
        <Divider className={classes.divider}/>
        <Grid container>
          <Grid item xs={9} sm={10} md={10} lg={11} xl={11}>
            <Typography component="p" className={classes.tag}>
              {props.item.tagList.map((item, id)=>{
                return <span key={id}>{item}, </span>
              })}
            </Typography>
          </Grid>  
          <Grid item xs={3} sm={2} md={2} lg={1} xl={1}>
            <Link to={`/article/${props.item.slug}`} className={classes.links} >
              <Button variant="outlined" fullWidth className={classes.button}>Open</Button>
            </Link>
          </Grid>
        </Grid>
       
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.modal}>
          <center><img src={props.item.author.image} alt="Italian Trulli" className={classes.profileImg}/></center>
            <h2 id="simple-modal-title">{props.item.author.username}</h2>
            <p id="simple-modal-description">
              {props.item.author.bio}
            </p>
            {state.isLogged ? (
              <Button variant="outlined" onClick={follow}>
                Follow
              </Button>
            ):(<></>)}
          </div>
        </Modal>
    </div>
  );
}
const mapSelectorToProps = createStructuredSelector({
  user: getUser
});

export default connect(mapSelectorToProps)(Article)
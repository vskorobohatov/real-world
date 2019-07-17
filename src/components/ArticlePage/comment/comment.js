import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider'
const useStyles = makeStyles(theme => ({
    comment:{
        width:"100%",
        marginTop:theme.spacing(1)
    },
    divider:{
        marginBottom:theme.spacing(1)
    }
    
}));

export default function Comment(props) {
  const classes = useStyles();
  
  return (
        <div className={classes.comment}>
            <Divider className={classes.divider}/>
            {props.author} at: {props.created}:
            <br/>
            <p>{props.body}</p>
        </div>
    );
}
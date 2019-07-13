import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider"
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
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
  }
}));

export default function Article(props) {
  const classes = useStyles();

  return (
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {props.item.title}
        </Typography>
        <Typography component="p">
          {props.item.body}
        </Typography>
        <Divider className={classes.divider}/>
        <Grid container>
          <Grid item xs={9} sm={10} md={10} lg={11} xl={11}>
            <Typography component="p" className={classes.tag}>
              {props.item.tags}
            </Typography> 
          </Grid>  
          <Grid item xs={3} sm={2} md={2} lg={1} xl={1}>
            <Link to={`/article/${props.item.id}`} className={classes.links} >
              <Button variant="outlined" fullWidth className={classes.button}>Open</Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
  );
}
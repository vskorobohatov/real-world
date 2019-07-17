import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { createStructuredSelector } from 'reselect';
import { getUser } from '../../../selectors/getUser';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux';
import { createUser } from '../../../actions/createUser'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth:"600px",
    margin:"0px auto",
    border:"1px solid rgba(0, 0, 0, 0.12)",
    borderRadius:"5px",
    boxShadow:"none"
  },
  media: {
    height: 140,
    width: 140,
    margin:"0px auto",
    borderRadius:"50%",
    backgroundColor:"black",
    marginBottom:theme.spacing(5),
  },
}));

function ProfileCard(props) {
  const classes = useStyles();
  const [editMode, setEditMode] = useState({readOnly: true});
  const [editBtnText, setEditBtnText] = useState("Edit");
  const [state, setState]=useState({
    isLogged:true,
    fname:props.user.User.fname,
    lname:props.user.User.lname,
    email:props.user.User.email,
    password:props.user.User.password,
  });

  function editUser(event){
    event.preventDefault();
    if(editBtnText === "Edit"){
      setEditMode({...editMode, readOnly:false});
      setEditBtnText("Save");
    }else{
      props.createUser(state);
      setEditMode({...editMode, readOnly:true});
      setEditBtnText("Edit");
    }
  }

  return (
    <Card className={classes.card}>
        <CardContent>
            <CardMedia
            className={classes.media}
            image="/logo.jpg"
            title="Contemplative Reptile"
            />
            <TextField
              id="articleBody"
              label="First name"
              defaultValue={state.fname}
              className={classes.textField}
              margin="normal"
              fullWidth
              multiline
              InputProps={editMode}
              InputLabelProps={{
                className: classes.label,
              }}
              onChange={event => setState({...state, fname:event.target.value})}
            />
            <TextField
              id="articleBody"
              label="Last name"
              defaultValue={state.lname}
              className={classes.textField}
              margin="normal"
              fullWidth
              multiline
              InputProps={editMode}
              InputLabelProps={{
                className: classes.label,
              }}
              onChange={event => setState({...state, lname:event.target.value})}
            />
            <TextField
              id="articleBody"
              label="Email"
              defaultValue={state.email}
              className={classes.textField}
              margin="normal"
              fullWidth
              multiline
              InputProps={editMode}
              InputLabelProps={{
                className: classes.label,
              }}
              onChange={event => setState({...state, email:event.target.value})}
            />
            <TextField
              id="articleBody"
              label="Password"
              defaultValue={state.password}
              className={classes.textField}
              margin="normal"
              fullWidth
              multiline
              InputProps={editMode}
              InputLabelProps={{
                className: classes.label,
              }}
              onChange={event => setState({...state, password:event.target.value})}
            />
        </CardContent>
      <CardActions>
      <Button variant="outlined" fullWidth className={classes.button} color="primary" onClick={editUser}>{editBtnText}</Button>
      </CardActions>
    </Card>
  );
}
const mapStateToProps = createStructuredSelector({
  user: getUser
});
const mapDispatchToProps =  dispatch => bindActionCreators({
  createUser
},dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard)
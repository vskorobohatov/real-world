import React, {useState} from "react";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { deleteArticle } from '../../actions/deleteArticle'
import { editArticle } from '../../actions/editArticle'
import { addComment } from '../../actions/addComment'
import { createStructuredSelector } from 'reselect';
import { getAllArticles } from '../../selectors/getAllArticles';
import { getUser } from '../../selectors/getUser';
import { bindActionCreators } from 'redux';
import { Typography, Button, Grid } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Comment from './comment/comment'


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1),
      },
      button:{
        height:"100%"
      },
      tag:{
        color:"grey",
        fontSize: "13px"
      },
      links:{
        textDecoration:"none",
        position:"relative",
        right:"0"
      },
      divider:{
        marginBottom:"10px"
      },
      label: {
        fontSize:"20px",
      },
      commentsSection:{
        marginTop:theme.spacing(2)
      }
}));

function ArticlePage(props) {
    const classes = useStyles();
    const article = props.articles.find(item => item.id === parseInt(props.match.params.id));
    const user = props.user.User;
    const [editMode, setEditMode] = useState({readOnly: true});
    const [editBtnText, setEditBtnText] = useState("Edit");
    
    const [userComment, setComment] = useState({
      id: article.id,
      author:user.fname,
      body:"",
      created:"",
    });
    
    const [state, setState] = useState({
      id:article.id,
      title:article.title,
      body:article.body,
      tags:article.tags,
      author:user.fname,
      comments:article.comments,
    });
    
    const commentsList = state.comments.map((item, id)=>{
      return <Comment author={item.author} body={item.body} key={id} created={item.created}/>
    });
    
    function editArticle(event){
      event.preventDefault();
      if(editBtnText === "Edit"){
        setEditMode({...editMode, readOnly:false});
        setEditBtnText("Save");
      }else{
        props.editArticle(state);
        setEditMode({...editMode, readOnly:true});
        setEditBtnText("Edit");
      }
    }
    
    function addComment(event){
      event.preventDefault();
      
      setComment(userComment.created = getCurrentDate())
      console.log(userComment);

      state.comments.push(userComment);
      props.editArticle(state);
      setComment({...userComment, body:""})
    }

    function getCurrentDate(separator='.'){
      let newDate = new Date()
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    }

    function like(data){
      state.likes+=data;
    }

    return (
        <Container maxwidth="lg">
          <Typography component="p" >
          {state.title}
          </Typography>
          <Typography component="p" className={classes.tag}>
            Author: {article.author}
          </Typography>
          <TextField
            id="articleBody"
            label=""
            defaultValue={state.body}
            className={classes.textField}
            margin="normal"
            fullWidth
            multiline
            InputProps={editMode}
            InputLabelProps={{
              className: classes.label,
          }}
            onChange={event => setState({...state, body:event.target.value})}
          />
          <Grid container>
            <Grid item xs={6} sm={8} md={10} lg={10} xl={10}>
            <Typography component="p" className={classes.tag}>
                {article.tags}
              </Typography>
            </Grid>  
            {(user.isLogged && user.fname === article.author) ?(
              <>
                <Grid item xs={3} sm={2} md={1} lg={1} xl={1}>  
                    <Button variant="outlined" fullWidth className={classes.button} color="primary" onClick={editArticle}>{editBtnText}</Button>
                </Grid>
                <Grid item xs={3} sm={2} md={1} lg={1} xl={1}>
                  <Link to="/" className={classes.links}>
                    <Button variant="outlined" fullWidth className={classes.button} color="secondary" onClick={event => props.deleteArticle(article.id)}>Delete</Button>
                  </Link>
                </Grid>
              </>
              ):(<></>)
            }
          </Grid>
          <div className={classes.commentsSection}>
          Comments:
          {commentsList}
          {user.isLogged ?(
              <>
                <TextField
                  id="comment"
                  label="Your comment"
                  variant="outlined"
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  multiline
                  value={userComment.body}
                  onChange={event => setComment({...userComment, body:event.target.value})}
                />
                 <Button variant="outlined" color="default" onClick={addComment}>Comment</Button>
              </>
              ):(
              <Typography component="h1">
                <b>
                  Sign In to leave comments
                </b>
              </Typography>
            )
            }
          </div>
        </Container>
    );
}

const mapStateToProps = createStructuredSelector({
  articles: getAllArticles,
  user: getUser
})
const mapDispatchToProps =  dispatch => bindActionCreators({
  editArticle,
  deleteArticle,
  addComment
},dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage)
import React, {useState, useEffect} from "react";
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

async function getApiArticle(slug){
  return fetch('http://localhost:3000/api/articles/'+slug, {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    return data.article
  });
}

async function getApiArticleComments(slug){
  return fetch('http://localhost:3000/api/articles/'+slug+'/comments', {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    return data.comments
  });
}


function ArticlePage(props) {
    const classes = useStyles();
    const token = props.user.User.token;
    const [state, setState] = useState({
      article:{
        body:"",
        author:{
          username:""
        }
      },
      comments:[]
    });

    const user = props.user.User;
    const [editBtnText, setEditBtnText] = useState("Edit");
    const [editMode, setEditMode] = useState({readOnly: true});
    const [userComment, setComment] = useState({
      id: "",
      author:user.username,
      body:"",
      created:"",
    });

    async function updateArticle() {
      const article = await getApiArticle(props.match.params.slug);
      const comments = await getApiArticleComments(props.match.params.slug);
      setState({...state, article, comments});
    }
    
    useEffect(() => {
      updateArticle();
    },[]);

    const commentsList = state.comments.map((item, id)=>{
      return <Comment author={item.author} body={item.body} key={id} created={item.created}/>
    });
    
    function editArticle(event){
      event.preventDefault();
      if(editBtnText === "Edit"){
        setEditMode({...editMode, readOnly:false});
        setEditBtnText("Save");
      }else{
        fetch('http://localhost:3000/api/articles/'+props.match.params.slug, {  
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          article:{
            body: state.article.body,
          }
        })
      }).then(response => response.json())
      .then(data => {
        //console.log(data)
      })
        setEditMode({...editMode, readOnly:true});
        setEditBtnText("Edit");
      }
    }
    
    function submit(){
      fetch('http://localhost:3000/api/articles/'+props.match.params.slug+'/comments', {  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          comment:{
            body: userComment.body,
          }
        })
      }).then(response => response.json())
      .then(data => {
       //console.log(data)
      })
      //.then(alert("Your comment was added successfully"))
    }

    function addComment(event){
      event.preventDefault();
      submit();
      setComment({...userComment, body:""})
    }
   
    return (
        <Container maxwidth="lg">
          <Typography component="p" >
          {state.article.title}
          </Typography>
          <Typography component="p" className={classes.tag}>
            Author: {state.article.author.username}
          </Typography>
          <TextField
            id="articleBody"
            label=""
            value={state.article.body}
            className={classes.textField}
            margin="normal"
            fullWidth
            multiline
            InputProps={editMode}
            InputLabelProps={{
              className: classes.label,
          }}
            onChange={event => setState({...state,article:{...state.article,body:event.target.value}})}
          />
          <Grid container>
            <Grid item xs={6} sm={8} md={10} lg={10} xl={10}>
            <Typography component="p" className={classes.tag}>
                {state.tags}
              </Typography>
            </Grid>  
            {(user.username === state.article.author.username) ?(
              <>
                <Grid item xs={3} sm={2} md={1} lg={1} xl={1}>  
                    <Button variant="outlined" fullWidth className={classes.button} color="primary" onClick={editArticle}>{editBtnText}</Button>
                </Grid>
                <Grid item xs={3} sm={2} md={1} lg={1} xl={1}>
                  <Link to="/" className={classes.links}>
                    <Button variant="outlined" fullWidth className={classes.button} color="secondary" onClick={event => props.deleteArticle(state.id)}>Delete</Button>
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
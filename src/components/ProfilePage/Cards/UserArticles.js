import React, {useState, useEffect} from 'react';
import { createStructuredSelector } from 'reselect';
import { getUser } from '../../../selectors/getUser';
import { connect } from 'react-redux';
import { getAllArticles } from '../../../selectors/getAllArticles';
import { getAllTags } from '../../../selectors/getAllTags';
import Article from '../../Article/Article';

async function getUserArticles(username){
  return fetch('http://localhost:3000/api/articles?author='+username, {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    return data.articles
  });
}

function UserArticlesCard(props) {
  const user = props.user.User;
  const [state, setState] = useState({
    articles:[]
  });

  async function updateData() {
    const articles = await getUserArticles(user.username);
    setState({ ...state, articles});
  }

  useEffect(() => {
   updateData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  const ArticlesList = state.articles.map((item, id)=>{
    return <Article item={item} key={id}/>
  });

  return (
    <>
      {ArticlesList}
    </>  
  );
}
const mapStateToProps = createStructuredSelector({
  user: getUser,
  articles: getAllArticles,
  tags: getAllTags,
});

export default connect(mapStateToProps)(UserArticlesCard)
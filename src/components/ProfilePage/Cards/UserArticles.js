import React from 'react';
import { createStructuredSelector } from 'reselect';
import { getUser } from '../../../selectors/getUser';
import { connect } from 'react-redux';
import { getAllArticles } from '../../../selectors/getAllArticles';
import { getAllTags } from '../../../selectors/getAllTags';
import Article from '../../Article/Article';

function UserArticlesCard(props) {
  const user = props.user.User;
  const articles = props.articles.filter(item => item.author===user.fname);

  const ArticlesList = articles.map((item, id)=>{
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
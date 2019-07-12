import {createSelector} from 'reselect'
const getStore = state => state.Articles;

export const getAllArticles = createSelector(
  getStore,
 store => store.articles
)
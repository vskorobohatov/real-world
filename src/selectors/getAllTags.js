import {createSelector} from 'reselect'
const getStore = state => state.Articles;

export const getAllTags = createSelector(
  getStore,
 store => store.tags
)
import {createSelector} from 'reselect'
const getStore = state => state.Articles;

export const getLogged = createSelector(
  getStore,
 store => store.isLogged
)
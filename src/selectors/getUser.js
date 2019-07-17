import {createSelector} from 'reselect'
const getStore = state => state;

export const getUser = createSelector(
  getStore,
 store => store
)
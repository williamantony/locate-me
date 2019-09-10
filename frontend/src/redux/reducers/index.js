import { combineReducers } from 'redux';
import modal from './modal.reducer';
import self from './clients.reducer';
import connections from './connections.reducer';
import beacons from './beacons.reducer';
import theme from './theme.reducer';

export default combineReducers({
  modal,
  connections,
  beacons,
  self,
  theme,
});

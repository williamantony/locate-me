import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './redux/reducers';

const store = createStore(Reducers, applyMiddleware(ReduxThunk));

export default store;

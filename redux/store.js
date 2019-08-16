import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga';//选这个 或者上面的那个redux-thunk  这个需要安装yarn add next-redux-saga redux-saga --save
// initialState
const exampleInitialState = {
  todos:['hello next-redux']
}
// action-type
const actionTypes = {
  ADD_TODO:'ADD_TODO'
}
// REDUCERS(reducer)
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      const todos = [...state.todos];
      todos.push(action.todo);
      return Object.assign({},state,{
        todos
      });
    default:
      return state
  }
}
// const reducers = combineReducers({
//   reducer
// });

// actions
export const addTodo = todo => ({type:actionTypes.ADD_TODO,todo});
export const asyncAddToDo = (todo) => dispatch => {
  return setTimeout(()=>dispatch(addTodo(todo)),2000);
}
// store
export function initializeStore (initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
  )
}

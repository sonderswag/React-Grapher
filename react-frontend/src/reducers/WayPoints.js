import * as types from '../actions/types';
import createReducer from './createReducer'
import TraceService from '../components/TraceService'

export const Paths = createReducer({}, {
  [types.ADD_PATH](state,action) {
    const newState = Object.assign({},state);
    newState[action.value.id] = action.value.name
    return newState;
  },
  [types.REMOVE_PATH](state,action) {
    const newState = Object.assign({},state);
    if (newState[action.value] !== undefined) {
      delete newState[action.value]
      return newState;
    }
    return state

  }
})


/*what should be the content of the Undo and redo list??
  I need it to have the action it should perform to undo the action
  and the data it should do it on

 for example. in response to deleting add
 {action:addTrace, data:trace}

 delete trace => {action: delete data:trace}
 add trace => {action: add id:trace_id data:trace}
 edit trace => {action: editTrace id:trace_id data:trace}
*/
export const UndoList = createReducer([], {
  [types.PUSH_UNDO_LIST](state,action) {
    var newState = state.slice()
    newState.push(action.value);
    return newState;
  },
  [types.POP_UNDO_LIST](state,action) {
    if (state.length > 0) {
      var newState = state.slice()
      newState.pop()
      return newState;
    }
    return state;
  },[types.CLEAR_UNDO_LIST](state,action) {
    var newState = []
    return newState;
  }

})

export const RedoList = createReducer([], {
  [types.PUSH_REDO_LIST](state,action) {
    var newState = state.slice()
    newState.push(action.value);
    return newState;
  },
  [types.POP_REDO_LIST](state,action) {
    if (state.length > 0) {
      var newState = state.slice()
      newState.pop()
      return newState;
    }
    return state;
  },
  [types.CLEAR_REDO_LIST](state,action) {
    var newState = []
    return newState;
  }
})

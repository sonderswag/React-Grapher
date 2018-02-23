import * as types from './types'

export function addPath(path) {
  return {
    type:types.ADD_PATH,
    value: path
  }
}

export function removePath(id) {
  return {
    type:types.REMOVE_PATH,
    value:id
  }
}

export function pushUndolist(value) {
  return {
    type:types.PUSH_UNDO_LIST,
    value:value
  }
}

export function popUndolist(value) {
  return {
    type:types.POP_UNDO_LIST,
    value:value
  }
}

export function pushRedolist(value) {
  return {
    type:types.PUSH_REDO_LIST,
    value:value
  }
}

export function clearUndoList(value) {
  return {
    type:types.CLEAR_UNDO_LIST,
  }
}


export function popRedolist(value) {
  return {
    type:types.POP_REDO_LIST,
    value:value
  }
}

export function clearRedolist() {
  return {
    type:types.CLEAR_REDO_LIST,
  }
}

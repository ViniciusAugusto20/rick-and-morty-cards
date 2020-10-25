import { createActions, createReducer } from 'reduxsauce'
import { AnyAction } from 'redux'

export const { Types, Creators } = createActions({
  setAllRick: [],
  setAllMorty: [],
  getInfoMorty: [],
  getInfoRick: [],
  setRickEdit: [],
})

const INITIAL_STATE = {
  allRick: [],
  allMorty: [],
  infoMorty: [],
  infoRick: [],
  currentRick: [],
}
const setAllRick = (state = INITIAL_STATE, action: AnyAction) => {
  return {
    ...state,
    allRick: action.allRick,
  }
}

const setAllMorty = (state = INITIAL_STATE, action: AnyAction) => {
  return {
    ...state,
    allMorty: action.allMorty,
  }
}
const getInfoMorty = (state = INITIAL_STATE, action: AnyAction) => {
  return {
    ...state,
    infoMorty: action.infoMorty,
  }
}
const getInfoRick = (state = INITIAL_STATE, action: AnyAction) => {
  return {
    ...state,
    infoRick: action.infoRick,
  }
}
const setRickEdit = (state = INITIAL_STATE, action: AnyAction) => {
  return {
    ...state,
    currentRick: action.currentRick,
  }
}
/**
 * Handlers
 */
const HANDLERS = {
  // @ts-ignore
  [Types.SET_ALL_MORTY]: setAllMorty,
  // @ts-ignore
  [Types.SET_ALL_RICK]: setAllRick,
  // @ts-ignore
  [Types.GET_INFO_MORTY]: getInfoMorty,
  // @ts-ignore
  [Types.GET_INFO_RICK]: getInfoRick,
  // @ts-ignore
  [Types.SET_RICK_EDIT]: setRickEdit,
}

/**
 * Reducers
 */
const mainReducer = createReducer(INITIAL_STATE, HANDLERS)
export default mainReducer

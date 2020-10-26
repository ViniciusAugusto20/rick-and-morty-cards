import { createActions, createReducer } from 'reduxsauce'
import { AnyAction } from 'redux'

export const { Types, Creators } = createActions({
  setAllRick: [],
  setAllMorty: [],
  getInfoMorty: [],
  getInfoRick: [],
  setRickEdit: [],
  getInfoLocation: [],
  setAllLocation: [],
  setTravelHistory: [],
  setLastPage: [],
})

const INITIAL_STATE = {
  allRick: [],
  allMorty: [],
  infoMorty: [],
  infoRick: [],
  currentRick: [],
  infoLocation: [],
  allLocation: [],
  travelHistory: [],
  lastPageRander: 1,
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

const getInfoLocation = (state = INITIAL_STATE, action: AnyAction) => {
  return {
    ...state,
    infoLocation: action.infoLocation,
  }
}

const setAllLocation = (state = INITIAL_STATE, action: AnyAction) => {
  return {
    ...state,
    allLocation: action.allLocation,
  }
}
const setTravelHistory = (state = INITIAL_STATE, action: AnyAction) => {
  const currentHistory = [...state.travelHistory]
  currentHistory.push(action.travelHistory)
  return {
    ...state,
    travelHistory: currentHistory,
  }
}

const setLastPage = (state = INITIAL_STATE, action: AnyAction) => {
  return {
    ...state,
    lastPageRander: action.lastPageRander,
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
  // @ts-ignore
  [Types.GET_INFO_LOCATION]: getInfoLocation,
  // @ts-ignore
  [Types.SET_ALL_LOCATION]: setAllLocation,
  // @ts-ignore
  [Types.SET_TRAVEL_HISTORY]: setTravelHistory,
  // @ts-ignore
  [Types.SET_LAST_PAGE]: setLastPage,
}

/**
 * Reducers
 */
const mainReducer = createReducer(INITIAL_STATE, HANDLERS)
export default mainReducer

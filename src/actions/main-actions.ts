import Api, { ResponseData } from '../utils/api'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store/ducks'
import { Action } from 'redux'
import { Types } from '../store/ducks/main-duck'

import ICharacter from '../models/character'
import INavigation from '../models/navigation'

import errorFormat from '../utils/error-formatter'
import { showToast } from '../components/toast'

export const getInfoMorty = (
  name: string,
  page?: number
): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
  const api = new Api()
  await api.getCharacter(name, page, {
    onSuccess: async (resposta: ResponseData) => {
      if (resposta) {
        dispatch({
          type: Types.GET_INFO_MORTY,
          infoMorty: resposta.info,
        })
      }
    },
    onError: async (error: Response) => {
      const errorMessage = await errorFormat(error)
      showToast({
        type: 'error',
        message: errorMessage + ' Information of Morty',
      })
    },
  })
}

export const getInfoRick = (
  name: string,
  page?: number
): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
  const api = new Api()
  await api.getCharacter(name, page, {
    onSuccess: async (resposta: ResponseData) => {
      if (resposta) {
        dispatch({
          type: Types.GET_INFO_RICK,
          infoRick: resposta.info,
        })
      }
    },
    onError: async (error: Response) => {
      const errorMessage = await errorFormat(error)
      console.log(errorMessage)
      showToast({
        type: 'error',
        message: errorMessage + ' Information of Rick',
      })
    },
  })
}

export const getAllMorty = (
  name: string,
  page?: number
): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
  const api = new Api()
  await api.getCharacter(name, page, {
    onSuccess: async (resposta: ResponseData) => {
      if (resposta) {
        dispatch({
          type: Types.SET_ALL_MORTY,
          allMorty: resposta.results,
        })
      }
    },
    onError: async (error: Response) => {
      const errorMessage = await errorFormat(error)
      showToast({
        type: 'error',
        message: errorMessage + ' list Morty',
      })
    },
  })
}

export const getAllRick = (
  name: string,
  page: number
): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
  const api = new Api()
  await api.getCharacter(name, page, {
    onSuccess: async (resposta: ResponseData) => {
      if (resposta) {
        dispatch({
          type: Types.SET_ALL_RICK,
          allRick: resposta.results,
        })
      }
    },
    onError: async (error: Response) => {
      const errorMessage = await errorFormat(error)
      showToast({ type: 'error', message: errorMessage + ' list Rick' })
    },
  })
}

export const setRickEdit = (
  dados: ICharacter
): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
  dispatch({
    type: Types.SET_RICK_EDIT,
    currentRick: dados,
  })
}

export const getInfoLocation = (
  page?: number
): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
  const api = new Api()
  await api.getLocation(page, {
    onSuccess: async (resposta: ResponseData) => {
      if (resposta) {
        dispatch({
          type: Types.GET_INFO_LOCATION,
          infoLocation: resposta.info,
        })
      }
    },
    onError: async (error: Response) => {
      const errorMessage = await errorFormat(error)
      showToast({
        type: 'error',
        message: errorMessage + ' Information of location',
      })
    },
  })
}

export const getAllLocation = (
  page?: number
): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
  const api = new Api()
  await api.getLocation(page, {
    onSuccess: async (resposta: ResponseData) => {
      if (resposta) {
        dispatch({
          type: Types.SET_ALL_LOCATION,
          allLocation: resposta.results,
        })
      }
    },
    onError: async (error: Response) => {
      const errorMessage = await errorFormat(error)
      showToast({ type: 'error', message: errorMessage + ' list Location' })
    },
  })
}

export const setTravelHistory = (
  dados: INavigation
): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
  dispatch({
    type: Types.SET_TRAVEL_HISTORY,
    travelHistory: dados,
  })
}

export const setLastPage = (
  dados: Number
): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
  dispatch({
    type: Types.SET_LAST_PAGE,
    lastPageRander: dados,
  })
}

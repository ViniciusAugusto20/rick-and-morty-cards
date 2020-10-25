// eslint-disable-next-line no-unused-vars
import Api, { ResponseData } from '../utils/api'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store/ducks'
import { Action } from 'redux'
import { Types } from '../store/ducks/main-duck'

import Character from '../models/character'
import 'moment/locale/pt-br'

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
      console.log(error)
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
      console.log(error)
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
      console.log(error)
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
      console.log(error)
    },
  })
}

export const setRickEdit = (
  dados: Character
): ThunkAction<void, RootState, unknown, Action> => async dispatch => {
  dispatch({
    type: Types.SET_RICK_EDIT,
    currentRick: dados,
  })
}

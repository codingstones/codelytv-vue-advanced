import {
  FETCH_DAYS_REQUEST,
  FETCH_DAYS_SUCCESS,
  FETCH_DAYS_ERROR
} from './days-mutations'

import { retrieveDays } from '../../services/jota-api'

export function buildRetrieveDaysAction() {
  return retrieveDaysAction(retrieveDays).run
}

export function retrieveDaysAction(retrieveDays) {
  return { run }

  async function run({ commit }) {
    commit(FETCH_DAYS_REQUEST)
    try {
      const days = await retrieveDays()
      commit(FETCH_DAYS_SUCCESS, days)
    }
    catch (error) {
      commit(FETCH_DAYS_ERROR, error)
      throw error
    }
  }
}

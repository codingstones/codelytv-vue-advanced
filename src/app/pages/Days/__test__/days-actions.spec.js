import {
  FETCH_DAYS_REQUEST, FETCH_DAYS_SUCCESS, FETCH_DAYS_ERROR
} from '../days-mutations'

import { rejectedPromise, resolvedPromise } from '../../../../../test/helpers'
import { retrieveDaysAction } from '../days-actions'

describe('Days actions', () => {
  let action
  let commitSpy
  beforeEach(() => {
    commitSpy = jest.fn()
  })

  describe('Retrieving days action', () => {
    it('finishes with success', async () => {
      const DAYS = 'ANY DAYS'
      const retrieveDays = resolvedPromise(DAYS)

      action = retrieveDaysAction(retrieveDays)
      await action.run({ commit: commitSpy })

      expect(commitSpy).toHaveBeenCalledWith(FETCH_DAYS_REQUEST)
      expect(commitSpy).toHaveBeenCalledWith(FETCH_DAYS_SUCCESS, DAYS)
    })

    it('finishes with error', async () => {
      const backendError = Error('Backend Error')
      const retrieveDays = rejectedPromise(backendError)
      action = retrieveDaysAction(retrieveDays)

      expect.assertions(3)

      try {
        await action.run({ commit: commitSpy })
      }
      catch (error) {
        expect(commitSpy).toHaveBeenCalledWith(FETCH_DAYS_REQUEST)
        expect(commitSpy).toHaveBeenCalledWith(FETCH_DAYS_ERROR, backendError)
        expect(error).toBe(backendError)
      }
    })
  })
})

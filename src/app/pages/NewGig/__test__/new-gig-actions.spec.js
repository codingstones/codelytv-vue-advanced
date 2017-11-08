import {
  createGigAction
} from '../new-gig-actions'

import { rejectedPromise, resolvedPromise } from '../../../../../test/helpers'
import { CREATE_GIG_ERROR, CREATE_GIG_REQUEST, CREATE_GIG_SUCCESS } from '../new-gig-mutations';

describe('New Gig actions', () => {

  let action
  let commitSpy
  beforeEach(() => {
    commitSpy = jest.fn()
  })

  describe('Create Gig action', () => {

    it('finishes with success', async () => {
      const NEW_DAY = 'IRRELEVANT NEW DAY'
      const createGig = resolvedPromise(NEW_DAY)

      action = createGigAction(createGig)
      await action.run({ commit: commitSpy }, NEW_DAY)

      expect(commitSpy).toHaveBeenCalledWith(CREATE_GIG_REQUEST)
      expect(commitSpy).toHaveBeenCalledWith(CREATE_GIG_SUCCESS, NEW_DAY)
    })

    it('finishes with error', async () => {
      const backendError = Error('Backend Error')
      const createGig = rejectedPromise(backendError)
      action = createGigAction(createGig)

      expect.assertions(3)

      try {
        await action.run({commit: commitSpy}, 'any gig')
      } catch (error) {
        expect(commitSpy).toHaveBeenCalledWith(CREATE_GIG_REQUEST)
        expect(commitSpy).toHaveBeenCalledWith(CREATE_GIG_ERROR, backendError)
        expect(error).toBe(backendError)
      }
    })
  })
})

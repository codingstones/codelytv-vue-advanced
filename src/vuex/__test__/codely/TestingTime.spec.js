import {
  numberOfGigsToday,
  numberOfGigsTomorrow
} from '../../getters'
import { stubNow } from '../../../../test/helpers'
import { fakeGigsByDay } from '../../../app/services/__mocks__/gigs-sample'

describe('TodayGigs Getter', () => {
  const state = { days: fakeGigsByDay }

  it('Counts the Number of Gigs of today', () => {
    stubNow('2017-09-18')
    expect(numberOfGigsToday(state)).toBe(2)
  })

  it('Counts the Number of Gigs of tomorrow', () => {
    stubNow('2017-09-18')
    expect(numberOfGigsTomorrow(state)).toBe(0)
  })
})

import {
  gigsToday,
  gigsTomorrow
} from '../../getters'
import { fakeGigsByDay } from '../../../app/services/__mocks__/gigs-sample'
import { stubNow } from '../../../../test/helpers'

describe('Vuex Getters', () => {
  const state = {days: fakeGigsByDay}

  it('gets list of gigs for today', () => {
    const FIRST_DAY = fakeGigsByDay[Object.keys(fakeGigsByDay)[0]]

    stubNow('2017-09-18')
    expect(gigsToday(state)).toBe(FIRST_DAY)
  })

  it('gets EMPTY list of gigs for today', () => {
    stubNow('2017-09-19')
    expect(gigsToday(state)).toBeUndefined()
  })

  it('gets EMPTY list of gigs for tomorrow', () => {
    stubNow('2017-09-18')
    const state = {days: fakeGigsByDay}
    expect(gigsTomorrow(state)).toBeUndefined()
  })
})

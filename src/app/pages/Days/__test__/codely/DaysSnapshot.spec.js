import { mount } from '@vue/test-utils'
import Days from '@/app/pages/Days/Days.vue'
import { fakeGigsByDay } from '../../../../services/__mocks__/gigs-sample'
import DayListPage from '../../../../__page_objects__/DaysPageObject'
import { cloneProductionStore } from '../../../../../../test/helpers'
jest.mock('@/app/services/jota-api')

describe('Days', () => {

  let page, wrapper
  beforeEach(async () => {
    const store = cloneProductionStore()
    store.state.days = fakeGigsByDay
    wrapper = mount(Days, { store })
    page = new DayListPage(wrapper)
  })

  it('matches full snapshot', async() => {
    page.matchSnapshot()
  })
})

import { mount } from '@vue/test-utils'
import Days from '@/app/pages/Days/Days.vue'
import DayListPage from '../../../../__page_objects__/DaysPageObject'
import { fakeGigsByDay, FIRST_DAY } from '../../../../services/__mocks__/gigs-sample'

describe('Days', () => {
  const FIRST_DAY_GIG_TITLES = FIRST_DAY.gigs.map(gig => gig.title)

  let page, wrapper
  beforeEach(async () => {
    const store = {state: { days: fakeGigsByDay }}
    wrapper = mount(Days, { store })
    page = new DayListPage(wrapper)
  })

  it('renders all gigs in the first day', async() => {
    FIRST_DAY_GIG_TITLES.map((text) => page.contains(text))
  })
})

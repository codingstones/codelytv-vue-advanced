import Day from '@/app/pages/Days/Day.vue'
import { FIRST_DAY } from '../../../../services/__mocks__/gigs-sample'
import DayListPageObject from '../../../../__page_objects__/DayPageObject'
import { cloneProductionStore, Wrap } from '../../../../../../test/helpers'

describe('Day', () => {

  let page, wrapper, store
  beforeEach(async () => {
    store = cloneProductionStore()
    wrapper = Wrap(Day)
      .withProps({ day: FIRST_DAY })
      .withStore(store)
      .mount()
    page = new DayListPageObject(wrapper)
  })

  it('navigates to gig detail route', async () => {
    const FIRST_GIG = FIRST_DAY.gigs[0]
    page.clickFirstGig()
    page.checkCurrentPath(store, '/gig/' + FIRST_GIG.id)
  })
})

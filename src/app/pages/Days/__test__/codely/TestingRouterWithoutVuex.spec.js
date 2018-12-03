import Day from '@/app/pages/Days/Day.vue'
import { mount } from '@vue/test-utils'
import { FIRST_DAY } from '../../../../services/__mocks__/gigs-sample'
import DayListPageObject from '../../../../__page_objects__/DayPageObject'

describe('Day', () => {

  let page, wrapper
  beforeEach(async () => {
    wrapper = mount(Day, { propsData: { day: FIRST_DAY } })
    page = new DayListPageObject(wrapper)
  })

  describe('When clicking buttons', () => {

    let navigateToGigSpy
    beforeEach(async () => {
      navigateToGigSpy = jest.fn()
      page.setRouterSpy({ navigateToGig: navigateToGigSpy })
    })

    it('navigates to first gig detail', async () => {
      const FIRST_GIG = FIRST_DAY.gigs[0]
      page.clickFirstGig()
      expect(navigateToGigSpy).toHaveBeenCalledWith(FIRST_GIG.id)
    })

    it('navigates to second gig detail', async () => {
      const SECOND_GIG = FIRST_DAY.gigs[1]
      page.clickSecondGig()
      expect(navigateToGigSpy).toHaveBeenCalledWith(SECOND_GIG.id)
    })
  })
})

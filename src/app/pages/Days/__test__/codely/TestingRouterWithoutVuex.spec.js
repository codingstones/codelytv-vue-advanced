import Day from '@/app/pages/Days/Day.vue'
import { storeDefinition } from '@/vuex/store'
import { renderComponent } from '@test/render-utils'
import userEvent from '@testing-library/user-event'
import { FIRST_DAY } from '../../../../services/__mocks__/gigs-sample'

it('navigates to first gig detail', async () => {
  const FIRST_GIG = FIRST_DAY.gigs[0]
  const navigateToGigSpy = jest.fn()
  const screen = renderDay({navigateToGig: navigateToGigSpy})

  await screen.openGig(FIRST_GIG.title)

  expect(navigateToGigSpy).toHaveBeenCalledWith(FIRST_GIG.id)
})

it('navigates to second gig detail', async () => {
  const SECOND_GIG = FIRST_DAY.gigs[1]
  const navigateToGigSpy = jest.fn()
  const screen = renderDay({navigateToGig: navigateToGigSpy})

  await screen.openGig(SECOND_GIG.title)

  expect(navigateToGigSpy).toHaveBeenCalledWith(SECOND_GIG.id)
})

function renderDay(jotaRouterInstance) {
  const screen = renderComponent(Day, {
    props: { day: FIRST_DAY },
    store: storeDefinition,
    jotaRouter: () => jotaRouterInstance
  })
  const openGig = async title => userEvent.click((await screen.findByText(title)))

  return {...screen, openGig}
}

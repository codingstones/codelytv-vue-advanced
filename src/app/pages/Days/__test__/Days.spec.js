import Days from '@/app/pages/Days/Days.vue'
import { FIRST_DAY, DAY_LIST } from '../../../services/__mocks__/gigs-sample'
import { localizedFromIso } from '../../../services/date-utils'
import { storeDefinition } from '@/vuex/store'
import { renderComponent } from '@test/render-utils'
import { within } from '@testing-library/vue'
jest.mock('@/app/services/jota-api')

const FIRST_DAY_GIG_TITLES = FIRST_DAY.gigs.map(gig => gig.title)

it('renders all gigs in the first day', async() => {
  const screen = renderComponent(Days, { store: storeDefinition })

  FIRST_DAY_GIG_TITLES.forEach(async text => {
    expect(await screen.findByText(text)).toBeInTheDocument()
  })
})

it('render days in localized format', async () => {
  const screen = renderComponent(Days, { store: storeDefinition })
  DAY_LIST.forEach(async (day) => {
    expect(await screen.findByText(localizedFromIso(day.date))).toBeInTheDocument()
  })
})

it('render gigs for each day', async () => {
  const screen = renderComponent(Days, { store: storeDefinition })
  DAY_LIST.forEach(async day => {
    const gigTitlesInDay = day.gigs.map((gig) => gig.title + ' ' + gig.place)
    const dayElement = await screen.findByText(localizedFromIso(day.date))
    gigTitlesInDay.forEach(async title => {
      expect(
        await within(dayElement).findByText(title)
      ).toBeInTheDocument()
    })
  })
})

import Days from '@/app/pages/Days/Days.vue'
import { storeDefinition } from '@/vuex/store'
import { renderComponent } from '@test/render-utils'
import { fakeGigsByDay, FIRST_DAY } from '../../../../services/__mocks__/gigs-sample'

const FIRST_DAY_GIG_TITLES = FIRST_DAY.gigs.map(gig => gig.title)

it('renders all gigs in the first day', async() => {
  storeDefinition.state.days = fakeGigsByDay
  const screen = renderComponent(Days, { store: storeDefinition })

  FIRST_DAY_GIG_TITLES.forEach(async text => {
    expect(await screen.findByText(text)).toBeInTheDocument()
  })
})

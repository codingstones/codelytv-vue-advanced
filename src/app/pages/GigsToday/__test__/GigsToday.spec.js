import GigsToday from '@/app/pages/GigsToday/GigsToday.vue'
import { fakeGigsByDay, FIRST_DAY } from '../../../services/__mocks__/gigs-sample'
import { stubNow } from '../../../../../test/helpers'
import { renderComponent } from '@test/render-utils'
import { storeDefinition } from '@/vuex/store'

const FIRST_DAY_GIG_TITLES = FIRST_DAY.gigs.map(gig => gig.title)

it('renders all gigs in the first day', async () => {
  stubNow('2017-09-18')
  const screen = renderGigsToday()
  FIRST_DAY_GIG_TITLES.forEach(async text =>
    expect(await screen.findByText(text)).toBeInTheDocument()
  )
})

it('renders no gigs message', async () => {
  stubNow('2017-09-17')
  const screen = renderGigsToday()
  expect(await screen.findByText("No gigs for today, why don't you go to the cinema?")).toBeInTheDocument()
})

function renderGigsToday() {
  storeDefinition.state.days = fakeGigsByDay
  return renderComponent(GigsToday, {store: storeDefinition})
}

import GigsTomorrow from '@/app/pages/GigsTomorrow/GigsTomorrow.vue'
import { storeDefinition } from '@/vuex/store'
import { renderComponent } from '@test/render-utils'
import { stubNow } from '../../../../../test/helpers'
import { fakeGigsByDay, FIRST_DAY } from '../../../services/__mocks__/gigs-sample'

describe('Gigs Tomorrow', () => {
  const FIRST_DAY_GIG_TITLES = FIRST_DAY.gigs.map(gig => gig.title)

  it('renders all gigs', async () => {
    stubNow('2017-09-18')
    const screen = renderGigsTomorrow()
    FIRST_DAY_GIG_TITLES.forEach(async text =>
      expect(await screen.findByText(text)).toBeInTheDocument()
    )
  })

  it('renders no gigs message', async () => {
    stubNow('2017-09-16')
    const gigsTomorrow = renderGigsTomorrow()
    expect(
      await gigsTomorrow.findByText("No gigs for tomorrow, why don't you go to the cinema?")
    ).toBeInTheDocument()
  })
})

function renderGigsTomorrow() {
  storeDefinition.state.days = fakeGigsByDay
  return renderComponent(GigsTomorrow, {store: storeDefinition})
}

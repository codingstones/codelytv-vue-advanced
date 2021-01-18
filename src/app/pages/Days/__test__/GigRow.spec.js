import GigRow from '@/app/pages/Days/GigRow.vue'
import { renderComponent } from '@test/render-utils'

it('renders gig content', async () => {
  const GIG = {id: 'an id', title: 'a title', place: 'a place'}

  const screen = renderComponent(GigRow, { props: {gig: GIG} })

  expect(await screen.findByText('a title')).toBeInTheDocument()
  expect(await screen.findByText('a place')).toBeInTheDocument()
})

import { FIRST_GIG } from '../../../services/__mocks__/gigs-sample'
import { renderComponent } from '@test/render-utils'
import { storeDefinition } from '@/vuex/store'
import { routes } from '@/router'
import GigDetail from '@/app/pages/GigDetail/GigDetail.vue'

jest.mock('@/app/services/jota-api')

it('renders details from a Gig', async () => {
  storeDefinition.state.route = {params: {id: FIRST_GIG.id}}
  const {findByText} = renderComponent(GigDetail, {
    store: storeDefinition,
    routes: routes,
  })

  expect(await findByText(FIRST_GIG.title)).toBeInTheDocument()
  expect(await findByText(FIRST_GIG.place)).toBeInTheDocument()
})

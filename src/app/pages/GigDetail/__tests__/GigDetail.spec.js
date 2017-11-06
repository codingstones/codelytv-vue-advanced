import GigDetail from '@/app/pages/GigDetail/GigDetail.vue'
import { FIRST_GIG } from '../../../services/__mocks__/gigs-sample'
import { cloneProductionStore, Wrap } from '../../../../../test/helpers'
import PageObject from '../../../__page_objects__/PageObject'

jest.mock('@/app/services/jota-api')

describe('Gig Detail', () => {

  it('renders details from a Gig', async () => {
    let store = cloneProductionStore()
    const wrapper = Wrap(GigDetail)
      .withStore(store)
      .mount()
    const page = new PageObject(wrapper)
    await page.wait()

    expect(wrapper.text()).toContain(FIRST_GIG.title)
    expect(wrapper.text()).toContain(FIRST_GIG.place)
  })
})

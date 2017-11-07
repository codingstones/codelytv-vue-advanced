import GigDetail from '@/app/pages/GigDetail/GigDetail.vue'
import { cloneProductionStore, Wrap } from '../../../../../../test/helpers'
import PageObject from '../../../../__page_objects__/PageObject'

jest.mock('@/app/services/jota-api')

describe('Gig Detail', () => {

  it('matches snapshot', async () => {
    let store = cloneProductionStore()
    const wrapper = Wrap(GigDetail)
      .withStore(store)
      .mount()
    const page = new PageObject(wrapper)
    await page.wait()

    page.matchSnapshot()
  })
})

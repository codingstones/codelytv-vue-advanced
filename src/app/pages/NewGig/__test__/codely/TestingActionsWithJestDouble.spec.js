import NewGig from '@/app/pages/NewGig/NewGig.vue'
import NewGigPage from '../../../../__page_objects__/NewGigPageObject'
import { cloneProductionStore, Wrap } from '../../../../../../test/helpers'
import { createGig as createGigSpy } from '../../../../services/jota-api'
jest.mock('@/app/services/jota-api')
import { createGigPayload } from '../../../../services/jota-payloads'

describe('New Gig', () => {
  const FUTURE_DATETIME = '3000/10/27'

  describe('When clicking save button', async () => {
    let store, page
    beforeEach(async () => {
      store = cloneProductionStore()
      const wrapper = Wrap(NewGig).withStore(store).mount()
      page = new NewGigPage(wrapper)

      expect(store.state.days).toEqual({})

      page.writeNameAsync(nameWithValidLength())
      page.writeDatetime(FUTURE_DATETIME)
      await page.wait()
      page.clickSaveButton()
      await page.wait()
    })
    it('creates a GIG in the store', async () => {
      expect(store.state.days[FUTURE_DATETIME]).toBeDefined()
    })

    it('navigates to all gigs route', async () => {
      page.checkCurrentPath(store, '/all')
    })

    it('calls backend with appropriate command', async () => {
      // This will be also tested in happy path but in this integration tests we can check all strange cases
      // faster and cheaper
      expect(createGigSpy).toHaveBeenCalledWith(createGigPayload(nameWithValidLength(), FUTURE_DATETIME))
    })
  })
})

function nameWithValidLength() {
  return nameWithLength(5)
}

function nameWithLength(length) {
  return 'x'.repeat(length)
}

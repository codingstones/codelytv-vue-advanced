import { mount } from 'vue-test-utils'
import NewGig from '@/app/pages/NewGig/NewGig.vue'
import NewGigPage from '../../../../__page_objects__/NewGigPageObject'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('New Gig', () => {
  const FUTURE_DATETIME = '3000/10/27'

  it('creates a GIG in the store when save button is clicked', async () => {
    let actionSpy = jest.fn()
    let store = new Vuex.Store({
      state: {days: [], loading: false},
      actions: { create_gig: actionSpy }
    })
    const wrapper = mount(NewGig, { store, router: new VueRouter() })
    const page = new NewGigPage(wrapper, {store})

    page.writeNameAsync(nameWithValidLength())
    page.writeDatetime(FUTURE_DATETIME)
    await page.wait()
    page.clickSaveButton()

    expect(actionSpy).toHaveBeenCalled()
  })
})

function nameWithValidLength() {
  return nameWithLength(5)
}

function nameWithLength(length) {
  return 'x'.repeat(length)
}

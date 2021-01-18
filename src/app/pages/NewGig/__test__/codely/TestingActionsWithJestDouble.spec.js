import NewGig from '@/app/pages/NewGig/NewGig.vue'
import { storeDefinition } from '@/vuex/store'
import { renderComponent, tomorrowDayOfMonth, tomorrow, sleep } from '@test/render-utils'
import { createGig as createGigSpy } from '../../../../services/jota-api'
import userEvent from '@testing-library/user-event'
import { routes} from '@/router'
jest.mock('@/app/services/jota-api')
import { createGigPayload } from '../../../../services/jota-payloads'

describe('When clicking create Gig button', () => {
  it('creates a GIG in the store', async () => {
    const {store} = await createGig()

    const tomorrowDateString = tomorrow().toISOString().substring(0, 10)
    // WARNING: working with a global state is not recommended
    // Better asserting HTML or behaviour instead of state 
    expect(store.state.days[tomorrowDateString]).toBeDefined()
  })

  it('calls backend with appropriate command', async () => {
    await createGig()

    expect(createGigSpy).toHaveBeenCalledWith(createGigPayload(nameWithValidLength(), tomorrow().toISOString()))
  })
})

async function createGig() {
  storeDefinition.state.days = {}
  const newGig = await renderNewGig(storeDefinition)
  await newGig.typeGigName(nameWithValidLength())
  await newGig.setGigDate(tomorrowDayOfMonth())
  await newGig.clickCreateGig()
  await sleep(100)
  return newGig
}

async function renderNewGig(storeDefinition) {
  const newGig = renderComponent(NewGig, {store: storeDefinition, routes: routes})

  // it would be much better to use a label but for now q-input does not bind label with input
  // (we should modify q-input to force that binding or maybe using aria-label as a workaround)
  const findNameInput = async () => (await newGig.findAllByRole('textbox'))[0]

  const typeGigName = async (name) => userEvent.type(await findNameInput(), name)

  const clearGigName = async () => {
    userEvent.clear(await findNameInput())
  }

  const setGigDate = async (dayText) => {
    userEvent.click(await newGig.findByText(/Date and time/i))
    userEvent.click(await newGig.findByText(dayText))
    userEvent.click(await newGig.findByText(/set/i))
    // Wait for date set and rendered 
    await newGig.findByText(/\//i)
  }

  const clearGigDate = async () => {
    userEvent.click(await newGig.findByText(/\//i))
    userEvent.click(await newGig.findByText(/clear/i))
  }

  const findCreateGigButton = async () => (await newGig.findByText(/Create Gig/i)).closest('button')

  const clickCreateGig = async () => userEvent.click(await findCreateGigButton())

  return {...newGig, typeGigName, clearGigName, setGigDate, clearGigDate, findCreateGigButton, clickCreateGig}
}

function nameWithValidLength() {
  return nameWithLength(5)
}

function nameWithLength(length) {
  return 'x'.repeat(length)
}

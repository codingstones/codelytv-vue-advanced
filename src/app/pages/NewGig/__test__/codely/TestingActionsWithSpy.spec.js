import NewGig from '@/app/pages/NewGig/NewGig.vue'
import { storeDefinition } from '@/vuex/store'
import { renderComponent, tomorrowDayOfMonth } from '@test/render-utils'
import userEvent from '@testing-library/user-event'

it('creates a GIG in the store when save button is clicked', async () => {
  let actionSpy = jest.fn()
  storeDefinition.state = { days: [], loading: false, error: null }
  storeDefinition.actions.create_gig = actionSpy

  const newGig = renderNewGig(storeDefinition)

  await newGig.typeGigName(nameWithValidLength())
  await newGig.setGigDate(tomorrowDayOfMonth())
  userEvent.click(await newGig.findCreateGigButton())

  expect(actionSpy).toHaveBeenCalled()
})

function renderNewGig(storeDefinition) {
  const newGig = renderComponent(NewGig, {store: storeDefinition})

  // it would be much better to use a label but for now q-input does not bind label with input
  // (we should modify q-input to force that binding or maybe using aria-label as a workaround)
  const findNameInput = async () => (await newGig.findAllByRole('textbox'))[0]

  const typeGigName = async (name) => {
    userEvent.type(await findNameInput(), name)
  }
  const setGigDate = async (dayText) => {
    userEvent.click(await newGig.findByText(/Date and time/i))
    userEvent.click(await newGig.findByText(dayText))
    userEvent.click(await newGig.findByText(/set/i))
    // Wait for date set and rendered 
    await newGig.findByText(/\//i)
  }

  const findCreateGigButton = async () => (await newGig.findByText(/Create Gig/i)).closest('button')

  return {...newGig, typeGigName, setGigDate, findCreateGigButton}
}

function nameWithValidLength() {
  return nameWithLength(5)
}

function nameWithLength(length) {
  return 'x'.repeat(length)
}

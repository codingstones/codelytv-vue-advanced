import NewGig from '@/app/pages/NewGig/NewGig.vue'
import { storeDefinition } from '@/vuex/store'
import { renderComponent, tomorrow, tomorrowDayOfMonth, yesterdayDayOfMonth } from '@test/render-utils'
import userEvent from '@testing-library/user-event'
import { createGig as createGigSpy } from '../../../services/jota-api'
import { createGigPayload } from '../../../services/jota-payloads'
// The only double that we need to mock
jest.mock('@/app/services/jota-api')

describe('shows validation error', () => {
  describe('when validating title', () => {
    it('and title is too short', async() => {
      const newGig = await renderNewGig()

      newGig.typeGigName(tooShortName())

      expect(await newGig.findByText('Minimum 5 characters.')).toBeInTheDocument()
    })

    it('and title is too long', async () => {
      const newGig = await renderNewGig()

      newGig.typeGigName(tooLongName())

      expect(await newGig.findByText('Maximum 20 characters.')).toBeInTheDocument()
    })
  })

  describe('when validating datetime', () => {
    it('and datetime is cleared', async () => {
      const newGig = await renderNewGig()

      await newGig.setGigDate(tomorrowDayOfMonth())

      await newGig.clearGigDate()

      expect(await newGig.findByText('Date and time of gig are required.')).toBeInTheDocument()
    })

    it('and datetime is in the past', async () => {
      const newGig = await renderNewGig()

      await newGig.setGigDate(yesterdayDayOfMonth())

      expect(await newGig.findByText('You cannot set a gig in a past date :(')).toBeInTheDocument()
    })
  })
})

describe('Create Gig button', () => {
  it('is disabled by default', async () => {
    const newGig = await renderNewGig()

    expect(await newGig.findCreateGigButton()).toHaveClass('disabled')
  })

  it('is disabled when form not fully filled', async () => {
    const {typeGigName, findCreateGigButton} = await renderNewGig()

    typeGigName(nameWithValidLength())

    expect(await findCreateGigButton()).toHaveClass('disabled')
  })

  it('is disabled when form has errors', async () => {
    const {typeGigName, findCreateGigButton} = await renderNewGig()

    typeGigName(tooShortName())

    expect(await findCreateGigButton()).toHaveClass('disabled')
  })

  it('is enabled when form is fully filled without errors', async () => {
    const {typeGigName, setGigDate, findCreateGigButton} = await renderNewGig()

    typeGigName(nameWithValidLength())
    await setGigDate(tomorrowDayOfMonth())

    expect(await findCreateGigButton()).not.toHaveClass('disabled')
  })
})

describe('When clicking create gig button', () => {
  it('calls backend with appropriate command', async () => {
    const {typeGigName, setGigDate, findCreateGigButton} = await renderNewGig()

    typeGigName(nameWithValidLength())
    await setGigDate(tomorrowDayOfMonth())

    userEvent.click(await findCreateGigButton())
    expect(createGigSpy).toHaveBeenCalledWith(createGigPayload(nameWithValidLength(), tomorrow().toISOString()))
  })
})

async function renderNewGig() {
  const newGig = renderComponent(NewGig, {store: storeDefinition})

  // it would be much better to use a label but for now q-input does not bind label with input
  // (we should modify q-input to force that binding or maybe using aria-label as a workaround)
  const nameInput = (await newGig.findAllByRole('textbox'))[0]

  const typeGigName = (name) => {
    userEvent.type(nameInput, name)
  }

  const clearGigName = () => {
    userEvent.clear(nameInput)
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

  return {...newGig, typeGigName, clearGigName, setGigDate, clearGigDate, findCreateGigButton}
}

function nameWithValidLength() {
  return nameWithLength(5)
}

function tooShortName() {
  return nameWithLength(3)
}

function tooLongName() {
  return nameWithLength(21)
}

function nameWithLength(length) {
  return 'x'.repeat(length)
}

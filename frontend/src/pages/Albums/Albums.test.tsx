import { Albums } from './Albums'
import { render, screen } from '@testing-library/react'
//import { DiscogsApiContextProvider } from '../../discogsApi/useDiscogsApi'

vi.mock('DiscogsApiContext')

describe('Simple working test', () => {
  it('contains the title', () => {
    render(<Albums />)
    expect(screen.getByText(/Album List/i)).toBeInTheDocument()
  })
})
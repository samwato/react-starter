import * as React from 'react'
import { render, screen } from 'test-utils'
import { NotFound } from './not-found'

test('NotFound page loads correctly', () => {
  render(<NotFound />)

  expect(screen.getByRole('heading', { name: 'Not Found' })).toBeInTheDocument()
})

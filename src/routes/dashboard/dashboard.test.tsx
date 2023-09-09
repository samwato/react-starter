import * as React from 'react'
import { render, screen } from 'test-utils'
import { Dashboard } from './dashboard'

test('Dashboard page loads correctly', () => {
  render(<Dashboard />)

  expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
})

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '@/app'

test('Home page loads correctly', () => {
  render(<App />)

  expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
})

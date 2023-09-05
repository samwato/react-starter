import * as React from 'react'
import { render, screen } from 'test-utils'
import { Reports } from '@/routes/reports'

test('Reports page loads correctly', () => {
  render(<Reports />)

  expect(screen.getByRole('heading', { name: 'Reports' })).toBeInTheDocument()
})

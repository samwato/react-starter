import * as React from 'react'
import { type ReactNode, type ReactElement } from 'react'
import { render as rtlRender, type RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider } from '@/lib/router'

interface TestProvidersProps {
  children: ReactNode
}

const TestProviders = ({ children }: TestProvidersProps) => (
  <RouterProvider>{children}</RouterProvider>
)

const render = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  rtlRender(ui, { wrapper: TestProviders, ...options })

// eslint-disable-next-line import/export
export * from '@testing-library/react'
// eslint-disable-next-line import/export
export { render, userEvent }

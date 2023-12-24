import * as React from 'react'
import { type ReactNode, type ReactElement } from 'react'
import { act, render, type RenderOptions } from '@testing-library/react'
import * as userEvent from '@testing-library/user-event'
import { RouterProvider } from '@lib/router'

interface TestProvidersProps {
  children: ReactNode
}

const TestProviders = ({ children }: TestProvidersProps) => (
  <RouterProvider>{children}</RouterProvider>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: TestProviders, ...options })

// In case user events throw too many act warnings, use this proxy to wrap all user events in an act
const customUserEvent = {
  setup: () =>
    new Proxy(userEvent.default.setup(), {
      get(obj: userEvent.UserEvent, prop: string) {
        if (typeof prop === 'string' && prop !== 'setup' && prop in obj) {
          return (...args: unknown[]) =>
            act(() => Reflect.get(obj, prop)(...args))
        }
        return Reflect.get(obj, prop)
      },
    }),
}

export {
  act,
  configure,
  fireEvent,
  renderHook,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react'
export { customRender as render, customUserEvent as userEvent }

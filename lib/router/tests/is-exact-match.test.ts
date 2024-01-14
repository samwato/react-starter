import { isExactMatch } from '../utils/is-exact-match'

describe('isExactMatch', () => {
  test.each([
    // Truthy tests
    ['/', '/', true],
    ['/path', '/path', true],
    ['/path/sub', '/path/sub', true],
    ['/path/sub/:id', '/path/sub/1', true],
    ['/path/sub/:id/list', '/path/sub/1/list', true],
    ['/path/sub/:id/list/:listId', '/path/sub/1/list/1', true],
    // Falsy tests
    // TODO: Add more tests
  ])(
    'Route matches expected boolean',
    (mockRoute, mockLocation, expectedResult) => {
      expect(isExactMatch(mockRoute, mockLocation)).toBe(expectedResult)
    },
  )
})

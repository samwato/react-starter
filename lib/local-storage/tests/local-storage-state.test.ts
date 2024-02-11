import { act, renderHook } from 'test-utils'
import { useLocalStorageState } from '../hooks/local-storage-state'

describe('useLocalStorageState', () => {
  const mockKey = 'test_key'
  const fireStorageEvent = (
    storageArea: Storage,
    key: string,
    { action, newValue }: { action: 'remove' | 'set'; newValue?: unknown },
  ) => {
    const oldValue = localStorage.getItem(key)

    if (action === 'remove') {
      localStorage.removeItem(key)
    }

    if (action === 'set') {
      localStorage.setItem(key, JSON.stringify(newValue))
    }

    dispatchEvent(
      new StorageEvent('storage', {
        key,
        oldValue,
        storageArea,
        newValue: JSON.stringify(newValue),
      }),
    )
  }

  afterEach(() => {
    localStorage.clear()
    jest.restoreAllMocks()
  })

  test.each([[''], [0], ['test'], [123], [{ name: 'test' }]])(
    'Default value of %s is set in state and local storage',
    (mockDefaultValue) => {
      const { result } = renderHook(() =>
        useLocalStorageState(mockKey, { defaultValue: mockDefaultValue }),
      )

      expect(result.current[0]).toStrictEqual(mockDefaultValue)
      expect(localStorage.getItem(mockKey)).toStrictEqual(
        JSON.stringify(mockDefaultValue),
      )
    },
  )

  test('When default value is set to null, value is not set in local storage', () => {
    const { result } = renderHook(() =>
      useLocalStorageState(mockKey, { defaultValue: null }),
    )

    expect(result.current[0]).toBeNull()
    expect(localStorage.getItem(mockKey)).toBeNull()
  })

  test('When default value is set to undefined, value is not set in local storage', () => {
    const { result } = renderHook(() => useLocalStorageState(mockKey))

    expect(result.current[0]).toBeUndefined()
    expect(localStorage.getItem(mockKey)).toBeNull()
  })

  test('Setting value to undefined clears local storage', () => {
    const mockDefaultValue = 'test'
    const { result } = renderHook(() =>
      useLocalStorageState<string>(mockKey, {
        defaultValue: mockDefaultValue,
      }),
    )

    expect(result.current[0]).toStrictEqual(mockDefaultValue)
    expect(localStorage.getItem(mockKey)).toStrictEqual(
      JSON.stringify(mockDefaultValue),
    )

    act(() => {
      result.current[1](undefined)
    })

    expect(localStorage.getItem(mockKey)).toBeNull()
  })

  test('Setting value to null clears local storage', () => {
    const mockDefaultValue = 'test'
    const { result } = renderHook(() =>
      useLocalStorageState<string | null>(mockKey, {
        defaultValue: mockDefaultValue,
      }),
    )

    expect(result.current[0]).toStrictEqual(mockDefaultValue)
    expect(localStorage.getItem(mockKey)).toStrictEqual(
      JSON.stringify(mockDefaultValue),
    )

    act(() => {
      result.current[1](null)
    })

    expect(localStorage.getItem(mockKey)).toBeNull()
  })

  test('Overrides existing invalid value in local storage', () => {
    localStorage.setItem(mockKey, 'invalid_value')

    const mockDefaultValue = 'test'

    const { result } = renderHook(() =>
      useLocalStorageState(mockKey, { defaultValue: mockDefaultValue }),
    )

    expect(result.current[0]).toStrictEqual(mockDefaultValue)
    expect(localStorage.getItem(mockKey)).toStrictEqual(
      JSON.stringify(mockDefaultValue),
    )
  })

  test('Updates value in local storage', () => {
    const mockDefaultValue = 123
    const mockUpdatedValue = 'updated'

    const { result } = renderHook(() =>
      useLocalStorageState<string | number>(mockKey, {
        defaultValue: mockDefaultValue,
      }),
    )

    expect(localStorage.getItem(mockKey)).toStrictEqual(
      JSON.stringify(mockDefaultValue),
    )

    act(() => {
      result.current[1](mockUpdatedValue)
    })

    expect(localStorage.getItem(mockKey)).toStrictEqual(
      JSON.stringify(mockUpdatedValue),
    )
  })

  test('Changing keys removes old key', () => {
    const mockDefaultValue = 123
    const mockNewKey = 'new_key'

    const { rerender } = renderHook(
      (key: string) =>
        useLocalStorageState(key, {
          defaultValue: mockDefaultValue,
        }),
      { initialProps: mockKey },
    )

    expect(localStorage.getItem(mockKey)).toStrictEqual(
      JSON.stringify(mockDefaultValue),
    )

    rerender(mockNewKey)

    expect(localStorage.getItem(mockKey)).toBeNull()
    expect(localStorage.getItem(mockNewKey)).toStrictEqual(
      JSON.stringify(mockDefaultValue),
    )
  })

  test('Removes value from local storage sets state to undefined', () => {
    const mockDefaultValue = 'test'

    const { result } = renderHook(() =>
      useLocalStorageState(mockKey, {
        defaultValue: mockDefaultValue,
        storageSync: true,
      }),
    )

    expect(result.current[0]).toStrictEqual(mockDefaultValue)

    act(() => {
      fireStorageEvent(localStorage, mockKey, { action: 'remove' })
    })

    expect(result.current[0]).toBeUndefined()
  })

  test('Changes from local storage sets state', () => {
    const mockDefaultValue = 'test'
    const mockUpdatedValue = 'updated_value'

    const { result } = renderHook(() =>
      useLocalStorageState(mockKey, {
        defaultValue: mockDefaultValue,
        storageSync: true,
      }),
    )

    expect(result.current[0]).toStrictEqual(mockDefaultValue)

    act(() => {
      fireStorageEvent(localStorage, mockKey, {
        action: 'set',
        newValue: mockUpdatedValue,
      })
    })

    expect(result.current[0]).toStrictEqual(mockUpdatedValue)
  })

  test('Setting local storage to "undefined" sets state to undefined and clears item', () => {
    const mockDefaultValue = 'test'

    const { result } = renderHook(() =>
      useLocalStorageState(mockKey, {
        defaultValue: mockDefaultValue,
        storageSync: true,
      }),
    )

    expect(result.current[0]).toStrictEqual(mockDefaultValue)

    act(() => {
      fireStorageEvent(localStorage, mockKey, {
        action: 'set',
        newValue: 'undefined',
      })
    })

    expect(result.current[0]).toBeUndefined()
  })

  test('When storage event has incorrect storageArea, value is not updated', () => {
    const mockDefaultValue = 'test'
    const mockUpdatedValue = 'updated_value'

    const { result } = renderHook(() =>
      useLocalStorageState(mockKey, {
        defaultValue: mockDefaultValue,
        storageSync: true,
      }),
    )

    expect(result.current[0]).toStrictEqual(mockDefaultValue)

    act(() => {
      fireStorageEvent(sessionStorage, mockKey, {
        action: 'set',
        newValue: mockUpdatedValue,
      })
    })

    expect(result.current[0]).toStrictEqual(mockDefaultValue)
  })

  test('When key is mismatched, value is not updated', () => {
    const mockDefaultValue = 'test'
    const mockUpdatedValue = 'updated_value'

    const { result } = renderHook(() =>
      useLocalStorageState(mockKey, {
        defaultValue: mockDefaultValue,
        storageSync: true,
      }),
    )

    expect(result.current[0]).toStrictEqual(mockDefaultValue)

    act(() => {
      fireStorageEvent(localStorage, 'wrong_key', {
        action: 'set',
        newValue: mockUpdatedValue,
      })
    })

    expect(result.current[0]).toStrictEqual(mockDefaultValue)
  })

  test('Failing to get item in initializer still uses default value', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error()
    })

    const mockDefaultValue = 'test'

    const { result } = renderHook(() =>
      useLocalStorageState(mockKey, { defaultValue: mockDefaultValue }),
    )

    expect(result.current[0]).toStrictEqual(mockDefaultValue)
  })

  test('Failing to remove invalid item still uses default value', () => {
    localStorage.setItem(mockKey, 'invalid_value')
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error()
    })

    const mockDefaultValue = 'test'

    const { result } = renderHook(() =>
      useLocalStorageState(mockKey, { defaultValue: mockDefaultValue }),
    )

    expect(result.current[0]).toStrictEqual(mockDefaultValue)
    expect(localStorage.getItem(mockKey)).toStrictEqual(
      JSON.stringify(mockDefaultValue),
    )
  })

  test('Failing to remove old key still sets new key', () => {
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error()
    })

    const mockDefaultValue = 123
    const mockNewKey = 'new_key'

    const { rerender } = renderHook(
      (key: string) =>
        useLocalStorageState(key, {
          defaultValue: mockDefaultValue,
        }),
      { initialProps: mockKey },
    )

    expect(localStorage.getItem(mockKey)).toStrictEqual(
      JSON.stringify(mockDefaultValue),
    )

    rerender(mockNewKey)

    expect(localStorage.getItem(mockKey)).toStrictEqual(
      JSON.stringify(mockDefaultValue),
    )
    expect(localStorage.getItem(mockNewKey)).toStrictEqual(
      JSON.stringify(mockDefaultValue),
    )
  })

  test('Failing to remove item when setting value to undefined still works', () => {
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error()
    })

    const mockDefaultValue = 'test'

    const { result } = renderHook(() =>
      useLocalStorageState(mockKey, { defaultValue: mockDefaultValue }),
    )

    expect(result.current[0]).toStrictEqual(mockDefaultValue)
    expect(localStorage.getItem(mockKey)).toStrictEqual(
      JSON.stringify(mockDefaultValue),
    )

    act(() => {
      result.current[1](undefined)
    })

    expect(result.current[0]).toBeUndefined()
    expect(localStorage.getItem(mockKey)).toStrictEqual(
      JSON.stringify(mockDefaultValue),
    )
  })

  test('Failing to set item still stores value in state', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error()
    })

    const mockUpdatedValue = 'test'

    const { result } = renderHook(() => useLocalStorageState(mockKey))

    expect(result.current[0]).toBeUndefined()
    expect(localStorage.getItem(mockKey)).toBeNull()

    act(() => {
      result.current[1](mockUpdatedValue)
    })

    expect(result.current[0]).toStrictEqual(mockUpdatedValue)
    expect(localStorage.getItem(mockKey)).toBeNull()
  })

  test('When an invalid update occurs to the item in local storage, the state is unchanged', () => {
    jest.spyOn(JSON, 'parse').mockImplementation(() => {
      throw new Error()
    })
    const mockDefaultValue = 'test'

    const { result } = renderHook(() =>
      useLocalStorageState(mockKey, {
        defaultValue: mockDefaultValue,
        storageSync: true,
      }),
    )

    expect(result.current[0]).toStrictEqual(mockDefaultValue)

    act(() => {
      fireStorageEvent(localStorage, mockKey, {
        action: 'set',
        newValue: "{ 'test': 1, }", // Invalid JSON with help from spy
      })
    })

    expect(result.current[0]).toStrictEqual(mockDefaultValue)
  })
})

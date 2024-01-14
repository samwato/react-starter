# React Starter

This repo is a good starting point for a basic React app.

## Get Started

To get started run the init script

```
npm run init
```

## Development

To run the app in development mode, run:

```
npm run dev
```

## Production

To run the app after a production build, run:

```
npm run prod
```

## Features

This starter app includes the following features:

| **Features**                               |     |
| ------------------------------------------ | --- |
| **Bundler**:                               |     |
| - Esbuild                                  | ✅  |
| - Production Build                         | ✅  |
| - Typescript                               | ✅  |
| - Image Loaders (.png, .jpg and .svg)      | ✅  |
| - Public env vars starting with "PUBLIC\_" | ✅  |
| **Styling:**                               |     |
| - Normalize CSS                            | ✅  |
| - CSS Modules                              | ✅  |
| **Linting:**                               |     |
| - Eslint                                   | ✅  |
| **Formatting:**                            |     |
| - Prettier                                 | ✅  |
| **Development Workflow:**                  |     |
| - Live Reload                              | ✅  |
| - Pre-commit Hook                          | ✅  |
| **Testing:**                               |     |
| - Jest                                     | ✅  |
| - React Testing Library                    | ✅  |

## Library Extras

In the `src/lib` folder there are extra libraries and helpers that provide basic solutions to common web app problems.
These are can easily be removed and replace with external libraries.

### Router

Lightweight alternative client side router.
For production ready router try [React Router](https://reactrouter.com/en/main) instead.

Pros:

- Lightweight
- Not another npm package

Cons:

- Missing features
  - Url params
  - Search params
- Not for production

### Fetcher

Lightweight alternative for fetching data.
For production ready solution try [Tanstack Query](https://tanstack.com/query/latest/) instead.

Pros:

- Lightweight
- Not another npm package
- Simple state factory
- Option for auto fetch on mount

Cons:

- Missing features
  - No retries
  - No caching
  - Does not consolidate multiple network requests

## Things In Progress

Router:

- [ ] Router with query and search params

- [ ] react-hook-form alternative
- [ ] Add tests for lib extras
- [ ] Upgrade packages
- [ ] Language support
- [ ] UI Library support, theming, accessibility component, etc.
- [ ] Any helper hooks, locales, media queries, etc.

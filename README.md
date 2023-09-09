# React Starter

This repo is a good starting point for a basic React app.

## Get Started

To get started run the init script

```shell
init-repo.sh
```

## Develop

To run the app in dev mode, run:

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

| **Bundler**                         |     |
| ----------------------------------- | --- |
| Esbuild                             | ✅  |
| Production Builds                   | ✅  |
| Typescript                          | ✅  |
| Image Loaders (.png, .jpg and .svg) | ✅  |
| **Styling**                         |     |
| Normalize CSS                       | ✅  |
| CSS Modules                         | ✅  |
| **Linting**                         |     |
| Eslint                              | ✅  |
| **Formatting**                      |     |
| Prettier                            | ✅  |
| **Development Workflow**            |     |
| Live Reload                         | ✅  |
| Pre-commit Hook                     | ✅  |
| **Testing**                         |     |
| Jest                                | ✅  |
| React Testing Library               | ✅  |

## Library Extras

In the `src/lib` folder there are extra libraries and helpers that provide basic solutions to common web app problems.
These are can easily be removed and replace with external libraries.

#### 1. Router

Lightweight alternative client side router.
Does not support nested routes, params or search params.
For production ready router try [React Router](https://reactrouter.com/en/main) instead.

#### 2. Fetcher

TODO

## Things In Progress

- [ ] Add tests for Router
- [ ] Language support
- [ ] UI Library support, theming, accessibility component, etc.
- [ ] Helper hooks, router hooks, locales, media queries, etc.

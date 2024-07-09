# Backstack Vue (ALPHA)

> Please note that this project is not yet ready for production use.

A starter project using the `Backstack API` for applications created with `Vue`.

Built with:

* Vite 5
* Vue 3
* Vue Router 4
* Pinia 2
* Axios 2
* Bootstrap 5

## Features

Includes common functionality. Add your app-specific views using the built-in components (e.g., tables, settings, file uploads) or your own.

* Log-in
* Reset password
* Sign-up
* Feature-based access control (RBAC)
* User settings
* Account settings
* Application versioning (e.g., Basic, Advanced, Premium)
* In-app module purchases (e.g., additional users, more widgets)
* Account networking with fee sharing


## Installation

Download and unpack the contents of the zip file into your project directory. From there, install the `package.json` assets and run the development server.

```sh
npm install
npm run dev
```

Modify the files as needed for your project.


## Updates

This project does not offer typical updating schemas as it's intended to be a starter package that's fully managed by the user. However, it does incorporate assets from the `backstack-vue-assets` npm package, which can be updated independently.

The [source code for the npm package](https://github.com/deloachtech/backstack-vue-assets) is open source and available for reference.

# Customization

You can change everything used in this package to make it unique.

## Theme

The project uses [Vite](https://vitejs.dev/) to compile the `src/assets/css/styles.scss` and the `src/assets/css/theme.css`. Modify either of these files to meet your project requirements.

## Components

You can directly edit the components included in the `src/components` directory.

Other components are abstracted into the `backstack-vue-assets` npm package. You can find the [actual components](https://github.com/deloachtech/backstack-vue-assets/tree/main/src/components) in the repo of the same name.

To edit a component provided in the npm package, simply copy the repo component into your project and change the import statement.

```js
// include { FooComponent } from "backstack-vue-assets"
include FooComponent from "@/components/FooComponent.vue"
```

### Child Components

You may have to change an import path in a parent if it uses other npm package components.

```js
//include ChildComponent from "@/component"
include ChildComponent from "backstack-vue-assets"
```

If the component you're modifying is itself a child component in the npm package this won't work.

> We're eliminating the use of imports for child components in the npm package, so this won't be an issue in the near future.


## Templates

Everything controlling the structure of the project (e.g. layout, navigation) is located in `src/template` for your convenience.


# Usage

TODO


## Sessions

TODO


## Access Control

TODO


## Axios

The `axios` installation can be used for any api endpoint. There are a couple of configuration values added for using Backstack.

| Key | Value |
| --- | --- |
| `api` | An api-specific value for implementing your logic. |
| `alert` | When using the `backstack` `api`, you can bypass the alert logic by setting this to `false`.

```js
await axios.post('https://api.backstack.com/v1/auth/reset-password', data, { api: 'backstack' }) ...
```

### Errors

The `AxiosError.vue` component handles Backstack errors using Axios `interceptors`.

## Routing

TODO


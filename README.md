# Vue Project (ALPHA)

> This project is not production ready!

Starter project for `Vue` applications using the `Backstack API`.

Built with:

* Vite 5
* Vue 3
* Vue Router 4
* Pinia 2
* Axios 2
* Bootstrap 5
* Backstack API with a starter `app-schema.json` (Replace with your app-specific version.)

## Features

Includes common functionality. Add your app-specific pages using the built-in components (e.g., tables, settings, file uploads)

* Log-in
* Reset password
* Sign-up
* Feature-based access control (RBAC)
* User settings
* Account settings
* Application versioning (e.g., Basic, Advanced, Premium)
* In-app module subscriptions (e.g., additional users, more widgets)
* Account networking with fee sharing


## Installation

### Clone the Repository

```sh
git clone https://github.com/deloachtech/backstack-vue.git
```

### Change the Working Directory

```sh
cd backstack-vue
```

### Install the Assets

```sh
npm install
```

### Get Started

```sh
npm run dev
```

Modify the files as needed for the new project. 

# Customization

You can change everything used in this package to make it unique.

## Theme

The project uses [Vite](https://vitejs.dev/) to compile the `src/assets/css/styles.scss` and the `src/assets/css/theme.css`. Modify either of these files to meet your project requirements.

## Components

You can easily edit the components included in the `src/components` directory.

Other components are abstracted into the `backstack-vue-assets` npm package. You can find the [actual components](https://github.com/deloachtech/backstack-vue-assets/tree/main/src/components) in the repo of the same name.

To edit a component provided in the npm package, simply copy the repo component into your project and change the import statement.

```js
// include {FooComponent} from "backstack-vue-assets"
include FooComponent from "@/components/FooComponent.vue"
```

You may have to change the import path if the component uses other npm package components.

```js
//include ChildComponent from "@/component"
include ChildComponent from "backstack-vue-assets"
```

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


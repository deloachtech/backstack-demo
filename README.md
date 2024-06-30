# Vue Project

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


## Components

TODO

## Installation

### Clone the Repository

```sh
git clone https://github.com/deloachtech/vue-project.git
```

### Change the Working Directory

```sh
cd vue-project
```

### Install the Assets

```sh
npm install
```

## Get Started

```sh
npm run dev
```

Modify the files as needed for the new project. 

# Usage

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




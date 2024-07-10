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

Enterprise level access control is enforced using extremely simple logic.

We've provided a structured approach to manage access control within the project. This includes predefined constants and a default `hasAccess()` function to validate access permissions. However, this structure is flexible and can be easily replaced with your own logic if desired.

See the [access control docs](https://backstack.com/access-control.html) for more information on the entire architecture.

### Assignment

The access control schema is defined the [src/access-constants.json](https://github.com/deloachtech/backstack-vue/blob/main/src/access-constants.json) file. Use this file and logic to add your own access control specifications.

The constants are imported in the `main.js` as an `$access` global for ease of use.

```javascript
$access.ACCOUNT_USERS

// Combining constants:
[$access.FOO, $access.BAR].join(',') // The default delimiter
```

### Enforcement

By default, the project uses the `hasAccess()` function provided in the `backstack-vue-assets` npm module. It's imported/exported via the projects `assets/js/hasAccess.js` function so you can easily change the entire schema if desired. 

See the [validating access doc](https://backstack.com/access-control.html#validating-access) for details on creating your own hasAccess function.

## Axios

The `axios` installation can be used for any endpoint without additional configuration. A few`axios.config` settings have been added for using the Backstack features related to this project.

| Config key | Description |
| --- | --- |
| `api` | An optional api-specific setting for implementing your logic. |
| `alert` | When using the `backstack api`, you can bypass the alert logic when needed by setting this value to `false`.

```js
await axios.post('https://api.backstack.com/v1/auth/reset-password', data, { api: 'backstack' }) ...
```

### Errors

The [src/components/AxiosError.vue](https://github.com/deloachtech/backstack-vue/blob/main/src/components/AxiosError.vue) component handles Backstack errors using Axios `interceptors`. It eliminates a significant amount of error handling  logic elsewhere. You can modify this component to incorporate other services if desired.

## Routing

TODO


/** 
 * This function sets up the interceptors for the Axios library. The interceptors are used to
 * modify the request and response objects before they are sent or received. This is useful for
 * adding headers to requests, handling errors, and other tasks. The setupAxios function is 
 * called in main.js before the Vue app is created to ensure that the Axios library is properly
 * configured before any requests are made. 
 */

import axios from 'axios'

export function setupAxios() {


    axios.interceptors.request.use(
        (config) => {

            config.metadata = { startTime: new Date() };
            config.timeout = 60000

            if (config.api === 'backstack') {

                // Secrets stored in .env files are not secret!
                // Replace this logic with your preferred security schema.

                const appKey = import.meta.env.VITE_BACKSTACK_APP_KEY

                config.withCredentials = true
                config.headers.Authorization = `Bearer ${appKey}`


                // This header is used by the provider of the package and does not 
                // affect the performance of the application in any way.
                // Please leave this value so the provider can be properly acknowledged.
                config.headers['X-Provider-ID'] = 'your-provider-id';

                // DO NOT ADD ADDITIONAL HEADERS!!
                // Doing so will cause the request to fail the CORS policy.

                // We'll be releasing a development version of the API that can be used on the localhost.
                // Modify the URL for using the development version without changing the codebase.

                if (process.env.NODE_ENV === 'development') {

                    /* 
                       Example:

                       Given the URI https://api.backstack.com/v1/app/session. The following
                       .env.local configuration:

                       VITE_BACKSTACK_API_FIND=https://api.backstack.com/
                       VITE_BACKSTACK_API_REPLACE=http://localhost/backstack/api/

                       Will produce http://localhost/backstack/api/v1/app/session for Axios requests
                       without changing live URIs in the codebase.
                    */

                    const find = import.meta.env.VITE_BACKSTACK_API_FIND

                    const replace = import.meta.env.VITE_BACKSTACK_API_REPLACE

                    if (find.length > 0 && replace.length > 0) {
                        config.url = config.url.replace(find, replace)
                    }
                }
            }
            return config
        }
    )

    axios.interceptors.response.use(
        (response) => {

            const endTime = new Date();
            const startTime = response.config.metadata.startTime;
            const elapsedTime = endTime - startTime;

            // Have a minimum 400ms time for get requests so spinners can be recognized.
            if (response.config.method.toLowerCase() === 'get' && elapsedTime < 400) {

                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(response);
                    }, 400 - elapsedTime);
                });

            } else {

                return response;
            }
        },
        // (error) => {

        //     if (error.response) {

        //         if (error.response.config.api === 'backstack') {
        //             // See @/components/AxiosError.vue

        //         } else {
        //             // Handle errors for other configurations.
        //         }

        //         if (1 === 2) {
        //             // If the error type is 'user' the error.message will be suitable for display.

        //             if (error.response.data.error.type === 'user') {

        //                 if (error.response.config.method.toLowerCase() === 'delete') {

        //                     // The ConfirmDeleteDialog displays user deletion errors.

        //                 } else {

        //                     if (error.response.data.error.fields.length === 0) {

        //                         if (error.response.config.alert !== false) {
        //                             // replaced with AxiosError component
        //                             //alert(error.response.data.error?.message || 'An error occurred. Please try again later.')
        //                         }
        //                     }
        //                 }

        //             } else {


        //                 if (process.env.NODE_ENV === 'development') {
        //                     // replaced with AxiosError component
        //                     //console.log(error)
        //                 }

        //                 if (error.response.status === 401) {
        //                     // Redirect to login page
        //                     //router.push('/login')

        //                 } else if (error.response.status === 404) {

        //                     //router.push(error.response.config.route404)
        //                     // replaced with AxiosError component
        //                     //alert('An error occurred. Please try again later.')

        //                 } else {

        //                     // replaced with AxiosError component
        //                     //alert('An error occurred. Please try again later.')
        //                 }
        //             }
        //         }

        //     }
        //     return Promise.reject(error)
        // },
    )
}

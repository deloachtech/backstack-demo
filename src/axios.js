/** 
 * This function sets up the interceptors for the Axios library. The interceptors are used to
 * modify the request and response objects before they are sent or received. This is useful for
 * adding headers to requests, handling errors, and other tasks. The setupAxios function is 
 * called in main.js before the Vue app is created to ensure that the Axios library is properly
 * configured before any requests are made. 
 */

import axios from 'axios'
import { useSession } from "./session.js";


export function setupAxios() {

    const session = useSession()

    axios.interceptors.request.use(
        (config) => {

            config.metadata = { startTime: new Date() };
            config.timeout = 60000

            if (config.api === 'backstack') {

                // Secrets stored in .env files are not secret!
                // Replace this logic with your preferred security schema.

                const appKey = sessionStorage.getItem('jwt') ?? import.meta.env.VITE_BACKSTACK_APP_KEY

                //config.withCredentials = true
                config.headers.Authorization = `Bearer ${appKey}`


                // This header is used by the provider of the package and does not 
                // affect the performance of the application in any way.
                // Please leave this value so the provider can be properly acknowledged.
                config.headers['X-Provider-ID'] = 'your-provider-id';

                // DO NOT ADD ADDITIONAL HEADERS!!
                // Doing so will cause the request to fail the CORS policy.

                // We'll be releasing a development version of the API that can be used on the localhost.
                // Modify the URL for using the development version without changing the codebase.

                if (1=== 2 && process.env.NODE_ENV === 'development') {

                    /* 
                       Example:

                       Given the URI https://api.backstack.com/app/session. The following
                       .env.local configuration:

                       VITE_BACKSTACK_API_FIND=https://api.backstack.com/
                       VITE_BACKSTACK_API_REPLACE=http://localhost/backstack/api/

                       Will produce http://localhost/backstack/api/app/session for Axios requests
                       without changing live URIs in the codebase.
                    */

                    const find = import.meta.env.VITE_BACKSTACK_API_FIND
                    const replace = import.meta.env.VITE_BACKSTACK_API_REPLACE

                    if (find?.length > 0 && replace?.length > 0) {
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
    )
}

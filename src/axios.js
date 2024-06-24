import axios from 'axios'
import appSchema from './app-schema.json'

export function setupAxios() {


    axios.interceptors.request.use(
        (config) => {

            config.metadata = { startTime: new Date() };

            config.timeout = 60000
            config.withCredentials = true
            config.headers.Authorization = `Bearer ${appSchema.app.pub_key}`

            // Modify the URL for developing on the local version of the api.
            if (process.env.NODE_ENV === 'development') {

                const find = import.meta.env.VITE_BACKSTACK_API_FIND
                const replace = import.meta.env.VITE_BACKSTACK_API_REPLACE

                if (find && replace) {
                    config.url = config.url.replace(find, replace)
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
        (error) => {
            if (error.response) {

                // If the error type is 'user' the error.message will be suitable for display.

                if (error.response.data.error.type === 'user') {

                    if (error.response.config.method.toLowerCase() === 'delete') {

                        // The ConfirmDeleteDialog displays user deletion errors.

                    } else {

                        if (error.response.data.error.fields.length === 0) {

                            if (error.response.config.alert !== false) {
                                alert(error.response.data.error?.message || 'An error occurred. Please try again later.')
                            }
                        }
                    }

                } else {


                    if (process.env.NODE_ENV === 'development') {
                        console.log(error)
                    }

                    if (error.response.status === 401) {
                        // Redirect to login page
                        //router.push('/login')

                    } else if (error.response.status === 404) {

                        //router.push(error.response.config.route404)
                        alert('An error occurred. Please try again later.')

                    } else {

                        alert('An error occurred. Please try again later.')
                    }
                }

            }
            return Promise.reject(error)
        },
    )
}

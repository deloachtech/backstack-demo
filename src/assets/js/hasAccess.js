/**
 * A stub function for your access control logic.
 * 
 * Currently it returns the result of the hasAccess function from the backstack-vue-assets npm module.
 * You can replace this function with your own access control logic.
 * 
 * It's used by the session store via the hasAccessFunction property of the session.initialize method.
 * See the router.js file for it's implementation.
 * 
 * @see https://backstack.com/access-control for more information.
 * @see https://github.com/deloachtech/backstack-vue-assets/blob/main/src/assets/js/hasAccess.js for the actual function.
 * @returns {boolean} true if user has access to the resource, false otherwise.
 */

import  {hasAccess}  from "backstack-vue-assets/assets/js/hasAccess.js";
export default hasAccess;


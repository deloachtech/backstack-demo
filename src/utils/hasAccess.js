// Example usage:
// const requiredAccess = "*"; // Grant access to all users
// const sessionAccess = {feature1: "crud", feature2: "cr"};
//
// console.log(hasAccess('*', session.access)); // Output: true
// console.log(hasAccess('account-users:NotInAccessControl', session.access)); // Output: false
// console.log(hasAccess('unknown-feature:*', session.access)); // Output: false

export const hasAccess = (requiredAccess, sessionAccess) => {
    // Check if the requiredAccess is "*"
    if (requiredAccess === "*") {
        return true; // Grant access to all users
    }

    if (requiredAccess?.length > 0) {

        // Split the control string into individual features and their permissions
        const controlList = requiredAccess.split(',');

        // Iterate through each feature in the control string
        for (const control of controlList) {

            // requiredAccess could be "*,*,*" (e.g. combining '*' constants)
            if (control === "*") {
                return true; // Grant access to all users
            }

            // Split each feature and its permissions. If no permissions assume any.
            const [feature, permissions = "*"] = control.split(':');

            // Check if the feature exists in the sessionAccess object
            if (sessionAccess.hasOwnProperty(feature)) {
                // If permissions is "*", consider it as a wildcard and return true
                if (permissions === "*") {
                    return true;
                }

                // Check if the user's permissions include any of the required permissions
                for (const permission of permissions) {
                    if (sessionAccess[feature].includes(permission)) {
                        // If any permission is granted, return true
                        return true;
                    }
                }
            }
        }
    }

    if (process.env.NODE_ENV === 'development') {
        console.log(`Access denied: ${requiredAccess}`);
    }

    // If none of the features have been found or none of the permissions match, return false
    return false;
}

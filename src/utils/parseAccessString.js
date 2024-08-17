export const parseAccessString = (accessString) => {
    return accessString.split(',').reduce((acc, pair) => {
        const [key, value] = pair.split(':');
        acc[key] = value;
        return acc;
    }, {});
};
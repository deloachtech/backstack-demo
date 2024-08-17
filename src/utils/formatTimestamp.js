export const formatTimestamp = (timestamp, includeTime = false) => {
    const date = new Date(timestamp * 1000);
    return includeTime ? date.toLocaleString() : date.toLocaleDateString();
};
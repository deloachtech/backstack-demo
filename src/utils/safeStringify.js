
export const safeStringify = (obj, space) => {
    const seen = new WeakSet();
    return JSON.stringify(obj, function (key, value) {
        // Filter out Vue-specific properties
        if (key.startsWith('_') || key.startsWith('$')) {
            return;
        }
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return "[Circular]";
            }
            seen.add(value);
        }
        return value;
    }, space);
}
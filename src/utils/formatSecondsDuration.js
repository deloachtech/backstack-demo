// export const formatSecondsDuration = (seconds) => {
//     const days = Math.floor(seconds / 86400);
//     const hours = Math.floor((seconds % 86400) / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;

//     const daysStr = days > 0 ? `${days} day${days !== 1 ? 's' : ''}` : '';
//     const hoursStr = hours > 0 ? `${hours} hour${hours !== 1 ? 's' : ''}` : '';
//     const minutesStr = minutes > 0 ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : '';
//     const secondsStr = remainingSeconds > 0 ? `${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}` : '';

//     return [daysStr, hoursStr, minutesStr, secondsStr].filter(Boolean).join(', ');
// };

export const formatSecondsDuration = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = ((seconds % 3600) / 60).toFixed(2); // Calculate minutes as a decimal

    const daysStr = days > 0 ? `${days} day${days !== 1 ? 's' : ''}` : '';
    const hoursStr = hours > 0 ? `${hours} hour${hours !== 1 ? 's' : ''}` : '';
    const minutesStr = minutes > 0 ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : '';

    return [daysStr, hoursStr, minutesStr].filter(Boolean).join(', ');
};
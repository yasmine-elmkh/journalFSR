export function dateFormat(dateString) {
    const date = new Date(dateString);

    // Get hours and minutes
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0'); // Get day of the month
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const year = date.getFullYear(); // Get full year

    // Return formatted time
    return {time: `${hours}:${minutes}`, date: `${day}/${month}/${year}`};
}
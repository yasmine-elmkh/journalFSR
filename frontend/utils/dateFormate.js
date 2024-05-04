export function dateFormat(dateString) {
    const date = new Date(dateString);

    // Get hours and minutes
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Return formatted time
    return `${hours}:${minutes}`;
}
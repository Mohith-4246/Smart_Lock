const readAPIKey = 'YOUR_READ_API_KEY';
const writeAPIKey = 'YOUR_WRITE_API_KEY';
const channelID = YOUR_CHANNEL_ID;

function fetchStatus() {
    fetch(`https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readAPIKey}&results=1`)
        .then(response => response.json())
        .then(data => {
            const feed = data.feeds[0];
            document.getElementById('lockStatus').textContent = `Lock is currently ${feed.field1 === '1' ? 'Unlocked' : 'Locked'}`;
            document.getElementById('lastAccessed').textContent = `Last Accessed: ${feed.created_at}`;
        })
        .catch(error => console.error('Error fetching data: ', error));
}

function toggleLock() {
    const newStatus = document.getElementById('lockStatus').textContent.includes('Unlocked') ? '0' : '1';
    fetch(`https://api.thingspeak.com/update?api_key=${writeAPIKey}&field1=${newStatus}`)
        .then(response => {
            if (response.ok) fetchStatus(); // Update the status on successful command
        })
        .catch(error => console.error('Error sending command: ', error));
}

document.addEventListener('DOMContentLoaded', fetchStatus); // Initial fetch of the lock status

// Additional functions as needed for generating access codes, managing fingerprints, etc.

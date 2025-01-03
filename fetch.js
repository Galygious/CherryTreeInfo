//   // Import the 'node-fetch' library
// const fetch = require('node-fetch');

// // Define the URL and headers
// const url = 'https://openrouter.ai/api/v1/auth/key';
// const headers = {
//     Authorization: 'Bearer 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', // Replace with your actual API key
// };

// // Make the GET request
// fetch(url, {
//     method: 'GET',
//     headers: headers,
// })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Response:', data);
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });




// File: fetchScript.js

const fetch = require('node-fetch');

// Define the URL and options for the fetch request
const url = 'https://openrouter.ai/api/v1/auth/key'; // Example API endpoint
const options = {
    method: 'GET', // Change to POST, PUT, DELETE as needed
    headers: {
        'Content-Type': 'application/json',
		'Authorization': 'Bearer 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',
    },
};

// Function to make the fetch request
async function fetchData() {
    try {
        console.log(`Fetching data from: ${url}`);
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data fetched successfully:', data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Run the fetch script
fetchData();

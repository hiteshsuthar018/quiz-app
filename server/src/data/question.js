import fs from 'fs/promises';

const questions = async () => {
    try {
        // Reading the JSON file
        const data = await fs.readFile('questions.json');
        // Parsing the JSON data
        const jsonData = JSON.parse(data);
        // Return the JSON data
        return jsonData;
    } catch (error) {
        console.error(error);
        throw new Error(error || 'Error reading JSON file'); 
    }
};

export default questions;

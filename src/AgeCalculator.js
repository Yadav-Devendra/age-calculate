import React, { useState } from 'react';
import axios from 'axios';

function AgeCalculator() {
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [age, setAge] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentYear = new Date().getFullYear();
    const calculatedAge = currentYear - yearOfBirth;

    if (calculatedAge >= 0) {
      setAge(calculatedAge);

      // Send data to the server
      try {
        const response = await axios.post('/api/ages', { yearOfBirth });
        console.log('Age data saved successfully:', response.data);
      } catch (err) {
        console.error('Error saving age data:', err);
      }
    } else {
      setAge('Invalid year of birth');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="yearOfBirth">Year of Birth:</label>
      <input
        type="number"
        id="yearOfBirth"
        value={yearOfBirth}
        onChange={(event) => setYearOfBirth(event.target.value)}
      />
      <button type="submit">Calculate Age</button>
      {age !== null && <p>Your age is: {age}</p>}
    </form>
  );
}

export default AgeCalculator;
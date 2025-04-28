import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [theme, setTheme] = useState('light'); // Default theme
    const [loading, setLoading] = useState(true);

//inline styles
    const lightThemeStyles = {
        backgroundColor: 'white',
        color: 'black',
        padding: '20px',
        textAlign: 'center',
        transition: 'background-color 0.3s, color 0.3s',
    };

    const darkThemeStyles = {
        backgroundColor: '#333',
        color: 'white',
        padding: '250px',
        textAlign: 'center',
        transition: 'background-color 0.3s, color 0.3s',
    };

    // Fetch current settings from the backend
    useEffect(() => {
        fetch('http://localhost:4000/api/settings')
            .then((res) => res.json())
            .then((data) => {
                setTheme(data.theme); // Set theme from the fetched settings
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching settings:', error);
                setLoading(false);
            });
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        // Update the backend with the new theme
        fetch('http://localhost:4000/api/settings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ theme: newTheme }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.message); 
        })
        .catch((error) => {
            console.error('Error updating settings:', error);
        });
    };

    if (loading) {
        return <div>Loading settings...</div>;
    }

    return (
        <div style={theme === 'light' ? lightThemeStyles : darkThemeStyles}>
            <h1>Application Settings</h1>
            <button onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </div>
    );
};

export default Settings;

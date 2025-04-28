
const express = require('express');
const router = express.Router();

// Dummy in-memory store for application settings
let applicationSettings = {
    theme: "light",
    notifications: true,
    language: "en",
};

// GET all settings
router.get('/', (req, res) => {
    res.json(applicationSettings);
});

// Update settings
router.put('/', (req, res) => {
    const { theme, notifications, language } = req.body;
    if (theme) applicationSettings.theme = theme;
    if (notifications !== undefined) applicationSettings.notifications = notifications;
    if (language) applicationSettings.language = language;

    res.json({ message: "Settings updated successfully!", settings: applicationSettings });
});

module.exports = router;

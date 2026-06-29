const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("🚀 Node App Version 1.1.2 running with Jenkins CI/CD");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        time: new Date()
    });
});

module.exports = app;

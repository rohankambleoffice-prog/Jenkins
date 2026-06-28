const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("🚀 Node App running with Jenkins CI/CD 1");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        time: new Date()
    });
});

module.exports = app;

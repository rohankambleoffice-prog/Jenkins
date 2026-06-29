const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(200).send('''🚀 My Node App Version 1.1.2 running with Jenkins CI/CD \
        Here is my sonarqube : http://80.65.208.53:9000 \
        Here is my Prmetheus : http://80.65.208.53:9090 \
        Here is my Grafana : http://80.65.208.53:3001 \
        And Here is my App : http://80.65.208.53:3000
                         ''');
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        time: new Date()
    });
});

module.exports = app;

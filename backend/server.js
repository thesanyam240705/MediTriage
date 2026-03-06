const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {

    try {

        const { pain, duration, symptoms } = req.body;

        const text = symptoms.toLowerCase();

        // Detecting symptoms from text
        const fever = text.includes("fever") ? 1 : 0;
        const cough = text.includes("cough") ? 1 : 0;
        const cold = text.includes("cold") ? 1 : 0;
        const headache = text.includes("headache") ? 1 : 0;
        const vomiting = text.includes("vomit") || text.includes("nausea") ? 1 : 0;
        const breathing_issue = text.includes("breath") || text.includes("breathing") ? 1 : 0;
        const chest_pain = text.includes("chest") ? 1 : 0;
        const fatigue = text.includes("fatigue") || text.includes("weak") || text.includes("tired") ? 1 : 0;

        // Converting duration text → number
        const durationMap = {
            "< 24 hours": 1,
            "1-3 days": 2,
            "1 week": 3,
            "> 1 week": 4
        };

        const durationValue = durationMap[duration] || 1;

        // Sending features to Python ML model
        const response = await axios.post(
            "http://localhost:8000/predict",
            {
                pain: pain,
                duration: durationValue,
                fever: fever,
                cough: cough,
                cold: cold,
                headache: headache,
                vomiting: vomiting,
                breathing_issue: breathing_issue,
                chest_pain: chest_pain,
                fatigue: fatigue
            }
        );

        // Sending prediction back to frontend
        res.json({
            severity: response.data.severity
        });

    } catch (error) {

        console.error("Error contacting ML service:", error.message);

        res.status(500).json({
            error: "AI service unavailable"
        });
    }
});

app.listen(5000, () => {
    console.log("Backend server running on port 5000");
});
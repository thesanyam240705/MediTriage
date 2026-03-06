from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Loading trained model
model = joblib.load("triage_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    # Extracting features sent from Node backend
    pain = data["pain"]
    duration = data["duration"]
    fever = data["fever"]
    cough = data["cough"]
    cold = data["cold"]
    headache = data["headache"]
    vomiting = data["vomiting"]
    breathing_issue = data["breathing_issue"]
    chest_pain = data["chest_pain"]
    fatigue = data["fatigue"]

    # Arranging features in same order as training dataset
    features = [[
        pain,
        duration,
        fever,
        cough,
        cold,
        headache,
        vomiting,
        breathing_issue,
        chest_pain,
        fatigue
    ]]

    # Predicting severity
    prediction = model.predict(features)

    return jsonify({
        "severity": prediction[0]
    })

if __name__ == "__main__":
    app.run(port=8000)
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Expanded dataset with common symptoms
data = {
    "pain":[2,3,4,5,6,7,8,9,4,3,5,6,7,2,3,8,9,4,5,6],

    "duration":[1,2,2,2,3,1,1,1,2,2,3,3,1,1,2,1,1,2,3,2],

    "fever":[1,1,1,0,0,0,0,0,0,1,1,0,0,0,1,0,0,1,0,0],

    "cough":[1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0],

    "cold":[1,1,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,1,0,0],

    "headache":[0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,1,0],

    "vomiting":[0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,1],

    "breathing_issue":[0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,1,1,0,0,1],

    "chest_pain":[0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,1,1,0,0,1],

    "fatigue":[1,1,1,1,0,0,0,0,1,1,1,1,0,1,1,0,0,1,1,0],

    "severity":[
        "normal",
        "normal",
        "urgent",
        "urgent",
        "emergency",
        "emergency",
        "emergency",
        "emergency",
        "normal",
        "normal",
        "urgent",
        "urgent",
        "emergency",
        "normal",
        "normal",
        "emergency",
        "emergency",
        "urgent",
        "urgent",
        "emergency"
    ]
}

df = pd.DataFrame(data)

# Features and labels
X = df.drop("severity", axis=1)
y = df["severity"]

# Training ML model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Saving model
joblib.dump(model, "triage_model.pkl")

print("Model trained successfully and saved as triage_model.pkl")
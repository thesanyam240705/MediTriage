import React, { useState, useEffect } from 'react';

const Consultation = () => {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState('idle'); // idle, processing, result
    const [symptoms, setSymptoms] = useState('');
    const [pain, setPain] = useState(5);
    const [duration, setDuration] = useState('');
    const [severity, setSeverity] = useState('normal');

    // Handle form submit just like the original consultation.js
    const handleSubmit = (e) => {
        e.preventDefault();

        setStatus('processing');
        setStep(2);

        // Processing simulation (2.5 seconds)
        setTimeout(() => {
            evaluateSeverity(pain, duration, symptoms.toLowerCase());
            setStatus('result');
            setStep(3);

            // Advance to Doctor Assignment after 1 second
            setTimeout(() => {
                setStep(4);
            }, 1000);
        }, 2500);
    };

    const evaluateSeverity = (painLevel, dur, sympStr) => {
        let detSeverity = 'normal';
        if (painLevel >= 8 || sympStr.includes('chest') || sympStr.includes('breathe') || (dur === '< 24 hours' && painLevel > 6)) {
            detSeverity = 'emergency';
        } else if (painLevel >= 5 || sympStr.includes('fever') || dur === '1-3 days') {
            detSeverity = 'urgent';
        }
        setSeverity(detSeverity);
    };

    // Calculate pain style
    const getPainColor = () => {
        if (pain <= 3) return 'var(--success-green)';
        if (pain <= 7) return 'var(--warning-orange)';
        return 'var(--danger-red)';
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header className="consultation-header">
                <h1>AI Medical Consultation</h1>
                <p>Enter your symptoms below and let our AI assess the severity of your condition.</p>
                <div className="step-indicator" id="stepIndicator">
                    <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`} id="step1">
                        <div className="step-circle">1</div>
                        <div className="step-label">Symptom Input</div>
                    </div>
                    <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`} id="step2">
                        <div className="step-circle">2</div>
                        <div className="step-label">AI Analysis</div>
                    </div>
                    <div className={`step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`} id="step3">
                        <div className="step-circle">3</div>
                        <div className="step-label">Severity Result</div>
                    </div>
                    <div className={`step ${step >= 4 ? 'active' : ''}`} id="step4">
                        <div className="step-circle">4</div>
                        <div className="step-label">Doctor Assignment</div>
                    </div>
                </div>
            </header>

            {/* Emergency Alert Block */}
            <div className="consultation-main" style={{ paddingBottom: 0, display: (status === 'result' && severity === 'emergency') ? 'block' : 'none' }}>
                <div className="emergency-alert-block">
                    <h3><i className="fa-solid fa-triangle-exclamation"></i> Immediate Medical Attention Required!</h3>
                    <p>Please proceed to the nearest hospital emergency room immediately or call 108.</p>
                </div>
            </div>

            <main className="consultation-main">
                {/* LEFT SIDE: Symptom Input Panel */}
                <div className="dashboard-card form-panel">
                    <div className="card-header">
                        <h3><i className="fa-solid fa-clipboard-user"></i> Patient Information &amp; Symptoms</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="form-group">
                                    <label>Patient Name</label>
                                    <input type="text" className="form-control" placeholder="e.g. John Doe" required disabled={status !== 'idle'} />
                                </div>
                                <div className="form-group">
                                    <label>Age</label>
                                    <input type="number" className="form-control" placeholder="e.g. 34" required disabled={status !== 'idle'} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select className="form-control" required disabled={status !== 'idle'}>
                                        <option value="" disabled selected>Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Duration of Symptoms</label>
                                    <select className="form-control" required value={duration} onChange={(e) => setDuration(e.target.value)} disabled={status !== 'idle'}>
                                        <option value="" disabled>Select Duration</option>
                                        <option value="< 24 hours">Less than 24 hours</option>
                                        <option value="1-3 days">1 to 3 days</option>
                                        <option value="1 week">About 1 week</option>
                                        <option value="> 1 week">More than 1 week</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Existing Conditions (Optional)</label>
                                <input type="text" className="form-control" placeholder="e.g. Asthma, Diabetes, Hypertension" disabled={status !== 'idle'} />
                            </div>
                            <div className="form-group">
                                <label>Symptom Description</label>
                                <textarea className="form-control" placeholder="Please describe how you are feeling in detail..." required value={symptoms} onChange={(e) => setSymptoms(e.target.value)} disabled={status !== 'idle'}></textarea>
                            </div>
                            <div className="form-group pain-slider-container">
                                <label>Pain Level: <span className="pain-value-badge" style={{ color: getPainColor() }}>{pain} / 10</span></label>
                                <div className="slider-labels">
                                    <span>0 (No Pain)</span>
                                    <span>10 (Severe)</span>
                                </div>
                                <input type="range" min="0" max="10" step="1" value={pain} onChange={(e) => setPain(parseInt(e.target.value))} disabled={status !== 'idle'} />
                            </div>
                            <div className="form-group">
                                <label>Upload Medical Report (Optional)</label>
                                <div className="file-upload-wrapper">
                                    <i className="fa-solid fa-cloud-arrow-up"></i>
                                    <p>Drag and drop files here or click to browse</p>
                                    <small className="text-muted">PDF, JPG, PNG (Max 5MB)</small>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" disabled={status !== 'idle'}>
                                <i className="fa-solid fa-microchip"></i> Analyze Symptoms
                            </button>
                        </form>
                    </div>
                </div>

                {/* RIGHT SIDE: AI Analysis Preview Panel */}
                <div className="dashboard-card ai-panel">
                    <div className="card-header">
                        <h3>Live AI Assessment</h3>
                    </div>
                    <div className="card-body ai-preview-panel">

                        {status === 'idle' && (
                            <div className="placeholder-state" style={{ display: 'block' }}>

                                <h4>Awaiting Input</h4>
                                <p>Provide your symptoms on the left to activate the AI severity engine.</p>
                            </div>
                        )}

                        {status === 'processing' && (
                            <div className="processing-state" style={{ display: 'block' }}>
                                <div className="pulse-loader"></div>
                                <h4>AI Analyzing Symptoms...</h4>
                                <p className="text-muted">Cross-referencing medical database and detecting severity.</p>
                            </div>
                        )}

                        {status === 'result' && (
                            <div className="result-state" style={{ display: 'block' }}>
                                <div className={`severity-card severity-${severity}`}>
                                    <h4>AI Severity Assessment</h4>

                                    {severity === 'normal' && (
                                        <>
                                            <div className="severity-badge"><i className="fa-solid fa-check-circle"></i> <span>Normal</span></div>
                                            <p className="text-muted">Standard medical care required. No immediate threat detected.</p>
                                        </>
                                    )}
                                    {severity === 'urgent' && (
                                        <>
                                            <div className="severity-badge"><i className="fa-solid fa-triangle-exclamation"></i> <span>Urgent</span></div>
                                            <p className="text-muted">Prompt medical attention recommended to prevent deterioration.</p>
                                        </>
                                    )}
                                    {severity === 'emergency' && (
                                        <>
                                            <div className="severity-badge"><i className="fa-solid fa-truck-medical"></i> <span>Emergency</span></div>
                                            <p className="text-muted">Critical condition detected. Requires immediate life-saving intervention.</p>
                                        </>
                                    )}
                                </div>
                                <ul className="action-list">
                                    <li>
                                        <span className="action-label">Recommended Action</span>
                                        <span className="action-value">
                                            {severity === 'normal' && 'Schedule standard OPD Visit'}
                                            {severity === 'urgent' && 'Priority Consultation Required'}
                                            {severity === 'emergency' && 'Proceed to ER Immediately'}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="action-label">Est. Response Time</span>
                                        <span className="action-value">
                                            {severity === 'normal' && 'Within 48 Hours'}
                                            {severity === 'urgent' && 'Within 4-12 Hours'}
                                            {severity === 'emergency' && 'Awaiting Arrival / Immediate'}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="action-label">Suggested Dept.</span>
                                        <span className="action-value">
                                            {severity === 'emergency' ? 'Emergency Room (ER) / Trauma' : (symptoms.includes('bone') ? 'Orthopedics' : 'General Medicine')}
                                        </span>
                                    </li>
                                </ul>

                                <div id="doctorAssignmentBlock">
                                    {step >= 4 && severity === 'normal' && (
                                        <div className="doctor-card">

                                            <div className="doc-info">
                                                <h4>Junior Doctor Assigned</h4>
                                                <p>Available for routine consultation</p>
                                            </div>
                                            <button className="btn btn-primary" style={{ marginLeft: 'auto', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Book Slot</button>
                                        </div>
                                    )}

                                    {step >= 4 && severity === 'urgent' && (
                                        <>
                                            <div className="doctor-card">

                                                <div className="doc-info">
                                                    <h4>Dr. Sarah Jenkins</h4>
                                                    <p>Senior Specialist • 15 Yrs Exp.</p>
                                                    <span className="priority-slot">Priority Slot: 2:00 PM Today</span>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>Confirm Appointment</button>
                                        </>
                                    )}

                                    {step >= 4 && severity === 'emergency' && (
                                        <>
                                            <div className="doctor-card" style={{ borderColor: 'var(--danger-red)', background: '#FFF5F5' }}>

                                                <div className="doc-info">
                                                    <h4>ER Duty Team Alerted</h4>
                                                    <p>Trauma Surgeon &amp; Support Staff ready</p>
                                                    <span className="priority-slot" style={{ background: 'var(--danger-red)', color: 'white' }}>ETA Required</span>
                                                </div>
                                            </div>
                                            <a href="tel:108" className="btn btn-danger btn-block" style={{ marginTop: '1rem', textAlign: 'center', display: 'block' }}><i className="fa-solid fa-phone"></i> Call Ambulance (108)</a>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Consultation;

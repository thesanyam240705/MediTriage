import React, { useState, useEffect } from 'react';

const BloodRequest = () => {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState('idle'); // idle, searching, results, confirmed
    const [bloodGroup, setBloodGroup] = useState('');
    const [urgency, setUrgency] = useState('normal');

    const [scCount, setScCount] = useState(0);
    const [mtCount, setMtCount] = useState(0);

    // Derived values for animations
    const targetScans = 50;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!bloodGroup) return;

        setStatus('searching');
        setStep(2);
        setScCount(0);
        setMtCount(0);

        let localSc = 0;
        let localMt = 0;

        const scanInterval = setInterval(() => {
            localSc += Math.floor(Math.random() * 5) + 1;
            if (localSc > 15 && localSc % 3 === 0 && localMt < 3) {
                localMt += 1;
            }

            setScCount(localSc > targetScans ? targetScans : localSc);
            setMtCount(localMt);

            if (localSc >= targetScans) {
                clearInterval(scanInterval);
                setStatus('results');
                // The step is still technically 2, handled in JS as part of search state fully realized
            }
        }, 80);
    };

    const handleSendAlerts = () => {
        setStep(3);
        // Wait 2 seconds for "Notification Sent"
        setTimeout(() => {
            setStep(4);
            setStatus('confirmed');
        }, 2000);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header className="blood-header">
                <h1><i className="fa-solid fa-droplet"></i> Emergency Blood Request</h1>
                <p>Submit blood requirements and our AI-powered donor system will instantly find compatible nearby donors.</p>
                <div className="steps-container" id="bloodTrackingSteps">
                    <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                        <div className="s-circle">1</div>
                        <div className="s-label">Submit Request</div>
                    </div>
                    <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                        <div className="s-circle">2</div>
                        <div className="s-label">Donor Search</div>
                    </div>
                    <div className={`step-item ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
                        <div className="s-circle">3</div>
                        <div className="s-label">Notification Sent</div>
                    </div>
                    <div className={`step-item ${step >= 4 ? 'active' : ''} ${step > 4 ? 'completed' : ''}`}>
                        <div className="s-circle">4</div>
                        <div className="s-label">Confirmation</div>
                    </div>
                    <div className={`step-item ${step >= 5 ? 'active' : ''}`}>
                        <div className="s-circle">5</div>
                        <div className="s-label">Blood Delivered</div>
                    </div>
                </div>
            </header>

            <main className="blood-main">
                {/* LEFT SIDE: Blood Request Form Card */}
                <div className="blood-card">
                    <div className="blood-card-header">
                        <h3><i className="fa-solid fa-file-medical"></i> Requirement Details</h3>
                    </div>
                    <div className="card-padding">
                        {/* Critical Alert Warning */}
                        {urgency === 'critical' && (
                            <div className="critical-alert" style={{ display: 'block' }}>
                                <h3><i className="fa-solid fa-triangle-exclamation"></i> Critical Blood Requirement</h3>
                                <p>Immediate donor alerts activated across all channels. Auto-escalation to nearby blood banks initiated.</p>
                                <div className="critical-stats">
                                    <div className="c-stat">City Blood Bank: <span style={{ color: 'var(--warning-orange)' }}>Low Stock</span></div>
                                    <div className="c-stat">Regional Bank: <span style={{ color: 'var(--danger-red)' }}>Not Available</span></div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Patient Name</label>
                                    <input type="text" className="form-control" placeholder="e.g. Emily Clark" required disabled={status !== 'idle'} />
                                </div>
                                <div className="form-group">
                                    <label>Hospital / Clinic Name</label>
                                    <input type="text" className="form-control" placeholder="e.g. City General Hospital" required disabled={status !== 'idle'} />
                                </div>
                                <div className="form-group full-width">
                                    <label>Location</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input type="text" className="form-control" placeholder="Enter precise location or let AI detect..." required disabled={status !== 'idle'} />
                                        <button type="button" className="btn" style={{ border: '1px solid #ddd', background: 'var(--bg-light)', color: 'var(--text-dark)' }} disabled={status !== 'idle'}>
                                            <i className="fa-solid fa-location-crosshairs"></i> Auto
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Blood Group Required</label>
                                    <select className="form-control blood-group-select" required value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} disabled={status !== 'idle'}>
                                        <option value="" disabled>Select Tag</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Units Required</label>
                                    <input type="number" className="form-control" min="1" max="10" placeholder="e.g. 2" required disabled={status !== 'idle'} />
                                </div>
                                <div className="form-group">
                                    <label>Required Date &amp; Time</label>
                                    <input type="datetime-local" className="form-control" required disabled={status !== 'idle'} />
                                </div>
                                <div className="form-group">
                                    <label>Emergency Level</label>
                                    <select className="form-control" required value={urgency} onChange={(e) => setUrgency(e.target.value)} disabled={status !== 'idle'}>
                                        <option value="normal">Normal (Routine Surgery)</option>
                                        <option value="urgent">Urgent (Within 12 hours)</option>
                                        <option value="critical">Critical (Immediate/Trauma)</option>
                                    </select>
                                </div>
                                <div className="form-group full-width">
                                    <label>Attending Contact Number</label>
                                    <input type="tel" className="form-control" placeholder="+91 (555) 000-0000" required disabled={status !== 'idle'} />
                                </div>
                                <div className="form-group full-width">
                                    <label>Additional Clinical Notes (Optional)</label>
                                    <textarea className="form-control" placeholder="Any specific requirements regarding blood components (Plasma, Platelets etc)?" style={{ minHeight: '80px' }} disabled={status !== 'idle'}></textarea>
                                </div>
                            </div>

                            {status === 'idle' && (
                                <button type="submit" className="btn btn-danger btn-block find-btn">
                                    Find Donors Now
                                </button>
                            )}
                            {(status === 'searching' || status === 'results' || status === 'confirmed') && (
                                <button type="submit" className="btn btn-danger btn-block find-btn" disabled style={{ opacity: '0.7' }}>
                                    <i className="fa-solid fa-spinner fa-spin"></i> Processing Request...
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {/* RIGHT SIDE: Smart Donor Search Panel */}
                <div className="search-panel-container">
                    <div className="blood-card" style={{ height: '100%' }}>
                        <div className="blood-card-header" style={{ background: 'var(--light-blue)', borderBottom: '2px solid var(--primary-blue)' }}>
                            <h3 style={{ color: 'var(--primary-blue)' }}>AI Donor Coordinator</h3>
                        </div>
                        <div className="card-padding" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                            {status === 'idle' && (
                                <div className="search-placeholder" style={{ display: 'block' }}>

                                    <h4>Waiting for requirements...</h4>
                                    <p>Fill out the form on the left to initiate the Smart Search protocol.</p>
                                </div>
                            )}

                            {status === 'searching' && (
                                <div className="searching-state" style={{ display: 'block' }}>
                                    <div className="radar-container">
                                        <div className="radar-core"></div>
                                        <div className="radar-wave"></div>
                                        <div className="radar-wave"></div>
                                        <div className="radar-wave"></div>
                                    </div>
                                    <h4 style={{ fontSize: '1.3rem', color: 'var(--primary-blue)' }}>AI Searching Network...</h4>
                                    <p className="text-muted">Scanning 10km radius for compatible {bloodGroup} donors...</p>
                                    <div className="search-metrics">
                                        <div className="metric">
                                            <strong>{scCount}</strong>
                                            <span>Donors Scanned</span>
                                        </div>
                                        <div className="metric">
                                            <strong>{mtCount}</strong>
                                            <span>Matches Found</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {status === 'results' && (
                                <div className="donor-results" style={{ display: 'block', animation: 'fadeIn 0.5s ease forwards' }}>
                                    <div className="result-header">
                                        <h4><i className="fa-solid fa-check-double"></i> Found {mtCount} Compatible Matches</h4>
                                        <span className="dist-badge"><i className="fa-solid fa-location-dot"></i> Within 5km Radius</span>
                                    </div>
                                    <div className="donor-list">
                                        {[...Array(mtCount)].map((_, i) => (
                                            <div className="donor-card" key={i}>
                                                <div className="donor-info">
                                                    <div className="donor-icon"><i className="fa-solid fa-user"></i></div>
                                                    <div className="d-details">
                                                        <h5>Private Donor ***{i + 1}</h5>
                                                        <p>{Math.floor(Math.random() * (45 - 20) + 20)} yrs, verified • Valid {bloodGroup}</p>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div className="dist-badge" style={{ marginBottom: '0.25rem' }}>{(Math.random() * 8 + 1).toFixed(1)} km away</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        className="btn btn-primary btn-block"
                                        style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}
                                        onClick={handleSendAlerts}
                                        disabled={step >= 3}
                                    >
                                        {step === 2 ? <>Send Mass Request Alerts</> : <><i className="fa-solid fa-spinner fa-spin"></i> Dispatching Secure Notifications...</>}
                                    </button>
                                </div>
                            )}

                            {status === 'confirmed' && (
                                <div className="confirmation-state" style={{ display: 'block' }}>
                                    <i className="fa-solid fa-shield-check success-shield"></i>
                                    <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Donor Confirmed!</h3>
                                    <p className="text-muted">Notification accepted by a registered donor.</p>
                                    <div className="confirmed-target-card">
                                        <div className="target-row">
                                            <span>Masked Identity</span>
                                            <strong>V*** M. (Verified)</strong>
                                        </div>
                                        <div className="target-row">
                                            <span>Blood Group</span>
                                            <strong style={{ color: 'var(--emergency-red)' }}>{bloodGroup}</strong>
                                        </div>
                                        <div className="target-row">
                                            <span>Est. Arrival Time (ETA)</span>
                                            <strong>18 Minutes</strong>
                                        </div>
                                        <div className="target-row">
                                            <span>Status</span>
                                            <strong style={{ color: 'var(--success-green)' }}>En Route to Hospital</strong>
                                        </div>
                                    </div>
                                    <button className="btn btn-success btn-block" style={{ background: 'var(--success-green)', color: 'var(--white)', marginTop: '1rem', padding: '1rem' }}>
                                        Track Blood Collection Live
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BloodRequest;

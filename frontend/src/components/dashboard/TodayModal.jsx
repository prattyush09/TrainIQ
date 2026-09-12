import React from "react";
import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";
import "../../styles/Dashboard.css"; // Reuse existing dashboard CSS classes where applicable

function TodayModal({ close, workout, nutrition, hydration, yesterdaysScore, yesterdayData }) {
  return (
    <Modal close={close}>
      <div className="today-modal-content">
        
        {/* YESTERDAY SECTION */}
        <div className="yesterday-section">
          <span className="dashboard-eyebrow">YESTERDAY</span>
          
          <div className="yesterday-grid" style={{ marginTop: '8px', marginBottom: '12px', gap: '6px' }}>
            <div className="yesterday-metric" style={{ padding: '8px 6px' }}>
              <span className="metric-label" style={{ fontSize: '10px', marginBottom: '4px' }}>Nutrition</span>
              <strong style={{ fontSize: '13px' }}>{yesterdayData?.calories} kcal</strong>
              <small style={{ fontSize: '11px' }}>{yesterdayData?.protein}g protein</small>
            </div>
            
            <div className="yesterday-metric" style={{ padding: '8px 6px' }}>
              <span className="metric-label" style={{ fontSize: '10px', marginBottom: '4px' }}>Hydration</span>
              <strong style={{ fontSize: '13px' }}>{yesterdayData?.hydration}L</strong>
              <small style={{ fontSize: '11px' }}>/ 2.5L</small>
            </div>
            
            <div className="yesterday-metric" style={{ padding: '8px 6px' }}>
              <span className="metric-label" style={{ fontSize: '10px', marginBottom: '4px' }}>Workout</span>
              <strong style={{ fontSize: '13px' }}>{yesterdayData?.workoutDone ? "✓ Done" : "Missed"}</strong>
              <small style={{ fontSize: '11px' }}>{yesterdayData?.workoutTime}</small>
            </div>
          </div>

          <div className="yesterday-score">
            <span className="metric-label">TrainIQ Score</span>
            <strong>{yesterdaysScore} / 100</strong>
          </div>

          <div className="yesterday-summary" style={{ fontSize: '12px', padding: '8px', lineHeight: '1.4' }}>
            "Solid day. You completed your workout and stayed close to your calorie target. Protein and hydration were slightly below target."
          </div>
        </div>

        {/* TODAY SECTION */}
        <span className="dashboard-eyebrow" style={{ marginTop: '20px' }}>TODAY</span>
        <h2 style={{ margin: "0 0 12px 0", color: "var(--text-heading)", fontSize: "20px" }}>
          Your focus for today
        </h2>
        
        <div className="today-plan" style={{ gap: '10px' }}>
          <div className="today-plan-section" style={{ padding: '12px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '6px' }}>🏋️ Workout</h3>
            <ul style={{ fontSize: '13px' }}>
              <li>{workout.name}</li>
              <li>{workout.duration}</li>
              <li>{workout.level}</li>
            </ul>
            <div style={{ marginTop: "10px" }}>
              <Button variant="primary">Start Workout</Button>
            </div>
          </div>
          
          <div className="today-plan-section" style={{ padding: '12px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '6px' }}>🍽️ Nutrition</h3>
            <ul style={{ fontSize: '13px' }}>
              <li>{nutrition.calories} kcal target</li>
              <li>{nutrition.protein} g protein target</li>
            </ul>
          </div>
          
          <div className="today-plan-section" style={{ padding: '12px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '6px' }}>💧 Hydration</h3>
            <p style={{ margin: 0, fontSize: '13px' }}>
              <strong>{hydration.current}L</strong> / {hydration.target}L
            </p>
          </div>
        </div>

        <div className="today-focus-message" style={{ marginTop: '16px', fontSize: '13px', paddingLeft: '10px' }}>
          "Complete your workout, hit your protein target, and stay hydrated."
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <Button onClick={close}>Close</Button>
        </div>
      </div>
    </Modal>
  );
}

export default TodayModal;

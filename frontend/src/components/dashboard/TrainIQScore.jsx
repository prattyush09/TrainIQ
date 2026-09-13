
import "../../styles/Dashboard.css";

function TrainIQScore({ score, breakdown }) {
  return (
    <div className="dashboard-card trainiq-score-card">
      <div className="card-top">
        <div>
          <span className="card-label">TRAINIQ SCORE</span>
          <h2>Consistency</h2>
        </div>
        <button className="settings-button" title="How is this calculated?">?</button>
      </div>
      
      <div className="score-main">
        <div className="score-value-container">
          <svg className="score-ring" viewBox="0 0 36 36">
            <path
              className="score-ring-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="score-ring-fill"
              strokeDasharray={`${score}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="score-text">{score}</text>
          </svg>
        </div>
        
        <p className="score-message">
          "You're doing great. Keep your consistency going."
        </p>
        
        <div className="score-breakdown">
          <div className="breakdown-item">
            <span>Workout</span>
            <strong>{breakdown.workout}%</strong>
          </div>
          <div className="breakdown-item">
            <span>Nutrition</span>
            <strong>{breakdown.nutrition}%</strong>
          </div>
          <div className="breakdown-item">
            <span>Hydration</span>
            <strong>{breakdown.hydration}%</strong>
          </div>
          <div className="breakdown-item">
            <span>Consistency</span>
            <strong>{breakdown.consistency}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainIQScore;

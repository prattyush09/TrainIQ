import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";
import "../../styles/Dashboard.css";

function TodayModal({ close, workout, nutrition, hydration, yesterdaysScore, hydrationTracking, yesterdayData }) {
  return (
    <Modal close={close}>
      <div className="today-modal-content">

        <h2 style={{ margin: "0 0 8px 0", color: "var(--text-heading)", fontSize: "22px" }}>
          Daily Briefing
        </h2>
        <p style={{ margin: "0 0 20px 0", color: "var(--text-muted)", fontSize: "14px" }}>
          TrainIQ Score yesterday: <strong style={{ color: "var(--primary)" }}>{yesterdaysScore}</strong>
        </p>

        {/* YESTERDAY SECTION */}
        {yesterdayData && (
          <div className="yesterday-section" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <span className="dashboard-eyebrow">YESTERDAY'S RECAP</span>
            <div className="yesterday-plan" style={{ gap: '10px' }}>
              <div className="yesterday-plan-section" style={{ padding: '14px' }}>
                <h3 style={{ fontSize: '15px', margin: '0 0 8px 0', color: 'var(--text-heading)' }}>🏋️ Workout</h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                  {yesterdayData.workoutDone ?
                    `${yesterdayData.workoutName || 'Workout'} • ${yesterdayData.workoutTime || '-- min'}` :
                    'No workout logged'}
                </p>
              </div>

              <div className="yesterday-plan-section" style={{ padding: '14px' }}>
                <h3 style={{ fontSize: '15px', margin: '0 0 8px 0', color: 'var(--text-heading)' }}>🍽️ Nutrition</h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                  {yesterdayData.calories > 0 || yesterdayData.protein > 0 ?
                    `${Math.round(yesterdayData.calories)} kcal • ${Math.round(yesterdayData.protein)}g protein` :
                    'No nutrition logged'}
                </p>
              </div>

              {hydrationTracking && (
                <div className="yesterday-plan-section" style={{ padding: '14px' }}>
                  <h3 style={{ fontSize: '15px', margin: '0 0 8px 0', color: 'var(--text-heading)' }}>💧 Hydration</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                    {yesterdayData.hydration > 0 ?
                      `${(yesterdayData.hydration / 1000).toFixed(1)}L` :
                      'No water logged'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TODAY SECTION */}
        <span className="dashboard-eyebrow">TODAY'S FOCUS</span>

        <div className="today-plan" style={{ gap: '10px', marginTop: '12px' }}>
          <div className="today-plan-section" style={{ padding: '14px' }}>
            <h3 style={{ fontSize: '15px', margin: '0 0 8px 0', color: 'var(--text-heading)' }}>🏋️ {workout.name}</h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
              {workout.duration} • {workout.level}
            </p>
          </div>

          <div className="today-plan-section" style={{ padding: '14px' }}>
            <h3 style={{ fontSize: '15px', margin: '0 0 8px 0', color: 'var(--text-heading)' }}>🍽️ Nutrition</h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
              Target: <strong>{nutrition.calories} kcal</strong> / <strong>{nutrition.protein}g protein</strong>
            </p>
          </div>

          {hydrationTracking && (
            <div className="today-plan-section" style={{ padding: '14px' }}>
              <h3 style={{ fontSize: '15px', margin: '0 0 8px 0', color: 'var(--text-heading)' }}>💧 Hydration</h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                Goal: <strong>{hydration.target}L</strong>
              </p>
            </div>
          )}
        </div>

        <div className="today-focus-message" style={{ marginTop: '20px', fontSize: '14px', paddingLeft: '12px' }}>
          "Complete your workout, hit your protein target, and stay consistent."
        </div>

        <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'center' }}>
          <Button onClick={close} variant="primary" style={{ width: '100%' }}>Let's Go</Button>
        </div>
      </div>
    </Modal>
  );
}

export default TodayModal;


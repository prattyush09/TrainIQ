import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * TodayModal - Yesterday briefing popup, shown once per day.
 * Uses Radix Dialog (design-system) instead of the legacy Modal.
 */
function TodayModal({ close, workout, nutrition, hydration, yesterdaysScore, hydrationTracking, yesterdayData }) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) close(); }}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden today-modal-dialog">
        <div className="today-modal-header">
          <DialogHeader>
            <DialogTitle className="today-modal-title">Daily Briefing</DialogTitle>
          </DialogHeader>
          {yesterdaysScore > 0 && (
            <p className="today-modal-score">
              Yesterday&apos;s TrainIQ Score:{" "}
              <strong>{yesterdaysScore}</strong>
            </p>
          )}
        </div>

        <div className="today-modal-body">
          {yesterdayData && (
            <div className="today-modal-section">
              <span className="today-modal-eyebrow">Yesterday&apos;s Recap</span>
              <div className="today-modal-rows">
                <div className="today-modal-row">
                  <p className="today-modal-row-label">Workout</p>
                  <p className="today-modal-row-value">
                    {yesterdayData.workoutDone
                      ? `${yesterdayData.workoutName || "Workout"} · ${yesterdayData.workoutTime || "~45 min"}`
                      : "No workout logged"}
                  </p>
                </div>
                <div className="today-modal-row">
                  <p className="today-modal-row-label">Nutrition</p>
                  <p className="today-modal-row-value">
                    {yesterdayData.calories > 0 || yesterdayData.protein > 0
                      ? `${Math.round(yesterdayData.calories)} kcal · ${Math.round(yesterdayData.protein)}g protein`
                      : "No nutrition logged"}
                  </p>
                </div>
                {hydrationTracking && (
                  <div className="today-modal-row">
                    <p className="today-modal-row-label">Hydration</p>
                    <p className="today-modal-row-value">
                      {yesterdayData.hydration > 0
                        ? `${(yesterdayData.hydration / 1000).toFixed(1)}L logged`
                        : "No water logged"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="today-modal-section">
            <span className="today-modal-eyebrow">Today&apos;s Focus</span>
            <div className="today-modal-rows">
              {workout && (
                <div className="today-modal-row">
                  <p className="today-modal-row-label">Workout</p>
                  <p className="today-modal-row-value today-modal-row-value--strong">{workout.name}</p>
                  {workout.duration && (
                    <p className="today-modal-row-sub">{workout.duration} · {workout.level}</p>
                  )}
                </div>
              )}
              <div className="today-modal-row">
                <p className="today-modal-row-label">Nutrition Target</p>
                <p className="today-modal-row-value">{nutrition.calories} kcal · {nutrition.protein}g protein</p>
              </div>
              {hydrationTracking && hydration && (
                <div className="today-modal-row">
                  <p className="today-modal-row-label">Hydration Goal</p>
                  <p className="today-modal-row-value">{hydration.target}L</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="today-modal-footer">
          <Button variant="default" className="w-full" onClick={close}>
            Let&apos;s Go
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TodayModal;

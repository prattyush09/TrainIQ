import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import workoutProgram from "../data/Workouts";import Button from "../components/ui/Button/Button";
import { auth, db } from "../firebase";
import "../styles/Progress.css";

function Progress() {
  const navigate = useNavigate();

  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [waterHistory, setWaterHistory] = useState({});
  const [waterTarget, setWaterTarget] = useState(3000);
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ==========================================
  // DATE HELPERS
  // ==========================================

  const getToday = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getDateString = (date) => {
    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getLastDays = (days) => {
    const dates = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();

      date.setHours(0, 0, 0, 0);
      date.setDate(
        date.getDate() - i
      );

      dates.push(
        getDateString(date)
      );
    }

    return dates;
  };

  const formatDate = (dateString) => {
    const date = new Date(
      `${dateString}T00:00:00`
    );

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
      }
    );
  };

  const formatFullDate = (
    dateString
  ) => {
    const date = new Date(
      `${dateString}T00:00:00`
    );

    return date.toLocaleDateString(
      "en-IN",
      {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // LOAD DATA FROM FIREBASE
  // ==========================================

  useEffect(() => {
    let unsubscribe;

    const loadProgressData = () => {
      unsubscribe =
        onAuthStateChanged(
          auth,
          async (user) => {
            if (!user) {
              navigate("/login");
              return;
            }

            try {
              setError(false);
              // ----------------------------------------
              // WORKOUT HISTORY
              // ----------------------------------------

              const workoutHistoryRef =
                collection(
                  db,
                  "users",
                  user.uid,
                  "workoutProgress"
                );

              const workoutSnapshot =
                await getDocs(
                  workoutHistoryRef
                );

              const history = [];

              workoutSnapshot.forEach(
                (documentSnapshot) => {
                  const progress =
                    documentSnapshot.data();

                  if (
                    progress.completed
                  ) {
                    const workout =
                      workoutProgram.find(
                        (item) =>
                          item.id ===
                          Number(
                            progress.workoutId
                          )
                      );

                    history.push({
                      ...progress,

                      workoutId:
                        progress.workoutId ||
                        workout?.id ||
                        documentSnapshot.id,

                      workoutName:
                        progress.workoutName ||
                        workout?.name ||
                        "Workout",

                      workoutFocus:
                        progress.workoutFocus ||
                        workout?.focus ||
                        "Workout completed",
                    });
                  }
                }
              );

              history.sort(
                (a, b) => {
                  const dateA =
                    new Date(
                      a.completedAt ||
                        a.savedAt ||
                        0
                    );

                  const dateB =
                    new Date(
                      b.completedAt ||
                        b.savedAt ||
                        0
                    );

                  return dateB - dateA;
                }
              );

              setWorkoutHistory(
                history
              );

              // ----------------------------------------
              // WATER HISTORY
              // ----------------------------------------

              const waterHistoryRef =
                collection(
                  db,
                  "users",
                  user.uid,
                  "waterLogs"
                );

              const waterSnapshot =
                await getDocs(
                  waterHistoryRef
                );

              const loadedWaterHistory =
                {};

              waterSnapshot.forEach(
                (documentSnapshot) => {
                  const waterData =
                    documentSnapshot.data();

                  const date =
                    waterData.date ||
                    documentSnapshot.id;

                  const amount =
                    Number(
                      waterData.amount
                    ) || 0;

                  loadedWaterHistory[
                    date
                  ] = amount;
                }
              );

              setWaterHistory(
                loadedWaterHistory
              );

              // ----------------------------------------
              // WATER TARGET
              // ----------------------------------------

              const userRef = doc(
                db,
                "users",
                user.uid
              );

              const userSnapshot =
                await getDoc(userRef);

              if (
                userSnapshot.exists()
              ) {
                const userData =
                  userSnapshot.data();

                setWaterTarget(
                  Number(
                    userData.waterTarget
                  ) || 3000
                );
              }
            } catch (error) {
              console.error(
                "Failed to load progress data from Firebase:",
                error
              );
              setError(true);
            } finally {
              setLoading(false);
            }
          }
        );
    };

    loadProgressData();

    const handleFocus =
      () => {
        loadProgressData();
      };

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }

      window.removeEventListener(
        "focus",
        handleFocus
      );
    };
  }, [navigate]);

  // ==========================================
  // SELECTED PERIOD
  // ==========================================

  const periodDates = useMemo(
    () =>
      getLastDays(
        selectedPeriod
      ),
    [selectedPeriod]
  );

  // ==========================================
  // WORKOUT DATE HELPERS
  // ==========================================

  const getWorkoutDate = (
    workout
  ) => {
    const date =
      workout.completedAt ||
      workout.savedAt ||
      workout.date;

    if (!date) {
      return null;
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return null;
    }

    return getDateString(
      parsedDate
    );
  };

  // ==========================================
  // PERIOD WORKOUTS
  // ==========================================

  const periodWorkouts =
    useMemo(() => {
      return workoutHistory.filter(
        (workout) => {
          const workoutDate =
            getWorkoutDate(
              workout
            );

          return (
            workoutDate &&
            periodDates.includes(
              workoutDate
            )
          );
        }
      );
    }, [
      workoutHistory,
      periodDates,
    ]);

  // ==========================================
  // WORKOUT STATS
  // ==========================================

  const totalWorkouts =
    periodWorkouts.length;

  const weeklyTarget = 6;

  const workoutCompletion =
    Math.min(
      (totalWorkouts /
        weeklyTarget) *
        100,
      100
    );

  const totalExercises =
    periodWorkouts.reduce(
      (total, workout) => {
        if (
          Array.isArray(
            workout.completedSets
          )
        ) {
          return (
            total +
            workout.completedSets.length
          );
        }

        return total;
      },
      0
    );

  // ==========================================
  // WATER STATS
  // ==========================================

  const waterDays =
    periodDates.map(
      (date) => {
        const amount =
          Number(
            waterHistory[date]
          ) || 0;

        const percentage =
          waterTarget > 0
            ? Math.min(
                (amount /
                  waterTarget) *
                  100,
                100
              )
            : 0;

        return {
          date,
          amount,
          percentage,
        };
      }
    );

  const totalWater =
    waterDays.reduce(
      (total, day) =>
        total + day.amount,
      0
    );

  const averageWater =
    periodDates.length > 0
      ? totalWater /
        periodDates.length
      : 0;

  const waterGoalDays =
    waterDays.filter(
      (day) =>
        day.amount >=
        waterTarget
    ).length;

  const waterCompletion =
    periodDates.length > 0
      ? (waterGoalDays /
          periodDates.length) *
        100
      : 0;

  // ==========================================
  // CURRENT STREAK
  // ==========================================

  const workoutStreak =
    useMemo(() => {
      if (
        workoutHistory.length ===
        0
      ) {
        return 0;
      }

      const completedDates =
        new Set(
          workoutHistory
            .map(getWorkoutDate)
            .filter(Boolean)
        );

      let streak = 0;

      const date = new Date();

      date.setHours(
        0,
        0,
        0,
        0
      );

      while (true) {
        const dateString =
          getDateString(date);

        if (
          completedDates.has(
            dateString
          )
        ) {
          streak++;

          date.setDate(
            date.getDate() - 1
          );
        } else {
          break;
        }
      }

      return streak;
    }, [workoutHistory]);

  // ==========================================
  // BEST WORKOUT
  // ==========================================

  const bestWorkout =
    useMemo(() => {
      if (
        workoutHistory.length ===
        0
      ) {
        return null;
      }

      return workoutHistory.reduce(
        (best, workout) => {
          const bestSets =
            Array.isArray(
              best.completedSets
            )
              ? best.completedSets
                  .length
              : 0;

          const currentSets =
            Array.isArray(
              workout.completedSets
            )
              ? workout.completedSets
                  .length
              : 0;

          return currentSets >
            bestSets
            ? workout
            : best;
        }
      );
    }, [workoutHistory]);

  // ==========================================
  // DAILY ACTIVITY DATA
  // ==========================================

  const dailyActivity =
    periodDates.map(
      (date) => {
        const workoutsOnDay =
          workoutHistory.filter(
            (workout) =>
              getWorkoutDate(
                workout
              ) === date
          );

        const waterAmount =
          Number(
            waterHistory[date]
          ) || 0;

        return {
          date,
          workouts:
            workoutsOnDay.length,
          water: waterAmount,
          waterPercentage:
            waterTarget > 0
              ? Math.min(
                  (waterAmount /
                    waterTarget) *
                    100,
                  100
                )
              : 0,
        };
      }
    );

  // ==========================================
  // RENDER
  // ==========================================

  if (loading) {
    return (
      <div className="progress-page">
        <div className="progress-header">
          <div>
            <h1>Your Progress</h1>
            <p>Loading your history...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="progress-page">
        <div className="progress-header">
          <div>
            <h1>Your Progress</h1>
            <p style={{ color: '#ef4444' }}>Failed to load progress data.</p>
            <div style={{ marginTop: '16px' }}>
              <Button variant="secondary" onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="progress-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">
            TRAINIQ / PROGRESS
          </span>

          <h1>
            Your Progress
          </h1>

          <p>
            Track your consistency,
            workouts and hydration.
          </p>
        </div>

        <div className="header-date">
          <span>
            Today
          </span>

          <strong>
            {formatFullDate(
              getToday()
            )}
          </strong>
        </div>
      </div>

      {/* ======================================
          PERIOD SELECTOR
      ====================================== */}

      <div className="progress-periods">
        <button
          className={
            selectedPeriod === 7
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedPeriod(7)
          }
        >
          7 Days
        </button>

        <button
          className={
            selectedPeriod === 14
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedPeriod(14)
          }
        >
          14 Days
        </button>

        <button
          className={
            selectedPeriod === 30
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedPeriod(30)
          }
        >
          30 Days
        </button>
      </div>

      {/* ======================================
          SUMMARY STATS
      ====================================== */}

      <div className="progress-stats">

        <div className="progress-stat">
          <div className="progress-stat-icon">
            ✓
          </div>

          <div>
            <span>
              Workouts
            </span>

            <strong>
              {totalWorkouts}
            </strong>

            <small>
              completed
            </small>
          </div>
        </div>

        <div className="progress-stat">
          <div className="progress-stat-icon">
            🔥
          </div>

          <div>
            <span>
              Current Streak
            </span>

            <strong>
              {workoutStreak}
            </strong>

            <small>
              days
            </small>
          </div>
        </div>

        <div className="progress-stat">
          <div className="progress-stat-icon">
            💧
          </div>

          <div>
            <span>
              Avg. Water
            </span>

            <strong>
              {(averageWater / 1000).toFixed(
                1
              )}L
            </strong>

            <small>
              per day
            </small>
          </div>
        </div>

        <div className="progress-stat">
          <div className="progress-stat-icon">
            🎯
          </div>

          <div>
            <span>
              Water Goal
            </span>

            <strong>
              {waterGoalDays}
            </strong>

            <small>
              days reached
            </small>
          </div>
        </div>

      </div>

      {/* ======================================
          MAIN GRID
      ====================================== */}

      <div className="progress-grid">

        {/* ====================================
            WORKOUT PROGRESS
        ==================================== */}

        <div className="progress-card workout-progress-card">

          <div className="progress-card-top">
            <div>
              <span className="card-label">
                TRAINING
              </span>

              <h2>
                Workout Progress
              </h2>
            </div>

            <div className="progress-card-icon">
              💪
            </div>
          </div>

          <div className="big-progress-number">
            <strong>
              {totalWorkouts}
            </strong>

            <span>
              / {weeklyTarget}
            </span>
          </div>

          <p className="progress-description">
            workouts completed during
            this period
          </p>

          <div className="progress-label">
            <span>
              Weekly target
            </span>

            <span>
              {Math.round(
                workoutCompletion
              )}%
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${workoutCompletion}%`,
              }}
            />
          </div>

          <div className="workout-mini-stats">
            <div>
              <span>
                Exercises
              </span>

              <strong>
                {totalExercises}
              </strong>
            </div>

            <div>
              <span>
                Streak
              </span>

              <strong>
                {workoutStreak} days
              </strong>
            </div>
          </div>

        </div>

        {/* ====================================
            WATER PROGRESS
        ==================================== */}

        <div className="progress-card">

          <div className="progress-card-top">
            <div>
              <span className="card-label">
                HYDRATION
              </span>

              <h2>
                Water Progress
              </h2>
            </div>

            <div className="progress-card-icon">
              💧
            </div>
          </div>

          <div className="big-progress-number">
            <strong>
              {(averageWater / 1000).toFixed(
                1
              )}L
            </strong>

            <span>
              /{" "}
              {(waterTarget / 1000).toFixed(
                1
              )}L
            </span>
          </div>

          <p className="progress-description">
            average daily water intake
          </p>

          <div className="progress-label">
            <span>
              Goal completion
            </span>

            <span>
              {Math.round(
                waterCompletion
              )}%
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${waterCompletion}%`,
              }}
            />
          </div>

          <div className="water-mini-stats">
            <div>
              <span>
                Goal days
              </span>

              <strong>
                {waterGoalDays}
              </strong>
            </div>

            <div>
              <span>
                Total water
              </span>

              <strong>
                {(totalWater / 1000).toFixed(
                  1
                )}L
              </strong>
            </div>
          </div>

        </div>

        {/* ====================================
            DAILY ACTIVITY
        ==================================== */}

        <div className="progress-card daily-card">

          <div className="progress-card-top">
            <div>
              <span className="card-label">
                ACTIVITY
              </span>

              <h2>
                Daily Activity
              </h2>
            </div>
          </div>

          <div className="activity-chart">
            {dailyActivity.map(
              (day) => (
                <div
                  className="activity-day"
                  key={day.date}
                >
                  <div className="activity-bars">

                    <div
                      className="activity-bar water-bar"
                      style={{
                        height: `${Math.max(
                          day.waterPercentage,
                          4
                        )}%`,
                      }}
                      title={`${(
                        day.water / 1000
                      ).toFixed(
                        2
                      )}L water`}
                    />

                    <div
                      className="activity-bar workout-bar"
                      style={{
                        height:
                          day.workouts >
                          0
                            ? "100%"
                            : "4%",
                      }}
                      title={`${day.workouts} workout(s)`}
                    />

                  </div>

                  <span>
                    {formatDate(
                      day.date
                    )}
                  </span>
                </div>
              )
            )}
          </div>

          <div className="chart-legend">
            <span>
              <i className="legend-water" />
              Water
            </span>

            <span>
              <i className="legend-workout" />
              Workout
            </span>
          </div>

        </div>

        {/* ====================================
            RECENT WORKOUTS
        ==================================== */}

        <div className="progress-card recent-workouts-card">

          <div className="progress-card-top">
            <div>
              <span className="card-label">
                HISTORY
              </span>

              <h2>
                Recent Workouts
              </h2>
            </div>

            <div className="workout-count">
              {workoutHistory.length}
            </div>
          </div>

          {workoutHistory.length === 0 ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', backgroundColor: 'var(--surface-card)', borderRadius: '12px' }}>
              <h4 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>No completed workouts yet</h4>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '14px' }}>Complete your first workout to start tracking your progress.</p>
              <Button variant="primary" onClick={() => navigate("/workouts")}>
                View Workouts
              </Button>
            </div>
          ) : (
            <div className="workout-history-list">
              {workoutHistory
                .slice(0, 6)
                .map(
                  (
                    workout,
                    index
                  ) => {
                    const workoutDate =
                      getWorkoutDate(
                        workout
                      );

                    return (
                      <div
                        className="history-item"
                        key={
                          `${workout.workoutId}-${workoutDate}-${index}`
                        }
                      >
                        <div className="history-check">
                          ✓
                        </div>

                        <div className="history-info">
                          <strong>
                            {
                              workout.workoutName
                            }
                          </strong>

                          <span>
                            {workout.workoutFocus ||
                              "Workout completed"}
                          </span>
                        </div>

                        <div className="history-date">
                          {workoutDate
                            ? formatDate(
                                workoutDate
                              )
                            : "Completed"}
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          )}

          {workoutHistory.length >
            6 && (
            <p className="history-more">
              Showing your 6 most recent
              workouts.
            </p>
          )}

        </div>

        {/* ====================================
            BEST WORKOUT
        ==================================== */}

        <div className="progress-card best-card">

          <div className="progress-card-top">
            <div>
              <span className="card-label">
                ACHIEVEMENT
              </span>

              <h2>
                Best Workout
              </h2>
            </div>

            <div className="progress-card-icon">
              🏆
            </div>
          </div>

          {bestWorkout ? (
            <>
              <div className="best-workout-name">
                {bestWorkout.workoutName}
              </div>

              <p className="progress-description">
                Your most completed
                workout session.
              </p>

              <div className="best-workout-details">
                <span>
                  ✓ Completed
                </span>

                <span>
                  {getWorkoutDate(
                    bestWorkout
                  )
                    ? formatDate(
                        getWorkoutDate(
                          bestWorkout
                        )
                      )
                    : ""}
                </span>
              </div>
            </>
          ) : (
            <div style={{ padding: '32px 16px', textAlign: 'center', backgroundColor: 'var(--surface-card)', borderRadius: '12px' }}>
              <h4 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>No achievement yet</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Complete your first workout.</p>
            </div>
          )}

        </div>

      </div>

      {/* ======================================
          BACK BUTTON
      ====================================== */}

      <div className="progress-footer">
        <Button
          variant="primary"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Back to Dashboard
        </Button>
      </div>

    </div>
  );
}

export default Progress;

import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/ui/EmptyState";
import { auth, db } from "../firebase";
import workoutProgram from "../data/Workouts";
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

  const getLastDays = useCallback((days) => {
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
  }, []);

  const getWorkoutDate = useCallback((workout) => {
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

    return getDateString(parsedDate);
  }, []);

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
    [selectedPeriod, getLastDays]
  );

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
      getWorkoutDate,
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
    }, [workoutHistory, getWorkoutDate]);

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
      <div className="progress-page-v2">
        <div className="progress-header-v2">
          <div>
            <h1>Your Progress</h1>
            <p className="progress-subtitle-v2">Loading your history...</p>
          </div>
          <div className="header-date-v2">
            <span>Today</span>
            <strong>{formatFullDate(getToday())}</strong>
          </div>
        </div>
        <div className="progress-loading-v2">
          <div className="loading-spinner-ring-v2" />
          <p>Analyzing your training data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="progress-page-v2">
        <div className="progress-header-v2">
          <div>
            <h1>Your Progress</h1>
            <p className="progress-subtitle-v2" style={{ color: 'var(--color-danger)' }}>Failed to load progress data.</p>
            <div style={{ marginTop: '1rem' }}>
              <Button variant="default" onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </div>
          <div className="header-date-v2">
            <span>Today</span>
            <strong>{formatFullDate(getToday())}</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="progress-page-v2">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="progress-header-v2">
        <div>
          <span className="dashboard-eyebrow">
            TRAINIQ / PROGRESS
          </span>

          <h1>
            Your Progress
          </h1>

          <p className="progress-subtitle-v2">
            Track your consistency,
            workouts and hydration.
          </p>
        </div>

        <div className="header-date-v2">
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

      <div className="progress-periods-v2">
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

      <div className="progress-stats-v2">

        <div className="progress-stat-v2">
          <div className="progress-stat-icon-v2">
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

        <div className="progress-stat-v2">
          <div className="progress-stat-icon-v2">
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

        <div className="progress-stat-v2">
          <div className="progress-stat-icon-v2">
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

        <div className="progress-stat-v2">
          <div className="progress-stat-icon-v2">
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

      <div className="progress-grid-v2">

        {/* ====================================
            WORKOUT PROGRESS
        ==================================== */}

        <div className="progress-card-v2 workout-progress-card">

          <div className="progress-card-top-v2">
            <div>
              <span className="card-label-v2">
                TRAINING
              </span>

              <h2>
                Workout Progress
              </h2>
            </div>

            <div className="progress-card-icon-v2">
              💪
            </div>
          </div>

          <div className="big-progress-number-v2">
            <strong>
              {totalWorkouts}
            </strong>

            <span>
              / {weeklyTarget}
            </span>
          </div>

          <p className="progress-description-v2">
            workouts completed during
            this period
          </p>

          <div className="progress-label-v2">
            <span>
              Weekly target
            </span>

            <span>
              {Math.round(
                workoutCompletion
              )}%
            </span>
          </div>

          <div className="progress-track-v2">
            <div
              className="progress-fill-v2"
              style={{
                width: `${workoutCompletion}%`,
              }}
            />
          </div>

          <div className="workout-mini-stats-v2">
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

        <div className="progress-card-v2">

          <div className="progress-card-top-v2">
            <div>
              <span className="card-label-v2">
                HYDRATION
              </span>

              <h2>
                Water Progress
              </h2>
            </div>

            <div className="progress-card-icon-v2">
              💧
            </div>
          </div>

          <div className="big-progress-number-v2">
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

          <p className="progress-description-v2">
            average daily water intake
          </p>

          <div className="progress-label-v2">
            <span>
              Goal completion
            </span>

            <span>
              {Math.round(
                waterCompletion
              )}%
            </span>
          </div>

          <div className="progress-track-v2">
            <div
              className="progress-fill-v2 warning-fill"
              style={{
                width: `${waterCompletion}%`,
              }}
            />
          </div>

          <div className="water-mini-stats-v2">
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

        <div className="progress-card-v2 daily-card-v2">

          <div className="progress-card-top-v2">
            <div>
              <span className="card-label-v2">
                ACTIVITY
              </span>

              <h2>
                Daily Activity
              </h2>
            </div>
          </div>

          <div className="activity-chart-v2">
            {dailyActivity.map(
              (day) => (
                <div
                  className="activity-day-v2"
                  key={day.date}
                >
                  <div className="activity-bars-v2">

                    <div
                      className="activity-bar-v2 water-bar-v2"
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
                      className="activity-bar-v2 workout-bar-v2"
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

          <div className="chart-legend-v2">
            <span>
              <i className="legend-water-v2" />
              Water
            </span>

            <span>
              <i className="legend-workout-v2" />
              Workout
            </span>
          </div>

        </div>

        {/* ====================================
            RECENT WORKOUTS
        ==================================== */}

        <div className="progress-card-v2 recent-workouts-card">

          <div className="progress-card-top-v2">
            <div>
              <span className="card-label-v2">
                HISTORY
              </span>

              <h2>
                Recent Workouts
              </h2>
            </div>

            <div className="workout-count-v2">
              {workoutHistory.length}
            </div>
          </div>

          {workoutHistory.length === 0 ? (
            <EmptyState
              icon="💪"
              title="No completed workouts yet"
              description="Complete your first workout to start tracking your progress."
              action={{
                label: "View Workouts",
                variant: "primary",
                onClick: () => navigate("/workouts"),
              }}
              size="default"
            />
          ) : (
            <>
              <div className="workout-history-list-v2">
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
                          className="history-item-v2"
                          key={
                            `${workout.workoutId}-${workoutDate}-${index}`
                          }
                        >
                          <div className="history-check-v2">
                            ✓
                          </div>

                          <div className="history-info-v2">
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

                          <div className="history-date-v2">
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

              {workoutHistory.length >
                6 && (
                <p className="history-more-v2">
                  Showing your 6 most recent
                  workouts.
                </p>
              )}
            </>
          )}

        </div>

        {/* ====================================
            BEST WORKOUT
        ==================================== */}

        <div className="progress-card-v2 best-card">

          <div className="progress-card-top-v2">
            <div>
              <span className="card-label-v2">
                ACHIEVEMENT
              </span>

              <h2>
                Best Workout
              </h2>
            </div>

            <div className="progress-card-icon-v2">
              🏆
            </div>
          </div>

          {bestWorkout ? (
            <>
              <div className="best-workout-name-v2">
                {bestWorkout.workoutName}
              </div>

              <p className="progress-description-v2">
                Your most completed
                workout session.
              </p>

              <div className="best-workout-details-v2">
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
            <EmptyState
              icon="🏆"
              title="No achievement yet"
              description="Complete your first workout to earn your first achievement."
              size="default"
            />
          )}

        </div>

      </div>

      {/* ======================================
          FOOTER
      ====================================== */}

      <div className="progress-footer-v2">
        <Button
          variant="default"
          className="w-full"
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
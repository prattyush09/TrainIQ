import workoutProgram from "../data/Workouts";

export const recommendationEngine = {
  /**
   * Generates a structured user context from raw persisted data.
   */
  buildUserContext(profile, workoutHistory, streak, recentDiet, recentWater, dietHistory = {}, waterHistory = {}, last7Days = []) {
    const preferences = profile?.preferences || { hydrationTracking: true };
    const targets = {
      calories: profile?.calorieTarget || 2500,
      protein: profile?.proteinTarget || 120,
      water: profile?.waterTarget || 3000
    };
    
    // Build historical arrays mapped exactly to last7Days
    const historicalDiet = last7Days.map(date => {
      const dayData = dietHistory[date];
      if (!dayData) return { date, calories: 0, protein: 0, tracked: false };
      
      let cals = 0;
      let pro = 0;
      let hasData = false;
      
      ["Breakfast", "Lunch", "Dinner", "Snacks"].forEach(meal => {
        if (Array.isArray(dayData[meal]) && dayData[meal].length > 0) {
          hasData = true;
          dayData[meal].forEach(f => {
            cals += Number(f.totalCalories) || (Number(f.calories || 0) * Number(f.quantity || 1));
            pro += Number(f.totalProtein) || (Number(f.protein || 0) * Number(f.quantity || 1));
          });
        }
      });
      return { date, calories: cals, protein: pro, tracked: hasData };
    });

    const context = {
      profile: {
        age: profile?.age,
        goal: profile?.goal,
        activityLevel: profile?.activityLevel,
        workoutDays: profile?.workoutDays || 4, // default to 4 if not set
        accountCreatedAt: profile?.accountCreatedAt
      },
      preferences,
      targets,
      workoutHistory: workoutHistory || [],
      consistency: { streak: streak || 0 },
      recentDiet: recentDiet || { calories: 0, protein: 0 },
      historicalDiet,
      last7Days
    };
    
    // Conditionally include hydration
    if (preferences.hydrationTracking) {
      context.hydration = {
        recentIntake: recentWater || 0,
        historical: last7Days.map(date => ({
          date,
          amount: Number(waterHistory[date]) || 0,
          tracked: waterHistory[date] !== undefined
        }))
      };
    }
    
    return context;
  },

  /**
   * Generates a deterministic daily recommendation based on the user context.
   * This prepares the structure for the Phase 6 Gemini AI swap.
   */
  generateTodayRecommendation(context) {
    if (!context) return null;
    
    const history = context.workoutHistory;
    
    // Check if workout completed today
    const today = new Date().toISOString().split("T")[0];
    const completedToday = history.some(w => w.completed && w.completedAt?.startsWith(today));
    
    if (completedToday) {
      return {
        type: "rest",
        title: "Active Recovery",
        reason: "You have already crushed your workout today. Focus on protein intake and recovery.",
        context: { workoutDone: true }
      };
    }
    
    // Find the next workout in the program sequentially
    // (A real implementation would look at `completed` status and order)
    const completedIds = history.filter(w => w.completed).map(w => w.workoutId);
    let nextWorkout = workoutProgram[0];
    
    if (completedIds.length > 0) {
      const lastCompletedId = completedIds[completedIds.length - 1];
      const nextIndex = workoutProgram.findIndex(w => w.id === lastCompletedId) + 1;
      nextWorkout = workoutProgram[nextIndex % workoutProgram.length];
    }
    
    return {
      type: "workout",
      workoutId: nextWorkout.id,
      title: nextWorkout.name,
      reason: `Based on your history, ${nextWorkout.name} is the optimal next step in your progression.`,
      confidence: "high",
      context: { programState: "progressing", nextWorkoutId: nextWorkout.id }
    };
  }
};

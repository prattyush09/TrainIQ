const workoutProgram = [
  {
    id: 1,
    name: "Push A",
    focus: "Chest • Shoulders • Triceps",
    exercises: [
      { name: "Bench Press", sets: 3, reps: "8-10" },
      { name: "Incline Dumbbell Press", sets: 3, reps: "8-10" },
      { name: "Machine Chest Press", sets: 3, reps: "10-12" },
      { name: "Shoulder Press", sets: 3, reps: "8-10" },
      { name: "Lateral Raise", sets: 3, reps: "12-15" },
      { name: "Triceps Pushdown", sets: 3, reps: "10-12" },
      { name: "Overhead Triceps Extension", sets: 2, reps: "12-15" },
    ],
  },
  {
    id: 2,
    name: "Pull A",
    focus: "Back • Biceps",
    exercises: [
      { name: "Lat Pulldown", sets: 3, reps: "8-10" },
      { name: "Seated Cable Row", sets: 3, reps: "8-10" },
      { name: "Chest Supported Row", sets: 3, reps: "10-12" },
      { name: "Face Pull", sets: 3, reps: "12-15" },
      { name: "EZ Bar Curl", sets: 3, reps: "10-12" },
      { name: "Hammer Curl", sets: 2, reps: "12-15" },
    ],
  },
  {
    id: 3,
    name: "Legs A",
    focus: "Legs • Core",
    exercises: [
      { name: "Barbell Squat", sets: 3, reps: "8-10" },
      { name: "Leg Press", sets: 3, reps: "10-12" },
      { name: "Romanian Deadlift", sets: 3, reps: "10-12" },
      { name: "Leg Curl", sets: 3, reps: "10-12" },
      { name: "Standing Calf Raise", sets: 3, reps: "15-20" },
      { name: "Plank", sets: 3, reps: "45 sec" },
    ],
  },
  {
    id: 4,
    name: "Push B",
    focus: "Chest • Shoulders • Triceps",
    exercises: [],
  },
  {
    id: 5,
    name: "Pull B",
    focus: "Back • Biceps",
    exercises: [],
  },
  {
    id: 6,
    name: "Legs B",
    focus: "Legs • Core",
    exercises: [],
  },
];

export default workoutProgram;
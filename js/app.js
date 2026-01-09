/**
 * ==================== GYMBUDDY HQ - MAIN APP ==================
 * Vanilla JavaScript application for workout planning, calorie calculation,
 * and weekly split generation.
 * 
 * Features:
 * - Modular functions for each major feature
 * - localStorage persistence
 * - Event delegation for dynamic UI
 * - Progressive disclosure of results
 * - Accessibility support
 */

// ==================== STORAGE MANAGER ====================
const StorageManager = {
    /**
     * Save workouts to localStorage
     */
    saveWorkout(workout) {
        const workouts = this.getWorkouts();
        const id = Date.now();
        const workoutData = {
            id,
            ...workout,
            savedAt: new Date().toLocaleString()
        };
        workouts.push(workoutData);
        localStorage.setItem('gymbuddy_workouts', JSON.stringify(workouts));
        return id;
    },

    /**
     * Retrieve all saved workouts
     */
    getWorkouts() {
        const data = localStorage.getItem('gymbuddy_workouts');
        return data ? JSON.parse(data) : [];
    },

    /**
     * Delete a workout by ID
     */
    deleteWorkout(id) {
        const workouts = this.getWorkouts();
        const filtered = workouts.filter(w => w.id !== id);
        localStorage.setItem('gymbuddy_workouts', JSON.stringify(filtered));
    },

    /**
     * Save calorie calculator settings
     */
    saveCalorieSettings(settings) {
        localStorage.setItem('gymbuddy_calorie_settings', JSON.stringify(settings));
    },

    /**
     * Retrieve calorie settings
     */
    getCalorieSettings() {
        const data = localStorage.getItem('gymbuddy_calorie_settings');
        return data ? JSON.parse(data) : null;
    },

    /**
     * Save weekly split
     */
    saveSplit(split) {
        const id = Date.now();
        const splitData = {
            id,
            ...split,
            savedAt: new Date().toLocaleString()
        };
        localStorage.setItem(`gymbuddy_split_${id}`, JSON.stringify(splitData));
        return id;
    },

    /**
     * Retrieve saved split
     */
    getSplit(id) {
        const data = localStorage.getItem(`gymbuddy_split_${id}`);
        return data ? JSON.parse(data) : null;
    }
};

// ==================== WORKOUT DATA & TEMPLATES ====================
const WorkoutData = {
    /**
     * Form cues and tips for proper exercise technique
     */
    formCues: {
        'chest': 'Keep shoulders back, chest up. Control the negative, explosive positive.',
        'back': 'Retract scapula first, then pull. Avoid rounding shoulders.',
        'legs': 'Knees track over toes. Keep chest up, core tight throughout.',
        'shoulders': 'Avoid momentum. Full range of motion, squeeze at the top.',
        'arms': 'Isolate the muscle. No swinging or jerking motion.',
        'core': 'Maintain neutral spine. Breathe steadily, no breath-holding.'
    },

    /**
     * Exercise database organized by muscle group
     * Expandable structure for future additions
     */
    exercises: {
        'chest': {
            'full-gym': [
                { name: 'Barbell Bench Press', sets: 4, reps: '6-8', rest: '2-3 min', alt: 'Dumbbell Bench Press' },
                { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rest: '90 sec', alt: 'Incline Barbell Press' },
                { name: 'Cable Flyes', sets: 3, reps: '10-12', rest: '60 sec', alt: 'Machine Pec Flyes' },
                { name: 'Dips', sets: 3, reps: '8-12', rest: '90 sec', alt: 'Assisted Dips' }
            ],
            'dumbbells': [
                { name: 'Dumbbell Bench Press', sets: 4, reps: '8-10', rest: '2 min', alt: 'Floor Press' },
                { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rest: '90 sec', alt: 'Pike Push-ups' },
                { name: 'Dumbbell Flyes', sets: 3, reps: '10-12', rest: '60 sec', alt: 'Machine Flyes' }
            ],
            'bodyweight': [
                { name: 'Push-ups', sets: 4, reps: '8-12', rest: '60 sec', alt: 'Incline Push-ups' },
                { name: 'Wide-Grip Push-ups', sets: 3, reps: '8-12', rest: '60 sec', alt: 'Archer Push-ups' },
                { name: 'Dips (Bench)', sets: 3, reps: '6-10', rest: '90 sec', alt: 'Negative Dips' }
            ]
        },
        'back': {
            'full-gym': [
                { name: 'Barbell Deadlift', sets: 3, reps: '4-6', rest: '3 min', alt: 'Trap Bar Deadlift' },
                { name: 'Pull-ups (Weighted)', sets: 3, reps: '6-8', rest: '2 min', alt: 'Assisted Pull-ups' },
                { name: 'Barbell Rows', sets: 4, reps: '6-8', rest: '2 min', alt: 'Dumbbell Rows' },
                { name: 'Lat Pulldown', sets: 3, reps: '8-10', rest: '90 sec', alt: 'Machine Rows' }
            ],
            'dumbbells': [
                { name: 'Dumbbell Rows', sets: 4, reps: '8-10', rest: '90 sec', alt: 'Single-Arm Rows' },
                { name: 'Dumbbell Deadlifts', sets: 3, reps: '8-10', rest: '90 sec', alt: 'Single-Leg Deadlifts' },
                { name: 'Farmer Carries', sets: 3, reps: '30-40 sec', rest: '60 sec', alt: 'Shrugs' }
            ],
            'bodyweight': [
                { name: 'Pull-ups', sets: 3, reps: '5-10', rest: '2 min', alt: 'Assisted Pull-ups' },
                { name: 'Inverted Rows', sets: 3, reps: '8-12', rest: '90 sec', alt: 'Door Rows' },
                { name: 'Superman Holds', sets: 3, reps: '15-20 sec', rest: '60 sec', alt: 'Reverse Snow Angels' }
            ]
        },
        'legs': {
            'full-gym': [
                { name: 'Barbell Back Squats', sets: 4, reps: '6-8', rest: '2-3 min', alt: 'Goblet Squats' },
                { name: 'Romanian Deadlifts', sets: 3, reps: '8-10', rest: '90 sec', alt: 'Leg Curls' },
                { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90 sec', alt: 'Smith Machine Squats' },
                { name: 'Leg Extensions', sets: 3, reps: '12-15', rest: '60 sec', alt: 'Bulgarian Split Squats' }
            ],
            'dumbbells': [
                { name: 'Goblet Squats', sets: 4, reps: '10-12', rest: '90 sec', alt: 'Dumbbell Squats' },
                { name: 'Dumbbell Lunges', sets: 3, reps: '10 each', rest: '60 sec', alt: 'Step-ups' },
                { name: 'Single-Leg Deadlifts', sets: 3, reps: '8-10 each', rest: '90 sec', alt: 'Romanian Deadlifts' }
            ],
            'bodyweight': [
                { name: 'Bodyweight Squats', sets: 4, reps: '15-20', rest: '60 sec', alt: 'Sissy Squats' },
                { name: 'Bulgarian Split Squats', sets: 3, reps: '10 each', rest: '60 sec', alt: 'Lunges' },
                { name: 'Step-ups', sets: 3, reps: '12 each', rest: '60 sec', alt: 'Box Jumps' }
            ]
        },
        'shoulders': {
            'full-gym': [
                { name: 'Barbell Overhead Press', sets: 4, reps: '6-8', rest: '2 min', alt: 'Dumbbell Press' },
                { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '60 sec', alt: 'Machine Laterals' },
                { name: 'Face Pulls', sets: 3, reps: '12-15', rest: '60 sec', alt: 'Reverse Flyes' },
                { name: 'Shrugs', sets: 3, reps: '10-12', rest: '60 sec', alt: 'Machine Shrugs' }
            ],
            'dumbbells': [
                { name: 'Dumbbell Press', sets: 4, reps: '8-10', rest: '90 sec', alt: 'Floor Press' },
                { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '60 sec', alt: 'Upright Rows' },
                { name: 'Reverse Flyes', sets: 3, reps: '12-15', rest: '60 sec', alt: 'Band Pull-aparts' }
            ],
            'bodyweight': [
                { name: 'Pike Push-ups', sets: 3, reps: '8-12', rest: '90 sec', alt: 'Wall Push-ups' },
                { name: 'Handstand Holds', sets: 3, reps: '15-20 sec', rest: '60 sec', alt: 'Shoulder Taps' }
            ]
        },
        'arms': {
            'full-gym': [
                { name: 'Barbell Curls', sets: 3, reps: '8-10', rest: '90 sec', alt: 'EZ-Bar Curls' },
                { name: 'Tricep Rope Pushdowns', sets: 3, reps: '10-12', rest: '60 sec', alt: 'Cable Overhead Extension' },
                { name: 'Dumbbell Curls', sets: 3, reps: '10-12', rest: '60 sec', alt: 'Machine Curls' },
                { name: 'Skull Crushers', sets: 3, reps: '8-10', rest: '90 sec', alt: 'Bench Dips' }
            ],
            'dumbbells': [
                { name: 'Dumbbell Curls', sets: 3, reps: '10-12', rest: '60 sec', alt: 'Hammer Curls' },
                { name: 'Tricep Extensions', sets: 3, reps: '10-12', rest: '60 sec', alt: 'Kickbacks' },
                { name: 'Hammer Curls', sets: 3, reps: '10-12', rest: '60 sec', alt: 'Preacher Curls' }
            ],
            'bodyweight': [
                { name: 'Push-up Variations', sets: 3, reps: '10-15', rest: '90 sec', alt: 'Dips' },
                { name: 'Reverse Curls (Towel)', sets: 3, reps: '12-15', rest: '60 sec', alt: 'Door Frame Curls' }
            ]
        },
        'core': {
            'full-gym': [
                { name: 'Cable Crunches', sets: 3, reps: '12-15', rest: '60 sec', alt: 'Machine Crunches' },
                { name: 'Weighted Cable Woodchops', sets: 3, reps: '10-12 each', rest: '60 sec', alt: 'Medicine Ball Twists' },
                { name: 'Ab Wheel Rollouts', sets: 3, reps: '8-12', rest: '90 sec', alt: 'Decline Sit-ups' },
                { name: 'Machine Leg Raises', sets: 3, reps: '12-15', rest: '60 sec', alt: 'Hanging Leg Raises' }
            ],
            'dumbbells': [
                { name: 'Dumbbell Woodchops', sets: 3, reps: '12-15 each', rest: '60 sec', alt: 'Russian Twists' },
                { name: 'Pallof Press', sets: 3, reps: '10-12 each', rest: '60 sec', alt: 'Single-Arm Carries' },
                { name: 'Dead Bugs', sets: 3, reps: '10-12 each', rest: '60 sec', alt: 'Bird Dogs' }
            ],
            'bodyweight': [
                { name: 'Planks', sets: 3, reps: '30-60 sec', rest: '60 sec', alt: 'Side Planks' },
                { name: 'Mountain Climbers', sets: 3, reps: '20 each', rest: '60 sec', alt: 'Burpees' },
                { name: 'Leg Raises', sets: 3, reps: '8-12', rest: '90 sec', alt: 'Lying Leg Raises' }
            ]
        }
    },

    /**
     * Get exercises for a specific muscle group and equipment
     */
    getExercises(muscle, equipment) {
        return this.exercises[muscle]?.[equipment] || [];
    },

    /**
     * Get form cue for muscle group
     */
    getFormCue(muscle) {
        return this.formCues[muscle] || 'Focus on proper form and full range of motion.';
    }
};

// ==================== CALORIE CALCULATOR ====================
const CalorieCalculator = {
    /**
     * Activity level multipliers for TDEE calculation
     */
    activityMultipliers: {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very-active': 1.9
    },

    /**
     * Calculate BMR using Mifflin-St Jeor equation
     * Returns calories needed at rest
     */
    calculateBMR(sex, age, height, weight) {
        let bmr;
        if (sex === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (sex === 'female') {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        } else {
            // Average of male and female if not specified
            const maleBMR = 10 * weight + 6.25 * height - 5 * age + 5;
            const femaleBMR = 10 * weight + 6.25 * height - 5 * age - 161;
            bmr = (maleBMR + femaleBMR) / 2;
        }
        return Math.round(bmr);
    },

    /**
     * Calculate TDEE (Total Daily Energy Expenditure)
     */
    calculateTDEE(bmr, activityLevel) {
        const multiplier = this.activityMultipliers[activityLevel] || 1.2;
        return Math.round(bmr * multiplier);
    },

    /**
     * Calculate target calories based on goal
     */
    calculateTargetCalories(tdee, goal) {
        const targets = {
            'maintain': { calories: tdee, surplus: 0 },
            'lose': { calories: Math.round(tdee * 0.9), surplus: -0.1 },
            'gain': { calories: Math.round(tdee * 1.1), surplus: 0.1 },
            'muscle': { calories: Math.round(tdee * 1.08), surplus: 0.08 }
        };
        return targets[goal] || targets['maintain'];
    },

    /**
     * Calculate protein recommendation in grams
     */
    calculateProteinRange(weight, goal) {
        let proteinPerLb;
        if (goal === 'muscle' || goal === 'gain') {
            proteinPerLb = 1.0; // 1g per lb of body weight
        } else if (goal === 'lose') {
            proteinPerLb = 1.1; // Slightly higher during deficit
        } else {
            proteinPerLb = 0.8; // 0.8g per lb
        }
        const min = Math.round(weight * proteinPerLb * 0.9);
        const max = Math.round(weight * proteinPerLb * 1.1);
        return { min, max };
    },

    /**
     * Convert kg to lb
     */
    kgToLb(kg) {
        return kg * 2.20462;
    },

    /**
     * Convert lb to kg
     */
    lbToKg(lb) {
        return lb / 2.20462;
    },

    /**
     * Convert cm to inches
     */
    cmToInches(cm) {
        return cm / 2.54;
    },

    /**
     * Convert inches to cm
     */
    inchesToCm(inches) {
        return inches * 2.54;
    }
};

// ==================== WEEKLY SPLIT GENERATOR ====================
const SplitGenerator = {
    /**
     * Split templates for different days and experience levels
     */
    templates: {
        'full-body': {
            '2': { days: ['Mon', 'Thu'], focus: ['Full Body A', 'Full Body B'] },
            '3': { days: ['Mon', 'Wed', 'Fri'], focus: ['Full Body A', 'Full Body B', 'Full Body A'] },
            '4': { days: ['Mon', 'Tue', 'Thu', 'Fri'], focus: ['Full Body A', 'Full Body B', 'Full Body A', 'Full Body B'] },
            '5': { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], focus: ['Full Body A', 'Full Body B', 'Full Body A', 'Full Body B', 'Full Body A'] },
            '6': { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], focus: ['Full Body A', 'Full Body B', 'Full Body A', 'Full Body B', 'Full Body A', 'Full Body B'] }
        },
        'upper-lower': {
            '2': { days: ['Mon', 'Thu'], focus: ['Upper A', 'Lower A'] },
            '3': { days: ['Mon', 'Wed', 'Fri'], focus: ['Upper A', 'Lower A', 'Upper B'] },
            '4': { days: ['Mon', 'Tue', 'Thu', 'Fri'], focus: ['Upper A', 'Lower A', 'Upper B', 'Lower B'] },
            '5': { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], focus: ['Upper A', 'Lower A', 'Upper B', 'Lower B', 'Upper A'] },
            '6': { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], focus: ['Upper A', 'Lower A', 'Upper B', 'Lower B', 'Upper A', 'Lower A'] }
        },
        'ppl': {
            '2': { days: ['Mon', 'Thu'], focus: ['Push', 'Pull'] },
            '3': { days: ['Mon', 'Wed', 'Fri'], focus: ['Push', 'Pull', 'Legs'] },
            '5': { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], focus: ['Push', 'Pull', 'Legs', 'Push', 'Pull'] },
            '6': { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], focus: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'] }
        }
    },

    /**
     * Generate a weekly split schedule
     */
    generateSplit(days, splitType, goal, level) {
        const daysPerWeek = String(days);
        const template = this.templates[splitType]?.[daysPerWeek];
        
        if (!template) {
            return null;
        }

        const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const split = allDays.map((day, idx) => ({
            day,
            dayNum: idx,
            focus: template.days.includes(day) ? template.focus[template.days.indexOf(day)] : 'Rest',
            isRestDay: !template.days.includes(day)
        }));

        return {
            daysPerWeek: days,
            splitType,
            goal,
            level,
            schedule: split,
            template: template.focus.join(' → ')
        };
    },

    /**
     * Export split as text format
     */
    exportAsText(split) {
        let text = `GymBuddy HQ - Weekly Split\n`;
        text += `Generated: ${new Date().toLocaleDateString()}\n`;
        text += `Split Type: ${split.splitType}\n`;
        text += `Days per Week: ${split.daysPerWeek}\n`;
        text += `Goal: ${split.goal}\n\n`;

        split.schedule.forEach(day => {
            text += `${day.day}: ${day.focus}\n`;
        });

        return text;
    }
};

// ==================== WORKOUT BUILDER UI ====================
function initWorkoutBuilder() {
    const form = document.getElementById('workout-form');
    const resultDiv = document.getElementById('workout-result');
    const resultContent = document.getElementById('workout-content');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const goal = document.getElementById('workout-goal').value;
        const muscle = document.getElementById('workout-muscle').value;
        const level = document.getElementById('workout-level').value;
        const equipment = document.getElementById('workout-equipment').value;

        if (!goal || !muscle || !level || !equipment) {
            alert('Please fill in all fields');
            return;
        }

        // Generate workout
        const workout = generateWorkout(goal, muscle, level, equipment);
        displayWorkout(workout, muscle);

        // Show result card
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Save workout handler
    document.getElementById('workout-save').addEventListener('click', () => {
        const currentGoal = document.getElementById('workout-goal').value;
        const currentMuscle = document.getElementById('workout-muscle').value;
        const currentLevel = document.getElementById('workout-level').value;
        const currentEquipment = document.getElementById('workout-equipment').value;
        const resultText = resultContent.innerText;

        const workout = {
            goal: currentGoal,
            muscle: currentMuscle,
            level: currentLevel,
            equipment: currentEquipment,
            content: resultText
        };

        StorageManager.saveWorkout(workout);
        displaySavedWorkouts();
        showNotification('Workout saved successfully!', 'success');
    });

    // Copy workout handler
    document.getElementById('workout-copy').addEventListener('click', () => {
        const text = resultContent.innerText;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Workout copied to clipboard!', 'success');
        });
    });

    // Regenerate workout handler
    document.getElementById('workout-regen').addEventListener('click', () => {
        form.dispatchEvent(new Event('submit'));
    });

    displaySavedWorkouts();
}

/**
 * Generate a customized workout based on parameters
 */
function generateWorkout(goal, muscle, level, equipment) {
    const exercises = WorkoutData.getExercises(muscle, equipment);
    const formCue = WorkoutData.getFormCue(muscle);

    // Slice exercises based on experience level
    const selectedExercises = level === 'beginner' 
        ? exercises.slice(0, 3) 
        : exercises;

    // Warm-up recommendation
    const warmUp = level === 'beginner' 
        ? 'Light cardio (2 min) + dynamic stretches + 1-2 warm-up sets at 50% weight'
        : 'Light cardio (3-5 min) + mobility work + progressive warm-up sets';

    return {
        goal,
        muscle,
        level,
        equipment,
        warmUp,
        exercises: selectedExercises,
        formCue,
        generatedAt: new Date().toLocaleString()
    };
}

/**
 * Display generated workout in the UI
 */
function displayWorkout(workout, muscle) {
    const resultTitle = document.getElementById('result-title');
    const resultContent = document.getElementById('workout-content');

    resultTitle.textContent = `${muscle.charAt(0).toUpperCase() + muscle.slice(1)} Workout`;

    let html = `
        <div class="workout-details">
            <div class="detail-item">
                <div class="detail-label">Goal</div>
                <div class="detail-value">${capitalizeFirst(workout.goal)}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Level</div>
                <div class="detail-value">${capitalizeFirst(workout.level)}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Equipment</div>
                <div class="detail-value">${capitalizeFirst(workout.equipment)}</div>
            </div>
        </div>

        <h4>Warm-up (${workout.level === 'beginner' ? '5-7' : '8-10'} min)</h4>
        <p>${workout.warmUp}</p>

        <div class="exercise-list">
    `;

    workout.exercises.forEach((exercise, idx) => {
        html += `
            <div class="exercise-card">
                <h4>${idx + 1}. ${exercise.name}</h4>
                <div class="exercise-detail">
                    <div class="detail-item">
                        <div class="detail-label">Sets × Reps</div>
                        <div class="detail-value">${exercise.sets} × ${exercise.reps}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Rest</div>
                        <div class="detail-value">${exercise.rest}</div>
                    </div>
                </div>
                <div class="form-cue">
                    <strong>Form Tip:</strong> ${workout.formCue}
                </div>
                <div class="alternative-text">
                    <strong>Alternative:</strong> ${exercise.alt}
                </div>
            </div>
        `;
    });

    html += `</div>`;

    resultContent.innerHTML = html;
}

/**
 * Display saved workouts list
 */
function displaySavedWorkouts() {
    const workouts = StorageManager.getWorkouts();
    const container = document.getElementById('saved-workouts-container');
    const list = document.getElementById('saved-workouts-list');

    if (workouts.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';
    list.innerHTML = '';

    workouts.forEach(workout => {
        const item = document.createElement('div');
        item.className = 'workout-item';
        item.innerHTML = `
            <div>
                <h4>${capitalizeFirst(workout.muscle)} - ${capitalizeFirst(workout.goal)}</h4>
                <div class="workout-meta">
                    <span>💪 ${capitalizeFirst(workout.level)}</span>
                    <span>🔧 ${capitalizeFirst(workout.equipment)}</span>
                    <span>📅 ${workout.savedAt}</span>
                </div>
            </div>
            <div class="workout-actions">
                <button class="btn btn-sm btn-outline" onclick="copyWorkoutText('${workout.id}')">📋 Copy</button>
                <button class="btn btn-sm btn-outline" style="background: #ef4444; color: white; border-color: #ef4444;" onclick="deleteWorkoutItem('${workout.id}')">🗑️ Delete</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function copyWorkoutText(id) {
    const workouts = StorageManager.getWorkouts();
    const workout = workouts.find(w => w.id === parseInt(id));
    if (workout) {
        navigator.clipboard.writeText(workout.content);
        showNotification('Workout copied to clipboard!', 'success');
    }
}

function deleteWorkoutItem(id) {
    if (confirm('Are you sure you want to delete this workout?')) {
        StorageManager.deleteWorkout(parseInt(id));
        displaySavedWorkouts();
        showNotification('Workout deleted', 'success');
    }
}

// ==================== CALORIE CALCULATOR UI ====================
function initCalorieCalculator() {
    const form = document.getElementById('calorie-form');
    const resultDiv = document.getElementById('calorie-result');
    const resultContent = document.getElementById('calorie-content');

    // Unit system toggle
    const unitRadios = document.querySelectorAll('input[name="unit-system"]');
    unitRadios.forEach(radio => {
        radio.addEventListener('change', updateUnitLabels);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const unitSystem = document.querySelector('input[name="unit-system"]:checked').value;
        const sex = document.getElementById('cal-sex').value;
        const age = parseInt(document.getElementById('cal-age').value);
        const height = parseFloat(document.getElementById('cal-height').value);
        const weight = parseFloat(document.getElementById('cal-weight').value);
        const activity = document.getElementById('cal-activity').value;
        const goal = document.getElementById('cal-goal').value;

        // Validation
        if (!age || !height || !weight || !activity || !goal) {
            alert('Please fill in all required fields');
            return;
        }

        // Convert imperial to metric if needed
        let heightMetric = height;
        let weightMetric = weight;
        if (unitSystem === 'imperial') {
            heightMetric = CalorieCalculator.inchesToCm(height);
            weightMetric = CalorieCalculator.lbToKg(weight);
        }

        // Calculate
        const bmr = CalorieCalculator.calculateBMR(sex, age, heightMetric, weightMetric);
        const tdee = CalorieCalculator.calculateTDEE(bmr, activity);
        const targetData = CalorieCalculator.calculateTargetCalories(tdee, goal);
        const proteinRange = CalorieCalculator.calculateProteinRange(weightMetric, goal);

        displayCalorieResults(bmr, tdee, targetData, proteinRange, weightMetric);
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Save settings
        document.getElementById('cal-save').addEventListener('click', () => {
            StorageManager.saveCalorieSettings({
                sex, age, height, weight, activity, goal, unitSystem
            });
            showNotification('Settings saved!', 'success');
        });
    });

    loadSavedCalorieSettings();
}

function updateUnitLabels() {
    const unitSystem = document.querySelector('input[name="unit-system"]:checked').value;
    const unitTexts = document.querySelectorAll('.unit-text');
    const heightLabel = document.querySelector('label[for="cal-height"]');
    const weightLabel = document.querySelector('label[for="cal-weight"]');

    if (unitSystem === 'metric') {
        unitTexts.forEach(el => el.textContent = unitSystem === 'metric' ? 'cm' : 'in');
        heightLabel.textContent = 'Height (cm)';
        weightLabel.textContent = 'Weight (kg)';
    } else {
        unitTexts.forEach(el => el.textContent = 'in');
        heightLabel.textContent = 'Height (in)';
        weightLabel.textContent = 'Weight (lb)';
    }
}

function displayCalorieResults(bmr, tdee, targetData, proteinRange, weight) {
    const resultContent = document.getElementById('calorie-content');

    const hydrationLiters = (weight * 0.035).toFixed(1);
    const hydrationOz = (hydrationLiters * 33.814).toFixed(0);

    const html = `
        <div class="detail-item">
            <div class="detail-label">Resting Metabolic Rate (BMR)</div>
            <div class="detail-value">${bmr} cal/day</div>
        </div>

        <div class="detail-item">
            <div class="detail-label">Total Daily Energy Expenditure (TDEE)</div>
            <div class="detail-value">${tdee} cal/day</div>
        </div>

        <h4 style="margin-top: var(--space-xl);">Nutrition Targets</h4>

        <div class="detail-item">
            <div class="detail-label">Target Daily Calories</div>
            <div class="detail-value">${targetData.calories} cal/day</div>
            <p style="font-size: var(--text-sm); color: var(--text-secondary); margin: var(--space-sm) 0 0; text-align: right;">
                (${targetData.surplus > 0 ? '+' : ''}${Math.round(targetData.surplus * 100)}% from TDEE)
            </p>
        </div>

        <div class="detail-item">
            <div class="detail-label">Daily Protein Range</div>
            <div class="detail-value">${proteinRange.min} - ${proteinRange.max}g</div>
            <p style="font-size: var(--text-sm); color: var(--text-secondary); margin: var(--space-sm) 0 0;">
                Aim for the middle of this range: ~${Math.round((proteinRange.min + proteinRange.max) / 2)}g
            </p>
        </div>

        <div class="detail-item">
            <div class="detail-label">Daily Hydration Guideline</div>
            <div class="detail-value">${hydrationLiters}L (${hydrationOz} oz)</div>
            <p style="font-size: var(--text-sm); color: var(--text-secondary); margin: var(--space-sm) 0 0;">
                General guideline: 35ml per kg of body weight. Adjust based on activity and climate.
            </p>
        </div>

        <div class="warning-message" style="margin-top: var(--space-xl);">
            <strong>Safety Note:</strong> These are general guidelines. Avoid extreme deficits or surpluses. 
            Aim for 0.5-1% of body weight change per week. Consult a registered dietitian for personalized advice.
        </div>
    `;

    resultContent.innerHTML = html;
}

function loadSavedCalorieSettings() {
    const settings = StorageManager.getCalorieSettings();
    if (settings) {
        document.getElementById('cal-sex').value = settings.sex;
        document.getElementById('cal-age').value = settings.age;
        document.getElementById('cal-height').value = settings.height;
        document.getElementById('cal-weight').value = settings.weight;
        document.getElementById('cal-activity').value = settings.activity;
        document.getElementById('cal-goal').value = settings.goal;

        const unitRadio = document.querySelector(`input[name="unit-system"][value="${settings.unitSystem}"]`);
        if (unitRadio) unitRadio.checked = true;
        updateUnitLabels();
    }
}

// ==================== WEEKLY SPLIT UI ====================
function initWeeklySplit() {
    const form = document.getElementById('split-form');
    const resultDiv = document.getElementById('split-result');
    const daysInput = document.getElementById('split-days');
    const daysDisplay = document.getElementById('split-days-display');

    // Update days display
    daysInput.addEventListener('input', (e) => {
        daysDisplay.textContent = `${e.target.value} days`;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const days = parseInt(document.getElementById('split-days').value);
        const goal = document.getElementById('split-goal').value;
        const level = document.getElementById('split-level').value;
        const splitType = document.getElementById('split-type').value;

        if (!goal || !level || !splitType) {
            alert('Please fill in all fields');
            return;
        }

        const split = SplitGenerator.generateSplit(days, splitType, goal, level);
        if (split) {
            displaySplit(split);
            resultDiv.style.display = 'block';
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    // Export handler
    document.getElementById('split-export').addEventListener('click', () => {
        const days = parseInt(document.getElementById('split-days').value);
        const goal = document.getElementById('split-goal').value;
        const level = document.getElementById('split-level').value;
        const splitType = document.getElementById('split-type').value;

        const split = SplitGenerator.generateSplit(days, splitType, goal, level);
        const text = SplitGenerator.exportAsText(split);

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gymbuddy-split-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);

        showNotification('Split exported!', 'success');
    });

    // Save handler
    document.getElementById('split-save').addEventListener('click', () => {
        const days = parseInt(document.getElementById('split-days').value);
        const goal = document.getElementById('split-goal').value;
        const level = document.getElementById('split-level').value;
        const splitType = document.getElementById('split-type').value;

        const split = SplitGenerator.generateSplit(days, splitType, goal, level);
        StorageManager.saveSplit(split);
        showNotification('Split saved!', 'success');
    });

    // Regenerate handler
    document.getElementById('split-regen').addEventListener('click', () => {
        form.dispatchEvent(new Event('submit'));
    });
}

function displaySplit(split) {
    const calendar = document.getElementById('split-calendar');
    calendar.innerHTML = '';

    split.schedule.forEach(day => {
        const card = document.createElement('div');
        card.className = `day-card ${day.isRestDay ? 'rest-day' : 'active'}`;

        card.innerHTML = `
            <div>
                <div class="day-label">${day.day}</div>
                <div class="day-title">${day.focus}</div>
                ${!day.isRestDay ? `<div class="day-focus">Workout Session</div>` : ''}
            </div>
            <div class="day-badge ${day.isRestDay ? 'rest-badge' : ''}">
                ${day.isRestDay ? 'REST' : 'TRAIN'}
            </div>
        `;

        calendar.appendChild(card);
    });
}

// ==================== DIET GOALS UI ====================
function initDietGoals() {
    const selector = document.querySelectorAll('.diet-btn');
    const resultDiv = document.getElementById('diet-result');
    const resultContent = document.getElementById('diet-content');

    const dietTips = {
        'gain': {
            title: '📈 Weight Gain Guide',
            template: 'Use the "Plate Method"',
            mealItems: [
                { label: '1/3 Plate', items: ['Rice, potatoes, oats', 'Whole grain bread'] },
                { label: '1/3 Plate', items: ['Chicken, beef, fish', 'Eggs, cottage cheese'] },
                { label: '1/3 Plate', items: ['Vegetables', 'Fruits (optional)'] },
                { label: 'Add-ons', items: ['Olive oil or nuts', 'Sauces (moderation)'] }
            ],
            proteinOptions: [
                'Chicken breast & thighs',
                'Beef & ground beef',
                'Salmon & fatty fish',
                'Eggs (whole)',
                'Cottage cheese',
                'Greek yogurt',
                'Protein powder (shakes)'
            ],
            snacks: [
                'Nut butter + banana',
                'Granola + yogurt',
                'Trail mix',
                'Cheese + crackers',
                'Protein shake + oats'
            ],
            timing: {
                'Pre-workout': 'Oats + banana + almond butter 60 min before',
                'Post-workout': 'Protein + simple carbs within 1-2 hours'
            }
        },
        'muscle': {
            title: '💪 Muscle Building Guide',
            template: 'Use the "Plate Method"',
            mealItems: [
                { label: '1/3 Plate', items: ['Rice, potatoes', 'Whole grains (moderate)'] },
                { label: '1/3 Plate', items: ['Chicken, lean beef', 'Fish, eggs'] },
                { label: '1/3 Plate', items: ['Vegetables (lots)', 'Leafy greens'] },
                { label: 'Add-ons', items: ['Olive oil (light)', 'Lemon juice, spices'] }
            ],
            proteinOptions: [
                'Grilled chicken breast',
                'Lean ground beef (93%)',
                'White fish (cod, tilapia)',
                'Egg whites + 1-2 yolks',
                'Greek yogurt (non-fat)',
                'Cottage cheese (low-fat)',
                'Protein powder'
            ],
            snacks: [
                'Protein shake + berries',
                'Greek yogurt + granola',
                'Tuna + crackers',
                'Cottage cheese',
                'Lean jerky'
            ],
            timing: {
                'Pre-workout': 'Rice cakes + banana 45-60 min before',
                'Post-workout': 'Protein + carbs within 30-60 min (crucial)'
            }
        },
        'lose': {
            title: '⚡ Fat Loss Guide',
            template: 'Use the "Plate Method"',
            mealItems: [
                { label: '1/2 Plate', items: ['Vegetables', 'Leafy greens'] },
                { label: '1/4 Plate', items: ['Lean protein', 'Fish, chicken'] },
                { label: '1/4 Plate', items: ['Whole grains', 'Brown rice, oats'] },
                { label: 'Add-ons', items: ['Light olive oil', 'Herbs & spices'] }
            ],
            proteinOptions: [
                'Skinless chicken breast',
                'White fish (cod, tilapia)',
                'Turkey',
                'Lean ground turkey (99%)',
                'Egg whites',
                'Non-fat Greek yogurt',
                'Protein powder (low-cal)'
            ],
            snacks: [
                'Vegetable + hummus',
                'Protein shake',
                'Air-popped popcorn',
                'Hard-boiled eggs (whites)',
                'Unsweetened Greek yogurt'
            ],
            timing: {
                'Pre-workout': 'Banana alone or coffee 30 min before',
                'Post-workout': 'Protein + modest carbs within 1-2 hours'
            }
        }
    };

    selector.forEach(btn => {
        btn.addEventListener('click', () => {
            const goal = btn.dataset.goal;

            // Update button states
            selector.forEach(b => b.setAttribute('aria-pressed', 'false'));
            btn.setAttribute('aria-pressed', 'true');

            // Display diet guide
            const tips = dietTips[goal];
            displayDietGuide(tips);
            resultDiv.style.display = 'block';
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });
}

function displayDietGuide(tips) {
    const resultTitle = document.getElementById('diet-goal-title');
    const resultContent = document.getElementById('diet-content');
    resultTitle.textContent = tips.title;

    let html = `
        <h4>${tips.template}</h4>
        <div class="diet-content">
    `;

    tips.mealItems.forEach(item => {
        html += `
            <div class="diet-card">
                <h4>${item.label}</h4>
                <ul>
                    ${item.items.map(food => `<li>${food}</li>`).join('')}
                </ul>
            </div>
        `;
    });

    html += `</div>`;

    html += `
        <h4 style="margin-top: var(--space-xl);">Easy Protein Options</h4>
        <div class="diet-content">
            <div class="diet-card">
                <ul>
                    ${tips.proteinOptions.map(protein => `<li>${protein}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    html += `
        <h4 style="margin-top: var(--space-xl);">Quick Snack Ideas</h4>
        <div class="diet-content">
            <div class="diet-card">
                <ul>
                    ${tips.snacks.map(snack => `<li>${snack}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    html += `
        <h4 style="margin-top: var(--space-xl);">Pre/Post-Workout Timing</h4>
        <div class="diet-content">
    `;

    Object.entries(tips.timing).forEach(([time, advice]) => {
        html += `
            <div class="diet-card">
                <strong>${time}</strong>
                <p style="margin-bottom: 0; margin-top: var(--space-sm);">${advice}</p>
            </div>
        `;
    });

    html += `</div>`;

    resultContent.innerHTML = html;
}

// ==================== FAQ ACCORDION ==================== 
function initFAQ() {
    const faqData = [
        {
            category: 'Workouts',
            items: [
                {
                    q: 'How many days per week should I train?',
                    a: 'For beginners: 2-3 days per week. For intermediate: 3-5 days per week. Rest days are crucial for recovery and muscle growth.'
                },
                {
                    q: 'What\'s the best time to train?',
                    a: 'The best time is when you\'re most consistent. Aim for the same time daily. Morning can boost metabolism, but afternoon/evening may allow heavier lifts.'
                },
                {
                    q: 'How long should my workouts be?',
                    a: 'Aim for 45-90 minutes including warm-up and cool-down. Beginners should start with 45-60 min, focus on form over volume.'
                },
                {
                    q: 'Should I do cardio on lifting days?',
                    a: 'Light cardio (15-20 min post-lift) is fine. Heavy cardio can interfere with recovery. Separate heavy cardio and lifting if possible.'
                }
            ]
        },
        {
            category: 'Nutrition',
            items: [
                {
                    q: 'How much water should I drink?',
                    a: 'Use the "35ml per kg" guideline. Also drink more on hot days or during intense workouts. Urine color is a good indicator (pale = hydrated).'
                },
                {
                    q: 'Can I skip warm-ups?',
                    a: 'No. Warm-ups prepare muscles, joints, and CNS for lifting. They reduce injury risk and improve performance. Always warm up.'
                },
                {
                    q: 'How important is meal timing?',
                    a: 'Post-workout nutrition (within 1-2 hours) matters most. Protein + carbs help recovery. Other meals can be flexible based on daily total calories.'
                },
                {
                    q: 'Should I take supplements?',
                    a: 'Food first. Creatine and whey protein are effective. Multivitamins if deficient. Avoid magic pills—consistency beats supplements.'
                }
            ]
        },
        {
            category: 'Recovery & Sleep',
            items: [
                {
                    q: 'How much sleep do I need?',
                    a: 'Aim for 7-9 hours per night. Sleep is when muscles repair and hormones regulate. Poor sleep kills progress.'
                },
                {
                    q: 'What\'s DOMS and should I worry?',
                    a: 'DOMS (Delayed Onset Muscle Soreness) peaks 48-72 hours after intense training. It\'s normal but not always an indicator of a good workout.'
                },
                {
                    q: 'How do I prevent injuries?',
                    a: 'Warm up, use proper form, progress gradually, and listen to your body. Start light, build volume over weeks/months, not days.'
                }
            ]
        }
    ];

    const accordion = document.querySelector('.faq-accordion');
    accordion.innerHTML = '';

    faqData.forEach((category, catIdx) => {
        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category.category;
        categoryTitle.style.marginTop = catIdx > 0 ? 'var(--space-2xl)' : '0';
        accordion.appendChild(categoryTitle);

        category.items.forEach((item, itemIdx) => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';

            const trigger = document.createElement('button');
            trigger.className = 'faq-trigger';
            trigger.setAttribute('aria-expanded', 'false');
            trigger.innerHTML = `
                <span>${item.q}</span>
                <span class="faq-icon">▼</span>
            `;

            const content = document.createElement('div');
            content.className = 'faq-content';
            content.innerHTML = `<div class="faq-text">${item.a}</div>`;
            content.setAttribute('hidden', '');

            trigger.addEventListener('click', (e) => {
                const isOpen = trigger.getAttribute('aria-expanded') === 'true';
                trigger.setAttribute('aria-expanded', !isOpen);
                content.toggleAttribute('hidden');
                content.classList.toggle('open');
            });

            // Keyboard navigation
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    trigger.click();
                }
            });

            faqItem.appendChild(trigger);
            faqItem.appendChild(content);
            accordion.appendChild(faqItem);
        });
    });
}

// ==================== UTILITIES ====================
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `${type}-message`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.maxWidth = '300px';
    notification.style.animation = 'slideIn 0.3s ease';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initWorkoutBuilder();
    initCalorieCalculator();
    initWeeklySplit();
    initDietGoals();
    initFAQ();

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    console.log('🏋️ GymBuddy HQ initialized successfully!');
});

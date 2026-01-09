/**
 * ==================== COACH CHAT ASSISTANT ====================
 * Placeholder chat UI for the "Ask the Coach" feature.
 * This file includes the chat drawer UI and dummy responses.
 * 
 * INTEGRATION POINT FOR EXTERNAL CHATBOT:
 * To connect an external chatbot (n8n, Flowise, or custom API):
 * 1. Replace the getDummyResponse() function with an API call
 * 2. Example webhook URL: https://your-n8n-instance.com/webhook/gymbuddy
 * 3. Send: { message: userMessage, userId: (optional) }
 * 4. Parse response and display in coach drawer
 * 
 * See the sendMessageToCoach() function for where to add API integration.
 */

const CoachChat = {
    /**
     * Dummy responses for demo purposes
     * Replace this with API calls to external chatbot service
     */
    dummyResponses: [
        {
            keywords: ['workout', 'exercise', 'training'],
            responses: [
                "Great question! Start with compound lifts (squats, deadlifts, presses) for maximum gains. Aim for 3-4 sets of 6-12 reps depending on your goal.",
                "The key to consistent progress is progressive overload. Add weight, reps, or sets each week. Even small increases matter!",
                "Form > Weight. Always. A perfect rep with lighter weight beats a sloppy rep with heavy weight. Slow down and control the movement.",
                "Remember: train hard, eat right, sleep well, and be patient. Muscle building takes time. Trust the process! 💪"
            ]
        },
        {
            keywords: ['calorie', 'nutrition', 'diet', 'food', 'eat'],
            responses: [
                "Your daily calories are the foundation. Don't go too extreme—aim for a small deficit (500 cal/day) for fat loss or small surplus for gains.",
                "Protein is your friend! Aim for 0.8-1.1g per lb of body weight. Spread it throughout the day for better muscle protein synthesis.",
                "Track your calories for 2-3 weeks to see what your typical intake is. Then make small adjustments. Consistency beats perfection!",
                "Don't eliminate food groups. Balance whole foods (80%) with some flexibility (20%). Sustainable > Extreme."
            ]
        },
        {
            keywords: ['split', 'routine', 'program', 'plan'],
            responses: [
                "A good split depends on your frequency. 3x/week? Full body. 4x/week? Upper/Lower. 5-6x/week? Push/Pull/Legs. Pick consistency over perfection.",
                "Make sure you're hitting each muscle group 2x per week minimum for optimal growth. Rest days between same muscle groups matter.",
                "New to training? Start with 3 days/week full body. Learn compound lifts. Build a strong foundation before advanced splits.",
                "Don't overthink your split. The best program is the one you'll stick to. Consistency > Optimal programming."
            ]
        },
        {
            keywords: ['recovery', 'sleep', 'rest', 'soreness'],
            responses: [
                "Sleep is where the magic happens! Aim for 7-9 hours. That's when your muscles repair and hormones regulate. Don't skip it!",
                "DOMS (soreness) is normal after new stimulus, but it's not required for progress. Soreness ≠ effective workout.",
                "Active recovery helps: light walking, yoga, or mobility work on off days. Boosts blood flow and reduces soreness.",
                "Listen to your body. Fatigue > Soreness. If you're always sore, dial back volume or increase recovery."
            ]
        },
        {
            keywords: ['beginner', 'start', 'new', 'first'],
            responses: [
                "Welcome! Start with basics: compound lifts (squat, bench, deadlift, rows), proper form, and consistency. Master these first!",
                "Don't compare yourself to advanced lifters. Everyone starts at day 1. Focus on YOUR progress. Celebrate small wins!",
                "First 3-6 months: build habit and learn technique. Expect fast progress. Keep a log to track lifts and stay motivated.",
                "Your main goal now: show up consistently and move well. Everything else follows from that."
            ]
        },
        {
            keywords: ['goal', 'fat loss', 'weight loss', 'cut'],
            responses: [
                "Fat loss = Consistent calorie deficit over weeks. Aim for 0.5-1% body weight loss per week (sustainable).",
                "Don't cut calories too low. You need energy to train hard. A moderate deficit (500 cal/day) + training = best results.",
                "Maintain high protein during a cut to preserve muscle. Strength training is essential—don't just do cardio!",
                "Fat loss isn't linear. Scale fluctuates. Track weekly averages instead. Take progress photos—they're honest!"
            ]
        },
        {
            keywords: ['muscle', 'gain', 'bulk', 'mass'],
            responses: [
                "Muscle gain = slight calorie surplus + heavy lifting + protein. A small surplus (300-500 cal/day) minimizes fat gain.",
                "Lift heavy, progressively overload, eat enough protein. If you're not gaining weight over 2-3 weeks, eat more.",
                "Expect 0.5-1 lb weight gain per week on a bulk. Some fat gain is normal—don't stress about clean eating obsession.",
                "Patience. Building muscle takes time. 1-2 lbs of lean muscle per month is great progress. Stay consistent!"
            ]
        },
        {
            keywords: ['strength', 'strong', 'power'],
            responses: [
                "Strength comes from progressive overload + adequate rest. Aim for 3-6 reps per set with challenging weight.",
                "Compound lifts are king for strength. Squat, bench, deadlift, rows. Master these and everything else follows.",
                "Don't skip warm-ups or cool-downs. Your CNS needs preparation. 2-3 min rest between heavy sets ensures best performance.",
                "Track your lifts! Write down weights and reps. Aim to increase slightly each week. Small progress = big results over time."
            ]
        },
        {
            keywords: ['equipment', 'gym', 'home', 'dumbbell', 'bodyweight'],
            responses: [
                "You can build serious muscle with minimal equipment! Dumbbells, a pull-up bar, and a bench are enough. Bodyweight works too.",
                "Limited equipment? Focus on density (more reps/sets). Quality execution matters more than fancy machines.",
                "Adjust exercises based on what you have. Dumbbell variations exist for almost every compound lift. Be creative!",
                "A full gym is nice, but consistency with limited equipment > fancy gym with no consistency."
            ]
        }
    ],

    /**
     * Get a dummy response based on keywords
     */
    getDummyResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (let group of this.dummyResponses) {
            if (group.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return group.responses[Math.floor(Math.random() * group.responses.length)];
            }
        }
        
        // Default response if no keywords match
        return "Great question! For more detailed guidance, feel free to ask about specific workouts, nutrition, recovery, or your current goals. I'm here to help! 💪";
    }
};

// ==================== CHAT UI INITIALIZATION ====================
function initCoachChat() {
    const coachBtn = document.getElementById('coach-btn');
    const coachDrawer = document.getElementById('coach-drawer');
    const coachClose = document.getElementById('coach-close');
    const coachInput = document.getElementById('coach-input');
    const coachSend = document.getElementById('coach-send');
    const coachMessages = document.getElementById('coach-messages');

    // Open drawer
    coachBtn.addEventListener('click', () => {
        coachDrawer.setAttribute('aria-hidden', 'false');
        coachInput.focus();
    });

    // Close drawer
    coachClose.addEventListener('click', () => {
        coachDrawer.setAttribute('aria-hidden', 'true');
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            coachDrawer.setAttribute('aria-hidden', 'true');
        }
    });

    // Send message
    coachSend.addEventListener('click', sendMessage);
    coachInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = coachInput.value.trim();
        if (!message) return;

        // Display user message
        addMessage(message, 'user');
        coachInput.value = '';

        // Simulate typing delay and get response
        setTimeout(() => {
            const response = CoachChat.getDummyResponse(message);
            addMessage(response, 'bot');
        }, 500 + Math.random() * 500); // 500-1000ms delay for realism
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `coach-message ${sender}`;
        messageDiv.innerHTML = `<div class="message-bubble">${escapeHtml(text)}</div>`;
        coachMessages.appendChild(messageDiv);

        // Auto-scroll to bottom
        coachMessages.scrollTop = coachMessages.scrollHeight;
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * ==================== WEBHOOK INTEGRATION TEMPLATE ====================
 * 
 * When ready to connect external chatbot, replace the CoachChat.getDummyResponse()
 * function call in sendMessage() with this pattern:
 * 
 * async function sendMessageToCoach(userMessage) {
 *     try {
 *         const response = await fetch('https://your-webhook-url.com/chat', {
 *             method: 'POST',
 *             headers: {
 *                 'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *                 message: userMessage,
 *                 userId: getUserId(), // optional: track user sessions
 *                 context: {
 *                     goal: getUserGoal(),
 *                     level: getUserLevel()
 *                 }
 *             })
 *         });
 * 
 *         if (!response.ok) throw new Error('API request failed');
 *         const data = await response.json();
 *         return data.reply || "Sorry, I couldn't understand that. Try again!";
 * 
 *     } catch (error) {
 *         console.error('Coach error:', error);
 *         return "My apologies! I'm having trouble connecting. Try again in a moment.";
 *     }
 * }
 * 
 * WEBHOOK PROVIDERS:
 * - n8n: https://n8n.io/ (Self-hosted or cloud)
 * - Flowise: https://flowiseai.com/ (No-code LLM workflows)
 * - Custom Node.js/Python backend
 * - Existing chatbot APIs (Firebase, AWS Lex, Azure Bot Service)
 * 
 * n8n EXAMPLE WORKFLOW:
 * 1. Create HTTP webhook trigger (POST)
 * 2. Parse incoming JSON
 * 3. Connect to OpenAI, Anthropic, or local LLM
 * 4. Return formatted response
 * 5. Test with: curl -X POST http://localhost:5678/webhook/gymbuddy -H "Content-Type: application/json" -d '{"message":"How do I squat?"}'
 */

// Initialize chat when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCoachChat();
    console.log('🤖 Coach chat initialized. Ready to help!');
});

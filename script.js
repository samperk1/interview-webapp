// Interview questions
const aiAgentQuestions = [
    { id: 1, text: "What's your current job or role?", followUp: "What tasks take up most of your time in this role?" },
    { id: 2, text: "What are your biggest pain points or frustrations at work?", followUp: "Which of these tasks do you find most repetitive or time-consuming?" },
    { id: 3, text: "What goals are you trying to achieve professionally or personally?", followUp: "What's preventing you from reaching these goals more quickly?" },
    { id: 4, text: "How comfortable are you with using technology to automate tasks?", followUp: "Have you used any AI tools or automation before?" },
    { id: 5, text: "What would your ideal workday look like if you had more free time?", followUp: "What would you do with that extra time?" }
];

const mentalHealthQuestions = [
    { id: 1, text: "How have you been feeling emotionally lately?", followUp: "What emotions have been most prevalent for you recently?" },
    { id: 2, text: "What stressors or challenges are you currently facing in your life?", followUp: "Which of these stressors feels most overwhelming or difficult to manage?" },
    { id: 3, text: "What coping strategies or self-care practices do you currently use?", followUp: "Which of these strategies work best for you, and which feel less effective?" },
    { id: 4, text: "How is your sleep, appetite, and energy levels?", followUp: "Have you noticed any changes in these areas that concern you?" },
    { id: 5, text: "What kind of support or resources would be most helpful for you right now?", followUp: "What would make it easier for you to access the help you need?" }
];

let currentQuestionIndex = 0;
let userAnswers = {};
let currentMode = 'ai-agent';

function showMenu() {
    document.getElementById('menu-screen').style.display = 'block';
    document.getElementById('interview-screen').style.display = 'none';
}

function showInterview() {
    document.getElementById('menu-screen').style.display = 'none';
    document.getElementById('interview-screen').style.display = 'block';
}

function addBotMessage(text) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addUserMessage(text) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function askQuestion(index) {
    const questionsArray = currentMode === 'ai-agent' ? aiAgentQuestions : mentalHealthQuestions;
    const answerForm = document.getElementById('answer-form');
    const userInput = document.getElementById('user-input');
    
    if (index < questionsArray.length) {
        const questionObj = questionsArray[index];
        addBotMessage(questionObj.text);
        
        answerForm.onsubmit = function(e) {
            e.preventDefault();
            const answer = userInput.value.trim();
            if (answer) {
                addUserMessage(answer);
                userAnswers[`q${index}`] = answer;
                userInput.value = '';
                
                setTimeout(function() {
                    addBotMessage(questionObj.followUp);
                }, 500);
                
                answerForm.onsubmit = function(e2) {
                    e2.preventDefault();
                    const followUpAnswer = userInput.value.trim();
                    if (followUpAnswer) {
                        addUserMessage(followUpAnswer);
                        userAnswers[`q${index}_followup`] = followUpAnswer;
                        userInput.value = '';
                        currentQuestionIndex++;
                        setTimeout(function() {
                            askQuestion(currentQuestionIndex);
                        }, 1000);
                    }
                };
            }
        };
    } else {
        setTimeout(function() {
            generateSuggestions();
        }, 1000);
    }
}

function generateSuggestions() {
    if (currentMode === 'ai-agent') {
        generateAIAgentSuggestions();
    } else {
        generateMentalHealthSuggestions();
    }
}

function generateAIAgentSuggestions() {
    addBotMessage("Thank you for sharing! Based on your responses, here are some ways an AI agent could benefit you:");
    const answerForm = document.getElementById('answer-form');
    const suggestionsDiv = document.getElementById('suggestions');
    answerForm.classList.add('hidden');
    suggestionsDiv.classList.remove('hidden');
    suggestionsDiv.innerHTML = '<h2>Suggested AI Agent Uses</h2><ul id="suggestions-list"></ul>';
    
    const suggestionsList = document.getElementById('suggestions-list');
    const suggestedUses = [
        { title: "Automate Repetitive Tasks", description: "Based on your mention of repetitive work, an AI agent could handle routine tasks like data entry, scheduling, or email sorting." },
        { title: "Information Research & Synthesis", description: "An AI agent could gather information from multiple sources, summarize reports, and keep you updated on industry trends." },
        { title: "Communication Assistance", description: "Help drafting emails, preparing meeting agendas, or even handling initial customer inquiries." },
        { title: "Personal Productivity Coach", description: "An AI agent could help prioritize your tasks, remind you of deadlines, and suggest optimal times for different types of work." },
        { title: "Learning & Skill Development", description: "Curate personalized learning resources, explain complex concepts, and help you practice new skills." }
    ];
    
    suggestedUses.forEach(function(use) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>' + use.title + '</strong>: ' + use.description;
        suggestionsList.appendChild(li);
    });
    
    const finalMessage = document.createElement('p');
    finalMessage.style.textAlign = 'center';
    finalMessage.style.marginTop = '20px';
    finalMessage.style.fontStyle = 'italic';
    finalMessage.textContent = "These are just starting points - an AI agent can be customized to fit your specific needs!";
    suggestionsDiv.appendChild(finalMessage);
}

function generateMentalHealthSuggestions() {
    addBotMessage("Thank you for sharing! Based on your responses, here are some ways support could help you:");
    const answerForm = document.getElementById('answer-form');
    const suggestionsDiv = document.getElementById('suggestions');
    answerForm.classList.add('hidden');
    suggestionsDiv.classList.remove('hidden');
    suggestionsDiv.innerHTML = '<h2>Suggested Support Strategies</h2><ul id="suggestions-list"></ul>';
    
    const suggestionsList = document.getElementById('suggestions-list');
    const suggestedSupports = [
        { title: "Mindfulness & Relaxation Guidance", description: "Based on your emotional state, guided mindfulness exercises or relaxation techniques could help manage stress and anxiety." },
        { title: "Coping Strategy Development", description: "Working on developing personalized coping strategies for the specific stressors you've mentioned could build resilience." },
        { title: "Emotional Tracking & Pattern Recognition", description: "Tracking your emotions, sleep, and energy levels could help identify patterns and triggers for better self-awareness." },
        { title: "Resource Connection & Referral Assistance", description: "Help finding appropriate mental health resources, support groups, or professional services that match your needs and preferences." },
        { title: "Self-Care Routine Building", description: "Assistance in creating and maintaining consistent self-care routines that address your specific needs for sleep, nutrition, and activity." }
    ];
    
    suggestedSupports.forEach(function(support) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>' + support.title + '</strong>: ' + support.description;
        suggestionsList.appendChild(li);
    });
    
    const finalMessage = document.createElement('p');
    finalMessage.style.textAlign = 'center';
    finalMessage.style.marginTop = '20px';
    finalMessage.style.fontStyle = 'italic';
    finalMessage.textContent = "Remember, these suggestions are meant to support your wellbeing. For serious concerns, please consider reaching out to a mental health professional.";
    suggestionsDiv.appendChild(finalMessage);
}

function startInterview(mode) {
    currentMode = mode;
    currentQuestionIndex = 0;
    userAnswers = {};
    showInterview();
    
    if (mode === 'ai-agent') {
        addBotMessage("Hello! I'm here to help you discover how an AI agent could benefit you. Let's start with a few questions about your work and goals.");
    } else {
        addBotMessage("Hello! I'm here to support you with a mental health check-in. Let's start with a few questions about how you've been feeling.");
    }
    
    setTimeout(function() {
        askQuestion(0);
    }, 1000);
}

// Initialize when page loads
window.onload = function() {
    showMenu();
    
    document.getElementById('ai-agent-btn').onclick = function() {
        startInterview('ai-agent');
    };
    
    document.getElementById('mental-health-btn').onclick = function() {
        startInterview('mental-health');
    };
};
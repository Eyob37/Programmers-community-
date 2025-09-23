let WhichDone = JSON.parse(localStorage.getItem("WhichDone")) || {};

class TechQuiz {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.field = null;
        
        this.initializeElements();
        this.loadQuiz();
    }

    initializeElements() {
        // Get DOM elements
        this.loadingEl = document.getElementById('loading');
        this.noFieldEl = document.getElementById('no-field');
        this.quizContainerEl = document.getElementById('quiz-container');
        this.resultsContainerEl = document.getElementById('results-container');
        
        this.fieldTitleEl = document.getElementById('field-title');
        this.progressInfoEl = document.getElementById('progress-info');
        this.progressBarEl = document.getElementById('progress-bar');
        this.questionTextEl = document.getElementById('question-text');
        this.optionsContainerEl = document.getElementById('options-container');
        this.validationMessageEl = document.getElementById('validation-message');
        
        this.prevBtnEl = document.getElementById('prev-btn');
        this.nextBtnEl = document.getElementById('next-btn');
        this.finishBtnEl = document.getElementById('finish-btn');        
        
        this.finalScoreEl = document.getElementById('final-score');
        this.scoreMessageEl = document.getElementById('score-message');

        // Bind event handlers
        this.prevBtnEl.addEventListener('click', () => this.previousQuestion());
        this.nextBtnEl.addEventListener('click', () => this.nextQuestion());
        this.finishBtnEl.addEventListener('click', () => this.finishQuiz());
        
    }

    async loadQuiz() {
        try {
            // Get field from localStorage
            this.field = localStorage.getItem('field');
            
            if (!this.field) {
                this.showNoField();
                window.location.href = "register.html";
                return;
            }

            // Map field names to file names
            const fieldFiles = {
                'software': './software.js',
                'web': './web.js',
                'mobile': './mobile.js',
                'game': './game.js',
                'database': './database.js',
                'networking': './networking.js',
                'cloud': './cloud.js',
                'devops': './devops.js',
                'support': './support.js',
                'cybersecurity': './cybersecurity.js',
                'datascience': './datascience.js',
                'ai': './ai.js',
                'bi': './bi.js',
                'iot': './iot.js',
                'blockchain': './blockchain.js',
                'arvr': './arvr.js',
                'robotics': './robotics.js'
            };

            // Map field names to display titles
            const fieldTitles = {
                'software': 'Software Development / Programming',
                'web': 'Web Development',
                'mobile': 'Mobile Development',
                'game': 'Game Development',
                'database': 'Database Management',
                'networking': 'Networking',
                'cloud': 'Cloud Computing',
                'devops': 'DevOps / System Administration',
                'support': 'IT Support / Help Desk',
                'cybersecurity': 'Cybersecurity',
                'datascience': 'Data Science / Big Data',
                'ai': 'Artificial Intelligence / Machine Learning',
                'bi': 'Business Intelligence',
                'iot': 'Internet of Things (IoT)',
                'blockchain': 'Blockchain / Web3',
                'arvr': 'AR / VR (Augmented & Virtual Reality)',
                'robotics': 'Robotics & Automation'
            };

            const questionFile = fieldFiles[this.field];
            const fieldTitle = fieldTitles[this.field];

            if (!questionFile) {
                this.showNoField();
                window.location.href = "register.html";
                return;
            }

            // Dynamically import the question file
            const module = await import(questionFile);
            this.questions = module.default;
            
            // Initialize user answers array
            this.userAnswers = new Array(this.questions.length).fill(null);
            
            // Set field title
            this.fieldTitleEl.textContent = fieldTitle;
            
            // Show quiz and hide loading
            this.showQuiz();
            this.displayQuestion();

        } catch (error) {
            console.error('Error loading quiz:', error);
            this.showNoField();
            window.location.href = "register.html";
        }
    }

    showNoField() {
        this.loadingEl.classList.add('hidden');
        this.noFieldEl.classList.remove('hidden');
        this.quizContainerEl.classList.add('hidden');
        this.resultsContainerEl.classList.add('hidden');
    }

    showQuiz() {
        this.loadingEl.classList.add('hidden');
        this.noFieldEl.classList.add('hidden');
        this.quizContainerEl.classList.remove('hidden');
        this.resultsContainerEl.classList.add('hidden');
    }

    showResults() {
        this.loadingEl.classList.add('hidden');
        this.noFieldEl.classList.add('hidden');
        this.quizContainerEl.classList.add('hidden');
        this.resultsContainerEl.classList.remove('hidden');
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update progress
        this.updateProgress();
        
        // Display question text
        this.questionTextEl.textContent = question.question;
        
        // Clear previous options
        this.optionsContainerEl.innerHTML = '';
        
        // Create options
        const options = ['a', 'b', 'c', 'd'];
        options.forEach(optionKey => {
            if (question[optionKey]) {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200 cursor-pointer';
                
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'answer';
                input.value = optionKey;
                input.id = `option-${optionKey}`;
                input.className = 'w-4 h-4 text-blue-600 mr-4';
                
                // Check if this was previously selected
                if (this.userAnswers[this.currentQuestionIndex] === optionKey) {
                    input.checked = true;
                    optionDiv.classList.add('border-blue-500', 'bg-blue-50');
                }
                
                const label = document.createElement('label');
                label.htmlFor = `option-${optionKey}`;
                label.className = 'flex-1 cursor-pointer text-gray-700';
                label.textContent = question[optionKey];
                
                optionDiv.appendChild(input);
                optionDiv.appendChild(label);
                
                // Add click handler for the entire div
                optionDiv.addEventListener('click', () => {
                    input.checked = true;
                    this.handleAnswerSelection(optionKey);
                });
                
                this.optionsContainerEl.appendChild(optionDiv);
            }
        });
        
        // Update navigation buttons
        this.updateNavigation();
        
        // Hide validation message
        this.validationMessageEl.classList.add('hidden');
    }

    handleAnswerSelection(selectedOption) {
        // Store the answer
        this.userAnswers[this.currentQuestionIndex] = selectedOption;
        
        // Update visual feedback
        const optionDivs = this.optionsContainerEl.querySelectorAll('div');
        optionDivs.forEach(div => {
            div.classList.remove('border-blue-500', 'bg-blue-50');
            div.classList.add('border-gray-200');
        });
        
        // Highlight selected option
        const selectedDiv = this.optionsContainerEl.querySelector(`input[value="${selectedOption}"]`).parentNode;
        selectedDiv.classList.add('border-blue-500', 'bg-blue-50');
        selectedDiv.classList.remove('border-gray-200');
    }

    updateProgress() {
        const currentNum = this.currentQuestionIndex + 1;
        const total = this.questions.length;
        const percentage = (currentNum / total) * 100;
        
        this.progressInfoEl.textContent = `Question ${currentNum} of ${total}`;
        this.progressBarEl.style.width = `${percentage}%`;
    }

    updateNavigation() {
        // Previous button
        this.prevBtnEl.disabled = this.currentQuestionIndex === 0;
        
        // Next/Finish button
        const isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;
        
        if (isLastQuestion) {
            this.nextBtnEl.classList.add('hidden');
            this.finishBtnEl.classList.remove('hidden');
        } else {
            this.nextBtnEl.classList.remove('hidden');
            this.finishBtnEl.classList.add('hidden');
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    nextQuestion() {
        // Validate that an answer is selected
        if (!this.userAnswers[this.currentQuestionIndex]) {
            this.validationMessageEl.classList.remove('hidden');
            return;
        }
        
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }
    }

    finishQuiz() {
        // Validate that an answer is selected for the last question
        if (!this.userAnswers[this.currentQuestionIndex]) {
            this.validationMessageEl.classList.remove('hidden');
            return;
        }
        
        
            WhichDone[this.field] = true;
            localStorage.setItem("WhichDone", JSON.stringify(WhichDone));
        
        
        // Calculate score
        this.calculateScore();
        
        // Save score to localStorage
        this.saveScore();
        
        // Show results
        this.displayResults();
        setTimeout(()=>{
            window.location.href = "../manage Question.html";
        }, 1000);
    }

    calculateScore() {
        this.score = 0;
        for (let i = 0; i < this.questions.length; i++) {
            if (this.userAnswers[i] === this.questions[i].answer) {
                this.score++;
            }
        }
    }

    saveScore() {
        const scoreData = {
            field: this.field,
            score: this.score,
            totalQuestions: this.questions.length,
            percentage: Math.round((this.score / this.questions.length) * 100),
            date: new Date().toISOString()
        };
        
        // Save individual score
        localStorage.setItem(`score`, JSON.stringify(scoreData));        
        
        // Save to scores history
        let scoresHistory = JSON.parse(localStorage.getItem('quiz_scores_history') || '[]');
        scoresHistory.push(scoreData);
        localStorage.setItem('quiz_scores_history', JSON.stringify(scoresHistory));
    }

    displayResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        this.finalScoreEl.textContent = `${this.score}/${this.questions.length}`;
        
        let message = '';
        if (percentage >= 90) {
            message = 'Excellent! You have outstanding knowledge in this field.';
        } else if (percentage >= 70) {
            message = 'Great job! You have solid understanding of this topic.';
        } else if (percentage >= 50) {
            message = 'Good effort! Consider reviewing some concepts to improve further.';
        } else {
            message = 'Keep learning! This field has many interesting concepts to explore.';
        }
        
        this.scoreMessageEl.textContent = `${message} Your score has been saved.`;
        
        this.showResults();
    }

    restartQuiz() {
        // Clear field selection to allow choosing a new field
        localStorage.removeItem('field');
        
        // Reset quiz state
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.questions = [];
        
        // Reload the page or redirect to field selection
        window.location.href = "register.html";
    }
}

// Initialize the quiz when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TechQuiz();
});

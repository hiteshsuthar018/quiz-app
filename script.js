document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-btn');
    const resultDiv = document.getElementById('result');

    fetch('http://localhost:3000/api/v1/quiz')
        .then(response => response.json())
        .then(data => {
            data.questions.forEach((question, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question');
                questionDiv.innerHTML = `
            <p>${index + 1}. ${question.question}</p>
            <ul class="options">
              ${question.options.map(option => `<li><input type="radio" name="question${index}" value="${option}">${option}</li>`).join('')}
            </ul>
          `;
                quizContainer.appendChild(questionDiv);
            });
        })
        .catch(error => console.error('Error fetching questions:', error));

    submitButton.addEventListener('click', () => {
        console.log('Submit button clicked'); // Check if this message appears in the console
        const answers = [];
        const questions = document.querySelectorAll('.question');
        questions.forEach((question, index) => {
            const selectedOption = question.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) {
                answers.push(selectedOption.value);
            } else {
                answers.push(null);
            }
        });

        console.log('Answers:', answers); // Check if answers are logged correctly

        fetch('http://localhost:3000/api/v1/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answers })
        })
            .then(response => {
                console.log('Response from server:', response);
                return response.json();
            })
            .then(data => {
                displayResult(data.score, data.results , data.feedback);
            })
            .catch(error => console.error('Error submitting answers:', error));
    });

    function displayResult(score, results, feedback) {
        let resultHTML = '';
        results.forEach((result, index) => {
          let questionNumber = index + 1;
          let statusClass = result.correct ? 'correct-answer' : 'incorrect-answer';
          let statusIcon = result.correct ? '✔' : '❌';
          resultHTML += `
            <div class="question-section">
              <p class="question-number">Question ${questionNumber}</p>
              <div class="answer-details ${statusClass}">
                <p>${statusIcon} ${result.correct ? 'Correct' : 'Incorrect'}</p>
                <p>Your Answer: ${result.userAnswer}</p>
                <p>Correct Answer: ${result.correctAnswer}</p>
              </div>
            </div>
          `;
        });
        
        resultDiv.innerHTML = `
          <div class="result-container">
            <div class="score-section">
              <p class="score-label">Your Score:</p>
              <p class="score">${score}</p>
              <p class="feedback">${feedback}</p>
            </div>
            ${resultHTML}
          </div>
        `;
      }
      
});

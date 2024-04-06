import questions from "../data/question.js"

const getquestions = async (req, res) => {
    try {
        const question = await questions();
        if (!question) {
            throw new Error("No questions found");
        }
        res.json(question);
    } catch (error) {
        res.status(500).send(error || "Internal Server Error: Unable to fetch questions");
    }
};

const submitAnswer = async (req, res) => {
    try {
        const userAnswers = req.body.answers;
        const results = [];
        let score = 0;

        // Fetching questions from the database or file
        const question = await questions();

        // Check if the number of user answers matches the number of questions
        if (userAnswers.length !== question.questions.length) {
            return res.status(400).json({ error: 'Number of answers does not match the number of questions' });
        }

        // Iterate over each question and compare user's answer with correct answer
        question.questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const correctAnswer = question?.answer;
            const result = {
                question: question.question,
                userAnswer,
                correctAnswer,
                correct: userAnswer === correctAnswer
            };

            // Increment score if answer is correct
            if (result.correct) {
                score++;
            }
            
            // Pushing result to the array
            results.push(result);
        });

        // Providing feedback message based on the score
        let feedback = '';
        if (score === 10) {
            feedback = 'You are doing well! Keep it up!';
        } else if (score >= 6) {
            feedback = 'Keep improving!';
        } else {
            feedback = 'You can do better!';
        }

        // Sending response with score, results, and feedback
        res.status(200).json({ score, results, feedback });
    } catch (error) {
        // Handlling any errors that occur during the process
        console.error('Error submitting answers:', error);
        res.status(500).json({ error: 'Internal Server Error: Unable to submit answers' });
    }
};

export { getquestions ,submitAnswer }
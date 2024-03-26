       const form = document.getElementById('surveyForm');
        const finalStudentsEl = document.querySelector('.finalStudents');

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(form);    
            const surveyData = {};
            for (const [key, value] of formData.entries()) {
                surveyData[key] = value;
            }

            // Save survey data to LocalStorage
            const previousSurveys = JSON.parse(localStorage.getItem('surveys')) || [];
            previousSurveys.push(surveyData);
            localStorage.setItem('surveys', JSON.stringify(previousSurveys));
                        


            alert('Опитування відправлено!');
            form.reset();

            function filterResults(){
                const filteredSurveys = previousSurveys
                .filter(survey => survey.faculty === "Факультет Електроніки")
                .filter(survey => survey.averageGrade >= 70)
                .filter(survey => survey.interviewTime == '2024-03-20')

                let div = document.createElement('div');

                finalStudentsEl.append(filteredSurveys)
                console.log(filteredSurveys)

                finalStudentsEl.innerHTML = '';

                filteredSurveys.forEach(survey => {

                const paragraph = document.createElement('p');

                const { faculty, stream, interviewTime, averageGrade } = survey;
                paragraph.textContent = `
                        Факультет: ${faculty},
                        Потік: ${stream},
                        Час співбесіди: ${interviewTime},
                        Середній бал: ${averageGrade}
                    `;
                finalStudentsEl.appendChild(paragraph);
                });
            }

            filterResults();
        });
//////////////////////////////////////////////////////////////////////////////////////////
const testData = {
    testName: "Тест з WEB дизайну",
    questions: [
        {
            question: "Яка найвища гора у світі?",
            answers: [
                { answer: 'Еверест', isCorrect: true },
                { answer: "Кіліманджаро", isCorrect: false },
                { answer: "Аконкагуа", isCorrect: false },
                { answer: "Деналі", isCorrect: false }
            ]
        },
        {
            question: "Яка книга написана Вільямом Шекспіром?",
            answers: [
                { answer: "Гамлет", isCorrect: true },
                { answer: "Місто Гріхів", isCorrect: false },
                { answer: "Аліса в країні чудес", isCorrect: false },
                { answer: "Макова війна", isCorrect: false }
            ]
        },
        {
            question: "Як називається планета, що є третьою від Сонця?",
            answers: [
                { answer: "Земля", isCorrect: true },
                { answer: "Венера", isCorrect: false },
                { answer: "Юпітер", isCorrect: false },
                { answer: "Марс", isCorrect: false }
            ]
        },
        {
            question: "Хто написав картину Мона Ліза?",
            answers: [
                { answer: "Ван Гог", isCorrect: false },
                { answer: "Леонардо да Вінчі", isCorrect: true },
                { answer: "Клод Моне", isCorrect: false },
                { answer: "Пабло Пікассо", isCorrect: false }
            ]
        },
        {
            question: "Яка країна виграла Чемпіонат світу з футболу 2022 року?",
            answers: [
                { answer: "Німеччина", isCorrect: false },
                { answer: "Бразилія", isCorrect: false },
                { answer: "Аргентина", isCorrect: true },
                { answer: "Франція", isCorrect: false }
            ]
        }
    ]
};

// Збереження даних у JSON файл
const jsonData = JSON.stringify(testData);
console.log(jsonData);

// js код для відображення тесту та перевірки відповідей
const testContainer = document.getElementById('testContainer');
const submitBtn = document.getElementById('submitBtn');
const resultDiv = document.getElementById('result');

function renderTest(questions) {
    questions.forEach((question, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${index + 1}. ${question.question}</p>
            <ul>
                ${question.answers.map(answer => `<li><input type="radio" name="question${index}" value="${answer.isCorrect}">${answer.answer}</li>`).join('')}
            </ul>
        `;
        testContainer.appendChild(div);
    });
}

function checkAnswers() {
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    let score = 0;
    answers.forEach(answer => {
        if (answer.value === "true") {
            score++;
        }
    });
    resultDiv.textContent = `Ви відповіли правильно на ${score} з ${testData.questions.length} питань.`;
}

renderTest(testData.questions);
submitBtn.addEventListener('click', checkAnswers);

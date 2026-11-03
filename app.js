// Expanded compound database with markers for analysis
        

        // --- Global variables and application state ---
        let selectedCategories = [];
        let selectedDifficulties = [];
        let currentQuestion = null;
        let quizCompounds = [];
        let score = 0;
        let totalQuestions = 0;
        let streak = 0;
        let level = 1;
        let answeredQuestions = [];
        let quizMode = 'formulaToName';
        let errorTracker = {};

        let flashcardDeck = [];
        let flashcardIndex = 0;

        const tagTranslations = {
            cation: 'Cations', anion: 'Anions', salt: 'Salts', acid: 'Acids', base: 'Bases', oxide: 'Oxides',
            facil: 'Easy', medio: 'Medium', dificil: 'Hard',
            carga_variavel: 'Cations with Variable Charge', transicao: 'Transition Metals',
            oxianion: 'Oxyanions', hidracido: 'Hydracids', oxiacido: 'Oxyacids',
            ferro: 'Iron Compounds', cobre: 'Copper Compounds',
            forte: 'Strong Compounds', fraca: 'Weak Compounds', fraco: 'Weak Compounds',
            anfotero: 'Amphoteric Compounds',
            haleto: 'Halogen Compounds',
            amonio: 'Ammonium Salts',
            poliatomico: 'Polyatomic Ions',
            hidrogenossal: 'Acid Salts', hidrogenoanion: 'Hydrogen Anions',
            cromo: 'Chromium Compounds', cromato: 'Chromates', dicromato: 'Dichromates',
            fosforo: 'Phosphorus Compounds', fosfato: 'Phosphates',
            estanho: 'Tin Compounds',
            chumbo: 'Lead Compounds',
            arsenio: 'Arsenic Compounds',
            manganes: 'Manganese Compounds',
            carbono: 'Carbon Compounds', carbonato: 'Carbonates',
            boro: 'Boron Compounds', borato: 'Borates',
            vanadio: 'Vanadium Compounds', vanadato: 'Vanadates',
            nitrogenio: 'Nitrogen Compounds', nitrato: 'Nitrates', nitrito: 'Nitrites',
            enxofre: 'Sulfur Compounds', sulfato: 'Sulfates', sulfito: 'Sulfites', sulfeto: 'Sulfides',
            tiossulfato: 'Thiosulfates', tiocianato: 'Thiocyanates', cianato: 'Cyanates',
            alcalino: 'Alkali Metals', alcalino_terroso: 'Alkaline Earth Metals',
            calcogenio: 'Chalcogens', monoatomico: 'Monoatomic Ions',
            metal: 'Metals', ametal: 'Nonmetals',
            acido: 'Acidic Oxides', basico: 'Basic Oxides', neutro: 'Neutral Oxides',
            misto: 'Mixed Compounds', moderado: 'Moderate Strength',
            organico: 'Organic Compounds', peroxido: 'Peroxides',
            post_transicao: 'Post-transition', raro: 'Rare Earths',
            grupo13: 'Group 13', titanio: 'Titanium Compounds', titanato: 'Titanates',
            mercurio: 'Mercury Compounds', niquel: 'Nickel Compounds',
            cobalto: 'Cobalt Compounds', ouro: 'Gold Compounds',
            tungstenio: 'Tungsten Compounds', molibdenio: 'Molybdenum Compounds',
            amonia: 'Ammonia'
        };

        // --- Application functions ---

        function switchTab(tabName, event) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.quiz-container, .rules-section').forEach(section => {
                section.classList.remove('active');
            });
            
            if (event && event.currentTarget) {
                event.currentTarget.classList.add('active');
            } else {
                // If called without an event, find the matching button
                const tabBtn = Array.from(document.querySelectorAll('.tab')).find(btn => btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${tabName}'`));
                if (tabBtn) tabBtn.classList.add('active');
            }

            const sectionId = tabName + '-section';
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
            }

            if (tabName === 'analysis') updateAnalysisDisplay();
            if (tabName === 'flashcards') startFlashcards();
        }

        function toggleCategory(category) {
            const btn = document.querySelector(`[data-category="${category}"]`);
            const allBtn = document.querySelector('[data-category="all"]');

            if (category === 'all') {
                const isSelectingAll = !allBtn.classList.contains('selected');
                document.querySelectorAll('.category-btn').forEach(b => {
                    b.classList.toggle('selected', isSelectingAll);
                });
                allBtn.classList.toggle('all-selected', isSelectingAll);
            } else {
                btn.classList.toggle('selected');
                const allCategories = document.querySelectorAll('.category-btn:not([data-category="all"])');
                const allSelected = Array.from(allCategories).every(b => b.classList.contains('selected'));
                allBtn.classList.toggle('selected', allSelected);
                allBtn.classList.toggle('all-selected', allSelected);
            }
        }

        function startQuiz() {
            selectedCategories = Array.from(document.querySelectorAll('.category-btn.selected:not([data-category="all"])'))
                .map(b => b.dataset.category);

            selectedDifficulties = Array.from(document.querySelectorAll('input[name="difficulty"]:checked'))
                .map(cb => cb.value);

            quizMode = document.querySelector('input[name="quizMode"]:checked').value;

            if (selectedCategories.length === 0) {
                showCustomAlert('Please select at least one category.');
                return;
            }
            if (selectedDifficulties.length === 0) {
                showCustomAlert('Please select at least one difficulty level.');
                return;
            }

            quizCompounds = compounds.filter(c =>
                selectedCategories.includes(c.type) && selectedDifficulties.includes(c.difficulty)
            );

            if (quizCompounds.length < 4) {
                showCustomAlert('There are not enough compounds with the selected filters. Try selecting more categories or difficulties.');
                return;
            }

            score = 0;
            totalQuestions = 0;
            streak = 0;
            level = 1;
            answeredQuestions = [];
            updateStats();

            document.getElementById('category-selector').style.display = 'none';
            document.getElementById('quiz-area').classList.add('active');

            nextQuestion();
        }

        function generateWrongOptions(correctAnswer, currentMode) {
            let wrongOptions = new Set();
            const isFormulaMode = currentMode === 'nameToFormula';
            const correctValue = isFormulaMode ? correctAnswer.formula : correctAnswer.name;
            const propertyToCompare = isFormulaMode ? 'formula' : 'name';

            // Markers that do not indicate the element/family and must be ignored in similarity matching
            const ignoreTags = ['facil', 'medio', 'dificil', 'oxianion', 'monoatomico', 'poliatomico', 'forte', 'fraco', 'moderado', 'basico', 'acido', 'neutro', 'anfotero', 'misto', 'organico', 'hidrogenoanion'];
            const meaningfulTags = (correctAnswer.tags || []).filter(t => !ignoreTags.includes(t));

            // Level 1: Same type AND shares a family tag (e.g. 'halide', 'sulfur')
            let level1 = compounds.filter(c => 
                c.type === correctAnswer.type && 
                c[propertyToCompare] !== correctValue &&
                (c.tags || []).some(t => meaningfulTags.includes(t))
            );

            // Level 2: Same type (but no shared tag)
            let level2 = compounds.filter(c => 
                c.type === correctAnswer.type && 
                c[propertyToCompare] !== correctValue &&
                !level1.includes(c)
            );

            // Level 3: Any other (fallback)
            let level3 = compounds.filter(c => 
                c[propertyToCompare] !== correctValue &&
                !level1.includes(c) && !level2.includes(c)
            );

            function pickRandom(pool, count) {
                let picked = [];
                let tempPool = [...pool];
                while (picked.length < count && tempPool.length > 0) {
                    const randomIndex = Math.floor(Math.random() * tempPool.length);
                    picked.push(tempPool.splice(randomIndex, 1)[0][propertyToCompare]);
                }
                return picked;
            }

            let options = pickRandom(level1, 3);
            if (options.length < 3) {
                options = options.concat(pickRandom(level2, 3 - options.length));
            }
            if (options.length < 3) {
                options = options.concat(pickRandom(level3, 3 - options.length));
            }

            options.forEach(opt => wrongOptions.add(opt));
            return Array.from(wrongOptions);
        }

        function nextQuestion() {
            if (answeredQuestions.length === quizCompounds.length) {
                answeredQuestions = [];
            }

            let availableCompounds = quizCompounds.filter(c => !answeredQuestions.includes(c.formula));
            if (availableCompounds.length === 0) {
                answeredQuestions = [];
                availableCompounds = quizCompounds;
            }

            currentQuestion = availableCompounds[Math.floor(Math.random() * availableCompounds.length)];
            answeredQuestions.push(currentQuestion.formula);

            const questionDisplay = document.getElementById('compound-question');
            const displayDiv = document.getElementById('compound-display');

            let currentMode = quizMode;
            if (quizMode === 'mixed') {
                currentMode = Math.random() < 0.5 ? 'formulaToName' : 'nameToFormula';
            }

            let question, correctAnswer;
            if (currentMode === 'formulaToName') {
                question = currentQuestion.formula;
                correctAnswer = currentQuestion.name;
                displayDiv.classList.remove('name-mode');
            } else {
                question = currentQuestion.name;
                correctAnswer = currentQuestion.formula;
                displayDiv.classList.add('name-mode');
            }

            questionDisplay.innerHTML = question;

            const typeNames = { 'cation': 'Cation', 'anion': 'Anion', 'salt': 'Salt', 'acid': 'Acid', 'base': 'Base', 'oxide': 'Oxide' };
            document.getElementById('type-badge').textContent = typeNames[currentQuestion.type];

            const colors = { 'cation': '#dc3545', 'anion': '#007bff', 'salt': '#17a2b8', 'acid': '#28a745', 'base': '#6f42c1', 'oxide': '#fd7e14' };
            displayDiv.style.background = `linear-gradient(135deg, ${colors[currentQuestion.type]}, #333)`;

            const wrongOptions = generateWrongOptions(currentQuestion, currentMode);
            const allOptions = [correctAnswer, ...wrongOptions];
            allOptions.sort(() => Math.random() - 0.5);

            const optionsDiv = document.getElementById('options');
            optionsDiv.innerHTML = '';

            allOptions.forEach(option => {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'option';
                optionBtn.innerHTML = option;
                optionBtn.onclick = () => checkAnswer(option, optionBtn, currentMode);
                optionsDiv.appendChild(optionBtn);
            });

            document.getElementById('explanation').classList.remove('show');
            document.getElementById('next-btn').classList.remove('show');
        }

        function checkAnswer(selected, element, currentMode) {
            const correctAnswer = currentMode === 'formulaToName' ? currentQuestion.name : currentQuestion.formula;

            document.querySelectorAll('.option').forEach(opt => {
                opt.style.pointerEvents = 'none';
                if (opt.innerHTML === correctAnswer) {
                    opt.classList.add('correct');
                }
            });

            totalQuestions++;
            if (selected === correctAnswer) {
                element.classList.add('correct');
                score++;
                streak++;
            } else {
                element.classList.add('incorrect');
                streak = 0;
                const tagsToTrack = [currentQuestion.type, currentQuestion.difficulty, ...(currentQuestion.tags || [])];
                tagsToTrack.forEach(tag => {
                    errorTracker[tag] = (errorTracker[tag] || 0) + 1;
                });
            }
            updateStats();

            const difficultyTranslations = { 'facil': 'Easy', 'medio': 'Medium', 'dificil': 'Hard' };
            const explanation = document.getElementById('explanation');
            explanation.innerHTML = `
                <h4>${selected === correctAnswer ? '✅ Correct!' : '❌ Incorrect!'}</h4>
                <p><strong>Formula:</strong> ${currentQuestion.formula}</p>
                <p><strong>Name:</strong> <span class="${currentQuestion.type}">${currentQuestion.name}</span>
                    <span class="difficulty-indicator difficulty-${currentQuestion.difficulty}">
                        ${difficultyTranslations[currentQuestion.difficulty]}
                    </span>
                </p>`;
            explanation.classList.add('show');
            document.getElementById('next-btn').classList.add('show');
        }

        function updateStats() {
            document.getElementById('score').textContent = score;
            document.getElementById('total').textContent = totalQuestions;
            const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
            document.getElementById('percentage').textContent = percentage;
            document.getElementById('streak').textContent = streak;
            level = Math.floor(score / 5) + 1;
            document.getElementById('level').textContent = level;
            document.getElementById('progress-fill').style.width = percentage + '%';
        }

        function resetQuiz() {
            document.getElementById('quiz-area').classList.remove('active');
            document.getElementById('category-selector').style.display = 'block';
        }

        function updateAnalysisDisplay() {
            const resultsDiv = document.getElementById('analysis-results');
            const reinforcementBtn = document.getElementById('reinforcement-quiz-btn');
            const errorEntries = Object.entries(errorTracker);

            if (errorEntries.length === 0) {
                resultsDiv.innerHTML = '<p>No errors recorded yet. Keep practicing!</p>';
                reinforcementBtn.style.display = 'none';
                return;
            }

            errorEntries.sort(([, a], [, b]) => b - a);

            let html = '<h4>Your biggest difficulties:</h4><ul>';
            errorEntries.slice(0, 5).forEach(([tag, count]) => {
                const tagName = tagTranslations[tag] || tag;
                html += `<li>${tagName}: ${count} error(s)</li>`;
            });
            html += '</ul>';

            resultsDiv.innerHTML = html;
            reinforcementBtn.style.display = 'inline-block';
        }

        function startReinforcementQuiz() {
            const weakTags = Object.entries(errorTracker)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([tag]) => tag);

            if (weakTags.length === 0) {
                showCustomAlert('There is not enough error data to create a reinforcement quiz.');
                return;
            }

            quizCompounds = compounds.filter(c => {
                const compoundTags = [c.type, c.difficulty, ...(c.tags || [])];
                return compoundTags.some(tag => weakTags.includes(tag));
            });

            if (quizCompounds.length < 4) {
                showCustomAlert('Could not create a reinforcement quiz with enough variety. Keep practicing to generate more data.');
                return;
            }

            switchTab('quiz');
            score = 0;
            totalQuestions = 0;
            streak = 0;
            answeredQuestions = [];
            updateStats();

            document.getElementById('category-selector').style.display = 'none';
            document.getElementById('quiz-area').classList.add('active');

            nextQuestion();
        }

        // --- Additional functions ---
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            const themeToggleBtn = document.querySelector('.theme-toggle');
            if (document.body.classList.contains('dark-mode')) {
                themeToggleBtn.innerHTML = '☀️ Light Mode';
                localStorage.setItem('theme', 'dark-mode');
            } else {
                themeToggleBtn.innerHTML = '🌙 Dark Mode';
                localStorage.setItem('theme', 'light-mode');
            }
        }

        function exportResults() {
            let csvContent = "data:text/csv;charset=utf-8,";
            const errorEntries = Object.entries(errorTracker);
            if (errorEntries.length === 0 && totalQuestions === 0) {
                showCustomAlert("No analysis to export. Play the quiz first!");
                return;
            }

            const percentageVal = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
            csvContent += "General Summary\n";
            csvContent += `Total Score,${score}/${totalQuestions}\n`;
            csvContent += `Correct %,${percentageVal}%\n`;
            csvContent += `Current Streak,${streak}\n\n`;

            csvContent += "Category,Errors\n";
            errorEntries.forEach(([tag, count]) => {
                const tagName = tagTranslations[tag] || tag;
                csvContent += `${tagName},${count}\n`;
            });
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "performance_analysis.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function startFlashcards() {
            flashcardDeck = [...compounds].sort(() => 0.5 - Math.random());
            flashcardIndex = 0;
            updateFlashcard();
        }

        function flipCard() {
            document.getElementById('flashcard').classList.toggle('flipped');
        }

        function nextCard() {
            flashcardIndex = (flashcardIndex + 1) % flashcardDeck.length;
            updateFlashcard(true);
        }

        function previousCard() {
            flashcardIndex = (flashcardIndex - 1 + flashcardDeck.length) % flashcardDeck.length;
            updateFlashcard(true);
        }

        function updateFlashcard(keepFlipped = false) {
            if (flashcardDeck.length === 0) return;
            const card = flashcardDeck[flashcardIndex];
            document.getElementById('flashcard-front').innerHTML = `<div>${card.formula}</div>`;
            document.getElementById('flashcard-back').innerHTML = `<div>${card.name}</div>`;
            document.getElementById('flashcard-counter').textContent = `Card ${flashcardIndex + 1} of ${flashcardDeck.length}`;

            if (!keepFlipped) {
                document.getElementById('flashcard').classList.remove('flipped');
            }
        }

        // --- Custom alert function (replaces the default alert()) ---
        function showCustomAlert(message) {
            // Create the modal elements
            const modalOverlay = document.createElement('div');
            modalOverlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 2000; display: flex; justify-content: center; align-items: center;';

            const modalBox = document.createElement('div');
            const isDarkMode = document.body.classList.contains('dark-mode');
            modalBox.style.cssText = `background: ${isDarkMode ? '#34495e' : 'white'}; color: ${isDarkMode ? '#ecf0f1' : '#333'}; padding: 30px; border-radius: 15px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3); max-width: 90%; width: 400px; animation: slideIn 0.3s ease;`;

            const modalMessage = document.createElement('p');
            modalMessage.textContent = message;
            modalMessage.style.cssText = 'margin: 0 0 20px 0; font-size: 1.1rem; line-height: 1.5;';

            const modalButton = document.createElement('button');
            modalButton.textContent = 'OK';
            modalButton.style.cssText = 'padding: 12px 30px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 25px; cursor: pointer; font-weight: bold; transition: transform 0.2s;';

            modalButton.onmouseover = () => modalButton.style.transform = 'scale(1.05)';
            modalButton.onmouseout = () => modalButton.style.transform = 'scale(1)';

            // Function to close the modal
            const closeModal = () => document.body.removeChild(modalOverlay);
            modalButton.onclick = closeModal;
            modalOverlay.onclick = (e) => { if (e.target === modalOverlay) closeModal(); };

            // Assemble and show the modal
            modalBox.appendChild(modalMessage);
            modalBox.appendChild(modalButton);
            modalOverlay.appendChild(modalBox);
            document.body.appendChild(modalOverlay);
        }


        // --- Initialization ---
        document.addEventListener('DOMContentLoaded', function () {
            const contentArea = document.getElementById('content-area');
            const scrollBtn = document.getElementById('scrollTop');

            contentArea.addEventListener('scroll', function () {
                scrollBtn.classList.toggle('visible', this.scrollTop > 200);
            });

            if (localStorage.getItem('theme') === 'dark-mode') {
                toggleTheme();
            }

            toggleCategory('all');
        });

        function scrollToTop() {
            document.getElementById('content-area').scrollTop = 0;
        }
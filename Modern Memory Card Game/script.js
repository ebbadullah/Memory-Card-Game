        const startScreen = document.getElementById("startScreen");
        const gameContainer = document.getElementById("gameContainer");
        const cardGrid = document.getElementById("cardGrid");
        const movesDisplay = document.getElementById("moves");
        const matchesDisplay = document.getElementById("matches");
        let cards = [];
        let flippedCards = [];
        let moves = 0;
        let matches = 0;

        const icons = [
            "fa-heart", "fa-star", "fa-smile", "fa-moon",
            "fa-sun", "fa-cloud", "fa-bolt", "fa-leaf"
        ];

        const cardIcons = [...icons, ...icons];

        function shuffleCards() {
            cardIcons.sort(() => Math.random() - 0.5);
        }

        function createCards() {
            cardGrid.innerHTML = "";
            cardIcons.forEach((icon, index) => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.dataset.index = index;
                card.innerHTML = `
                    <div class="card-inner">
                        <div class="card-front"></div>
                        <div class="card-back"><i class="fas ${icon}"></i></div>
                    </div>
                `;
                card.addEventListener("click", flipCard);
                cardGrid.appendChild(card);
            });
            cards = document.querySelectorAll(".card");
        }

        function flipCard() {
            if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
                this.classList.add("flipped");
                flippedCards.push(this);

                if (flippedCards.length === 2) {
                    moves++;
                    movesDisplay.textContent = `Moves: ${moves}`;
                    checkMatch();
                }
            }
        }

        function checkMatch() {
            const [card1, card2] = flippedCards;
            const icon1 = card1.querySelector("i").className;
            const icon2 = card2.querySelector("i").className;

            if (icon1 === icon2) {
                matches++;
                matchesDisplay.textContent = `Matches: ${matches}`;
                card1.classList.add("matched");
                card2.classList.add("matched");
                flippedCards = [];

                if (matches === icons.length) {
                    setTimeout(() => alert("Congratulations! You won!"), 500);
                }
            } else {
                setTimeout(() => {
                    card1.classList.remove("flipped");
                    card2.classList.remove("flipped");
                    flippedCards = [];
                }, 1000);
            }
        }

        function resetGame() {
            shuffleCards();
            createCards();
            moves = 0;
            matches = 0;
            movesDisplay.textContent = "Moves: 0";
            matchesDisplay.textContent = "Matches: 0";
        }

        function startGame() {
            startScreen.style.display = "none";
            gameContainer.style.display = "block";
            resetGame();
        }

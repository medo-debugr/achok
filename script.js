// روابط الصور
const uniqueCards = [
    'https://i.postimg.cc/qMkBGqDj/gpt1732802836469.png',
    'https://i.postimg.cc/kGN4gt1t/gpt1732802738661.png',
    'https://i.postimg.cc/kgT2SKnQ/gpt1732802701359.png',
    'https://i.postimg.cc/fRz3kBhW/gpt1732802656444.png',
];

const duplicateCards = Array(28).fill('https://i.postimg.cc/nhT38P84/gpt1732802399621.png');

// دمج الأوراق
const fullDeck = [...uniqueCards, ...duplicateCards];

// اختيار أوراق عشوائية
function shuffleDeck() {
    const selectedUniqueCount = Math.floor(Math.random() * 3) + 1;
    const selectedUnique = uniqueCards.sort(() => 0.5 - Math.random()).slice(0, selectedUniqueCount);
    const remainingCards = duplicateCards.sort(() => 0.5 - Math.random()).slice(0, 8 - selectedUniqueCount);
    return [...selectedUnique, ...remainingCards].sort(() => 0.5 - Math.random());
}

// عرض الأوراق على الشاشة
function displayCards(cards) {
    const deckElement = document.querySelector('.deck');
    deckElement.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.style.backgroundImage = `url(${card})`;
        cardElement.dataset.image = card;
        deckElement.appendChild(cardElement);
    });
}

// إضافة ورقة إلى القائمة
function addToPlayedCards(cardImage) {
    const playedCardsContainer = document.getElementById('played-cards');
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.style.backgroundImage = `url(${cardImage})`;
    playedCardsContainer.appendChild(cardElement);
}

// تشغيل صوت الإنذار لمدة 3 ثوانٍ
function playAlarmSound() {
    const alarmSound = document.getElementById('alarm-sound');
    alarmSound.play();
    setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }, 3000);
}

// عرض رسالة قصيرة
function showMessage(message) {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
    messageBox.style.display = 'block';
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}

// عند الضغط على زر "ابدأ اللعب"
document.getElementById('start-game').addEventListener('click', () => {
    const selectedCards = shuffleDeck();
    displayCards(selectedCards);
    document.getElementById('start-game').style.display = 'none'; // إخفاء زر "ابدأ اللعب"
    document.getElementById('how-to-play').style.display = 'none'; // إخفاء زر "كيفية اللعب"
    showMessage('تم توزيع الأوراق، ابدأ اللعب الآن!');
});

// عند النقر على ورقة
document.querySelector('.deck').addEventListener('click', (event) => {
    if (event.target.classList.contains('card')) {
        const cardImage = event.target.dataset.image;
        addToPlayedCards(cardImage);
        event.target.classList.add('clicked'); // إضافة التأثير
        setTimeout(() => event.target.remove(), 500); // إزالة الورقة بعد التأثير
        showMessage('لقد اخترت ورقة!');
    }
});

// فتح/إغلاق القائمة
document.getElementById('toggle-played-cards').addEventListener('click', () => {
    const playedCards = document.getElementById('played-cards');
    const cardsOnScreen = document.querySelectorAll('.deck .card');
    playedCards.classList.toggle('active');
    cardsOnScreen.forEach(card => {
        card.classList.toggle('hidden', playedCards.classList.contains('active'));
    });
});

// عند الضغط على الزر الأحمر "اكشف"
document.getElementById('evil-button').addEventListener('click', playAlarmSound);

// عرض وإغلاق نافذة "كيفية اللعب"
const howToPlayButton = document.getElementById('how-to-play');
const howToPlayModal = document.getElementById('how-to-play-modal');
const closeModal = document.querySelector('.modal .close');

howToPlayButton.addEventListener('click', () => {
    howToPlayModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    howToPlayModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === howToPlayModal) {
        howToPlayModal.style.display = 'none';
    }
});

// التحقق من انتهاء اللعبة
function checkGameOver() {
    const remainingCards = document.querySelectorAll('.deck .card');
    if (remainingCards.length === 0) {
        showMessage('انتهت اللعبة! شكراً للعب.');
        document.getElementById('start-game').style.display = 'block';
        document.getElementById('how-to-play').style.display = 'block';
    }
}

// مراقبة انتهاء اللعبة
document.querySelector('.deck').addEventListener('click', () => {
    checkGameOver();
});
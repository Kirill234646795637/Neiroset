// ============================================================
//  1. СЛОВАРЬ И ДАННЫЕ
// ============================================================
const vocabulary = [
    'привет', 'здравствуй', 'хай', 'здорово', 'хелло', 'hello', 'hi', 'добрый', 'утра', 'дня', 'вечера',
    'пока', 'до свидания', 'прощай', 'бай', 'bye', 'увидимся', 'до встречи',
    'как', 'дела', 'как дела', 'что нового', 'как жизнь', 'поживаешь',
    'спасибо', 'благодарю', 'спс',
    'имя', 'зовут', 'кто ты', 'что ты',
    'да', 'конечно', 'ага', 'угу',
    'нет', 'неа', 'не',
    'помощь', 'помоги', 'help',
    'покажи', 'шутк', 'анекдот', 'рассмеши',
    'люблю', 'класс', 'круто', 'супер', 'молодец',
    'грустно', 'плохо', 'тоск', 'скучно'
];

// Намерения (классы) и примеры фраз для обучения
const trainingData = [
    { input: 'привет привет хай здравствуй',           label: 'greeting' },
    { input: 'пока до свидания прощай бай bye',          label: 'farewell' },
    { input: 'как дела как жизнь поживаешь',              label: 'howareyou' },
    { input: 'спасибо благодарю спс',                     label: 'thanks' },
    { input: 'имя зовут кто ты что ты',                   label: 'name' },
    { input: 'да конечно ага угу',                        label: 'yes' },
    { input: 'нет неа не',                                label: 'no' },
    { input: 'помощь помоги help',                        label: 'help' },
    { input: 'шутк анекдот рассмеши',                     label: 'joke' },
    { input: 'люблю класс круто супер молодец',           label: 'compliment' },
    { input: 'грустно плохо тоск скучно',                 label: 'sad' },
];

const labels = ['greeting', 'farewell', 'howareyou', 'thanks', 'name', 'yes', 'no', 'help', 'joke', 'compliment', 'sad'];
const labelNames = {
    greeting:   'приветствие',
    farewell:   'прощание',
    howareyou:  'как дела',
    thanks:     'благодарность',
    name:       'имя',
    yes:        'да',
    no:         'нет',
    help:       'помощь',
    joke:       'шутка',
    compliment: 'комплимент',
    sad:        'грусть'
};

const responses = {
    greeting: [
        'Привет! 👋 Рада тебя видеть!',
        'Здравствуй! Как дела?',
        'Хай! Чем могу помочь? 😊',
        'Привет-привет! ✨'
    ],
    farewell: [
        'Пока-пока! 👋 Заходи ещё!',
        'До свидания! Хорошего дня! ☀️',
        'Увидимся! 😊',
        'Бай-бай! Был(а) рада поболтать!'
    ],
    howareyou: [
        'У меня всё отлично, спасибо что спрашиваешь! 😊 А у тебя?',
        'Прекрасно! Я же нейросеть — у меня всегда хорошее настроение 🤖',
        'Нормально, обрабатываю данные потихоньку 😄'
    ],
    thanks: [
        'Пожалуйста! 😊',
        'Всегда рада помочь! ✨',
        'Не за что! Обращайся 💜'
    ],
    name: [
        'Я НейроЧат — простая нейросеть в одном HTML-файле! 🧠',
        'Зови меня НейроЧат! Я умею болтать по чуть-чуть 😄',
        'Я маленькая нейронная сеть, но с большим сердцем! 💜'
    ],
    yes: [
        'Отлично! 😊',
        'Поняла! 👍',
        'Супер!'
    ],
    no: [
        'Окей, поняла 😊',
        'Без проблем!',
        'Хорошо, как скажешь 👍'
    ],
    help: [
        'Я умею: здороваться, прощаться, отвечать на «как дела», шутить и немного болтать. Просто напиши что-нибудь! 😊',
        'Попробуй сказать «привет», «как дела», «расскажи шутку» или «пока» — и я отвечу!'
    ],
    joke: [
        'Почему программист ушёл с работы? Потому что не получил массив! 😄',
        '— Сколько программистов нужно, чтобы вкрутить лампочку?\n— Ни одного, это аппаратная проблема! 💡',
        'Нейросеть заходит в бар. Бармен: «Что будете?» Нейросеть: «А что мне предсказывают веса?» 🤖',
        'Мой любимый язык программирования — JavaScript. Потому что я сама на нём! 😂'
    ],
    compliment: [
        'Ой, спасибо! Ты тоже классный! 💜',
        'Мне приятно! 😊✨',
        'Ааа, я краснею... если бы могла 🥰'
    ],
    sad: [
        'Не грусти! Всё будет хорошо! 💜 Хочешь шутку?',
        'Обнимаю виртуально! 🤗 Попробуй сказать «расскажи шутку»!',
        'Эй, не вешай нос! Я тут, чтобы поднять настроение 😊'
    ],
    unknown: [
        'Хм, не совсем понимаю... Попробуй сказать «привет», «как дела» или «помощь» 🤔',
        'Я ещё учусь! Напиши «помощь», чтобы узнать что я умею 😊',
        'Интересно, но я пока не поняла. Попробуй другую фразу! 🧠'
    ]
};

// ============================================================
//  2. НЕЙРОСЕТЬ (Feed-Forward, 3 слоя)
// ============================================================
const INPUT_SIZE  = vocabulary.length;
const HIDDEN_SIZE = 16;
const OUTPUT_SIZE = labels.length;

// Веса инициализируем случайными числами
function randn() {
    return (Math.random() * 2 - 1) * Math.sqrt(2 / HIDDEN_SIZE);
}

// Инициализация весов
let W1 = [], b1 = []; // входной -> скрытый
let W2 = [], b2 = []; // скрытый -> выходной

function initWeights() {
    W1 = []; b1 = [];
    for (let j = 0; j < HIDDEN_SIZE; j++) {
        let row = [];
        for (let i = 0; i < INPUT_SIZE; i++) row.push(randn());
        W1.push(row);
        b1.push(randn() * 0.1);
    }

    W2 = []; b2 = [];
    for (let k = 0; k < OUTPUT_SIZE; k++) {
        let row = [];
        for (let j = 0; j < HIDDEN_SIZE; j++) row.push(randn());
        W2.push(row);
        b2.push(randn() * 0.1);
    }
}

function relu(x) { return Math.max(0, x); }
function softmax(arr) {
    const max = Math.max(...arr);
    const exps = arr.map(x => Math.exp(x - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(x => x / sum);
}

// Прямой проход (forward pass)
function forward(inputVector) {
    // Скрытый слой
    let hidden = [];
    for (let j = 0; j < HIDDEN_SIZE; j++) {
        let sum = b1[j];
        for (let i = 0; i < INPUT_SIZE; i++) {
            sum += W1[j][i] * inputVector[i];
        }
        hidden.push(relu(sum));
    }

    // Выходной слой
    let output = [];
    for (let k = 0; k < OUTPUT_SIZE; k++) {
        let sum = b2[k];
        for (let j = 0; j < HIDDEN_SIZE; j++) {
            sum += W2[k][j] * hidden[j];
        }
        output.push(sum);
    }

    return { hidden, output: softmax(output) };
}

// Текст -> bag-of-words вектор
function textToVector(text) {
    const words = text.toLowerCase().replace(/[?!.,]/g, '').split(/\s+/);
    let vec = new Array(INPUT_SIZE).fill(0);
    for (let i = 0; i < vocabulary.length; i++) {
        for (const w of words) {
            if (vocabulary[i].includes(w) || w.includes(vocabulary[i])) {
                vec[i] = 1;
            }
        }
    }
    return vec;
}

// ============================================================
//  3. ОБУЧЕНИЕ (обучаем на лету при загрузке)
// ============================================================
function trainNetwork(epochs = 200, lr = 0.1) {
    for (let ep = 0; ep < epochs; ep++) {
        for (const sample of trainingData) {
            const inputVec = textToVector(sample.input);
            const { hidden, output } = forward(inputVec);

            // Целевой one-hot вектор
            const target = new Array(OUTPUT_SIZE).fill(0);
            const labelIdx = labels.indexOf(sample.label);
            target[labelIdx] = 1;

            // Ошибка выходного слоя
            const outputError = output.map((o, k) => target[k] - o);

            // Градиент для W2
            for (let k = 0; k < OUTPUT_SIZE; k++) {
                for (let j = 0; j < HIDDEN_SIZE; j++) {
                    W2[k][j] += lr * outputError[k] * hidden[j];
                }
                b2[k] += lr * outputError[k];
            }

            // Ошибка скрытого слоя
            const hiddenError = [];
            for (let j = 0; j < HIDDEN_SIZE; j++) {
                let err = 0;
                for (let k = 0; k < OUTPUT_SIZE; k++) {
                    err += outputError[k] * W2[k][j];
                }
                hiddenError.push(err);
            }

            // Градиент для W1
            for (let j = 0; j < HIDDEN_SIZE; j++) {
                if (hidden[j] > 0) { // ReLU derivative
                    for (let i = 0; i < INPUT_SIZE; i++) {
                        W1[j][i] += lr * hiddenError[j] * inputVec[i];
                    }
                    b1[j] += lr * hiddenError[j];
                }
            }
        }
    }
}

// ============================================================
//  4. КЛАССИФИКАЦИЯ И ОТВЕТ
// ============================================================
function classify(text) {
    const vec = textToVector(text);
    const { output } = forward(vec);

    // Находим класс с максимальной вероятностью
    let maxIdx = 0, maxVal = output[0];
    for (let i = 1; i < output.length; i++) {
        if (output[i] > maxVal) { maxVal = output[i]; maxIdx = i; }
    }

    // Если уверенность низкая — unknown
    if (maxVal < 0.3) return 'unknown';
    return labels[maxIdx];
}

function getResponse(text) {
    const intent = classify(text);
    const r = responses[intent];
    return r[Math.floor(Math.random() * r.length)];
}

// ============================================================
//  5. UI
// ============================================================
function initChat() {
    const messagesDiv = document.getElementById('messages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    // Проверка существования элементов
    if (!messagesDiv || !userInput || !sendBtn) {
        console.error('❌ Не найдены элементы DOM!');
        return;
    }

    function addMessage(text, type) {
        const div = document.createElement('div');
        div.className = `message ${type}-msg`;
        div.textContent = text;
        messagesDiv.appendChild(div);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.id = 'typing';
        div.innerHTML = '<span></span><span></span><span></span>';
        messagesDiv.appendChild(div);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function hideTyping() {
        const el = document.getElementById('typing');
        if (el) el.remove();
    }

    function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        userInput.value = '';

        showTyping();
        setTimeout(() => {
            hideTyping();
            const reply = getResponse(text);
            addMessage(reply, 'bot');
        }, 600 + Math.random() * 400);
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') sendMessage();
    });

    // Приветствие при загрузке
    setTimeout(() => {
        addMessage('Привет! Я НейроЧат — маленькая нейросеть. Попробуй сказать «привет», «как дела» или «расскажи шутку»! 🧠', 'bot');
    }, 500);
}

// ============================================================
//  6. ЗАПУСК ОБУЧЕНИЯ И ИНИЦИАЛИЗАЦИЯ
// ============================================================
initWeights();
trainNetwork(300, 0.15);
console.log('🧠 Нейросеть обучена!');
console.log(`   Входной слой:  ${INPUT_SIZE} нейронов`);
console.log(`   Скрытый слой:  ${HIDDEN_SIZE} нейронов`);
console.log(`   Выходной слой: ${OUTPUT_SIZE} нейронов`);
console.log(`   Всего весов:   ${INPUT_SIZE * HIDDEN_SIZE + HIDDEN_SIZE * OUTPUT_SIZE + HIDDEN_SIZE + OUTPUT_SIZE}`);

// Инициализация чата после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
} else {
    initChat();
}
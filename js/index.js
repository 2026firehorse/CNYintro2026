// Zodiac Data
const zodiacData = [
    { name: "Monkey (猴)", years: "1968, 1980, 1992, 2004, 2016", desc: "Sharp, smart, curiosity, and mischievous.", img: "./images/hou.jpeg" },
    { name: "Rooster (鸡)", years: "1969, 1981, 1993, 2005, 2017", desc: "Observant, hardworking, and courageous.", img: "./images/ji.jpeg" },
    { name: "Dog (狗)", years: "1970, 1982, 1994, 2006, 2018", desc: "Loyal, honest, prudent, and kind.", img: "./images/gou.jpeg" },
    { name: "Pig (猪)", years: "1971, 1983, 1995, 2007, 2019", desc: "Compassionate, generous, and diligent.", img: "./images/zhu.jpeg" },
    { name: "Rat (鼠)", years: "1960, 1972, 1984, 1996, 2008", desc: "Quick-witted, resourceful, versatile, and kind.", img: "./images/shu.jpg" },
    { name: "Ox (牛)", years: "1961, 1973, 1985, 1997, 2009", desc: "Diligent, dependable, strong, and determined.", img: "./images/niu.jpg" },
    { name: "Tiger (虎)", years: "1962, 1974, 1986, 1998, 2010", desc: "Brave, confident, and competitive.", img: "./images/hu.jpg" },
    { name: "Rabbit (兔)", years: "1963, 1975, 1987, 1999, 2011", desc: "Quiet, elegant, kind, and responsible.", img: "./images/tu.jpg" },
    { name: "Dragon-Long (龙)", years: "1964, 1976, 1988, 2000, 2012", desc: "Confident, intelligent, and enthusiastic.", img: "./images/long.jpg" },
    { name: "Snake (蛇)", years: "1965, 1977, 1989, 2001, 2013", desc: "Enigmatic, intelligent, and wise.", img: "./images/she.jpg" },
    { name: "Horse (马)", years: "1966, 1978, 1990, 2002, 2014, 2026", desc: "Animated, active, and energetic.", img: "./images/ma.jpeg" },
    { name: "Goat (羊)", years: "1967, 1979, 1991, 2003, 2015", desc: "Calm, gentle, and sympathetic.", img: "./images/yang.jpeg" }
];

function calculateZodiac() {
    const yearInput = document.getElementById('birthYear').value;
    const resultDiv = document.getElementById('zodiacResult');
    const placeholder = document.getElementById('zodiacPlaceholder');
    const fireHorseMsg = document.getElementById('fireHorseSpecial');

    if (!yearInput || yearInput < 1900 || yearInput > 2050) {
        alert("Please enter a valid birth year between 1900 and 2050.");
        return;
    }

    const remainder = yearInput % 12;
    const animal = zodiacData[remainder];

    document.getElementById('zodiacName').innerText = animal.name;
    document.getElementById('zodiacYears').innerText = "Birth Years: " + animal.years;
    document.getElementById('zodiacDesc').innerText = animal.desc;
    document.getElementById('zodiacImage').src = animal.img;

    placeholder.classList.add('hidden');
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('block');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    if (animal.name.includes("Horse")) {
        fireHorseMsg.classList.remove('hidden');
    } else {
        fireHorseMsg.classList.add('hidden');
    }
}

//toggle
function toggleEnvelope(element) {
    const msg = element.querySelector('.envelope-message');
    if (msg.classList.contains('hidden')) {
        msg.classList.remove('hidden');
        msg.classList.add('flex');
    } else {
        msg.classList.add('hidden');
        msg.classList.remove('flex');
    }
}

//speak
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Sorry, your browser doesn't support text-to-speech.");
    }
}


//music
function toggleMusic() {
    var audio = document.getElementById('bgmAudio');
    var icon = document.getElementById('musicIcon');
    var text = document.getElementById('musicText');


    if (!audio || !icon || !text) {
        alert("error");
        return;
    }



    if (audio.paused) {

        audio.play().then(() => {
            icon.innerText = "pause";
            icon.classList.add("animate-spin-slow");


            text.innerText = "Quiet Mode";

        }).catch(e => { console.error(e); });
    } else {

        audio.pause();
        icon.innerText = "music_note";
        icon.classList.remove("animate-spin-slow");


        text.innerText = "Spring Festival Vibe";
    }
}

//nav 


const btn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');


btn.addEventListener('click', () => {

    menu.classList.toggle('hidden');


    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});


menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});

// ============
// Preloader 
// ============


const startTime = Date.now();


const minDisplayTime = 1500;

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');

    if (preloader) {

        const elapsedTime = Date.now() - startTime;


        const waitTime = Math.max(0, minDisplayTime - elapsedTime);

        setTimeout(() => {

            preloader.classList.add('preloader-hidden');


            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);

        }, waitTime);
    }
});

// 轮播图(Carousel)
// ==================

// 
function initCarousel() {
    const track = document.getElementById('carousel-track');

    if (!track) return;

    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const dotsContainer = document.getElementById('carousel-dots');

    let currentIndex = 0;


    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `w-2.5 h-2.5 rounded-full transition-all ${index === 0 ? 'bg-white w-6' : 'bg-white/50 hover:bg-white'}`;

        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);


    const goToSlide = (index) => {

        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        currentIndex = index;


        track.style.transform = `translateX(-${currentIndex * 100}%)`;


        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.className = 'w-6 h-2.5 rounded-full bg-white transition-all';
            } else {
                dot.className = 'w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white transition-all';
            }
        });
    };


    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoPlay();
    });

    let autoPlayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 4000);


    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 4000);
    }
}

initCarousel();



// ====================
// 红包雨 + 抽奖
// ====================
document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('hongbao-card');
    const resultOverlay = document.getElementById('envelope-result');
    const amountText = document.getElementById('lucky-amount');
    const meaningText = document.getElementById('lucky-meaning');
    const rainContainer = document.getElementById('rain-container');


    if (!card || !resultOverlay || !rainContainer) return;


    const luckyData = [
        {
            amount: "888 Yuan!",
            meaning: "The number 8 symbolizes wealth and fortune. Wishing you endless prosperity!"

        },
        {
            amount: "66 Yuan!",
            meaning: "The number 6 represents smoothness and flow. May your year be free of obstacles!"

        },
        {
            amount: "168 Yuan!",
            meaning: "Sounds like 'Fortune All The Way' (Yi-Lu-Fa). May success follow every step you take!"

        },
        {
            amount: "520 Yuan!",
            meaning: "Sounds like 'I Love You' in Chinese. Wishing you a year filled with romance and warmth!"

        },
        {
            amount: "999 Yuan!",
            meaning: "The number 9 symbolizes eternity and longevity. Wishing you everlasting happiness!"

        },
        {
            amount: "88 Yuan!",
            meaning: "Good things come in pairs. Double the luck, double the joy!"

        }
    ];

    let isOpened = false;


    function createRain() {
        const amount = 40;
        for (let i = 0; i < amount; i++) {
            const hongbao = document.createElement('div');
            hongbao.classList.add('hongbao');
            const icons = ['🧧', '🧧', '🧧', '💰', '🪙', '福'];
            hongbao.innerText = icons[Math.floor(Math.random() * icons.length)];
            hongbao.style.left = Math.random() * 100 + '%';
            hongbao.style.animationDuration = (Math.random() * 3 + 2) + 's';
            rainContainer.appendChild(hongbao);
            setTimeout(() => hongbao.remove(), 5000);
        }
    }


    card.addEventListener('click', () => {

        createRain();

        if (!isOpened) {
            const data = luckyData[Math.floor(Math.random() * luckyData.length)];
            if (amountText) amountText.innerText = data.amount;
            if (meaningText) meaningText.innerText = data.meaning;

            resultOverlay.classList.remove('hidden');
            isOpened = true;
        }
    });
});


// ====================
// 运势卡片
// ====================

const card = document.getElementById('fortune-card');
const cardInner = document.getElementById('card-inner');
const resetBtn = document.getElementById('reset-fortune');
const fortuneTitle = document.getElementById('fortune-title');
const fortuneText = document.getElementById('fortune-text');

const fortunes = [
    { title: "Great Fortune", text: "Everything you touch turns to gold!" },
    { title: "Love Luck", text: "A romantic surprise is waiting for you." },
    { title: "Peace & Joy", text: "A year of harmony and good health." },
    { title: "Big Success", text: "Your hard work will finally pay off." },
    { title: "Prosperity", text: "Wealth flows in from unexpected places!" }
];

let isFlipped = false;

if (card) {
    card.addEventListener('click', (e) => {
        if (e.target === resetBtn) return;

        if (isFlipped) return;


        const random = fortunes[Math.floor(Math.random() * fortunes.length)];
        fortuneTitle.innerText = random.title;
        fortuneText.innerText = random.text;


        cardInner.classList.add('rotate-y-180');
        isFlipped = true;


        setTimeout(() => {
            fortuneTitle.classList.remove('scale-0');
            fortuneText.classList.remove('opacity-0');
            resetBtn.classList.remove('opacity-0', 'pointer-events-none');
        }, 100);
    });


    resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();


        cardInner.classList.remove('rotate-y-180');
        isFlipped = false;

        fortuneTitle.classList.add('scale-0');
        fortuneText.classList.add('opacity-0');
        resetBtn.classList.add('opacity-0', 'pointer-events-none');
    });
}
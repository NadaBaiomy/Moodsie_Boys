/* Moodsie service worker — رسائل يومية للشباب 💌 */
const DAILY_MESSAGES = [
    "قوم يا وحش، النهاردة يومك 💪",
    "الصعب النهاردة هيبقى ذكرى بكرة ⚡",
    "اشرب مياه يا معلم 💧",
    "خطوة صغيرة أحسن من ألف خطة 🔥",
    "أنت أقوى مما تتخيل 💪",
    "اللي بيتعب النهاردة، بيرتاح بكرة براحة تانية 🏆",
    "خد نفس عميق وكمّل 🌬️",
    "اللي يستاهل، بياخد وقت 🎯",
    "الراحة جزء من الخطة، مش فشل 😴",
    "افتكر: انت مش متأخر، انت في طريقك 🚀",
    "خليك هادي زي المياه، وأصلب منها 🌊",
    "يوم واحد وحش مش هيدمر حياتك 🔥",
    "البطل بيكمل حتى وهو تعبان 💪",
    "كل واحد عنده يومين وحشين، عادي 😤",
    "بعد التعب دايمًا في راحة 🌙",
    "افتكر نفسك شوية، مش كل الناس 💭",
    "المسافة الطويلة بتتقسم خطوات 🐾",
    "شغّل أغنية ترفع مزاجك 🎧",
    "النجاح عادة، مش صدفة ⭐",
    "أنت بطل ومتعود على الأصعب 🥇",
    "لو حد قالك مستحيل، يبقى مش فاهم 🤫",
    "قسّم يومك ونفّذه حاجة حاجة ✍️",
    "الغلطة مش نهاية العالم، درس مكلف شوية 🧠",
    "١٠ دقايق رياضة بتغير مزاج اليوم كله 🏃",
    "قهوتك مكتوبة، كمّل ☕",
    "مقامنا عالي.. لا بنتقارن بحد، ولا حد يعرف يقلدنا 😎",
    "الاستسلام مش من اختياراتك 🔒",
    "بطولتك بتبان في اللحظات الصعبة 💎",
    "صحّي اللي جواك النهاردة 🦾",
    "نمت كويس؟ يبقى جاهز للمعركة 🛡️",
    "مفيش حاجة اليوم؟ ارتاح صح 🌙",
    "اللي بيتعلم من غلطه مش خسران 📈",
    "خلي طموحك أعلى من ضجة اللي حواليك 📢",
    "أنت في فريق مبيخسرش 🏆",
    "السكوت أحيانًا أقوى رد 🤫",
    "البطولات مش بتتصنع في يوم 🏭",
    "تعب النهاردة = قوة بكرة 💪",
    "أنت عارف الطريق، بس محتاج تمشي ⚡",
    "خليك ثابت وابتسم، الصعب هيعدي 😎",
    "الراحة مش كسل، دي إعادة شحن 🔋"
];

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

async function showDailyNotification() {
    const dayIndex = Math.floor(Date.now() / 86400000);
    const msg = DAILY_MESSAGES[dayIndex % DAILY_MESSAGES.length];
    try {
        await self.registration.showNotification('Moodsie ⚡', {
            body: msg,
            icon: 'icon-boy.svg',
            tag: 'moodsie-daily',
            renotify: true
        });
    } catch (e) {}
}

self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'daily-msg') event.waitUntil(showDailyNotification());
});

self.addEventListener('message', (event) => {
    if (event.data === 'show-daily') event.waitUntil(showDailyNotification());
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then((list) => {
            for (const client of list) { if ('focus' in client) return client.focus(); }
            return self.clients.openWindow('./');
        })
    );
});

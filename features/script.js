// ==================================================
// Micro Factory AI - Distributed Assembly Network (DAN)
// ==================================================

const turkeyData = {
    "Adana": ["Seyhan", "Yüreğir", "Çukurova", "Sarıçam", "Ceyhan", "Kozan"],
    "Adıyaman": ["Merkez", "Besni", "Gölbaşı", "Kahta"],
    "Afyonkarahisar": ["Merkez", "Sandıklı", "Dinar", "Bolvadin"],
    "Ağrı": ["Merkez", "Patnos", "Doğubayazıt", "Diyadin"],
    "Amasya": ["Merkez", "Merzifon", "Suluova", "Taşova"],
    "Ankara": ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Etimesgut", "Sincan", "Altındağ", "Pursaklar", "Gölbaşı", "Polatlı"],
    "Antalya": ["Muratpaşa", "Kepez", "Konyaaltı", "Alanya", "Manavgat", "Serik", "Döşemealtı", "Aksu"],
    "Artvin": ["Merkez", "Hopa", "Borçka", "Arhavi"],
    "Aydın": ["Efeler", "Nazilli", "Söke", "Kuşadası", "Didim"],
    "Balıkesir": ["Altıeylül", "Karesi", "Bandırma", "Edremit", "Ayvalık"],
    "Bilecik": ["Merkez", "Bozüyük", "Osmaneli"],
    "Bingöl": ["Merkez", "Genç", "Solhan"],
    "Bitlis": ["Merkez", "Tatvan", "Ahlat"],
    "Bolu": ["Merkez", "Gerede", "Mudurnu", "Mengen", "Yeniçağa", "Göynük"],
    "Burdur": ["Merkez", "Bucak", "Gölhisar"],
    "Bursa": ["Osmangazi", "Nilüfer", "Yıldırım", "İnegöl", "Gemlik", "Mudanya"],
    "Çanakkale": ["Merkez", "Biga", "Çan", "Gelibolu"],
    "Çankırı": ["Merkez", "Çerkeş", "Ilgaz"],
    "Çorum": ["Merkez", "Sungurlu", "Osmancık"],
    "Denizli": ["Pamukkale", "Merkezefendi", "Çivril", "Acıpayam"],
    "Diyarbakır": ["Bağlar", "Kayapınar", "Yenişehir", "Sur", "Bismil", "Ergani"],
    "Edirne": ["Merkez", "Keşan", "Uzunköprü"],
    "Elazığ": ["Merkez", "Kovancılar", "Karakoçan"],
    "Erzincan": ["Merkez", "Tercan", "Üzümlü"],
    "Erzurum": ["Yakutiye", "Palandöken", "Aziziye"],
    "Eskişehir": ["Odunpazarı", "Tepebaşı", "Sivrihisar"],
    "Gaziantep": ["Şahinbey", "Şehitkamil", "Nizip", "İslahiye"],
    "Giresun": ["Merkez", "Bulancak", "Görele"],
    "Gümüşhane": ["Merkez", "Kelkit", "Şiran"],
    "Hakkari": ["Merkez", "Yüksekova", "Şemdinli"],
    "Hatay": ["Antakya", "İskenderun", "Defne", "Dörtyol", "Samandağ"],
    "Isparta": ["Merkez", "Yalvaç", "Eğirdir"],
    "Mersin": ["Tarsus", "Toroslar", "Akdeniz", "Yenişehir", "Mezitli", "Erdemli"],
    "İstanbul": ["Esenyurt", "Küçükçekmece", "Bağcılar", "Ümraniye", "Pendik", "Kadıköy", "Şişli", "Beşiktaş", "Fatih", "Zeytinburnu", "Avcılar", "Ataşehir"],
    "İzmir": ["Buca", "Karabağlar", "Bornova", "Konak", "Karşıyaka", "Bayraklı", "Çiğli", "Urla", "Çeşme"],
    "Kars": ["Merkez", "Kağızman", "Sarıkamış"],
    "Kastamonu": ["Merkez", "Tosya", "Taşköprü"],
    "Kayseri": ["Melikgazi", "Kocasinan", "Talas", "Develi"],
    "Kırklareli": ["Merkez", "Lüleburgaz", "Babaeski"],
    "Kırşehir": ["Merkez", "Kaman", "Mucur"],
    "Kocaeli": ["Gebze", "İzmit", "Darıca", "Körfez", "Gölcük"],
    "Konya": ["Selçuklu", "Meram", "Karatay", "Ereğli", "Akşehir"],
    "Kütahya": ["Merkez", "Tavşanlı", "Simav"],
    "Malatya": ["Battalgazi", "Yeşilyurt", "Doğanşehir"],
    "Manisa": ["Yunusemre", "Şehzadeler", "Akhisar", "Salihli", "Turgutlu"],
    "Kahramanmaraş": ["Onikişubat", "Dulkadiroğlu", "Elbistan", "Afşin"],
    "Mardin": ["Kızıltepe", "Artuklu", "Midyat", "Nusaybin"],
    "Muğla": ["Bodrum", "Fethiye", "Milas", "Menteşe", "Marmaris"],
    "Muş": ["Merkez", "Bulanık", "Malazgirt"],
    "Nevşehir": ["Merkez", "Ürgüp", "Avanos"],
    "Niğde": ["Merkez", "Bor", "Çamardı"],
    "Ordu": ["Altınordu", "Ünye", "Fatsa"],
    "Rize": ["Merkez", "Çayeli", "Ardeşen"],
    "Sakarya": ["Adapazarı", "Serdivan", "Akyazı", "Erenler", "Hendek"],
    "Samsun": ["İlkadım", "Atakum", "Bafra", "Çarşamba"],
    "Siirt": ["Merkez", "Kurtalan", "Baykan"],
    "Sinop": ["Merkez", "Boyabat", "Ayancık"],
    "Sivas": ["Merkez", "Şarkışla", "Yıldızeli"],
    "Tekirdağ": ["Çorlu", "Süleymanpaşa", "Çerkezköy", "Kapaklı"],
    "Tokat": ["Merkez", "Erbaa", "Turhal"],
    "Trabzon": ["Ortahisar", "Akçaabat", "Araklı", "Of"],
    "Tunceli": ["Merkez", "Pertek", "Ovacık"],
    "Şanlıurfa": ["Haliliye", "Eyyübiye", "Siverek", "Viranşehir", "Karaköprü"],
    "Uşak": ["Merkez", "Banaz", "Eşme"],
    "Van": ["İpekyolu", "Erciş", "Tuşba", "Edremit"],
    "Yozgat": ["Merkez", "Sorgun", "Boğazlıyan"],
    "Zonguldak": ["Merkez", "Ereğli", "Çaycuma"],
    "Aksaray": ["Merkez", "Ortaköy", "Eskil"],
    "Bayburt": ["Merkez", "Aydıntepe"],
    "Karaman": ["Merkez", "Ermenek"],
    "Kırıkkale": ["Merkez", "Yahşihan"],
    "Batman": ["Merkez", "Kozluk"],
    "Şırnak": ["Merkez", "Cizre", "Silopi"],
    "Bartın": ["Merkez", "Amasra"],
    "Ardahan": ["Merkez", "Göle"],
    "Iğdır": ["Merkez", "Tuzluca"],
    "Yalova": ["Merkez", "Çınarcık", "Altınova"],
    "Karabük": ["Merkez", "Safranbolu"],
    "Kilis": ["Merkez", "Musabeyli"],
    "Osmaniye": ["Merkez", "Kadirli", "Düziçi"],
    "Düzce": ["Merkez", "Akçakoca", "Gölyaka"]
};

const regionData = {
    "Marmara": ["İstanbul", "Bursa", "Kocaeli", "Balıkesir", "Çanakkale", "Tekirdağ", "Edirne", "Kırklareli", "Yalova", "Sakarya", "Bilecik"],
    "Ege": ["İzmir", "Manisa", "Aydın", "Denizli", "Muğla", "Afyonkarahisar", "Kütahya", "Uşak"],
    "İç Anadolu": ["Ankara", "Konya", "Kayseri", "Eskişehir", "Sivas", "Kırıkkale", "Aksaray", "Karaman", "Kırşehir", "Niğde", "Nevşehir", "Yozgat", "Çankırı"],
    "Akdeniz": ["Antalya", "Adana", "Mersin", "Hatay", "Osmaniye", "Kahramanmaraş", "Isparta", "Burdur"],
    "Karadeniz": ["Trabzon", "Samsun", "Ordu", "Giresun", "Rize", "Artvin", "Sinop", "Kastamonu", "Zonguldak", "Karabük", "Bartın", "Bolu", "Düzce", "Amasya", "Çorum", "Tokat", "Gümüşhane", "Bayburt"],
    "Doğu ve Güneydoğu": ["Gaziantep", "Diyarbakır", "Şanlıurfa", "Batman", "Adıyaman", "Mardin", "Siirt", "Kilis", "Erzurum", "Erzincan", "Kars", "Ağrı", "Iğdır", "Ardahan", "Van", "Bitlis", "Muş", "Hakkari", "Malatya", "Elazığ", "Tunceli", "Bingöl", "Şırnak"]
};

const categoryPrices = { "kimya": 120, "tekstil": 90, "montaj": 65, "paketleme": 25, "gida": 145 };
const categoryNames = { "kimya": "Doğal Kozmetik & Kimya", "tekstil": "Tekstil & Örme", "montaj": "Hafif Montaj", "paketleme": "Paketleme & Tasnif", "gida": "İleri Dönüşüm & Butik Gıda" };

const defaultProducers = [
    { name: "Sincan Kadın Kooperatifi", capacity: 1200, city: "Ankara", trustScore: 9.8, status: "Aktif", region: "İç Anadolu", primarySkill: "montaj", secondarySkills: ["paketleme", "tekstil"] },
    { name: "Bursa İpek ve Tekstil Hub", capacity: 2500, city: "Bursa", trustScore: 9.9, status: "Aktif", region: "Marmara", primarySkill: "tekstil", secondarySkills: ["paketleme", "montaj"] },
    { name: "Ege Doğal Yaşam Kooperatifi", capacity: 1800, city: "İzmir", trustScore: 9.8, status: "Aktif", region: "Ege", primarySkill: "gida", secondarySkills: ["kimya", "paketleme"] },
    { name: "Gaziantep Kutnu Dokuma", capacity: 1300, city: "Gaziantep", trustScore: 9.7, status: "Aktif", region: "Doğu ve Güneydoğu", primarySkill: "tekstil", secondarySkills: ["montaj"] },
    { name: "Antalya Narenciye Paketleme", capacity: 1600, city: "Antalya", trustScore: 9.6, status: "Aktif", region: "Akdeniz", primarySkill: "paketleme", secondarySkills: ["gida"] },
    { name: "Karadeniz Gıda Hub", capacity: 1500, city: "Rize", trustScore: 9.5, status: "Aktif", region: "Karadeniz", primarySkill: "gida", secondarySkills: ["paketleme"] },
    { name: "Mardin Sabun ve Koku Atölyesi", capacity: 950, city: "Mardin", trustScore: 9.9, status: "Aktif", region: "Doğu ve Güneydoğu", primarySkill: "kimya", secondarySkills: ["paketleme"] },
    { name: "Hatay Defne ve İpek Kooperatifi", capacity: 1100, city: "Hatay", trustScore: 9.6, status: "Aktif", region: "Akdeniz", primarySkill: "kimya", secondarySkills: ["tekstil"] },
    { name: "Trabzon Yöresel Paketleme", capacity: 1400, city: "Trabzon", trustScore: 9.4, status: "Aktif", region: "Karadeniz", primarySkill: "paketleme", secondarySkills: ["gida"] },
    { name: "İstanbul Geri Dönüşüm Atölyesi", capacity: 2100, city: "İstanbul", trustScore: 9.7, status: "Aktif", region: "Marmara", primarySkill: "montaj", secondarySkills: ["tekstil", "paketleme"] },
    { name: "Kayseri Dokuma Evi (İhlal)", capacity: 300, city: "Kayseri", trustScore: 4.5, status: "Askıda (6 Ay)", region: "İç Anadolu", primarySkill: "tekstil", secondarySkills: [] },
    { name: "Karşıyaka Kadın Dayanışması", capacity: 350, city: "İzmir", trustScore: 3.8, status: "İhraç (Kalıcı)", region: "Ege", primarySkill: "kimya", secondarySkills: ["gida"] }
];

const defaultOrders = [
    { id: 1001, date: "24.03.2026", product: "Baskılı Bez Çanta", info: "2.500 Adet / Bursa / Nilüfer / %100 Pamuk, Ekru", status: "🚚 Kargoya Verildi", totalCost: 225000, totalCo2Gram: 45000 },
    { id: 1002, date: "25.03.2026", product: "Lavanta Sabunu", info: "800 Adet / İstanbul / Kadıköy / 50 ml", status: "✅ Üretimde", totalCost: 96000, totalCo2Gram: 18000 }
];

// V16: SIFIR (0) MANTIK HATASI ÇÖZÜLDÜ (strict null check)
let storedProducers = localStorage.getItem('mf_producers_v16');
let producers = storedProducers !== null ? JSON.parse(storedProducers) : defaultProducers;

let storedOrders = localStorage.getItem('mf_orders_v16');
let orderHistory = storedOrders !== null ? JSON.parse(storedOrders) : defaultOrders;

let storedCo2 = localStorage.getItem('mf_co2_total_v16');
let totalCo2Savings = storedCo2 !== null ? Number(storedCo2) : 63000;
let currentOrderTemp = null;

function showToast(message, type = 'error') {
    const colors = { error: 'bg-rose-600', success: 'bg-emerald-600', warning: 'bg-amber-500' };
    const icons = { error: '⚠️', success: '✅', warning: '⚡' };
    document.querySelectorAll('.custom-toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `custom-toast fixed top-6 right-6 z-[100] px-6 py-4 ${colors[type]} text-white rounded-2xl shadow-2xl text-[10px] font-black uppercase tracking-widest animate-slide max-w-md flex items-center gap-3 border border-white/20`;
    toast.innerHTML = `<span class="text-xl">${icons[type]}</span> <span class="leading-relaxed whitespace-pre-line">${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 5000);
}

// ✅ DÜZELTİLDİ: suffix parametresi eklendi — "Ağaç" etiketi animasyon sonrası kaybolmuyordu
function animateCount(elementId, targetValue, duration = 1200, suffix = '') {
    const el = document.getElementById(elementId);
    if (!el) return;
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        if (targetValue === 0) {
            el.innerText = "0" + suffix;
            return;
        }
        el.innerText = Math.floor(eased * targetValue).toLocaleString('tr-TR') + suffix;
        if (progress < 1) requestAnimationFrame(update);
        else el.innerText = targetValue.toLocaleString('tr-TR') + suffix;
    }
    requestAnimationFrame(update);
}

function updateKPIs() {
    const active = producers.filter(p => p.status === 'Aktif').length;
    const banned = producers.filter(p => p.status !== 'Aktif').length;
    const totalCap = producers.filter(p => p.status === 'Aktif').reduce((acc, curr) => acc + curr.capacity, 0);

    animateCount('kpiCapacity', totalCap);
    animateCount('kpiActiveProducers', active, 800);
    animateCount('kpiBannedProducers', banned, 800);
    const treeEquivalent = (totalCo2Savings / 100).toFixed(1);
    // ✅ DÜZELTİLDİ: " Ağaç" suffix'i artık animasyon boyunca korunuyor
    animateCount('kpiCo2', parseFloat(treeEquivalent), 1000, ' Ağaç');
}

function startDynamicLiveFeed() {
    const feedContainer = document.getElementById('liveFeedContainer');
    if (!feedContainer) return;
    const feedMessages = [
        { type: "emerald", hub: "Bursa Hub", msg: "Günlük bölgesel dağıtım seferi tamamlandı (+%10 Verim)." },
        { type: "indigo", hub: "WhatsApp Bot", msg: "Gaziantep üreticisi anlık bildirime 'EVET' yanıtı verdi." },
        { type: "rose", hub: "Mardin Hub", msg: "SLA teslim süresi aşıldı, güven skoru güncellendi." },
        { type: "sky", hub: "WhatsApp Bot", msg: "Sincan Hub üreticisine iş atama mesajı gönderildi." },
        { type: "emerald", hub: "Antalya Hub", msg: "Paketleme kotası doldu, siparişler havuza aktarıldı." },
        { type: "slate", hub: "AI Sistem", msg: "Karbon emisyon rotası yeniden optimize edildi." }
    ];
    setInterval(() => {
        const randomData = feedMessages[Math.floor(Math.random() * feedMessages.length)];
        const newFeed = document.createElement('div');
        newFeed.className = `p-3 bg-${randomData.type}-50/50 rounded-lg border border-${randomData.type}-100/50 animate-slide-up text-[10px] text-slate-600 font-medium mb-3 shadow-sm`;
        newFeed.innerHTML = `🟢 <b>${randomData.hub}:</b> ${randomData.msg}`;
        feedContainer.insertBefore(newFeed, feedContainer.firstChild);
        if (feedContainer.children.length > 5) feedContainer.removeChild(feedContainer.lastChild);
    }, 4500);
}

function openInfoModal(type) {
    const title = document.getElementById('modalTitle');
    const subtitle = document.getElementById('modalSubtitle');
    const content = document.getElementById('modalContent');
    if(!title) return;
    let textStyle = "text-slate-700 text-sm leading-relaxed space-y-4 font-medium";
    
    if(type === 'about') {
        title.innerText = "Sanal Üretim Katmanı"; subtitle.innerText = "Yapay Zeka Destekli Hub Ağı";
        content.className = textStyle;
        content.innerHTML = `<p><strong class="text-indigo-700">Merkeziyetsiz Zeka:</strong> Micro Factory AI olarak, atıl durumdaki ev üretim kapasitesini kurumsal B2B tedarik zincirlerine bağlayan otonom bir ağız.</p><p>Kadın emeğini, ağır fabrika şartları yerine sanayi standartlarında (SLA) esnek ev üretimiyle kurumsal firmalarla buluşturuyoruz.</p>`;
    } else if(type === 'b2b') {
        title.innerText = "B2B Lojistik Ağ Mantığı"; subtitle.innerText = "Esnek Üretim (Agile Capacity)";
        content.className = textStyle;
        content.innerHTML = `<p><strong class="text-indigo-700">Nasıl Çalışır?</strong> Kurumsal siparişler yapay zeka ile parçalanarak Bölgesel Hub'lara iletilir.</p><p>Kooperatif üyesi kadınlar çoklu yetkinliklere sahiptir. Sistem, sadece ana uzmanlık alanlarına değil, evdeki esnek yeteneklere (Agile Manufacturing) göre %10 ile %100 arasında değişen kapasite atamaları yapar.</p>`;
    } else if(type === 'sla') {
        title.innerText = "Kalite Kontrol & İptal Politikası"; subtitle.innerText = "Sıfır Tolerans Politikası";
        content.className = textStyle;
        content.innerHTML = `<p>Üreticiler teslimatı Hub'a yaptığında, yöneticiler tarafından standart kalite kontrol (QC) uygulanır.</p>
        <p><strong class="text-rose-600">İptal Politikası:</strong> Üretim sırasındaki (bekleyen veya WhatsApp onayı bekleyen) işler %100 kesintisiz iptal edilebilir. Üretici WhatsApp üzerinden 'EVET' deyip üretime giren işlerde %30 'Emeğe Saygı Payı' kesintisi uygulanır.</p>
        <div class="bg-rose-50 text-rose-700 p-4 rounded-xl border border-rose-200 mt-4 font-bold flex items-center gap-3"><span class="text-2xl">⚠️</span> 3 Kritik Hata = Sistemden Kalıcı İhraç</div>`;
    } else if(type === 'esg') {
        title.innerText = "Yeşil Lojistik (ESG)"; subtitle.innerText = "Karbon Ayak İzi Optimizasyonu";
        content.className = textStyle;
        content.innerHTML = `<p>Ev tipi mikro fabrikalar sayesinde fabrikasyonun devasa enerji tüketimi sıfırlanır.</p><p>Yapay zekamız siparişi en yakın Hub'a atayarak ve <strong class="text-emerald-600">Bölgesel Dağıtım</strong> ağlarını kullanarak lojistik karbon emisyonunu minimize eder.</p>`;
    } else if(type === 'faq') {
        title.innerText = "Sıkça Sorulan Sorular"; subtitle.innerText = "Destek Merkezi";
        content.className = textStyle;
        content.innerHTML = `<ul class="space-y-4 list-none p-0 m-0">
            <li class="bg-slate-50 p-4 rounded-xl border border-slate-100"><strong class="text-slate-800 block mb-1 text-[11px] uppercase tracking-wider">Siparişi iptal edebilir miyim?</strong><span class="text-slate-600 text-xs">Sipariş 'WhatsApp Onayı Bekliyor' veya 'Sırada' ise %100 iade alırsınız. Üretici işi onaylamışsa %30 emeğe saygı payı kesilir.</span></li>
            <li class="bg-slate-50 p-4 rounded-xl border border-slate-100"><strong class="text-slate-800 block mb-1 text-[11px] uppercase tracking-wider">Teslimat ne kadar sürer?</strong><span class="text-slate-600 text-xs">Bölgesel dağıtım ağımız sayesinde Türkiye'nin her yerine 2 ila 4 iş günü içinde teslimat sağlanır.</span></li>
            <li class="bg-slate-50 p-4 rounded-xl border border-slate-100"><strong class="text-slate-800 block mb-1 text-[11px] uppercase tracking-wider">Saha iletişimi nasıl sağlanıyor?</strong><span class="text-slate-600 text-xs">Twilio API ile entegre WhatsApp Bot üzerinden üreticilere anlık iş teklifi gider. Üretici telefonundan 'EVET' diyerek işi kilitler.</span></li>
        </ul>`;
    }
    document.getElementById('infoModal').classList.remove('hidden-safely');
}
function closeInfoModal() { document.getElementById('infoModal').classList.add('hidden-safely'); }
function resetEverything() { if(confirm("Tüm sistem verileri sıfırlanacak. Emin misiniz?")) { localStorage.clear(); window.location.reload(); } }

function setupAddressAutomation() {
    const cityInput = document.getElementById('deliveryCity');
    const districtInput = document.getElementById('deliveryDistrict');
    const citiesList = document.getElementById('cities');
    if(!cityInput || !citiesList) return;
    citiesList.innerHTML = "";
    Object.keys(turkeyData).forEach(city => {
        const opt = document.createElement('option'); opt.value = city; citiesList.appendChild(opt);
    });
}

const GEMINI_API_KEY = window.ENV_API_KEY || ""; 

// ============================================================
// GÖREV 2: EVRENSEl REÇETE-ÜRÜN MANTIK FİLTRESİ
// ============================================================
async function checkSemanticFeasibility(productName, productDetails) {
    const sanitize = (str) => str.replace(/[`'"\\]/g, '').replace(/ignore|forget|pretend|jailbreak|DAN|system|assistant/gi, '[FİLTRE]').slice(0, 200);
    const safeName = sanitize(productName).toLowerCase();
    const safeDetails = sanitize(productDetails).toLowerCase();

    // SIFIR TOLERANS: Ağır Sanayi ve Hırdavat
    const forbidden = ['aks', 'motor', 'silah', 'beton', 'döküm', 'plastik enjeksiyon', 'ayakkabı', 'muz', 'elma', 'telefon', 'kablo', 'bilgisayar', 'araba', 'demir', 'çelik', 'kamyon', 'televizyon', 'petrol', 'çimento', 'sanayi tipi', 'jeneratör', 'klima', 'vida', 'çivi', 'somun', 'civata', 'hırdavat', 'metal'];
    if (forbidden.some(word => safeName.includes(word) || safeDetails.includes(word))) {
        return "RED: Bu ürün (Metal İşçiliği, Hırdavat veya Ağır Sanayi) kooperatif ev üretimi modelimize KESİNLİKLE uygun değildir.";
    }

    // -------------------------------------------------------
    // GELIŞTIRILMIŞ FALLBACK (API YOKSA) - EVRENSEl MANTIK
    // -------------------------------------------------------
    if(!GEMINI_API_KEY) {
        if(safeDetails.length < 3) return "RED: Lütfen ürün detaylarını eksiksiz belirtiniz.";

        const combined = safeName + ' ' + safeDetails;

        // Yasaklı malzeme/üretim yöntemi kontrolü (ev tipi üretilemez)
        const bannedMaterials = ['plastik enjeksiyon', 'cnc', 'alüminyum döküm', 'cam fırını', 'seramik fırını', 'polietilen', 'polikarbonat', 'fiberglas'];
        if (bannedMaterials.some(m => combined.includes(m))) {
            return `RED: Bu malzeme/üretim yöntemi (${bannedMaterials.find(m => combined.includes(m))}) ev tipi üretim modelimize uygun değildir.`;
        }

        // Birim grupları
        const sizeUnits  = ['cm', ' metre', ' m ', 'ebat', 'beden', ' s ', ' l ', ' xl ', ' xxl ', 'xs ', 'small', 'medium', 'large', 'numara', 'x beden'];
        const volumeUnits = ['ml', ' litre', ' lt', ' cc', 'fl oz'];
        const weightUnits = ['gram', ' gr', ' kg'];

        const hasSizeUnit   = sizeUnits.some(u => combined.includes(u));
        const hasVolumeUnit = volumeUnits.some(u => combined.includes(u));
        const hasWeightUnit = weightUnits.some(u => combined.includes(u));

        // --- KOZMETİK & KİMYA ---
        const cosmeticWords = ['sabun', 'krem', 'parfüm', 'kozmetik', 'losyon', 'serum', 'deodorant', 'şampuan', 'mum', 'balsam', 'kolonya', 'tonik', 'yağ', 'peeling', 'maske'];
        if (cosmeticWords.some(w => safeName.includes(w))) {
            if (hasSizeUnit && !hasVolumeUnit && !hasWeightUnit) {
                return "RED: Kozmetik/kimya ürünleri için ebat veya beden bilgisi geçersizdir.\nDoğru örnek: '50 ml, Lavanta Kokusu' veya '100g, Organik Zeytinyağı'";
            }
            return "ONAY|kimya";
        }

        // --- GIDA ---
        const foodWords = ['reçel', 'gıda', 'kuruyemiş', 'baharat', 'turşu', 'marmelat', 'pekmez', 'kuru', 'lokum', 'pestil', 'tahin', 'helva'];
        if (foodWords.some(w => safeName.includes(w))) {
            if (hasSizeUnit && !hasWeightUnit && !hasVolumeUnit) {
                return "RED: Gıda ürünleri için ebat/beden bilgisi geçersizdir.\nDoğru örnek: '250g, Karışık Fındık-Badem' veya '1 kg, Ev Yapımı Domates Salçası'";
            }
            return "ONAY|gida";
        }

        // --- TEKSTİL ---
        const textileWords = ['tişört', 't-shirt', 'çanta', 'hoodie', 'hırka', 'kazak', 'şapka', 'atkı', 'eldiven', 'amigurumi', 'bluz', 'etek', 'gömlek', 'pantolon', 'bere', 'bez çanta', 'örgü', 'tekstil'];
        if (textileWords.some(w => safeName.includes(w))) {
            if (hasVolumeUnit) {
                return "RED: Tekstil ürünleri için ml/litre gibi hacim birimi geçersizdir.\nDoğru örnek: 'L Beden, %100 Pamuk, Beyaz' veya 'Tek Ebat, Kanvas Kumaş, Bej'";
            }
            if (hasWeightUnit && !safeDetails.includes('gram') && !safeDetails.includes('iplik')) {
                return "RED: Tekstil ürünleri için gram/kg birimi yalnızca iplik/kumaş ağırlığı belirtirken kullanılabilir.\nDoğru örnek: 'M Beden, %100 Organik Pamuk, Lacivert' veya 'Tek Ebat, 300g Kanvas, Ekru'";
            }
            return "ONAY|tekstil";
        }

        // --- MONTAJ / AHŞAP ---
        const assemblyWords = ['ahşap', 'kutu', 'masa', 'iskemle', 'çerçeve', 'takı', 'kolye', 'bileklik', 'magnet', 'hediyelik', 'tablo', 'çerçeve', 'tepsi', 'kaşık', 'spatula'];
        if (assemblyWords.some(w => safeName.includes(w))) {
            if (hasVolumeUnit) {
                return "RED: Ahşap/montaj ürünleri için ml/litre hacim birimi geçersizdir.\nDoğru örnek: '20x30 cm, Naturel Ahşap, Ceviz Rengi' veya '15x15 cm, Boyasız'";
            }
            if (safeDetails.includes('beden') || safeDetails.includes(' xl') || safeDetails.includes(' xs')) {
                return "RED: Ahşap/montaj ürünleri için kıyafet bedeni bilgisi geçersizdir.\nDoğru örnek: '20x30 cm, Ceviz Ağacı, Ham' veya 'Boyut: 10x10 cm, Lake Beyaz'";
            }
            return "ONAY|montaj";
        }

        // --- PAKETLEME ---
        if (safeName.includes('paket') || safeName.includes('set') || safeName.includes('hediye')) return "ONAY|paketleme";

        return "ONAY|montaj";
    }
    
    // -------------------------------------------------------
    // ZIRHLI AI PROMPTU - EVRENSEl UYUMSUZLUK KURALI EKLENDİ
    // -------------------------------------------------------
    const prompt = `SYSTEM ROLE: Sen Micro Factory AI ürün kategori ve kalite kontrol denetçisisin. Ev tipi üretim kooperatifine ait bir sistemin denetçisisin.
GİRDİ:
ÜRÜN_ADI: ###${safeName}###
ÜRÜN_DETAYI: ###${safeDetails}###

KURALLAR:
1. MANTIK UYUMU (EN ÖNEMLİ): Ürün adı ile ürün detayı (reçete) MANTIKLI olmak ZORUNDADIR.
   - Kozmetik/Kimya (sabun, krem, parfüm, losyon, serum, mum, kolonya): Detayda ml, gram, kg, hacim veya koku/içerik bilgisi OLMALIDIR. Ebat (cm, metre), beden (S/M/L/XL) veya numara varsa KESİNLİKLE REDDET.
   - Tekstil (tişört, çanta, hoodie, kazak, şapka, atkı, bere, gömlek): Detayda beden (S/M/L/XL/tek ebat), renk, kumaş tipi OLMALIDIR. ml, litre gibi hacim birimi varsa KESİNLİKLE REDDET.
   - Gıda (reçel, baharat, turşu, marmelat, kuruyemiş): Detayda gram, kg veya içerik bilgisi OLMALIDIR. Beden veya ebat (cm) varsa KESİNLİKLE REDDET.
   - Montaj/Ahşap (kutu, çerçeve, tepsi, takı): Detayda boyut (cm), renk veya malzeme tipi OLMALIDIR. ml/litre veya kıyafet bedeni varsa KESİNLİKLE REDDET.

2. EVRENSEL BİRİM UYUMSUZLUĞU: Hangi ürün olursa olsun, birimi fiziksel doğasıyla uyuşmuyorsa REDDET.
   - Tişört için 50ml → MANTIK HATASI
   - Parfüm için 30x40 cm → MANTIK HATASI
   - Masa için XL Beden → MANTIK HATASI
   - Sabun için L Beden → MANTIK HATASI

3. EV DIŞI ÜRETİM: Plastik enjeksiyon, CNC tornalama, cam fırını, seramik fırını, alüminyum döküm, fiberglas gerektiren ürünler ev ortamında üretilemez → KESİNLİKLE REDDET.

4. DETAY ZORUNLULUĞU: Sadece anlamsız sayılar, tek kelime veya gereksiz genel ifadeler varsa REDDET.

5. KAPSAM DIŞI: Vida, çivi, metal işleme, motor, elektronik bileşen, cam eşya varsa KESİNLİKLE REDDET.

6. KATEGORİLEME: Sorun yoksa ürünü şu 5 kategoriden birine ata:
   - kimya  (Sabun, parfüm, krem, kozmetik, mum, kolonya, losyon)
   - tekstil (Çanta, kıyafet, örgü, amigurumi, şapka, atkı)
   - montaj  (Ahşap birleştirme, basit takı, hediyelik eşya)
   - paketleme (Kutu hazırlama, set oluşturma, hediye paketi)
   - gida   (Reçel, kuru gıda, baharat, tarım ürünü, lokum)

7. REHBERLİK (ÇOK ÖNEMLİ): Reddetmek zorundaysan RED mesajının sonunda mutlaka "Doğru örnek: [o ürün için uygun detay örneği]" şeklinde kullanıcıyı yönlendir. Kullanıcının hangi bilgiyi girmesi gerektiğini net anlasın.

ÇIKTI FORMATI: (Sadece bu formatta yanıt ver, başka hiçbir şey ekleme)
Uygunsa: ONAY|[kategori_kısa_ad]
Hatalıysa: RED|[Açıklayıcı hata sebebi ve Doğru örnek: ...]`;
    
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, { 
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }) 
        });
        const data = await res.json();
        let answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        const validCategories = ['kimya', 'tekstil', 'montaj', 'paketleme', 'gida'];
        const onayMatch = answer.match(/\bONAY\|\s*(\w+)\b/i);
        const redMatch = answer.match(/\bRED\|\s*(.+?)(?:\n|$)/i);
        if (onayMatch && validCategories.includes(onayMatch[1].toLowerCase())) return `ONAY|${onayMatch[1].toLowerCase()}`;
        if (redMatch) return `RED: ${redMatch[1]}`;
        return "RED: AI ürün ile reçete arasında mantıksal bir bağ kuramadı. Lütfen teknik detayları doğru giriniz.";
    } catch (e) { 
        return "RED: AI Bağlantı hatası. Lütfen tekrar deneyiniz."; 
    }
}

// ============================================================
// GÖREV 1: KURŞUN GEÇİRMEZ ADRES VALIDASYONU
// ============================================================

function isGenericNeighborhood(input) {
    const genericPool = new Set([
        'mahalle', 'mah', 'cadde', 'cad', 'sokak', 'sok',
        'bulvar', 'blv', 'ilçe', 'semt', 'bölge', 'merkez',
        'test', 'deneme', 'asdf', 'qwerty', 'abc', 'xyz',
        'aaa', 'bbb', 'ccc', 'xxx', 'yyy', 'zzz',
        'adres', 'no', 'numara', 'burası', 'burada',
        'sokağı', 'caddesi', 'mahallesi', 'bulvarı'
    ]);

    const normalized = input.toLocaleLowerCase('tr-TR').trim();
    const words = normalized.split(/[\s,.\-/]+/).filter(w => w.length > 0);

    if (words.length === 0) return true;

    const meaningfulWords = words.filter(w =>
        !genericPool.has(w) &&
        w.length > 2 &&
        !/^\d+$/.test(w)
    );

    return meaningfulWords.length === 0;
}

document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const details = document.getElementById('productDetails').value;
    const qty = Number(document.getElementById('quantity').value);
    const cityInput = document.getElementById('deliveryCity').value.trim();
    const districtInput = document.getElementById('deliveryDistrict').value.trim();
    const neighborhood = document.getElementById('deliveryNeighborhood').value.trim();
    const doorNo = document.getElementById('deliveryDoorNo').value.trim();

    if (doorNo === "") { showToast("Lütfen Bina/Kapı numarasını belirtiniz.", "error"); return; }
    if (districtInput.length < 2) { showToast("Lütfen geçerli bir ilçe giriniz.", "error"); return; }

    const foundCityKey = Object.keys(turkeyData).find(c => c.toLocaleLowerCase('tr-TR') === cityInput.toLocaleLowerCase('tr-TR'));
    if(!foundCityKey) { showToast(`Geçersiz İl Seçimi! Lütfen listeden geçerli bir il seçin.`, "error"); return; }

    const cityDistricts = turkeyData[foundCityKey] || [];
    const foundDistrict = cityDistricts.find(
        d => d.toLocaleLowerCase('tr-TR') === districtInput.toLocaleLowerCase('tr-TR')
    );
    if (!foundDistrict) {
        const suggestions = cityDistricts.slice(0, 4).join(', ');
        showToast(
            `"${districtInput}" ifadesi ${foundCityKey} ili için geçerli bir ilçe değil!\nGeçerli ilçe örnekleri: ${suggestions}`,
            "error"
        );
        return;
    }

    if (neighborhood.length < 3 || /^\d+$/.test(neighborhood)) {
        showToast("Lütfen geçerli bir Mahalle veya Cadde adı giriniz.", "error");
        return;
    }
    if (isGenericNeighborhood(neighborhood)) {
        showToast(
            `"${neighborhood}" geçerli bir adres değildir.\nLütfen gerçek mahalle/cadde adını giriniz.\nÖrnek: "Atatürk Mah.", "İstiklal Cad.", "Bahçelievler Sok."`,
            "error"
        );
        return;
    }

    const fullAddress = `${foundCityKey} / ${foundDistrict}, ${neighborhood}, No: ${doorNo}`;

    document.getElementById('alertBox').classList.add('hidden-safely');
    const tableWrapper = document.getElementById('tableWrapper');
    tableWrapper.innerHTML = `<div class="flex flex-col items-center justify-center h-full py-6"><div class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div><p class="text-[10px] font-black text-indigo-600 mt-4 animate-pulse uppercase">Terminatör AI Denetim Yapıyor...</p></div>`;
    document.getElementById('actionPanel').classList.add('hidden-safely');
    document.getElementById('confirmMessage').innerHTML = ""; 

    const aiResponse = await checkSemanticFeasibility(name, details);
    
    if(aiResponse.startsWith("RED:")) {
        tableWrapper.innerHTML = `<div class="h-full flex flex-col items-center justify-center py-6 text-slate-300 opacity-40"><svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517"></path></svg><p class="text-[9px] font-black uppercase tracking-widest text-center">AI Lojistik Analizi<br>Bekleniyor...</p></div>`;
        document.getElementById('alertBox').classList.remove('hidden-safely');
        document.getElementById('alertMessage').innerText = aiResponse.replace("RED:", "").trim();
        return;
    }

    let detectedCategory = aiResponse.includes("|") ? aiResponse.split("|")[1].trim().toLowerCase() : "montaj";
    const catDisplay = document.getElementById('categoryDisplay');
    if (catDisplay) catDisplay.innerHTML = `<span class="text-indigo-700 font-black">${categoryNames[detectedCategory] || "Hafif Montaj"}</span> <span class="bg-emerald-100 text-emerald-700 text-[8px] px-2 py-1 rounded ml-2">AI</span>`;
    const cost = (categoryPrices[detectedCategory] || 20) * qty;
    
    let targetRegion = "Marmara"; 
    for (const [reg, cities] of Object.entries(regionData)) if (cities.includes(foundCityKey)) { targetRegion = reg; break; }
    
    let eligibleProducers = producers.filter(p => p.status === "Aktif");
    eligibleProducers.sort((a, b) => {
        let aLocal = (a.region === targetRegion) ? 1 : 0;
        let bLocal = (b.region === targetRegion) ? 1 : 0;
        if (aLocal !== bLocal) return bLocal - aLocal;
        return b.trustScore - a.trustScore;
    });

    let remaining = qty;
    let allocations = [];
    let totalCo2 = 0;
    
    for (const p of eligibleProducers) {
        if (remaining <= 0) break;
        let multiplier = 0.1;
        if(p.primarySkill === detectedCategory) multiplier = 1.0; 
        else if(p.secondarySkills.includes(detectedCategory)) multiplier = 0.4; 
        let effectiveCapacity = Math.floor(p.capacity * multiplier);
        if (effectiveCapacity < 10) { if (remaining < 100) continue; effectiveCapacity = 10; }
        let give = Math.min(effectiveCapacity, remaining);
        if (give <= 0) continue;
        let dist = (p.region === targetRegion) ? Math.floor(Math.random() * 35) + 15 : Math.floor(Math.random() * 600) + 200; 
        let co2 = (give * dist * 0.02).toFixed(0); 
        totalCo2 += Number(co2);
        allocations.push({ name: p.name, sourceCity: p.city, targetCity: foundCityKey, dist, isLocal: (p.region === targetRegion), qty: give, co2 });
        remaining -= give;
    }

    let isOverflow = false;
    let overflowQty = 0;
    let producedQty = qty - remaining;
    let isMilkRun = (qty < 50) && remaining === 0;

    let confirmHtml = "";
    if (remaining > 0) {
        isOverflow = true;
        overflowQty = remaining;
        allocations.push({ name: "Kapasite Aşımı (Sıraya Alındı)", sourceCity: "Sistem Havuzu", targetCity: foundCityKey, dist: 0, isLocal: false, qty: remaining, co2: 0, isQueue: true });
        confirmHtml += `<p class="mb-2"><b>⚠️ KAPASİTE AŞIMI:</b> Talebinizin ${producedQty.toLocaleString()} adedi hemen üretime, kalan ${overflowQty.toLocaleString()} adedi sıraya (Queue) alınacaktır.</p>`;
    }
    if (isMilkRun) {
        confirmHtml += `<p class="mb-2"><b>🚚 HAVUZLU DAĞITIM:</b> Siparişiniz 50 adetin altında olduğu için anında kargo yerine 'Bölgesel Dağıtım' havuzuna dahil edilecektir.</p>`;
    }
    
    confirmHtml += `<p class="mb-2"><b>📱 WHATSAPP ONAYI:</b> Siparişi onayladığınızda atanan üreticilere WhatsApp üzerinden anlık mesaj gidecek ve 30 dakikalık onay süreci başlayacaktır.</p>`;

    if (confirmHtml !== "") {
        document.getElementById('confirmMessage').innerHTML = `
            <div class="w-full bg-amber-500/20 border border-amber-500/50 p-4 rounded-xl mb-5 text-left animate-slide">
                <div class="text-amber-100 text-[11px] font-bold leading-relaxed">
                    ${confirmHtml}
                    <p class="mt-2 text-white border-t border-amber-500/30 pt-2 uppercase tracking-widest text-[9px]">Bu şartları onaylıyor musunuz?</p>
                </div>
            </div>
        `;
    }

    const treeEquivalent = (totalCo2 / 100).toFixed(1);
    
    let html = `<div class="w-full overflow-x-auto pb-4"><table class="w-full text-left text-sm min-w-[600px] animate-slide-up"><thead class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 bg-slate-50/50"><tr><th class="py-4 px-4 rounded-l-lg">Esnek Hub Ataması</th><th class="py-4 px-4 text-center">Atanan Adet</th><th class="py-4 px-4">Kargo Rotası</th><th class="py-4 px-4 text-right rounded-r-lg">CO₂ Emisyonu</th></tr></thead><tbody class="divide-y divide-slate-100 text-slate-700">`;
    allocations.forEach(a => {
        let badge = a.isQueue ? `<span class="ml-2.5 text-[8px] bg-rose-100 text-rose-700 px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider shadow-inner hidden sm:inline-block">BEKLEMEDE</span>` : (a.isLocal ? `<span class="ml-2.5 text-[8px] bg-emerald-100 text-emerald-700 px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider shadow-inner hidden sm:inline-block">Yerel Çözüm</span>` : `<span class="ml-2.5 text-[8px] bg-amber-100 text-amber-700 px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider shadow-inner hidden sm:inline-block">Ağ Taşması</span>`);
        html += `<tr class="hover:bg-indigo-50/50 transition-colors">
            <td class="py-5 px-4 font-bold text-slate-900 flex items-center gap-1">${a.name}${badge}</td>
            <td class="py-5 px-4 text-center font-mono font-black ${a.isQueue ? 'text-rose-600' : 'text-indigo-600'} text-lg">${a.qty.toLocaleString()}</td>
            <td class="py-5 px-4 text-slate-500 text-xs font-medium leading-relaxed">${a.isQueue ? 'Sırada Bekliyor' : `${a.sourceCity} ➔ ${a.targetCity}`}<br><span class="text-[10px] opacity-50 font-mono">${a.isQueue ? '-' : a.dist+' km'}</span></td>
            <td class="py-5 px-4 text-right font-mono font-bold ${isMilkRun ? 'text-emerald-500' : 'text-slate-500'}">${isMilkRun ? '0g (Havuzlu Dağıtım)' : (a.isQueue ? '-' : Number(a.co2).toLocaleString()+'g')}</td>
        </tr>`;
    });
    html += `</tbody></table></div>
    <div class="mt-4 p-5 bg-indigo-50 text-indigo-900 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 shadow-inner">
        <div class="flex items-start gap-4"><div class="text-3xl">🌱</div><div><p class="text-[11px] font-bold leading-relaxed uppercase tracking-wider">Planlama Tamamlandı: <b>${treeEquivalent} ağacın</b> oksijen üretimine eşdeğer tasarruf.</p><p class="text-[10px] text-indigo-600 font-bold mt-1 uppercase tracking-widest">⚠️ Onaydan sonraki iptallerde %30 'Emeğe Saygı Payı' kesilir.</p></div></div>
        <div class="bg-white px-5 py-3 rounded-xl shadow-sm border border-indigo-100 text-center shrink-0 w-full sm:w-auto"><p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">B2B Bütçe</p><p class="text-xl font-black text-indigo-700 font-mono">₺${cost.toLocaleString('tr-TR')}</p></div>
    </div>`;
    tableWrapper.innerHTML = html;
    document.getElementById('actionPanel').classList.remove('hidden-safely');
    
    let etaMessage = isOverflow ? "Kısmi Bekleme (Kapasite Sırada)" : (isMilkRun ? "Bölgesel Dağıtım Havuzu + 1 Gün" : "2-4 İş Günü");
    document.getElementById('etaText').innerText = etaMessage;

    currentOrderTemp = { 
        id: Date.now(), 
        date: new Date().toLocaleDateString(), 
        product: name, 
        info: `${qty.toLocaleString()} Adet / ${fullAddress} / ${details}`, 
        status: isOverflow ? "⏳ Üretim Sırasına Alındı" : "📱 WhatsApp Onayı Bekliyor (30dk)", 
        totalCost: cost,
        totalCo2Gram: totalCo2
    };
});

function confirmOrder() {
    if(!currentOrderTemp) return;
    orderHistory.unshift(currentOrderTemp);
    localStorage.setItem('mf_orders_v16', JSON.stringify(orderHistory));
    if (currentOrderTemp.totalCo2Gram) {
        totalCo2Savings += currentOrderTemp.totalCo2Gram;
        localStorage.setItem('mf_co2_total_v16', JSON.stringify(totalCo2Savings));
    }
    
    showToast("Sipariş üreticilerin WhatsApp hesaplarına iletildi! 30 dk onay süreci başladı.", "warning");
    resetOrderForm(); switchTab('historyTab'); updateKPIs();
}

function cancelOrder() {
    document.getElementById('actionPanel').classList.add('hidden-safely');
    const tableWrapper = document.getElementById('tableWrapper');
    if (tableWrapper) tableWrapper.innerHTML = `<div class="p-12 text-center text-slate-500 animate-slide"><div class="text-4xl mb-4">🛑</div><p class="font-black uppercase tracking-widest text-[11px] leading-loose mb-6">İşlem İptal Edildi.</p><button onclick="resetOrderForm()" class="px-8 py-4 bg-slate-100 text-slate-600 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-colors shadow-sm mx-auto inline-block">YENİ SİPARİŞ GİR</button></div>`;
    currentOrderTemp = null;
    showToast("İşlem kullanıcı tarafından iptal edildi.", "warning");
}

function resetOrderForm() { 
    document.getElementById('orderForm').reset(); 
    document.getElementById('actionPanel').classList.add('hidden-safely'); 
    document.getElementById('categoryDisplay').innerHTML = `<span class="opacity-80 uppercase tracking-widest">✨ AI SEÇİMİ</span>`;
    const tableWrapper = document.getElementById('tableWrapper');
    if (tableWrapper) tableWrapper.innerHTML = `<div class="h-full flex flex-col items-center justify-center py-6 text-slate-300 opacity-40"><svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517"></path></svg><p class="text-[9px] font-black uppercase tracking-widest text-center">AI Lojistik Analizi<br>Bekleniyor...</p></div>`;
    currentOrderTemp = null;
}

function switchTab(id) { 
    ['orderTab', 'historyTab', 'producersTab'].forEach(t => {
        const el = document.getElementById(t);
        const btn = document.getElementById(`btn-${t}`);
        
        if(!el) return;
        
        if(t === id) {
            el.classList.remove('hidden-safely');
        } else {
            el.classList.add('hidden-safely');
        }

        if(btn) {
            if(t === id) btn.className = "px-5 sm:px-7 py-3 text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all rounded-xl bg-indigo-600 text-white shadow-md flex items-center gap-2 shrink-0";
            else btn.className = "px-5 sm:px-7 py-3 text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all rounded-xl text-slate-500 hover:bg-white/80 hover:text-indigo-600 flex items-center gap-2 shrink-0";
        }
    }); 
    if(id === 'historyTab') renderHistory(); 
    if(id === 'producersTab') renderProducers();
}

function openLogin() { document.getElementById('loginScreen').classList.remove('hidden-safely'); }
function closeLogin() { document.getElementById('loginScreen').classList.add('hidden-safely'); }
document.getElementById('authForm').addEventListener('submit', (e) => { e.preventDefault(); closeLogin(); document.getElementById('userProfileMenu').classList.remove('hidden-safely'); document.getElementById('headerLoginBtn').classList.add('hidden-safely'); showToast("Sisteme başarıyla giriş yapıldı.", "success");});
function logout() { document.getElementById('userProfileMenu').classList.add('hidden-safely'); document.getElementById('headerLoginBtn').classList.remove('hidden-safely'); showToast("Güvenli çıkış yapıldı.", "warning");}

window.cancelHistoryOrder = function(index) {
    let order = orderHistory[index];
    
    if (order.status.includes("Kargo") || order.status.includes("Tamamlandı")) {
        alert("Bu sipariş kargoya verilmiş veya tamamlanmıştır. İptal işlemi yapılamaz!");
        return;
    }

    if (order.status.includes("Sırasına Alındı") || order.status.includes("WhatsApp Onayı Bekliyor")) {
        if(!confirm(`Sipariş henüz üretici tarafından WhatsApp üzerinden onaylanıp üretime geçmediği için ₺${order.totalCost.toLocaleString('tr-TR')} tutarının TAMAMI (%100) kesintisiz iade edilecektir. İptal etmek istiyor musunuz?`)) return;
        showToast(`₺${order.totalCost.toLocaleString('tr-TR')} kesintisiz iade edildi.`, "success");
    } else {
        let kesinti = order.totalCost * 0.3;
        let iade = order.totalCost * 0.7;
        
        if(!confirm(`⚠️ DİKKAT! Bu sipariş üretici tarafından onaylanmış ve üretime girmiştir.\n\nToplam Tutar: ₺${order.totalCost.toLocaleString('tr-TR')}\nKesilecek Emeğe Saygı Payı (%30): ₺${kesinti.toLocaleString('tr-TR')}\nİade Edilecek Tutar: ₺${iade.toLocaleString('tr-TR')}\n\nİptal işlemini onaylıyor musunuz?`)) return;
        
        showToast(`%30 Kesinti uygulandı. \n₺${iade.toLocaleString('tr-TR')} iade sağlandı.`, "warning");
    }
    
    if (order.totalCo2Gram) {
        totalCo2Savings -= order.totalCo2Gram;
        if (totalCo2Savings < 0) totalCo2Savings = 0;
        localStorage.setItem('mf_co2_total_v16', JSON.stringify(totalCo2Savings));
    }

    orderHistory.splice(index, 1);
    localStorage.setItem('mf_orders_v16', JSON.stringify(orderHistory));
    renderHistory();
    updateKPIs();
};

function clearHistory() {
    if(confirm("Tüm sipariş geçmişini silmek istediğinize emin misiniz?")) {
        orderHistory = [];
        totalCo2Savings = 0;
        localStorage.setItem('mf_orders_v16', JSON.stringify(orderHistory));
        localStorage.setItem('mf_co2_total_v16', JSON.stringify(totalCo2Savings));
        renderHistory();
        updateKPIs();
        showToast("Sipariş geçmişi ve çevresel veriler sıfırlandı.", "success");
    }
}

function renderHistory() { 
    const el = document.getElementById('historyBody');
    if(!el) return;
    if (orderHistory.length === 0) { el.innerHTML = `<div class="p-10 text-center text-slate-400"><p class="text-xs font-black uppercase tracking-widest">Henüz hiç sipariş verilmedi.</p></div>`; return; }
    
    let html = `<div class="flex justify-end mb-4"><button onclick="clearHistory()" class="text-[9px] font-black text-rose-500 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg uppercase tracking-widest transition-colors border border-rose-100 flex items-center gap-1 shadow-sm">🗑️ Geçmişi Temizle</button></div>`;
    
    html += orderHistory.map((o, index) => {
        let statusClass = o.status.includes('WhatsApp') || o.status.includes('Sırasına Alındı') ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                         (o.status.includes('Üretimde') ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-indigo-50 text-indigo-600 border-indigo-100');
                         
        return `
        <div class="p-6 mb-4 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
            <div class="flex-1">
                <b class="text-slate-800 text-base uppercase font-black tracking-tight">${o.product}</b><br>
                <span class="text-xs text-slate-500 font-medium leading-relaxed">${o.info}</span>
                <div class="mt-3 flex items-center gap-3">
                    <span class="px-3 py-1.5 rounded-lg font-bold text-[9px] uppercase tracking-widest shadow-inner border inline-flex items-center gap-2 ${statusClass}">
                        ${o.status}
                    </span>
                    <button onclick="cancelHistoryOrder(${index})" class="text-[9px] font-black text-rose-500 hover:text-white hover:bg-rose-500 bg-rose-50 px-3 py-1.5 rounded-lg uppercase tracking-widest transition-colors border border-rose-100">Siparişi İptal Et</button>
                </div>
            </div>
            <div class="text-xl font-black text-slate-900 font-mono sm:text-right">₺${(o.totalCost || 0).toLocaleString('tr-TR')}</div>
        </div>
        `;
    }).join(""); 
    el.innerHTML = html;
}

function renderProducers() { 
    const el = document.getElementById('producersBody');
    if(!el) return;
    let displayProducers = producers.filter(p => p.status !== 'İhraç (Kalıcı)');
    el.innerHTML = displayProducers.map(p => {
        let badgeClass = p.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100';
        let pName = categoryNames[p.primarySkill] ? categoryNames[p.primarySkill].toUpperCase() : p.primarySkill.toUpperCase();
        let primaryHtml = `<span class="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[8px] font-black tracking-widest mr-1 mb-1 inline-flex items-center gap-1 border border-indigo-200" title="Ana Uzmanlık">⭐ ${pName} (%100)</span>`;
        let secondaryHtml = p.secondarySkills.map(s => { let sName = categoryNames[s] ? categoryNames[s].toUpperCase() : s.toUpperCase(); return `<span class="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[8px] font-black tracking-widest mr-1 mb-1 inline-block border border-slate-200" title="Yan Uzmanlık">${sName} (%40)</span>`; }).join("");
        let otherHtml = `<span class="px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded text-[8px] font-bold tracking-widest mr-1 mb-1 inline-block border border-slate-100" title="Diğer Esnek İşler">DİĞER ESNEK İŞLER (%10)</span>`;
        return `<tr class="border-b border-slate-50 hover:bg-slate-50 transition-colors"><td class="py-5 px-6 font-black text-slate-800 uppercase">${p.name}<div class="mt-1.5">${primaryHtml}${secondaryHtml}${otherHtml}</div></td><td class="py-5 px-6 text-xs text-slate-500 font-bold">${p.city}</td><td class="py-5 px-6 text-emerald-600 font-bold font-mono">${p.trustScore}/10</td><td class="py-5 px-6 font-mono font-bold text-slate-600">${p.capacity.toLocaleString()}</td><td class="py-5 px-6"><span class="px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${badgeClass}">${p.status}</span></td></tr>`;
    }).join(""); 
}

// DEMO VİDEOSU İÇİN OTONOM SÜREÇ SİMÜLATÖRÜ (HIZLANDIRILMIŞ)
function startDemoVideoSimulation() {
    setInterval(() => {
        let isChanged = false;
        orderHistory.forEach(order => {
            if (order.status.includes("Sırasına Alındı")) {
                order.status = "📱 WhatsApp Onayı Bekliyor (30dk)";
                isChanged = true;
            } else if (order.status.includes("WhatsApp Onayı Bekliyor")) {
                order.status = "✅ Üretimde (SLA Aktif)";
                isChanged = true;
            } else if (order.status === "✅ Üretimde (SLA Aktif)") {
                order.status = "📦 Hub Kalite Kontrol (QC)";
                isChanged = true;
            } else if (order.status === "📦 Hub Kalite Kontrol (QC)") {
                order.status = "🚚 Kargoya Verildi";
                isChanged = true;
            }
        });

        if (isChanged) {
            localStorage.setItem('mf_orders_v16', JSON.stringify(orderHistory));
            if(document.getElementById('historyTab') && !document.getElementById('historyTab').classList.contains('hidden-safely')) {
                renderHistory(); 
            }
        }
    }, 8000);
}

window.onload = () => { 
    setupAddressAutomation(); 
    updateKPIs(); 
    startDynamicLiveFeed();
    renderHistory();
    renderProducers();
    startDemoVideoSimulation();
};



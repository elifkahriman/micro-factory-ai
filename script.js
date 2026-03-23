// --- 1. VERİ TABANI ---
const regionData = {
    "İç Anadolu": ["Ankara", "Eskişehir", "Konya", "Kayseri", "Sivas", "Aksaray", "Nevşehir", "Niğde"],
    "Marmara": ["İstanbul", "Bursa", "Balıkesir", "Kocaeli", "Tekirdağ", "Çanakkale", "Edirne", "Sakarya"],
    "Ege": ["İzmir", "Manisa", "Denizli", "Aydın", "Muğla", "Afyonkarahisar", "Kütahya", "Uşak"],
    "Doğu ve Güneydoğu": ["Gaziantep", "Mardin", "Diyarbakır", "Şanlıurfa", "Van", "Erzurum", "Malatya", "Elazığ"],
    "Akdeniz": ["Antalya", "Adana", "Hatay", "Mersin", "Isparta", "Burdur", "Osmaniye", "Kahramanmaraş"],
    "Karadeniz": ["Rize", "Trabzon", "Samsun", "Artvin", "Ordu", "Giresun", "Zonguldak", "Tokat"]
};

// İLÇE ÖNERİ VERİSİ
const districtData = {
    "İzmir": ["Karşıyaka", "Bornova", "Konak", "Buca", "Bayraklı", "Çiğli"],
    "Ankara": ["Çankaya", "Keçiören", "Yenimahalle", "Etimesgut", "Sincan", "Gölbaşı"],
    "İstanbul": ["Beşiktaş", "Kadıköy", "Şişli", "Üsküdar", "Esenyurt", "Pendik"],
    "Bursa": ["Nilüfer", "Osmangazi", "Yıldırım", "Mudanya"],
    "Antalya": ["Muratpaşa", "Kepez", "Konyaaltı"],
    "Kocaeli": ["İzmit", "Gebze", "Kartepe", "Gölcük"],
    "Bolu": ["Merkez", "Gerede", "Mengen", "Mudurnu"]
};

const categoryPrices = { "kimya": 120, "tekstil": 90, "montaj": 65, "paketleme": 25, "gida": 145 };
const categoryNames = { "kimya": "Doğal Kozmetik & Kimya", "tekstil": "Tekstil & Örme", "montaj": "Hafif Montaj", "paketleme": "Paketleme & Tasnif", "gida": "İleri Dönüşüm & Butik Gıda" };

const defaultProducers = [
    { name: "Sincan Kadın Kooperatifi Hub", capacity: 1200, city: "Ankara", trustScore: 9.8, status: "Aktif" },
    { name: "Bursa İpek ve Tekstil Hub", capacity: 2500, city: "Bursa", trustScore: 9.9, status: "Aktif" },
    { name: "Ege Doğal Yaşam Kooperatifi", capacity: 1800, city: "İzmir", trustScore: 9.8, status: "Aktif" }
];

let orderHistory = JSON.parse(localStorage.getItem('mf_orders_v3')) || [];

window.onload = () => { setupAddressAutomation(); updateKPIs(); };

// ADRES OTOMASYONU
function setupAddressAutomation() {
    const cityInput = document.getElementById('deliveryCity');
    const districtInput = document.getElementById('deliveryDistrict');
    const districtsList = document.getElementById('districtsList');
    
    cityInput.addEventListener('input', () => {
        const city = cityInput.value.trim();
        districtsList.innerHTML = "";
        if (districtData[city]) {
            districtData[city].forEach(d => {
                const opt = document.createElement('option'); opt.value = d; districtsList.appendChild(opt);
            });
        }
    });
}

// AI DENETİM MOTORU
const GEMINI_API_KEY = window.ENV_API_KEY || ""; 

async function checkSemanticFeasibility(productName, productDetails) {
    const pNameLower = productName.toLowerCase().trim();
    const detailsLower = productDetails.toLowerCase().trim();
    
    // Temel Kalkan
    const forbidden = ['aks', 'motor', 'silah', 'beton', 'döküm', 'plastik', 'ayakkabı', 'muz', 'elma'];
    if (forbidden.some(word => pNameLower.includes(word))) return "RED: Bu ürün (Ağır Sanayi/Taze Gıda) kooperatif ev üretimi modelimize uygun değildir.";

    if(!GEMINI_API_KEY) {
        // DEMO MODU: Sayı + Kelime Sayısı Kontrolü
        if (!/\d/.test(detailsLower) || detailsLower.split(' ').length < 2) 
            return "RED: Eksik Bilgi! Lütfen notlar kısmında ürünün türünü (çilek, vişne, siyah vb.) ve ölçüsünü (300gr, 50 adet vb.) birlikte belirtiniz.";
        if(pNameLower.includes('reçel')) return "ONAY|gida";
        if(pNameLower.includes('hoodi')) return "ONAY|tekstil";
        return "ONAY|montaj";
    }
    
    try {
        const prompt = `Sen Micro Factory AI Baş Denetçisisin. Ürün: '${productName}', Detay: '${productDetails}'.
        SİSTEMSEL KURALLAR:
        1. Ürün Kimliği ŞART: Detay kısmında ürünün spesifik türü (çilek, vişne, portakal, siyah, pamuklu, lavantalı vb.) YOKSA REDDET. "300 gr kavanoz" yetmez, "300 gr Çilek Reçeli" lazım.
        2. Ölçü ŞART: Gramaj, adet, beden veya ml bilgisi YOKSA REDDET.
        3. Fabrikasyon: Kadınların evde yapamayacağı işleri REDDET.
        Yanıt Formatı: RED|[Gerekçe] veya ONAY|[kategori: kimya, tekstil, montaj, paketleme, gida]`;
        
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, { 
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }) 
        });
        const data = await res.json();
        let answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "ONAY|montaj";
        if(answer.startsWith("RED|")) return "RED: " + answer.split("|")[1];
        return answer;
    } catch (e) { return "ONAY|montaj"; }
}

// SİPARİŞ TETİKLEYİCİ
document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const details = document.getElementById('productDetails').value;
    const qty = Number(document.getElementById('quantity').value);
    const city = document.getElementById('deliveryCity').value.trim();
    const district = document.getElementById('deliveryDistrict').value.trim();
    const neighborhood = document.getElementById('deliveryNeighborhood').value.trim();
    const doorNo = document.getElementById('deliveryDoorNo').value.trim();

    // Adres ve Şehir Kontrolü
    const cityNorm = city.toLocaleLowerCase('tr-TR');
    const districtNorm = district.toLocaleLowerCase('tr-TR');
    const fullAddress = `${city} / ${district}, ${neighborhood}, No: ${doorNo}`;

    const majorCities = ["adana", "ankara", "antalya", "bursa", "istanbul", "izmir", "kocaeli", "bolu", "kayseri"];
    let conflict = majorCities.find(c => districtNorm.includes(c) && c !== cityNorm);
    if (conflict) { alert(`⚠️ Hata: İl '${city}' seçildi ancak adreste '${conflict.toUpperCase()}' ili geçiyor.`); return; }

    document.getElementById('alertBox').classList.add('hidden-safely');
    const tableWrapper = document.getElementById('tableWrapper');
    tableWrapper.innerHTML = `<div class="flex flex-col items-center justify-center h-48"><div class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div><p class="text-[10px] font-black text-indigo-600 mt-4 animate-pulse uppercase">AI Sistemsel Denetim Yapıyor...</p></div>`;
    document.getElementById('actionPanel').classList.add('hidden-safely');

    const aiResponse = await checkSemanticFeasibility(name, details);
    
    if(aiResponse.startsWith("RED:")) {
        tableWrapper.innerHTML = `<p class="text-[10px] font-black text-slate-300 uppercase">AI Lojistik Analizi Bekleniyor...</p>`;
        document.getElementById('alertBox').classList.remove('hidden-safely');
        document.getElementById('alertMessage').innerText = aiResponse.replace("RED:", "").trim();
        return;
    }

    let detectedCategory = aiResponse.includes("|") ? aiResponse.split("|")[1].trim().toLowerCase() : "montaj";
    document.getElementById('categoryDisplay').innerHTML = `<span class="text-indigo-700 font-black">${categoryNames[detectedCategory] || "Hafif Montaj"}</span> <span class="bg-emerald-100 text-emerald-700 text-[8px] px-2 py-1 rounded ml-2">AI</span>`;

    const cost = (categoryPrices[detectedCategory] || 20) * qty;
    let allocations = [{ name: "Bölgesel Hub", qty: qty, co2: Math.floor(qty * 25 * 0.02) }];

    tableWrapper.innerHTML = `<table class="w-full text-left text-xs"><thead class="font-black text-slate-400 border-b"><tr><th class="py-3">Hub</th><th class="py-3">Adet</th><th class="py-3">CO2</th></tr></thead><tbody><tr class="border-b font-medium"><td class="py-4">En Uygun Hub Ağı</td><td class="font-bold text-indigo-600">${qty}</td><td>${Math.floor(qty * 0.5)}g</td></tr></tbody></table><div class="mt-6 p-4 bg-indigo-50 rounded-xl flex justify-between items-center"><p class="text-[10px] font-bold">🌱 TASARRUF: ${(qty/100).toFixed(1)} AĞAÇ</p><p class="text-xl font-black text-indigo-700 font-mono">₺${cost.toLocaleString('tr-TR')}</p></div>`;
    
    document.getElementById('actionPanel').classList.remove('hidden-safely');
    document.getElementById('etaText').innerText = "2-4 İş Günü";
    currentOrderTemp = { product: name, info: `${qty} Adet / ${fullAddress} / Detay: ${details}`, cost: cost };
});

function confirmOrder() {
    orderHistory.unshift(currentOrderTemp);
    localStorage.setItem('mf_orders_v3', JSON.stringify(orderHistory));
    resetOrderForm(); switchTab('historyTab'); updateKPIs();
}

function updateKPIs() {
    document.getElementById('kpiCapacity').innerText = "4,500";
    document.getElementById('kpiActiveProducers').innerText = "12";
}

function resetOrderForm() { document.getElementById('orderForm').reset(); document.getElementById('actionPanel').classList.add('hidden-safely'); }
function switchTab(id) { ['orderTab', 'historyTab'].forEach(t => document.getElementById(t).className = (t===id ? 'animate-slide' : 'hidden-safely')); if(id==='historyTab') renderHistory(); }
function openLogin() { document.getElementById('loginScreen').classList.remove('hidden-safely'); }
document.getElementById('authForm').addEventListener('submit', (e) => { e.preventDefault(); document.getElementById('loginScreen').classList.add('hidden-safely'); document.getElementById('userProfileMenu').classList.remove('hidden-safely'); document.getElementById('headerLoginBtn').classList.add('hidden-safely'); });
function logout() { document.getElementById('userProfileMenu').classList.add('hidden-safely'); document.getElementById('headerLoginBtn').classList.remove('hidden-safely'); }
function renderHistory() { document.getElementById('historyBody').innerHTML = orderHistory.map(o => `<div class="p-6 border rounded-xl bg-white shadow-sm"><b>${o.product}</b><br><span class="text-[10px] text-slate-500">${o.info}</span></div>`).join(""); }

// --- 1. VERİ TABANI ---
const regionData = {
    "İç Anadolu": ["Ankara", "Eskişehir", "Konya", "Kayseri", "Sivas", "Aksaray", "Nevşehir", "Niğde"],
    "Marmara": ["İstanbul", "Bursa", "Balıkesir", "Kocaeli", "Tekirdağ", "Çanakkale", "Edirne", "Sakarya"],
    "Ege": ["İzmir", "Manisa", "Denizli", "Aydın", "Muğla", "Afyonkarahisar", "Kütahya", "Uşak"],
    "Doğu ve Güneydoğu": ["Gaziantep", "Mardin", "Diyarbakır", "Şanlıurfa", "Van", "Erzurum", "Malatya", "Elazığ"],
    "Akdeniz": ["Antalya", "Adana", "Hatay", "Mersin", "Isparta", "Burdur", "Osmaniye", "Kahramanmaraş"],
    "Karadeniz": ["Rize", "Trabzon", "Samsun", "Artvin", "Ordu", "Giresun", "Zonguldak", "Tokat"]
};

const districtSuggestions = {
    "İzmir": ["Karşıyaka", "Bornova", "Konak", "Çiğli", "Buca", "Bayraklı", "Gaziemir"],
    "Ankara": ["Çankaya", "Keçiören", "Yenimahalle", "Sincan", "Etimesgut", "Gölbaşı"],
    "İstanbul": ["Beşiktaş", "Kadıköy", "Şişli", "Üsküdar", "Esenyurt", "Pendik", "Fatih"],
    "Bolu": ["Merkez", "Gerede", "Mengen", "Mudurnu", "Göynük"],
    "Bursa": ["Nilüfer", "Osmangazi", "Yıldırım", "Mudanya", "Gemlik"],
    "Kocaeli": ["İzmit", "Gebze", "Kartepe", "Darica", "Körfez"]
};

const categoryPrices = { "kimya": 120, "tekstil": 90, "montaj": 65, "paketleme": 25, "gida": 145 };
const categoryNames = {
    "kimya": "Doğal Kozmetik & Kimya",
    "tekstil": "Tekstil & Örme",
    "montaj": "Hafif Montaj",
    "paketleme": "Paketleme & Tasnif",
    "gida": "İleri Dönüşüm & Butik Gıda"
};

const defaultProducers = [
    { id: "H1", name: "Sincan Kadın Kooperatifi Hub", capacity: 1200, city: "Ankara", region: "İç Anadolu", trustScore: 9.8, strikes: 0, status: "Aktif", badge: "Merkez Hub" },
    { id: "H7", name: "Bursa İpek ve Tekstil Hub", capacity: 2500, city: "Bursa", region: "Marmara", trustScore: 9.9, strikes: 0, status: "Aktif", badge: "Merkez Hub" },
    { id: "H12", name: "Ege Doğal Yaşam Kooperatifi", capacity: 1800, city: "İzmir", region: "Ege", trustScore: 9.8, strikes: 0, status: "Aktif", badge: "Merkez Hub" }
];

if (!localStorage.getItem('mf_producers_v3')) localStorage.setItem('mf_producers_v3', JSON.stringify(defaultProducers));
if (!localStorage.getItem('mf_orders_v3')) localStorage.setItem('mf_orders_v3', JSON.stringify([]));

let producers = JSON.parse(localStorage.getItem('mf_producers_v3'));
let orderHistory = JSON.parse(localStorage.getItem('mf_orders_v3'));

window.onload = () => {
    updateKPIs();
    setupAddressAutomation();
};

// --- ADRES OTOMASYONU ---
function setupAddressAutomation() {
    const cityInput = document.getElementById('deliveryCity');
    const districtInput = document.getElementById('deliveryDistrict');
    const districtsList = document.getElementById('districtsList');
    
    cityInput.addEventListener('input', () => {
        const selectedCity = cityInput.value.trim();
        districtsList.innerHTML = "";
        if (districtSuggestions[selectedCity]) {
            districtSuggestions[selectedCity].forEach(d => {
                const opt = document.createElement('option');
                opt.value = d;
                districtsList.appendChild(opt);
            });
        }
    });
}

// --- AKILLI AI DENETÇİ ---
const GEMINI_API_KEY = window.ENV_API_KEY || ""; 

async function checkSemanticFeasibility(productName, productDetails) {
    const pNameLower = productName.toLowerCase().trim();
    const detailsLower = productDetails.toLowerCase().trim();
    
    const forbidden = ['aks', 'motor', 'silah', 'beton', 'döküm', 'plastik', 'ayakkabı', 'muz', 'elma'];
    if (forbidden.some(word => pNameLower.includes(word))) return "RED: Bu ürün (Ağır Sanayi/Taze Gıda) ev üretimi modelimize uygun değildir.";

    if(!GEMINI_API_KEY) {
        const hasSpec = /\d/.test(detailsLower) && detailsLower.split(' ').length >= 2;
        if (!hasSpec) return "RED: Eksik Bilgi! Notlar kısmında ürünün türünü (çilek, siyah vb.) ve ölçüsünü (gr, adet vb.) belirtiniz.";
        if (pNameLower.includes('hoodi') && detailsLower.includes('reçel')) return "RED: Ürün (Hoodie) ile detay (Reçel) çelişmektedir.";
        
        if(pNameLower.includes('sabun')) return "ONAY|kimya";
        if(pNameLower.includes('reçel')) return "ONAY|gida";
        return "ONAY|montaj";
    }
    
    try {
        const prompt = `Sen Micro Factory AI Baş Denetçisisin. Ürün: '${productName}', Detay: '${productDetails}'.
        SİSTEMSEL KURALLAR:
        1. Ürün Kimliği: Detayda tür (çilek, vişne, siyah, pamuklu vb.) YOKSA REDDET.
        2. Ölçü Şartı: Gramaj, adet, beden veya ml YOKSA REDDET.
        3. Troll Koruması: Ürün ile detay alakasızsa (Örn: Hoodie -> Çilek) REDDET.
        4. Fabrikasyon: Ağır makine işlerini REDDET.
        Format: RED|[Gerekçe] veya ONAY|[kategori: kimya, tekstil, montaj, paketleme, gida]`;
        
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, { 
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }) 
        });
        const data = await res.json();
        let answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "ONAY|montaj";
        if(answer.startsWith("RED|")) return "RED: " + answer.split("|")[1];
        return answer;
    } catch (e) { return "ONAY|montaj"; }
}

// --- ANA SİPARİŞ MOTORU ---
document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const details = document.getElementById('productDetails').value;
    const qty = Number(document.getElementById('quantity').value);
    const city = document.getElementById('deliveryCity').value.trim();
    const district = document.getElementById('deliveryDistrict').value.trim();
    const neighborhood = document.getElementById('deliveryNeighborhood').value.trim();
    const doorNo = document.getElementById('deliveryDoorNo').value.trim();

    // Adres ve Şehir Uyuşmazlık (İzmir / izmir) Çözümü
    const cityNorm = city.toLocaleLowerCase('tr-TR');
    const districtNorm = district.toLocaleLowerCase('tr-TR');
    const fullAddress = `${city} / ${district}, ${neighborhood}, No: ${doorNo}`;

    const majorCities = ["adana", "ankara", "antalya", "bursa", "diyarbakır", "erzurum", "eskişehir", "gaziantep", "istanbul", "izmir", "kayseri", "kocaeli", "konya", "mardin", "rize", "samsun", "trabzon", "van", "bolu"];
    let conflictCity = majorCities.find(c => districtNorm.includes(c) && c !== cityNorm);
    if (conflictCity) {
        alert(`⚠️ Adres Uyuşmazlığı: Şehir '${city}' ama açık adreste '${conflictCity.toUpperCase()}' geçiyor.`);
        return;
    }

    document.getElementById('alertBox').classList.add('hidden-safely');
    const tableWrapper = document.getElementById('tableWrapper');
    tableWrapper.innerHTML = `<div class="flex flex-col items-center justify-center h-48"><div class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div><p class="text-[10px] font-black text-indigo-600 mt-4 animate-pulse">AI DENETİMİ YAPILIYOR...</p></div>`;
    document.getElementById('actionPanel').classList.add('hidden-safely');

    const aiResponse = await checkSemanticFeasibility(name, details);
    
    if(aiResponse.startsWith("RED:")) {
        tableWrapper.innerHTML = "";
        document.getElementById('alertBox').classList.remove('hidden-safely');
        document.getElementById('alertMessage').innerText = aiResponse.replace("RED:", "").trim();
        return;
    }

    let detectedCategory = aiResponse.includes("|") ? aiResponse.split("|")[1].trim().toLowerCase() : "montaj";
    document.getElementById('categoryDisplay').innerHTML = `<span class="text-indigo-700 font-black">${categoryNames[detectedCategory] || "Hafif Montaj"}</span> <span class="bg-emerald-100 text-emerald-700 text-[8px] px-2 py-1 rounded ml-2">AI</span>`;

    const calculatedTotalCost = (categoryPrices[detectedCategory] || 20) * qty;

    // Lojistik Planlama
    let region = "Marmara";
    for (const [reg, cities] of Object.entries(regionData)) { if (cities.some(c => c.toLocaleLowerCase('tr-TR') === cityNorm)) region = reg; }

    let activeProducers = producers.filter(p => p.status === "Aktif");
    activeProducers.sort((a, b) => ((b.region === region ? 1 : 0) - (a.region === region ? 1 : 0)) || (b.trustScore - a.trustScore));

    let remaining = qty; let allocations = []; let totalCo2 = 0;
    activeProducers.forEach(p => {
        if(remaining <= 0) return;
        let give = Math.min(p.capacity, remaining);
        let dist = (p.region === region) ? 25 : 450;
        let co2 = Math.floor(give * dist * 0.02);
        totalCo2 += co2;
        allocations.push({ name: p.name, sourceCity: p.city, targetCity: city, qty: give, co2 });
        remaining -= give;
    });

    const treeEquivalent = (totalCo2 / 100).toFixed(1);
    let html = `<table class="w-full text-left text-xs"><thead class="font-black text-slate-400 border-b"><tr><th class="py-3">Hub</th><th class="py-3">Adet</th><th class="py-3">CO2</th></tr></thead><tbody>`;
    allocations.forEach(a => { html += `<tr class="border-b font-medium"><td class="py-4">${a.name}</td><td class="font-bold text-indigo-600">${a.qty}</td><td>${a.co2}g</td></tr>`; });
    html += `</tbody></table><div class="mt-6 p-4 bg-indigo-50 rounded-xl flex justify-between items-center"><p class="text-[10px] font-bold">🌱 TASARRUF: ${treeEquivalent} AĞAÇ</p><p class="text-xl font-black text-indigo-700 font-mono">₺${calculatedTotalCost.toLocaleString('tr-TR')}</p></div>`;
    
    tableWrapper.innerHTML = html;
    document.getElementById('actionPanel').classList.remove('hidden-safely');
    document.getElementById('etaText').innerText = qty > 1000 ? "4-7 İş Günü" : "2-4 İş Günü";

    currentOrderTemp = { date: new Date().toLocaleDateString(), product: name, info: `${qty} Adet / ${fullAddress} / Detay: ${details}`, status: "Üretimde", savedTrees: treeEquivalent, totalCost: calculatedTotalCost };
});

function confirmOrder() {
    orderHistory.unshift(currentOrderTemp);
    localStorage.setItem('mf_orders_v3', JSON.stringify(orderHistory));
    resetOrderForm(); switchTab('historyTab'); updateKPIs();
}

function updateKPIs() {
    const active = producers.filter(p => p.status === "Aktif").length;
    const totalCap = producers.filter(p => p.status === "Aktif").reduce((acc, curr) => acc + curr.capacity, 0);
    document.getElementById('kpiCapacity').innerText = totalCap.toLocaleString();
    document.getElementById('kpiActiveProducers').innerText = active;
}

function resetOrderForm() { document.getElementById('orderForm').reset(); document.getElementById('actionPanel').classList.add('hidden-safely'); }
function switchTab(id) { ['orderTab', 'historyTab', 'producersTab'].forEach(t => document.getElementById(t).className = (t===id ? 'animate-slide' : 'hidden-safely')); if(id==='historyTab') renderHistory(); if(id==='producersTab') renderProducers(); }
function openLogin() { document.getElementById('loginScreen').classList.remove('hidden-safely'); }
function logout() { document.getElementById('userProfileMenu').classList.add('hidden-safely'); document.getElementById('headerLoginBtn').classList.remove('hidden-safely'); }
document.getElementById('authForm').addEventListener('submit', (e) => { e.preventDefault(); document.getElementById('loginScreen').classList.add('hidden-safely'); document.getElementById('userProfileMenu').classList.remove('hidden-safely'); document.getElementById('headerLoginBtn').classList.add('hidden-safely'); });
function renderHistory() { document.getElementById('historyBody').innerHTML = orderHistory.map(o => `<div class="p-6 border rounded-xl mb-4"><b>${o.product}</b><br><span class="text-[10px] text-slate-500">${o.info}</span></div>`).join(""); }
function renderProducers() { document.getElementById('producersBody').innerHTML = producers.map(p => `<tr class="border-b"><td class="py-6 font-bold uppercase">${p.name}</td><td>${p.city}</td><td class="text-emerald-600 font-bold">${p.trustScore}/10</td></tr>`).join(""); }

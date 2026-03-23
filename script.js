// --- 1. VERİ TABANI & BÖLGESEL HUB'LAR ---
const regionData = {
    "İç Anadolu": ["Ankara", "Eskişehir", "Konya", "Kayseri", "Sivas", "Aksaray", "Nevşehir", "Niğde"],
    "Marmara": ["İstanbul", "Bursa", "Balıkesir", "Kocaeli", "Tekirdağ", "Çanakkale", "Edirne", "Sakarya"],
    "Ege": ["İzmir", "Manisa", "Denizli", "Aydın", "Muğla", "Afyonkarahisar", "Kütahya", "Uşak"],
    "Doğu ve Güneydoğu": ["Gaziantep", "Mardin", "Diyarbakır", "Şanlıurfa", "Van", "Erzurum", "Malatya", "Elazığ"],
    "Akdeniz": ["Antalya", "Adana", "Hatay", "Mersin", "Isparta", "Burdur", "Osmaniye", "Kahramanmaraş"],
    "Karadeniz": ["Rize", "Trabzon", "Samsun", "Artvin", "Ordu", "Giresun", "Zonguldak", "Tokat"]
};

const categoryPrices = {
    "kimya": 120.00,      
    "tekstil": 90.00,     
    "montaj": 65.00,      
    "paketleme": 25.00,   
    "gida": 145.00        
};

const categoryNames = {
    "kimya": "Doğal Kozmetik & Kimya",
    "tekstil": "Tekstil & Örme",
    "montaj": "Hafif Montaj",
    "paketleme": "Paketleme & Tasnif",
    "gida": "İleri Dönüşüm & Butik Gıda"
};

const defaultProducers = [
    { id: "H1", name: "Sincan Kadın Kooperatifi Hub", capacity: 1200, city: "Ankara", region: "İç Anadolu", trustScore: 9.8, strikes: 0, status: "Aktif", badge: "Merkez Hub" },
    { id: "H2", name: "Polatlı Üretim ve Lojistik Ağı", capacity: 850, city: "Ankara", region: "İç Anadolu", trustScore: 9.5, strikes: 0, status: "Aktif", badge: "Onaylı Hub" },
    { id: "H3", name: "Eskişehir Hafif Montaj Üssü", capacity: 400, city: "Eskişehir", region: "İç Anadolu", trustScore: 9.1, strikes: 0, status: "Aktif", badge: "Hızlı Üretici" },
    { id: "H7", name: "Bursa İpek ve Tekstil Hub", capacity: 2500, city: "Bursa", region: "Marmara", trustScore: 9.9, strikes: 0, status: "Aktif", badge: "Merkez Hub" },
    { id: "H8", name: "Marmara Doğal Kozmetik Atölyesi", capacity: 1500, city: "İstanbul", region: "Marmara", trustScore: 9.6, strikes: 0, status: "Aktif", badge: "Hızlı Üretici" },
    { id: "H12", name: "Ege Doğal Yaşam Kooperatifi", capacity: 1800, city: "İzmir", region: "Ege", trustScore: 9.8, strikes: 0, status: "Aktif", badge: "Merkez Hub" },
    { id: "H17", name: "Gaziantep Kutnu Dokuma Merkezi", capacity: 1300, city: "Gaziantep", region: "Doğu ve Güneydoğu", trustScore: 9.7, strikes: 0, status: "Aktif", badge: "Merkez Hub" },
    { id: "H18", name: "Mardin Sabun ve Koku Atölyesi", capacity: 950, city: "Mardin", region: "Doğu ve Güneydoğu", trustScore: 9.9, strikes: 0, status: "Aktif", badge: "Onaylı Hub" },
    { id: "H22", name: "Antalya Narenciye Paketleme", capacity: 1600, city: "Antalya", region: "Akdeniz", trustScore: 9.6, strikes: 0, status: "Aktif", badge: "Merkez Hub" },
    { id: "H26", name: "Rize Çay ve Gıda Kooperatifi", capacity: 1200, city: "Rize", region: "Karadeniz", trustScore: 9.7, strikes: 0, status: "Aktif", badge: "Merkez Hub" },
    { id: "H31", name: "Kayseri Dokuma Evi (İhlal)", capacity: 300, city: "Kayseri", region: "İç Anadolu", trustScore: 4.5, strikes: 3, status: "Askıda (6 Ay)", badge: "SLA Cezası" },
    { id: "H32", name: "Karşıyaka Kadın Dayanışması", capacity: 350, city: "İzmir", region: "Ege", trustScore: 3.8, strikes: 6, status: "İhraç (3 Yıl)", badge: "SLA Cezası" }
];

if (!localStorage.getItem('mf_producers_v3')) {
    localStorage.clear(); localStorage.setItem('mf_producers_v3', JSON.stringify(defaultProducers));
}
if (!localStorage.getItem('mf_orders_v3')) localStorage.setItem('mf_orders_v3', JSON.stringify([]));

let producers = JSON.parse(localStorage.getItem('mf_producers_v3'));
let orderHistory = JSON.parse(localStorage.getItem('mf_orders_v3'));

window.onload = () => updateKPIs();

function updateKPIs() {
    const active = producers.filter(p => p.status === "Aktif").length;
    const banned = producers.filter(p => p.status.includes("Askıda") || p.status.includes("İhraç")).length;
    const totalCap = producers.filter(p => p.status === "Aktif").reduce((acc, curr) => acc + curr.capacity, 0);
    const totalSavedTrees = orderHistory.reduce((acc, order) => acc + (order.status === "İptal Edildi" ? 0 : (order.savedTrees || 0)), 0);

    document.getElementById('kpiCapacity').innerText = totalCap.toLocaleString();
    document.getElementById('kpiActiveProducers').innerText = active;
    document.getElementById('kpiBannedProducers').innerText = banned;
    document.getElementById('kpiCo2').innerText = totalSavedTrees > 0 ? totalSavedTrees.toFixed(1) + " Ağaç" : "0 Ağaç";
}

function resetOrderForm() {
    document.getElementById('orderForm').reset();
    document.getElementById('actionPanel').classList.add('hidden-safely');
    document.getElementById('categoryDisplay').innerHTML = `<span class="opacity-80 uppercase tracking-widest">✨ AI OTOMATİK SEÇİM</span><svg class="w-4 h-4 text-indigo-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`;
    document.getElementById('tableWrapper').innerHTML = `
        <div class="h-full flex flex-col items-center justify-center text-slate-300 opacity-40">
            <svg class="w-20 h-20 mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517"></path></svg>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-center">AI Lojistik Analizi Bekleniyor...</p>
        </div>`;
    currentOrderTemp = null;
}

const GEMINI_API_KEY = window.ENV_API_KEY || ""; 

// SİSTEM BAZLI AKILLI DENETÇİ (HER ÜRÜNÜ FİZİKSEL ÜRETİM MANTIKLARIYLA DENETLER)
async function checkSemanticFeasibility(productName, productDetails) {
    const pNameLower = productName.toLowerCase().trim();
    const detailsLower = productDetails.toLowerCase().trim();
    
    // Temel Kalkanlar
    if (pNameLower.length < 3) return "RED: Ürün tanımı geçersiz.";
    const forbidden = ['aks', 'motor', 'silah', 'beton', 'döküm', 'kaynak', 'otomotiv', 'pcb', 'devre', 'plastik', 'fabrikasyon', 'ayakkabı', 'muz', 'elma', 'karpuz', 'telefon', 'bilgisayar', 'kablo'];
    if (forbidden.some(word => pNameLower.includes(word))) return "RED: Bu ürün (Ağır Sanayi/Taze Gıda) kooperatif ev üretimi modelimize uygun değildir.";

    if(!GEMINI_API_KEY) {
        // DEMO MODU: Sayısal veya ölçü verisi yoksa reddet
        const hasSpec = /\d/.test(detailsLower) || detailsLower.includes("beden") || detailsLower.includes("gr") || detailsLower.includes("ml") || detailsLower.includes("cm");
        if (!hasSpec) return "RED: Üretim yapılabilmesi için ürün detayında mutlaka ölçü, gramaj, beden veya teknik bir özellik (Örn: 'S beden', '300gr') belirtilmelidir.";
        
        if(pNameLower.includes('sabun') || pNameLower.includes('koku') || pNameLower.includes('krem')) return "ONAY|kimya";
        if(pNameLower.includes('reçel') || pNameLower.includes('gıda')) return "ONAY|gida";
        if(pNameLower.includes('çanta') || pNameLower.includes('örgü') || pNameLower.includes('hoodi')) return "ONAY|tekstil";
        return "ONAY|montaj"; 
    }
    
    try {
        const prompt = `Sen Micro Factory AI Baş Üretim Planlamacısısın. Müşteri ürün olarak '${productName}', detay olarak '${productDetails}' girdi.
        
        DENETİM PROTOKOLÜ (SİSTEM BAZLI):
        1. Üretim İçin Gerekli Veri: Bir ürünün üretilmesi için fiziksel bir "ölçü/birim/beden/hacim" bilgisi şarttır.
           - Tekstilse: Beden (S, M, L vb.) veya tam ölçü EKSİKSE REDDET.
           - Gıda/Kimya: Gramaj (gr, kg vb.) veya Hacim (ml, lt vb.) EKSİKSE REDDET.
           - Montaj/Paketleme: Boyut (en, boy, cm vb.) EKSİKSE REDDET.
        2. Mantıksal Tutarlılık: Ürün 'Hoodie' iken detaylarda 'Çilek' yazıyorsa REDDET.
        3. Fabrikasyon Engeli: Ağır makine gerektiren işleri REDDET.
        
        Gerekçe cümlesinde müşteriye hangi "fiziksel detayın" (beden mi, gramaj mı, ölçü mü) eksik olduğunu net söyle.
        
        Yanıtlama formatın:
        - Detay eksikse: RED|[Kibar gerekçe]
        - Tamamsa: ONAY|[kategori: kimya, tekstil, montaj, paketleme, gida]`;
        
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, { 
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }) 
        });
        const data = await res.json();
        let answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "ONAY|montaj";
        if(answer.startsWith("RED|")) return "RED: " + answer.split("|")[1];
        return answer;
    } catch (e) { return "ONAY|montaj"; }
}

let currentOrderTemp = null; 

document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const details = document.getElementById('productDetails').value; 
    let qty = Number(document.getElementById('quantity').value);
    
    const city = document.getElementById('deliveryCity').value.trim(); 
    const district = document.getElementById('deliveryDistrict').value.trim(); 
    const neighborhood = document.getElementById('deliveryNeighborhood').value.trim(); 
    const doorNo = document.getElementById('deliveryDoorNo').value.trim(); 

    if (district.length < 2 || neighborhood.length < 3 || doorNo.length < 1) {
        alert("⚠️ Lütfen adres alanlarını eksiksiz giriniz."); return;
    }
    
    const cityNorm = city.toLocaleLowerCase('tr-TR');
    const fullAddress = `${city} / ${district}, ${neighborhood}, No: ${doorNo}`;

    document.getElementById('alertBox').classList.add('hidden-safely');
    const tableWrapper = document.getElementById('tableWrapper');
    tableWrapper.innerHTML = `<div class="flex flex-col items-center justify-center h-48 space-y-4"><div class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div><p class="text-[10px] font-black text-indigo-600 tracking-widest animate-pulse uppercase">AI Operasyonel Denetim Yapıyor...</p></div>`;
    document.getElementById('actionPanel').classList.add('hidden-safely');

    const aiResponse = await checkSemanticFeasibility(name, details);
    
    if(aiResponse.startsWith("RED:")) {
        tableWrapper.innerHTML = ``;
        document.getElementById('alertBox').classList.remove('hidden-safely');
        document.getElementById('alertMessage').innerText = aiResponse.replace("RED:", "").trim();
        return;
    }

    let detectedCategory = "montaj";
    if (aiResponse.includes("|")) detectedCategory = aiResponse.split("|")[1].trim().toLowerCase();
    
    const displayCat = categoryNames[detectedCategory] || "Hafif Montaj";
    document.getElementById('categoryDisplay').innerHTML = `<span class="text-indigo-700 font-black uppercase tracking-wider">${displayCat}</span> <span class="bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase px-2 py-1 rounded shadow-sm ml-2">AI SEÇTİ</span>`;

    let unitPrice = categoryPrices[detectedCategory] || 20.00;
    let calculatedTotalCost = unitPrice * qty;

    let region = "Marmara"; 
    for (const [reg, cities] of Object.entries(regionData)) {
        if (cities.some(c => c.toLocaleLowerCase('tr-TR') === cityNorm)) { region = reg; break; }
    }

    let activeProducers = producers.filter(p => p.status === "Aktif");
    activeProducers.sort((a, b) => {
        let aIsLocal = (a.region === region) ? 1 : 0;
        let bIsLocal = (b.region === region) ? 1 : 0;
        return (bIsLocal - aIsLocal) || (b.trustScore - a.trustScore);
    });

    let remaining = qty; 
    let allocations = []; 
    let totalCo2 = 0;

    activeProducers.forEach(p => {
        if(remaining <= 0) return;
        let give = Math.min(p.capacity, remaining);
        let dist = (p.region === region) ? Math.floor(Math.random() * 35) + 15 : Math.floor(Math.random() * 600) + 200; 
        totalCo2 += Number((give * dist * 0.02).toFixed(0));
        allocations.push({ name: p.name, sourceCity: p.city, targetCity: city, dist, isLocal: (p.region === region), qty: give, co2: (give * dist * 0.02).toFixed(0) });
        remaining -= give;
    });

    let isMilkRun = (qty <= 50) && confirm("🌱 Milk Run Lojistiği onaylıyor musunuz?");
    const treeEquivalent = (totalCo2 / 100).toFixed(1);
    
    let html = `<div class="w-full overflow-x-auto pb-4"><table class="w-full text-left text-sm min-w-[600px]"><thead class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 bg-slate-50/50"><tr><th class="py-4 px-4 rounded-l-lg">Hub</th><th class="py-4 px-4 text-center">Adet</th><th class="py-4 px-4">Rota</th><th class="py-4 px-4 text-right rounded-r-lg">CO2</th></tr></thead><tbody class="divide-y divide-slate-100">`;
    allocations.forEach(a => {
        html += `<tr class="hover:bg-indigo-50/50">
            <td class="py-5 px-4 font-bold text-slate-900">${a.name}</td>
            <td class="py-5 px-4 text-center font-mono font-black text-indigo-600 text-lg">${a.qty.toLocaleString()}</td>
            <td class="py-5 px-4 text-slate-500 text-xs">${a.sourceCity} ➔ ${a.targetCity}</td>
            <td class="py-5 px-4 text-right font-mono font-bold">${isMilkRun ? '0g' : a.co2+'g'}</td>
        </tr>`;
    });
    
    html += `</tbody></table></div>
    <div class="mt-4 p-5 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
        <p class="text-[10px] font-bold uppercase tracking-wider">🌱 Tasarruf: <b>${treeEquivalent} ağaç</b></p>
        <div class="bg-white px-5 py-3 rounded-xl border border-indigo-100 text-center shrink-0 w-full sm:w-auto">
            <p class="text-xl font-black text-indigo-700 font-mono">₺${calculatedTotalCost.toLocaleString('tr-TR')}</p>
        </div>
    </div>`;
    
    tableWrapper.innerHTML = html;
    document.getElementById('actionPanel').classList.remove('hidden-safely');
    document.getElementById('etaText').innerText = isMilkRun ? "72 Saat Havuz + 2 Gün" : (qty > 1000 ? "4-7 İş Günü" : "2-4 İş Günü");
    
    currentOrderTemp = { 
        date: new Date().toLocaleDateString(), product: name, 
        info: `${qty.toLocaleString()} Adet / ${fullAddress} / Detay: ${details}`, 
        status: isMilkRun ? "Milk Run Havuzunda" : "Hub Onayı Bekliyor", 
        isApproved: false, savedTrees: parseFloat(treeEquivalent) || 0, totalCost: calculatedTotalCost
    };
});

function confirmOrder() {
    if(!currentOrderTemp) return;
    currentOrderTemp.status = "Üretimde (Hazırlık)"; 
    currentOrderTemp.isApproved = true; 
    orderHistory.unshift(currentOrderTemp); 
    localStorage.setItem('mf_orders_v3', JSON.stringify(orderHistory));
    resetOrderForm();
    switchTab('historyTab');
    updateKPIs();
}

function cancelOrder() { resetOrderForm(); }

function renderHistory() {
    const tbody = document.getElementById('historyBody');
    if(orderHistory.length === 0) { tbody.innerHTML = `<div class="py-16 text-center text-slate-300 font-black uppercase">Henüz sipariş yok.</div>`; return; }
    tbody.innerHTML = orderHistory.map((o, index) => {
        let isCanceled = o.status === "İptal Edildi";
        return `
        <div class="glass-card p-6 bg-white border border-slate-100 mb-4 ${isCanceled ? 'opacity-60' : ''}">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h4 class="text-xl font-black text-slate-900 uppercase">${o.product}</h4>
                    <p class="text-[10px] text-slate-500 font-bold uppercase">${o.date} • ${o.info}</p>
                </div>
                <span class="text-lg font-black text-indigo-700 font-mono">₺${(o.totalCost || 0).toLocaleString('tr-TR')}</span>
            </div>
            <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div style="width: ${isCanceled ? '100%' : '75%'}" class="h-full bg-indigo-500"></div>
            </div>
            <p class="text-[9px] font-black uppercase mt-2 text-indigo-600">${o.status}</p>
        </div>`;
    }).join("");
}

function renderProducers() {
    const tbody = document.getElementById('producersBody');
    tbody.innerHTML = producers.map(p => `
        <tr class="hover:bg-slate-50 border-b border-slate-100">
            <td class="py-6 px-6 font-black text-slate-900 uppercase">${p.name}</td>
            <td class="py-6 px-6 text-[10px] font-black text-slate-500">${p.region} / ${p.city}</td>
            <td class="py-6 px-6 font-mono font-black text-emerald-600">${p.trustScore.toFixed(1)}/10</td>
            <td class="py-6 px-6 text-slate-600 font-mono font-bold">${p.capacity.toLocaleString()}</td>
            <td class="py-6 px-6"><span class="px-3 py-1.5 rounded-lg text-[9px] font-black ${p.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}">${p.status}</span></td>
        </tr>`).join("");
}

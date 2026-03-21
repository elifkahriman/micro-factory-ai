// --- 1. VERİ TABANI & BÖLGESEL HUB'LAR (Şahıs İsimlerinden Arındırılmış Kurumsal Yapı) ---
const regionData = {
    "İç Anadolu": ["Ankara", "Eskişehir", "Konya", "Kayseri", "Sivas", "Aksaray", "Nevşehir", "Niğde"],
    "Marmara": ["İstanbul", "Bursa", "Balıkesir", "Kocaeli", "Tekirdağ", "Çanakkale", "Edirne", "Sakarya"],
    "Ege": ["İzmir", "Manisa", "Denizli", "Aydın", "Muğla", "Afyonkarahisar", "Kütahya", "Uşak"],
    "Doğu ve Güneydoğu": ["Gaziantep", "Mardin", "Diyarbakır", "Şanlıurfa", "Van", "Erzurum", "Malatya", "Elazığ"],
    "Akdeniz": ["Antalya", "Adana", "Hatay", "Mersin", "Isparta", "Burdur", "Osmaniye", "Kahramanmaraş"],
    "Karadeniz": ["Rize", "Trabzon", "Samsun", "Artvin", "Ordu", "Giresun", "Zonguldak", "Tokat"]
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

// LocalStorage Yapılandırması (v3 ile cache'i sıfırlıyoruz)
if (!localStorage.getItem('mf_producers_v3')) {
    localStorage.clear(); localStorage.setItem('mf_producers_v3', JSON.stringify(defaultProducers));
}
if (!localStorage.getItem('mf_orders_v3')) localStorage.setItem('mf_orders_v3', JSON.stringify([]));

let producers = JSON.parse(localStorage.getItem('mf_producers_v3'));
let orderHistory = JSON.parse(localStorage.getItem('mf_orders_v3'));

// --- 2. UI YÖNETİMİ & MODALLAR ---
window.onload = () => updateKPIs();

// 81 İl Özgürlüğü için Şehir Listesi Otomatik Tamamlama (Opsiyonel Yardımcı)
function updateCities() {
    const region = document.getElementById('deliveryRegion').value;
    const cityInput = document.getElementById('deliveryCity');
    if (region && regionData[region]) {
        cityInput.placeholder = `Seçilen Bölge: ${region} (İl Yazınız)`;
        cityInput.focus();
    }
}

// BOLD DETAYI (4. madde) buraya eklendi
function openInfoModal(type) {
    const title = document.getElementById('modalTitle');
    const subtitle = document.getElementById('modalSubtitle');
    const content = document.getElementById('modalContent');
    if(type === 'about') {
        title.innerText = "Sanal Üretim Katmanı"; subtitle.innerText = "Distributed Assembly Network (DAN)";
        content.innerHTML = `<p><b>Merkeziyetsiz Zeka:</b> Micro Factory AI olarak, atıl ev üretim kapasitesini kurumsal B2B tedarik zincirlerine bağlayan otonom bir ağız.</p>
        <p><b>Misyonumuz; karbon ayak izini minimize ederek yerel kooperatifleri (Hub) küresel markalarla güvenle buluşturmaktır.</b> Her ev bir mikro fabrikaya, her kadın bir girişimciye dönüşüyor.</p>`;
    } else if(type === 'b2b') {
        title.innerText = "B2B Lojistik Çözümleri"; subtitle.innerText = "Kurumsal Partnerlik & SLA";
        content.innerHTML = `<p>Siparişlerinizi %30 Emeğe Saygı Payı ve katı 3/6 İhraç kurallarıyla yönetilen bölgesel Hub'lara dağıtıyoruz.</p><ul class="list-disc pl-5 space-y-2 mt-2"><li>Ağır Sanayi Filtresi (Gemini AI)</li><li>Smart Routing & 72 Saat Milk Run Havuzu</li><li>Uçtan Uca B2B Cari Yönetimi</li><li>Canlı ESG Raporlaması</li></ul>`;
    } else if(type === 'apply') {
        title.innerText = "Hub (Kooperatif) Başvurusu"; subtitle.innerText = "Kapasite Durumu";
        content.innerHTML = `<div class="bg-amber-50 p-6 rounded-2xl border border-amber-100 text-center shadow-inner"><p class="text-amber-800 font-black mb-2 flex items-center gap-2 justify-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> Başvuru Havuzumuz Doludur</p><p class="text-xs text-amber-700 font-medium leading-relaxed">Mevcut 7 bölgedeki pilot kooperatif kapasitemiz Buildathon süreci için dolmuştur. Yeni Hub başvuruları bir sonraki çeyrekte değerlendirilecektir. İlginiz için teşekkür ederiz.</p></div>`;
    }
    document.getElementById('infoModal').classList.remove('hidden-safely');
}
function closeInfoModal() { document.getElementById('infoModal').classList.add('hidden-safely'); }

function openLogin() { document.getElementById('loginScreen').classList.remove('hidden-safely'); }
function closeLogin() { document.getElementById('loginScreen').classList.add('hidden-safely'); }

document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault(); closeLogin();
    document.getElementById('headerLoginBtn').classList.add('hidden-safely');
    document.getElementById('userProfileMenu').classList.remove('hidden-safely');
});

function logout() {
    document.getElementById('userProfileMenu').classList.add('hidden-safely');
    document.getElementById('headerLoginBtn').classList.remove('hidden-safely');
}

function switchTab(tabId) {
    ['orderTab', 'historyTab', 'producersTab'].forEach(id => {
        const btn = document.getElementById('btn-' + id);
        const target = document.getElementById(id);
        if(id === tabId) {
            btn.className = "px-7 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl bg-indigo-600 text-white shadow-md flex items-center gap-2.5";
            target.classList.remove('hidden-safely');
        } else {
            btn.className = "px-7 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl text-slate-500 hover:bg-white/80 hover:text-indigo-600 flex items-center gap-2.5";
            target.classList.add('hidden-safely');
        }
    });
    if(tabId === 'historyTab') renderHistory();
    if(tabId === 'producersTab') renderProducers();
}

function updateKPIs() {
    const active = producers.filter(p => p.status === "Aktif").length;
    const banned = producers.filter(p => p.status.includes("Askıda") || p.status.includes("İhraç")).length;
    const totalCap = producers.filter(p => p.status === "Aktif").reduce((acc, curr) => acc + curr.capacity, 0);
    document.getElementById('kpiCapacity').innerText = totalCap.toLocaleString();
    document.getElementById('kpiActiveProducers').innerText = active;
    document.getElementById('kpiBannedProducers').innerText = banned;
}

// --- 3. AI KARAR MOTORU & SMART ROUTING ---
const GEMINI_API_KEY = window.ENV_API_KEY || ""; 

// DÜZELTME: API Key yoksa Demo Moduna geçecek (image_8.png'deki takılmayı çözer)
async function checkSemanticFeasibility(productName, category) {
    const pNameLower = productName.toLowerCase();
    const forbidden = ['aks', 'motor', 'silah', 'beton', 'döküm', 'kaynak', 'otomotiv parçası', 'pcb', 'devre'];
    
    if (forbidden.some(word => pNameLower.includes(word))) {
        return "RED: Bu ürün (Ağır Sanayi/Elektronik/Otomotiv) kurumsal ağımızın güvenlik protokollerine ve ev/hub üretim modelimize uygun değildir.";
    }
    
    // API KEY YOKSA DEMO MODU
    if(!GEMINI_API_KEY) {
        console.warn("Gemini API Key bulunamadı. Demo modunda otomatik ONAY veriliyor.");
        return "ONAY (Demo Modu)"; 
    }
    
    try {
        const prompt = `Sen Micro Factory AI (Distributed Assembly Network) baş mimarısın. Kibarca analiz et. Kurumsal müşteri '${productName}' (Kategori: ${category}) sipariş etmek istiyor. Bizim ağımız sadece ev/kooperatif şartlarına uygun 5 ana kategoriye onay verir. Ağır sanayi, döküm, tehlikeli madde ise RED: yazıp gerekçe belirt. Uygunsa sadece 'ONAY' yaz.`;
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, { 
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }) 
        });
        const data = await res.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "ONAY";
    } catch (e) { 
        console.error("Gemini API hatası:", e);
        return "ONAY (Hata Sonrası Fallback)"; 
    }
}

let currentOrderTemp = null; 

document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    let qty = Number(document.getElementById('quantity').value);
    const category = document.getElementById('category').value;
    const region = document.getElementById('deliveryRegion').value;
    const city = document.getElementById('deliveryCity').value; // 81 il özgürlüğü
    
    document.getElementById('alertBox').classList.add('hidden-safely');
    const tableWrapper = document.getElementById('tableWrapper');
    tableWrapper.innerHTML = `<div class="flex flex-col items-center justify-center h-48 space-y-4 animate-fade-in"><div class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin shadow-lg"></div><p class="text-[10px] font-black text-indigo-600 tracking-widest animate-pulse uppercase">Gemini AI Semantik Filtreleme & Bölgesel Analiz Yapıyor...</p></div>`;
    document.getElementById('actionPanel').classList.add('hidden-safely');

    // Adım 1: AI Semantik Filtresi
    const aiResponse = await checkSemanticFeasibility(name, category);
    if(aiResponse.startsWith("RED:")) {
        tableWrapper.innerHTML = ``;
        document.getElementById('alertBox').classList.remove('hidden-safely');
        document.getElementById('alertMessage').innerText = aiResponse.replace("RED:", "").trim();
        return;
    }

    // Adım 2: Smart Routing (Bölgesel Öncelik ve Güven Puanı Optimizasyonu)
    let activeProducers = producers.filter(p => p.status === "Aktif");
    activeProducers.sort((a, b) => {
        let aIsLocal = (a.region === region) ? 1 : 0;
        let bIsLocal = (b.region === region) ? 1 : 0;
        if (aIsLocal !== bIsLocal) return bIsLocal - aIsLocal; // Önce teslimat bölgesi (Marmara -> Marmara)
        return b.trustScore - a.trustScore; // Sonra Güven Puanı (SLA)
    });

    let remaining = qty; 
    let allocations = []; 
    let totalCo2 = 0;

    activeProducers.forEach(p => {
        if(remaining <= 0) return;
        let give = Math.min(p.capacity, remaining);
        // Eğer yerelse 15-50km (Hub Lojistiği), değilse 200-800km uzun yol hesabı
        let dist = (p.region === region) ? Math.floor(Math.random() * 35) + 15 : Math.floor(Math.random() * 600) + 200; 
        let co2 = (give * dist * 0.02).toFixed(0); 
        totalCo2 += Number(co2);
        allocations.push({ name: p.name, sourceCity: p.city, targetCity: city, dist, isLocal: (p.region === region), qty: give, co2, score: p.trustScore });
        remaining -= give;
    });

    // Adım 3: Kapasite Aşımı (Waitlist / ATP Pazarlığı)
    let isWaitlist = false;
    if(remaining > 0) {
        if(confirm(`⚠️ Kapasite Aşımı Uyarısı! Ulusal ağımızdaki aktif kapasite doludur. Kalan ${remaining} adet siparişiniz dinamik bekleme sırasına (Waitlist) alınsın mı?`)) isWaitlist = true;
    }

    // Adım 4: Milk Run Havuzu (72 Saat Yeşil Lojistik)
    let isMilkRun = (qty <= 50) && confirm("🌱 Milk Run Lojistiği: Siparişiniz mikro ölçeklidir. Karbon salınımını sıfırlamak için 72 saatlik bölgesel havuz kargolamasını onaylıyor musunuz?");
    const treeEquivalent = (totalCo2 / 100).toFixed(1);
    
    // UI: Dağıtım Planını Ekrana Çizme
    let html = `<table class="w-full text-left text-sm whitespace-nowrap animate-slide-up"><thead class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 bg-slate-50/50"><tr><th class="py-4 px-4 rounded-l-lg">Bölgesel Hub</th><th class="py-4 px-4 text-center">Atanan Adet</th><th class="py-4 px-4">Kargo Rotası</th><th class="py-4 px-4 text-right rounded-r-lg">CO2 Emisyonu</th></tr></thead><tbody class="divide-y divide-slate-100 text-slate-700">`;
    allocations.forEach(a => {
        let badge = a.isLocal ? `<span class="ml-2.5 text-[8px] bg-emerald-100 text-emerald-700 px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider shadow-inner">Yerel Hub</span>` : `<span class="ml-2.5 text-[8px] bg-amber-100 text-amber-700 px-2.5 py-1.5 rounded-lg font-black uppercase tracking-wider shadow-inner">Taşma / Overflow</span>`;
        html += `<tr class="hover:bg-indigo-50/50 transition-colors">
            <td class="py-5 px-4 font-bold text-slate-900 flex items-center gap-1">${a.name}${badge}</td>
            <td class="py-5 px-4 text-center font-mono font-black text-indigo-600 text-lg">${a.qty.toLocaleString()}</td>
            <td class="py-5 px-4 text-slate-500 text-xs font-medium leading-relaxed">${a.sourceCity} ➔ ${a.targetCity}<br><span class="text-[10px] opacity-50 font-mono">${a.dist} km (Merkez)</span></td>
            <td class="py-5 px-4 text-right font-mono font-bold ${isMilkRun ? 'text-emerald-500' : 'text-slate-500'}">${isMilkRun ? '0g (Havuz)' : a.co2.toLocaleString()+'g'}</td>
        </tr>`;
    });
    html += `</tbody></table><div class="mt-8 p-6 bg-indigo-50 text-indigo-900 rounded-2xl border border-indigo-100 flex items-start gap-4 shadow-inner"><div class="text-3xl">🌱</div><p class="text-[11px] font-bold leading-relaxed uppercase tracking-wider">AI Lojistik Motorumuz siparişi öncelikle <b>${region}</b> bölgesindeki kooperatiflere dağıttı. Bu planlama ile <b>${treeEquivalent} ağacın</b> oksijen üretimine eşdeğer tasarruf sağladınız.</p></div>`;
    
    tableWrapper.innerHTML = html;
    document.getElementById('actionPanel').classList.remove('hidden-safely');
    document.getElementById('etaText').innerText = isMilkRun ? "72 Saat Havuz + 2 Gün" : (qty > 1000 ? "4-7 İş Günü" : "2-4 İş Günü");
    
    // Geçici Sipariş Kaydı (Onay Bekliyor)
    currentOrderTemp = { date: new Date().toLocaleDateString(), product: name, info: `${qty.toLocaleString()} Adet / Teslimat: ${city}`, status: isMilkRun ? "Milk Run Havuzunda" : "Hub Onayı Bekliyor", isApproved: false };
});

function confirmOrder() {
    if(!currentOrderTemp) return;
    currentOrderTemp.status = "Üretimde (Hazırlık)"; 
    currentOrderTemp.isApproved = true; // 30 Dk Kuralı Simülasyonu
    orderHistory.unshift(currentOrderTemp); 
    localStorage.setItem('mf_orders_v3', JSON.stringify(orderHistory));
    
    document.getElementById('actionPanel').classList.add('hidden-safely');
    document.getElementById('tableWrapper').innerHTML = `<div class="p-16 text-center animate-slide"><div class="text-6xl mb-6">🚀</div><h4 class="text-2xl font-black text-slate-900 tracking-tighter uppercase">Siparişiniz Hub'lara İletildi</h4><p class="text-sm text-slate-500 mt-2 font-medium leading-relaxed">SLA disiplini gereği Hub onay süreci başladı.<br>Tüm süreci 'Süreç Takibi' sekmesinden anlık izleyebilirsiniz.</p></div>`;
}

// EMEĞİ KORUMA KALKANI (%30 Kesinti Kuralı)
function cancelOrder() {
    if(!currentOrderTemp) return;
    if(currentOrderTemp.isApproved && !confirm("Değerli Müşterimiz, üreticilerimiz hammaddeyi Hub'dan teslim alıp hazırlık aşamasına geçtiği için B2B cari hesabınızdan %30 'Emeğe Saygı Payı' kesilecek ve üreticiye tazminat olarak ödenecektir. İptali onaylıyor musunuz?")) return;
    
    document.getElementById('actionPanel').classList.add('hidden-safely');
    document.getElementById('tableWrapper').innerHTML = `<div class="p-12 text-center text-slate-400 font-black uppercase tracking-widest text-[10px] leading-loose">İşlem B2B Cari Tarafından İptal Edildi.<br>%30 Emeğe Saygı Payı işletildi.</div>`;
    currentOrderTemp = null;
}

function renderHistory() {
    const tbody = document.getElementById('historyBody');
    if(orderHistory.length === 0) { tbody.innerHTML = `<div class="py-16 text-center text-slate-300 font-black uppercase tracking-widest text-[10px]">Henüz bir B2B sipariş kaydınız bulunmuyor.</div>`; return; }
    
    tbody.innerHTML = orderHistory.map(o => `
        <div class="glass-card p-8 bg-white hover:shadow-2xl transition-all border border-slate-100 group animate-slide-up">
            <div class="flex justify-between items-start mb-8 border-b border-slate-50 pb-6">
                <div>
                    <h4 class="text-xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors uppercase">${o.product}</h4>
                    <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1.5">${o.date} • ${o.info}</p>
                </div>
                <span class="px-4 py-1.5 rounded-xl text-[9px] font-black bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-widest shadow-inner">Süreç Aktif</span>
            </div>
            <div class="relative pt-2">
                <div class="overflow-hidden h-2.5 mb-5 flex rounded-full bg-slate-100 shadow-inner">
                    <div style="width: 75%" class="shadow-none flex flex-col bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div class="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-50">
                    <div>AI Onayı</div><div>Hub Hazırlık</div><div>Üretimde</div><div>Kargoda</div>
                </div>
            </div>
        </div>`).join("");
}

function renderProducers() {
    const tbody = document.getElementById('producersBody');
    tbody.innerHTML = producers.map(p => `
        <tr class="hover:bg-slate-50 transition-colors border-b border-slate-100 text-center md:text-left animate-slide-up">
            <td class="py-6 px-6">
                <p class="font-black text-slate-900 tracking-tight uppercase">${p.name}</p>
                <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">${p.badge}</p>
            </td>
            <td class="py-6 px-6 text-slate-500 text-[10px] font-black uppercase tracking-widest">${p.region} / ${p.city}</td>
            <td class="py-6 px-6"><span class="text-sm font-mono font-black ${p.trustScore > 8 ? 'text-emerald-600' : 'text-amber-600'}">${p.trustScore.toFixed(1)}/10</span></td>
            <td class="py-6 px-6 font-mono text-xs font-black ${p.strikes > 0 ? 'text-rose-500' : 'text-slate-300'} flex items-center justify-center gap-1.5 md:justify-start">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                ${p.strikes} HATA
            </td>
            <td class="py-6 px-6 text-slate-600 font-mono text-[10px] font-bold">${p.capacity.toLocaleString()} Adet/Gün</td>
            <td class="py-6 px-6"><span class="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${p.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'} shadow-inner border ${p.status === 'Aktif' ? 'border-emerald-100' : 'border-rose-100'}">${p.status}</span></td>
        </tr>`).join("");
}

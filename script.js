const producersData = [
  { id: "P001", name: "Ayşe Demir", dailyCapacity: 70, speedPerHour: 9, expertise: ["Tekstil", "Dikiş"], availability: "Müsait", availableToday: true },
  { id: "P002", name: "Fatma Kaya", dailyCapacity: 55, speedPerHour: 7, expertise: ["El Sanatları", "Nakış", "Aksesuar"], availability: "Sınırlı", availableToday: true },
  { id: "P003", name: "Emine Yıldız", dailyCapacity: 90, speedPerHour: 11, expertise: ["Tekstil", "Kalite Kontrol"], availability: "Müsait", availableToday: true },
  { id: "P004", name: "Hatice Acar", dailyCapacity: 40, speedPerHour: 6, expertise: ["Paketleme", "Gıda", "Konserve"], availability: "İzinli", availableToday: false },
  { id: "P005", name: "Zehra Kurt", dailyCapacity: 65, speedPerHour: 8, expertise: ["Tekstil", "Hafif Montaj"], availability: "Müsait", availableToday: true },
  { id: "P006", name: "Meryem Çınar", dailyCapacity: 50, speedPerHour: 7, expertise: ["El Sanatları", "İleri Dönüşüm", "Paketleme"], availability: "Sınırlı", availableToday: true },
  { id: "P007", name: "Sevgi Arslan", dailyCapacity: 80, speedPerHour: 10, expertise: ["Tekstil", "Dikiş"], availability: "Müsait", availableToday: true },
  { id: "P008", name: "Nuran Şahin", dailyCapacity: 45, speedPerHour: 6, expertise: ["El Sanatları", "Butik Gıda"], availability: "Sınırlı", availableToday: true },
  { id: "P009", name: "Gülcan Taş", dailyCapacity: 75, speedPerHour: 9, expertise: ["Tekstil", "Kesim"], availability: "Müsait", availableToday: true },
  { id: "P010", name: "Sultan Koç", dailyCapacity: 52, speedPerHour: 7, expertise: ["Paketleme", "Etiketleme"], availability: "Müsait", availableToday: true },
  { id: "P011", name: "Aylin Erdoğan", dailyCapacity: 68, speedPerHour: 8, expertise: ["Dikiş", "Hafif Montaj"], availability: "Müsait", availableToday: true },
  { id: "P012", name: "Derya Polat", dailyCapacity: 35, speedPerHour: 5, expertise: ["İleri Dönüşüm", "Aksesuar"], availability: "İzinli", availableToday: false },
  { id: "P013", name: "Songül Yaman", dailyCapacity: 62, speedPerHour: 8, expertise: ["Tekstil", "Kalite Kontrol"], availability: "Müsait", availableToday: true },
  { id: "P014", name: "Elif Kantar", dailyCapacity: 58, speedPerHour: 7, expertise: ["Kesim", "Paketleme", "Butik Gıda"], availability: "Sınırlı", availableToday: true },
  { id: "P015", name: "Nesrin Uçar", dailyCapacity: 72, speedPerHour: 9, expertise: ["Dikiş", "Hafif Montaj"], availability: "Müsait", availableToday: true },
];

const orderForm = document.getElementById("orderForm");
const orderPreview = document.getElementById("orderPreview");
const distributionBody = document.getElementById("distributionBody");
const GEMINI_API_KEY = window.ENV_API_KEY || "";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// AĞIR SANAYİ LİSTESİ
const UNSUPPORTED_KEYWORDS = ["araba", "otomotiv", "motor", "elektronik", "çip", "sanayi", "döküm", "kaynak", "aks", "pres", "metal", "silah", "kimyasal", "plastik enjeksiyon"];

const complexityMultiplierMap = { dusuk: 1, orta: 0.85, yuksek: 0.7 };
const availabilityMultiplierMap = { "Müsait": 1, "Sınırlı": 0.65, "İzinli": 0 };

let producers = [];
let ordersHistory = []; 

function formatAvailabilityLabel(value) { return value || "Bilinmiyor"; }

// LOCAL STORAGE
function initLocalStorage() {
  const storedProducers = localStorage.getItem("mf_producers");
  if (storedProducers) producers = JSON.parse(storedProducers);
  else { producers = producersData; localStorage.setItem("mf_producers", JSON.stringify(producers)); }
}

function escapeHtml(text) {
  return String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function renderEmptyTableRow(message) {
  if (!distributionBody) return;
  distributionBody.innerHTML = `<tr><td colspan="4" class="px-4 py-10 text-center text-slate-500">${message}</td></tr>`;
}

// FİLTRE
function isUnsupportedProduct(productName) {
  const normalized = productName.trim().toLowerCase();
  return UNSUPPORTED_KEYWORDS.some(kw => normalized.includes(kw) || normalized === kw);
}

// GEMINI HIZLANDIRMA (Sadece 1 cümle)
async function getFastAIMessage(productName, quantity) {
  const prompt = `Müşteri ${quantity} adet '${productName}' siparişi verdi. Sen Micro Factory AI sistemisin. SADECE 1 CÜMLE ile bu siparişi onayladığımızı, kadın emeğini ve sürdürülebilirliği vurgulayan havalı bir endüstriyel mesaj yaz. Asla rapor, plan veya tablo yapma. Sadece tek cümle!`;
  
  const requestBody = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.3, maxOutputTokens: 100 },
  };

  try {
    const response = await fetch(GEMINI_API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(requestBody) });
    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Siparişiniz otonom ağımıza başarıyla aktarıldı.";
  } catch (error) {
    return "Siparişiniz yapay zeka ağı tarafından güvenle planlandı.";
  }
}

function getCurrentNetworkCapacity() {
  return producers.filter(p => p.availableToday).reduce((sum, p) => sum + p.dailyCapacity, 0);
}

// MATEMATİKSEL DAĞITIM
function buildCapacityPlan(quantity, complexity) {
  const cm = complexityMultiplierMap[complexity] || 1;
  const availableProducers = producers.filter(p => p.availableToday);
  
  let producerPlans = availableProducers.map(p => {
    const am = availabilityMultiplierMap[p.availability] || 1;
    return { ...p, effectiveCapacity: Math.floor(p.dailyCapacity * cm * am), assigned: 0 };
  });

  const totalEffectiveCapacity = producerPlans.reduce((sum, item) => sum + item.effectiveCapacity, 0);
  let remaining = quantity;

  producerPlans.forEach(plan => {
    const share = Math.floor((quantity * plan.effectiveCapacity) / totalEffectiveCapacity);
    plan.assigned = Math.min(plan.effectiveCapacity, share);
    remaining -= plan.assigned;
  });

  const producersBySlack = producerPlans.filter(p => p.effectiveCapacity > p.assigned).sort((a, b) => b.effectiveCapacity - a.effectiveCapacity);
  
  let i = 0;
  while (remaining > 0 && producersBySlack.length > 0) {
    const target = producersBySlack[i % producersBySlack.length];
    if (target.assigned < target.effectiveCapacity) { target.assigned++; remaining--; }
    i++; if (i > quantity * 2) break;
  }

  const assignedTotal = producerPlans.reduce((sum, p) => sum + p.assigned, 0);
  return { producerPlans, assignedTotal, shortfall: Math.max(0, quantity - assignedTotal) };
}

// ANA İŞLEM
if (orderForm) {
  initLocalStorage();
  renderEmptyTableRow("Sanal Fabrika göreve hazır. Sipariş bekleniyor.");
  if (orderPreview) orderPreview.style.display = "none";

  orderForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const productName = String(formData.get("productName") || "").trim();
    const quantity = Number(formData.get("quantity"));
    const complexity = String(formData.get("complexity") || "dusuk");

    if (!productName || quantity <= 0) return;

    // 1. AĞIR SANAYİ FİLTRESİ
    if (isUnsupportedProduct(productName)) {
      distributionBody.innerHTML = `<tr><td colspan="4" class="px-4 py-6">
        <div class="rounded-xl border border-red-300 bg-red-50 p-5 text-red-800 font-medium text-sm leading-6">
          ❌ <b>FİZİBİLİTE REDDİ:</b> "${escapeHtml(productName)}" üretim ağımızın dışındadır. Tesisimiz ağır sanayi veya elektronik üretim yapmamaktadır. Sadece Tekstil, Hafif Montaj ve Gıda siparişleri kabul edilir.
        </div></td></tr>`;
      return;
    }

    const totalCapacity = getCurrentNetworkCapacity();
    let finalQuantity = quantity;
    let poolChoice = false;

    // 2. KULLANICIYA SEÇENEK SUNMA (Alert/Confirm)
    if (quantity <= 5) {
      poolChoice = confirm(`🌱 YEŞİL LOJİSTİK UYARISI!\nBu küçük bir sipariş (${quantity} adet).\n\nKargo maliyetini ve karbon ayak izini düşürmek için siparişinizi 72 Saatlik 'Ortak Kargo Havuzu'na eklemek ister misiniz? (Ücretsiz Teslimat)\n\nTamam = Havuza Ekle\nİptal = Hemen Kargola (Ek Ücretli)`);
    } else if (quantity > totalCapacity) {
      const atpChoice = confirm(`⚠️ KAPASİTE AŞIMI!\nAğımızın anlık kapasitesi ${totalCapacity} adettir. \n\nEldeki kapasiteyi hemen üretime alıp, kalan ${quantity - totalCapacity} adedi sıraya (ATP) alalım mı?\n\nTamam = Kısmi Planlamayı Kabul Et\nİptal = Tüm Siparişi İptal Et`);
      if (atpChoice) {
        finalQuantity = totalCapacity;
      } else {
        renderEmptyTableRow("Kapasite yetersizliği nedeniyle sipariş kullanıcı tarafından iptal edildi.");
        return;
      }
    }

    renderEmptyTableRow("Sistem siparişi optimize ediyor, lütfen bekleyin...");

    // 3. HIZLI GEMINI ÇAĞRISI
    const aiMessage = await getFastAIMessage(productName, quantity);

    // 4. TABLO OLUŞTURMA
    const plan = buildCapacityPlan(finalQuantity, complexity);
    const assignedRows = plan.producerPlans.filter(p => p.assigned > 0).sort((a, b) => b.assigned - a.assigned);
    
    let tableHtml = assignedRows.map(item => `
      <tr class="border-t border-slate-100 hover:bg-slate-50">
        <td class="px-4 py-3 font-medium text-slate-700">${item.name}</td>
        <td class="px-4 py-3 text-indigo-700 font-bold">${item.assigned}</td>
        <td class="px-4 py-3 text-slate-500 text-sm">${item.expertise.join(", ")}</td>
        <td class="px-4 py-3 text-slate-500 text-sm">${formatAvailabilityLabel(item.availability)}</td>
      </tr>
    `).join("");

    if (quantity > totalCapacity) {
      tableHtml += `<tr class="bg-yellow-50"><td colspan="4" class="px-4 py-3 text-center text-yellow-800 font-bold text-sm">Kapasite gereği ${finalQuantity} adet planlandı. Kalan ${quantity - finalQuantity} adet ATP kuyruğunda bekletilmektedir.</td></tr>`;
    }

    // 5. SİPARİŞ DURUM BARI
    const statusTrackerHtml = `
      <tr class="bg-slate-50 border-t border-slate-200">
        <td colspan="4" class="px-4 py-5">
          <div class="flex items-center justify-between text-xs font-medium text-slate-500">
            <div class="flex flex-col items-center text-indigo-600">
              <div class="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mb-1 font-bold">1</div>
              <span>Sipariş Alındı</span>
            </div>
            <div class="flex-1 h-px bg-indigo-200 mx-2"></div>
            <div class="flex flex-col items-center ${poolChoice ? 'text-emerald-600' : 'text-slate-400'}">
              <div class="w-6 h-6 ${poolChoice ? 'bg-emerald-100' : 'bg-slate-200'} rounded-full flex items-center justify-center mb-1 font-bold">2</div>
              <span>${poolChoice ? '72 Saat Havuzunda' : 'SLA Bekleniyor'}</span>
            </div>
            <div class="flex-1 h-px bg-slate-200 mx-2"></div>
            <div class="flex flex-col items-center text-slate-400">
              <div class="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center mb-1 font-bold">3</div>
              <span>Hazırlanıyor</span>
            </div>
            <div class="flex-1 h-px bg-slate-200 mx-2"></div>
            <div class="flex flex-col items-center text-slate-400">
              <div class="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center mb-1 font-bold">4</div>
              <span>Kargoya Verildi</span>
            </div>
          </div>
          <div class="mt-4 p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700">
             🤖 <b>AI Yönetim Notu:</b> ${escapeHtml(aiMessage)}
          </div>
        </td>
      </tr>
    `;

    distributionBody.innerHTML = tableHtml + statusTrackerHtml;
  });
}

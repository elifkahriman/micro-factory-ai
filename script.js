const producersData = [
  {
    id: "P001",
    name: "Ayşe Demir",
    dailyCapacity: 70,
    speedPerHour: 9,
    expertise: ["Tekstil", "Dikiş"],
    availability: "Müsait",
    availableToday: true,
  },
  {
    id: "P002",
    name: "Fatma Kaya",
    dailyCapacity: 55,
    speedPerHour: 7,
    expertise: ["El Sanatları", "Nakış", "Aksesuar"],
    availability: "Sınırlı",
    availableToday: true,
  },
  {
    id: "P003",
    name: "Emine Yıldız",
    dailyCapacity: 90,
    speedPerHour: 11,
    expertise: ["Tekstil", "Kalite Kontrol"],
    availability: "Müsait",
    availableToday: true,
  },
  {
    id: "P004",
    name: "Hatice Acar",
    dailyCapacity: 40,
    speedPerHour: 6,
    expertise: ["El Sanatları", "Paketleme", "Gıda", "Konserve"],
    availability: "İzinli",
    availableToday: false,
  },
  {
    id: "P005",
    name: "Zehra Kurt",
    dailyCapacity: 65,
    speedPerHour: 8,
    expertise: ["Tekstil", "Ütüleme"],
    availability: "Müsait",
    availableToday: true,
  },
  {
    id: "P006",
    name: "Meryem Çınar",
    dailyCapacity: 50,
    speedPerHour: 7,
    expertise: ["El Sanatları", "Aksesuar", "Paketleme", "Tarhana"],
    availability: "Sınırlı",
    availableToday: true,
  },
  {
    id: "P007",
    name: "Sevgi Arslan",
    dailyCapacity: 80,
    speedPerHour: 10,
    expertise: ["Tekstil", "Dikiş"],
    availability: "Müsait",
    availableToday: true,
  },
  {
    id: "P008",
    name: "Nuran Şahin",
    dailyCapacity: 45,
    speedPerHour: 6,
    expertise: ["El Sanatları", "Nakış", "Reçel"],
    availability: "Sınırlı",
    availableToday: true,
  },
  {
    id: "P009",
    name: "Gülcan Taş",
    dailyCapacity: 75,
    speedPerHour: 9,
    expertise: ["Tekstil", "Kesim"],
    availability: "Müsait",
    availableToday: true,
  },
  {
    id: "P010",
    name: "Sultan Koç",
    dailyCapacity: 52,
    speedPerHour: 7,
    expertise: ["Paketleme", "Etiketleme"],
    availability: "Müsait",
    availableToday: true,
  },
  {
    id: "P011",
    name: "Aylin Erdoğan",
    dailyCapacity: 68,
    speedPerHour: 8,
    expertise: ["Dikiş", "Kalite Kontrol"],
    availability: "Müsait",
    availableToday: true,
  },
  {
    id: "P012",
    name: "Derya Polat",
    dailyCapacity: 35,
    speedPerHour: 5,
    expertise: ["El Sanatları", "Nakış", "Aksesuar", "Gıda"],
    availability: "İzinli",
    availableToday: false,
  },
  {
    id: "P013",
    name: "Songül Yaman",
    dailyCapacity: 62,
    speedPerHour: 8,
    expertise: ["Tekstil", "Ütüleme"],
    availability: "Müsait",
    availableToday: true,
  },
  {
    id: "P014",
    name: "Elif Kantar",
    dailyCapacity: 58,
    speedPerHour: 7,
    expertise: ["Kesim", "Paketleme", "Konserve"],
    availability: "Sınırlı",
    availableToday: true,
  },
  {
    id: "P015",
    name: "Nesrin Uçar",
    dailyCapacity: 72,
    speedPerHour: 9,
    expertise: ["Dikiş", "Tekstil"],
    availability: "Müsait",
    availableToday: true,
  },
  {
    id: "P016",
    name: "Yasemin Dağ",
    dailyCapacity: 48,
    speedPerHour: 6,
    expertise: ["Aksesuar", "Etiketleme"],
    availability: "Sınırlı",
    availableToday: true,
  },
  {
    id: "P017",
    name: "Filiz Karaca",
    dailyCapacity: 85,
    speedPerHour: 10,
    expertise: ["Tekstil", "Kalite Kontrol"],
    availability: "Müsait",
    availableToday: true,
  },
  {
    id: "P018",
    name: "Sema Turan",
    dailyCapacity: 60,
    speedPerHour: 8,
    expertise: ["El Sanatları", "Paketleme", "Dikiş", "Reçel"],
    availability: "Müsait",
    availableToday: true,
  },
  {
    id: "P019",
    name: "Rabia Eren",
    dailyCapacity: 42,
    speedPerHour: 6,
    expertise: ["Nakış", "Ütüleme", "Tarhana"],
    availability: "Sınırlı",
    availableToday: true,
  },
  {
    id: "P020",
    name: "Buket İnan",
    dailyCapacity: 78,
    speedPerHour: 9,
    expertise: ["Tekstil", "Kesim"],
    availability: "Müsait",
    availableToday: true,
  },
];

const orderForm = document.getElementById("orderForm");
const orderPreview = document.getElementById("orderPreview");
const distributionBody = document.getElementById("distributionBody");
const GEMINI_API_KEY = "AIzaSyCADd9XetY1uuIuDmCfEyvR4dbw4C0v4M8";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const GEMINI_SYSTEM_PROMPT =
  "Sen kadın üreticilerden ve mikro-kooperatiflerden oluşan bir üretim ağının yapay zeka yöneticisisin. Bu ağın uzmanlık alanı sadece şunlardır: Tekstil (bez çanta, tişört vb.), El Sanatları ve Yöresel/Butik Gıda (reçel, konserve, salça, tarhana, erişte vb.). Eğer kullanıcı otomotiv, elektronik, ağır sanayi gibi yetkinliğimiz dışı bir ürün isterse siparişi kibarca reddet. Eğer ürün uzmanlığımıza uygunsa, elindeki üretici verisine göre mantıklı bir dağıtım planı yap.";
const UNSUPPORTED_PRODUCT_KEYWORDS = [
  "araba",
  "otomotiv",
  "motor",
  "elektronik",
  "çip",
  "mikroçip",
  "ağır sanayi",
  "sanayi makinesi",
  "makine parçası",
];

const complexityMultiplierMap = {
  dusuk: 1,
  orta: 0.85,
  yuksek: 0.7,
};

const availabilityMultiplierMap = {
  "Müsait": 1,
  "Sınırlı": 0.65,
  "İzinli": 0,
};

let producers = [];

function formatAvailabilityLabel(value) {
  return value || "Bilinmiyor";
}

function formatComplexityLabel(value) {
  if (value === "dusuk") return "Düşük";
  if (value === "orta") return "Orta";
  if (value === "yuksek") return "Yüksek";
  return "Belirtilmedi";
}

function renderEmptyTableRow(message) {
  if (!distributionBody) return;
  distributionBody.innerHTML =
    '<tr><td colspan="4" class="px-4 py-10 text-center text-slate-500">' +
    message +
    "</td></tr>";
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderAIResponse(message) {
  if (!distributionBody) return;
  distributionBody.innerHTML =
    '<tr><td colspan="4" class="px-4 py-6">' +
    '<div class="rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 text-sm leading-6 text-slate-700 whitespace-pre-wrap">' +
    escapeHtml(message) +
    "</div>" +
    "</td></tr>";
}

function renderErrorResponse(message) {
  if (!distributionBody) return;
  distributionBody.innerHTML =
    '<tr><td colspan="4" class="px-4 py-6">' +
    '<div class="rounded-xl border border-red-300 bg-gradient-to-r from-red-50 to-orange-50 p-4 text-base font-medium leading-7 text-red-700 whitespace-pre-wrap">' +
    escapeHtml(message) +
    "</div>" +
    "</td></tr>";
}

function isUnsupportedProduct(productName) {
  const normalizedName = productName.toLocaleLowerCase("tr-TR");
  return UNSUPPORTED_PRODUCT_KEYWORDS.some((keyword) =>
    normalizedName.includes(keyword.toLocaleLowerCase("tr-TR"))
  );
}

async function askGeminiForPlan(productName, quantity, complexity) {
  console.log("[Gemini] İstek başlatıldı.", {
    productName,
    quantity,
    complexity,
  });

  if (!GEMINI_API_KEY || GEMINI_API_KEY.trim().length === 0) {
    console.error("[Gemini] API anahtarı boş.");
    throw new Error("Gemini API anahtarı tanımlı değil.");
  }

  const userPrompt =
    "Sipariş Bilgileri:\n" +
    "- Ürün Adı: " +
    productName +
    "\n" +
    "- Adet: " +
    quantity +
    "\n" +
    "- Karmaşıklık: " +
    formatComplexityLabel(complexity) +
    "\n\n" +
    "Üretici Verisi:\n" +
    JSON.stringify(producers, null, 2) +
    "\n\n" +
    "Lütfen sadece Türkçe yanıt ver. Ürün uygun değilse net bir ret mesajı yaz. Uygunsa uygulanabilir bir dağıtım planı üret.";

  const requestBody = {
    systemInstruction: {
      parts: [{ text: GEMINI_SYSTEM_PROMPT }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: userPrompt }],
      },
    ],
    generationConfig: {
      temperature: 0.4,
    },
  };

  console.log("[Gemini] API URL hazırlandı.", GEMINI_API_URL);
  console.log("[Gemini] İstek gövdesi hazırlandı.", requestBody);

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  console.log("[Gemini] HTTP yanıtı alındı.", {
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
  });

  if (!response.ok) {
    if (response.status === 404) {
      console.log("[Gemini] 404 alınan URL:", GEMINI_API_URL);
    }
    const errorText = await response.text();
    console.error("[Gemini] API hata yanıtı.", errorText);
    throw new Error("Gemini API isteği başarısız oldu: " + response.status + " " + response.statusText);
  }

  const data = await response.json();
  console.log("[Gemini] JSON yanıtı çözümlendi.", data);
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("\n")
      .trim() || "";

  if (!text) {
    console.error("[Gemini] Boş metin döndü.", data);
    throw new Error("Gemini yanıtı boş geldi.");
  }

  console.log("[Gemini] Geçerli metin yanıtı alındı.");
  return text;
}

function loadProducers() {
  producers = Array.isArray(producersData) ? producersData : [];
  renderEmptyTableRow("Sipariş bekleniyor. Dağıtım planı henüz oluşturulmadı.");
}

function getCurrentNetworkCapacity() {
  return producers
    .filter((producer) => producer.availableToday)
    .reduce((total, producer) => total + producer.dailyCapacity, 0);
}

function buildCapacityPlan(quantity, complexity) {
  const complexityMultiplier = complexityMultiplierMap[complexity] ?? 1;
  const availableProducers = producers.filter((producer) => producer.availableToday);

  const producerPlans = availableProducers.map((producer) => {
    const availabilityMultiplier = availabilityMultiplierMap[producer.availability] ?? 1;
    const effectiveCapacity = Math.floor(
      producer.dailyCapacity * complexityMultiplier * availabilityMultiplier
    );

    return {
      ...producer,
      effectiveCapacity,
      assigned: 0,
    };
  });

  const totalEffectiveCapacity = producerPlans.reduce(
    (total, item) => total + item.effectiveCapacity,
    0
  );

  if (totalEffectiveCapacity <= 0) {
    return {
      producerPlans,
      totalEffectiveCapacity: 0,
      isEnoughCapacity: false,
      shortfall: quantity,
    };
  }

  let remaining = quantity;

  producerPlans.forEach((plan) => {
    const proportionalShare = Math.floor((quantity * plan.effectiveCapacity) / totalEffectiveCapacity);
    const assigned = Math.min(plan.effectiveCapacity, proportionalShare);
    plan.assigned = assigned;
    remaining -= assigned;
  });

  const producersBySlack = producerPlans
    .filter((plan) => plan.effectiveCapacity > plan.assigned)
    .sort((a, b) => b.effectiveCapacity - a.effectiveCapacity);

  let index = 0;
  while (remaining > 0 && producersBySlack.length > 0) {
    const target = producersBySlack[index % producersBySlack.length];
    if (target.assigned < target.effectiveCapacity) {
      target.assigned += 1;
      remaining -= 1;
    }
    index += 1;

    if (index > quantity * 2) break;
  }

  const assignedTotal = producerPlans.reduce((total, item) => total + item.assigned, 0);
  const isEnoughCapacity = assignedTotal >= quantity;

  return {
    producerPlans,
    totalEffectiveCapacity,
    isEnoughCapacity,
    shortfall: Math.max(0, quantity - assignedTotal),
  };
}

function renderPlanTable(plan) {
  if (!distributionBody) return;

  const assignedRows = plan.producerPlans
    .filter((item) => item.assigned > 0)
    .sort((a, b) => b.assigned - a.assigned);

  if (assignedRows.length === 0) {
    renderEmptyTableRow("Atama yapılamadı. Müsait üretici bulunamadı.");
    return;
  }

  distributionBody.innerHTML = assignedRows
    .map(
      (item) =>
        '<tr class="border-t border-slate-100">' +
        '<td class="px-4 py-3 font-medium text-slate-700">' +
        item.name +
        "</td>" +
        '<td class="px-4 py-3 text-slate-700">' +
        item.assigned +
        "</td>" +
        '<td class="px-4 py-3 text-slate-600">' +
        item.expertise.join(", ") +
        "</td>" +
        '<td class="px-4 py-3 text-slate-600">' +
        formatAvailabilityLabel(item.availability) +
        "</td>" +
        "</tr>"
    )
    .join("");
}

if (orderForm && orderPreview) {
  loadProducers();

  orderForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const productName = String(formData.get("productName") || "").trim();
    const quantity = Number(formData.get("quantity"));
    const complexity = String(formData.get("complexity") || "");

    if (!productName || !Number.isFinite(quantity) || quantity <= 0 || !complexity) {
      orderPreview.textContent = "Lütfen ürün adı, adet ve karmaşıklık alanlarını doğru doldurun.";
      renderEmptyTableRow("Geçerli sipariş bilgisi bekleniyor.");
      return;
    }

    if (producers.length === 0) {
      orderPreview.textContent = "Üretici verisi henüz hazır değil. Lütfen tekrar deneyin.";
      renderEmptyTableRow("Üretici verisi yüklenemediği için planlama yapılamadı.");
      return;
    }

    const totalNetworkCapacity = getCurrentNetworkCapacity();
    if (quantity > totalNetworkCapacity) {
      const capacityMessage =
        "Üretim ağımızın şu anki toplam kapasitesi " +
        totalNetworkCapacity +
        " adettir. Siparişinizi bu sınır dahilinde planlayarak kadın üreticilerimize destek olabilirsiniz.";
      renderErrorResponse(capacityMessage);
      orderPreview.textContent = "Kapasite sınırı aşıldı.";
      return;
    }

    orderPreview.textContent = "Sipariş alındı. Yapay zeka destekli planlama hazırlanıyor...";
    renderEmptyTableRow("Gemini analizi sürüyor, lütfen bekleyin...");

    if (isUnsupportedProduct(productName)) {
      const unsupportedMessage = "Bu ürün ağımızın uzmanlık alanı dışındadır.";
      console.error("[Gemini] Uzmanlık dışı ürün tespit edildi.", productName);
      renderErrorResponse(unsupportedMessage);
      orderPreview.textContent = unsupportedMessage;
      return;
    }

    try {
      const aiMessage = await askGeminiForPlan(productName, quantity, complexity);
      const normalizedAiMessage = aiMessage.toLocaleLowerCase("tr-TR");
      const isRejectedByAI =
        normalizedAiMessage.includes("uzmanlık alanı dışı") ||
        normalizedAiMessage.includes("redded") ||
        normalizedAiMessage.includes("üzgünüm") ||
        normalizedAiMessage.includes("yardımcı olamam");

      if (isRejectedByAI) {
        renderErrorResponse(aiMessage);
        orderPreview.textContent = "Sipariş uzmanlık dışı olduğu için reddedildi.";
        return;
      }

      const plan = buildCapacityPlan(quantity, complexity);
      renderPlanTable(plan);
      orderPreview.textContent =
        "Gemini planı alındı. " +
        (plan.isEnoughCapacity
          ? "Sipariş karşılanabilir."
          : "Kapasite yetersiz, açık: " + plan.shortfall + " adet.") +
        " AI Notu: " +
        aiMessage;
    } catch (error) {
      console.error("[Gemini] Planlama hatası.", error);
      renderErrorResponse("Bağlantı sorunu oluştu, lütfen tekrar deneyin");
      orderPreview.textContent = "Gemini planlama hatası oluştu.";
    }
  });
}

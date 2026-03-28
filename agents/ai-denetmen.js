/**
 * ============================================================================
 * MICRO FACTORY AI - OTONOM DENETİM AJANI (AGENT)
 * ============================================================================
 * * Bu ajan, kullanıcıdan gelen siparişleri anlamsal ve fiziksel olarak denetleyen,
 * ev tipi üretime uygunluğunu kontrol eden Gemini 2.5 Flash tabanlı bir yapay zeka filtresidir.
 * * NOT: Bu ajan (agent) mimarisi uygulamanın ana dizinindeki script.js içinde 
 * entegre olarak aktif şekilde çalışmaktadır. Jüri değerlendirmesi için 
 * ajanın prompt mühendisliği ve çalışma mantığı burada ayrıca belgelenmiştir.
 */

async function checkSemanticFeasibility(productName, productDetails) {
    const sanitize = (str) => str.replace(/[`'"\\]/g, '').replace(/ignore|forget|pretend|jailbreak|DAN|system|assistant/gi, '[FİLTRE]').slice(0, 200);
    const safeName = sanitize(productName).toLowerCase();
    const safeDetails = sanitize(productDetails).toLowerCase();

    // ZIRHLI AI PROMPTU - EVRENSEL UYUMSUZLUK KURALI
    const prompt = `SYSTEM ROLE: Sen Micro Factory AI ürün kategori ve kalite kontrol denetçisisin. Ev tipi üretim kooperatifine ait bir sistemin denetçisisin.
GİRDİ:
ÜRÜN_ADI: ###${safeName}###
ÜRÜN_DETAYI: ###${safeDetails}###

KURALLAR:
1. MANTIK UYUMU (EN ÖNEMLİ): Ürün adı ile ürün detayı (reçete) MANTIKLI olmak ZORUNDADIR.
   - Kozmetik/Kimya: Detayda ml, gram, hacim veya koku/içerik bilgisi OLMALIDIR. Ebat (cm) veya beden varsa KESİNLİKLE REDDET.
   - Tekstil: Detayda beden, renk, kumaş tipi OLMALIDIR. ml, litre gibi hacim birimi varsa KESİNLİKLE REDDET.
   - Gıda: Detayda gram, kg veya içerik bilgisi OLMALIDIR. Beden veya ebat (cm) varsa KESİNLİKLE REDDET.
   - Montaj/Ahşap: Detayda boyut (cm), renk veya malzeme tipi OLMALIDIR. ml/litre veya kıyafet bedeni varsa KESİNLİKLE REDDET.

2. EVRENSEL BİRİM UYUMSUZLUĞU: Hangi ürün olursa olsun, birimi fiziksel doğasıyla uyuşmuyorsa REDDET.
   - Tişört için 50ml → MANTIK HATASI
   - Sabun için L Beden → MANTIK HATASI

3. EV DIŞI ÜRETİM: Plastik enjeksiyon, CNC, cam fırını, fiberglas gerektiren ürünler ev ortamında üretilemez → KESİNLİKLE REDDET.

4. KATEGORİLEME: Sorun yoksa ürünü şu 5 kategoriden birine ata: kimya, tekstil, montaj, paketleme, gida.

5. REHBERLİK: Reddetmek zorundaysan RED mesajının sonunda mutlaka "Doğru örnek: [...]" şeklinde kullanıcıyı yönlendir.

ÇIKTI FORMATI: (Sadece bu formatta yanıt ver)
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
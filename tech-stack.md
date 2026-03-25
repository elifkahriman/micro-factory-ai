# 💻 Teknoloji Seçimi ve Mimari Kararlar (Tech Stack)

Micro Factory AI - Distributed Assembly Network (DAN) projesinin hızlı prototipleme sürecinde; yüksek verimlilik, düşük gecikme süresi (latency) ve otonom AI entegrasyonu sağlaması için aşağıdaki teknoloji yığını özenle seçilmiştir:

### ⚡ 1. Frontend & UI (Kullanıcı Deneyimi ve Arayüz)
* **HTML5 & Vanilla JavaScript:** Ekstra bir kütüphane bağımlılığı (React/Vue vb.) kullanılmadan, tarayıcı üzerinde en yüksek render hızına ulaşmak ve Gemini API ile aracısız doğrudan iletişim kurabilmek için tercih edilmiştir.
* **Tailwind CSS (via CDN):** Modern bir "Enterprise B2B SaaS Dashboard" görünümü elde etmek (Glassmorphism cam efekti, dinamik uyarı renkleri, modern KPI tabloları) ve "Mobile-First" yaklaşımıyla geliştirme sürecini hızlandırmak için kullanılmıştır.
* **Tipografi:** Kurumsal ve okunabilir bir yazılım hissi yaratmak amacıyla Google Fonts üzerinden `Plus Jakarta Sans` ve `JetBrains Mono` entegre edilmiştir.

### 🧠 2. Intelligence, Data & Communication (Yapay Zeka, Veri ve İletişim Mimarisi)
* **AI Engine (Google Gemini 2.5 Flash API):** Kurumsal siparişlerin "Semantik Fizibilite Filtresi" (Ağır sanayinin reddedilip; 5 ana kategoriye onay verilmesi) algoritmasını doğal dil işleme yeteneğiyle milisaniyeler içinde çözmek için seçilmiştir.
* **Zırhlı Güvenlik Filtresi:** Sadece anahtar kelime değil, üretim mantığını da denetleyen bir katman eklenmiştir. Metal işçiliği (Vida, somun vb.), ağır sanayi (Motor, aks vb.) ve hırdavat taleplerini otonom olarak engelleyen bir güvenlik duvarı (Security Guard) inşa edilmiştir.
* **Omni-Channel İletişim (WhatsApp Business API / Twilio):** Sahadaki üretici kadınların teknolojik bariyerini yıkmak için iletişim katmanı olarak sisteme entegre edilmiştir. Dashboard bağımlılığını ortadan kaldırarak; anlık iş atamaları, 30 dakikalık interaktif ONAY/RED akışı ve saha veri girişleri doğrudan WhatsApp mesajlaşma arayüzü üzerinden sağlanmıştır.
* **V16 Kalıcı Veri Yönetimi (Data Persistence):** `localStorage` üzerinde "Strict Null Logic" uygulanmıştır. Bu mimari karar; Karbon/Ağaç tasarruf sayacı gibi kritik verilerin sıfırlandığında "falsy value" hatalarına düşmesini engeller ve tam veri senkronizasyonu sağlar.
* **Smart Routing & Milk Run:** 81 il ve 922 ilçe tabanlı bölgesel öncelik algoritması ile 50 adet altı siparişlerde **"Bölgesel Dağıtım Havuzu"** konsolidasyonu JS karar ağaçları ile otonom hale getirilmiştir.

### 🛠️ 3. Development & Workflow (Geliştirme Araçları)
* **IDE (Cursor AI):** Gelişmiş AI destekli kodlama ile hata ayıklama (debugging) sürecini minimize etmek ve karmaşık lojistik algoritmaları (%30 Emeğe Saygı Payı, Kapasite Kuyruğu, WhatsApp 30 Dk Zaman Aşımı) koda hızlıca dönüştürmek için tercih edilmiştir.
* **Source Control (GitHub):** Versiyon kontrolü ve Buildathon açık kaynak standartlarına uyumluluk için kullanılmıştır.

### 🌐 4. Deployment (Yayınlama Hattı)
* **Hosting & CI/CD (Netlify):** Statik web uygulamalarının sürekli entegrasyon prensibiyle saniyeler içinde yayına alınması ve `ENV_API_KEY` gibi çevresel değişkenlerin güvenli yönetimi için seçilmiştir.
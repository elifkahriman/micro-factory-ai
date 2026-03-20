# 💻 Teknoloji Seçimi ve Mimari Kararlar (Tech Stack)

Micro Factory AI projesinin hızlı prototipleme sürecinde yüksek verimlilik ve modern AI entegrasyonu sağlaması için aşağıdaki teknoloji yığını seçilmiştir:

### ⚡ 1. Frontend & UI (Kullanıcı Deneyimi)
* **HTML5 & Vanilla JavaScript:** Ekstra bir kütüphane bağımlılığı (React/Vue vb.) olmadan, tarayıcı üzerinde en hızlı render süresi ve Gemini API ile doğrudan iletişim kurabilmek için tercih edildi.
* **Tailwind CSS (CDN):** Tasarım sürecini hızlandırmak, "Mobile-First" yaklaşımını korumak ve kurumsal bir "SaaS Dashboard" (Cam efekti, modern tablolar) görünümü elde etmek için kullanıldı.

### 🧠 2. Intelligence & Data (Yapay Zeka ve Veri)
* **AI Engine (Gemini API):** Karmaşık üretim planlama, fizibilite filtresi (ağır sanayi engeli) ve lojistik kümeleme algoritmalarını doğal dil işleme yeteneğiyle çözmek için seçildi.
* **JSON Data Management & LocalStorage:** Üretici veritabanı JSON formatında yapılandırıldı. Sistemin hafızasını korumak ve sunucu maliyeti yaratmamak adına, sayfa yenilendiğinde verilerin silinmemesi için tarayıcının `localStorage` teknolojisi entegre edildi.

### 🛠️ 3. Development & Workflow (Geliştirme Araçları)
* **IDE:** **Cursor AI**. AI destekli geliştirme ile kod hatalarını minimize etmek ve PRD dokümanlarını koda hızlıca dönüştürmek için tercih edildi.
* **Source Control:** **GitHub**. Versiyon kontrolü ve projenin açık kaynak standartlarına uygunluğu için.

### 🌐 4. Deployment (Yayınlama Hattı)
* **Hosting:** **Lovable / Netlify**. Statik web uygulamalarının sürekli entegrasyon (CI/CD) prensibiyle, saniyeler içinde internete yayılması ve canlı testlerin yapılabilmesi için en verimli çözüm olarak seçildi.

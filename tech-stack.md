# 💻 Teknoloji Seçimi ve Mimari Kararlar (Tech Stack)

Micro Factory AI - Distributed Assembly Network (DAN) projesinin hızlı prototipleme sürecinde; yüksek verimlilik, düşük gecikme süresi (latency) ve otonom AI entegrasyonu sağlaması için aşağıdaki teknoloji yığını özenle seçilmiştir:

### ⚡ 1. Frontend & UI (Kullanıcı Deneyimi ve Arayüz)
* **HTML5 & Vanilla JavaScript:** Ekstra bir kütüphane bağımlılığı (React/Vue vb.) kullanılmadan, tarayıcı üzerinde en yüksek render hızına ulaşmak ve Gemini API ile aracısız doğrudan iletişim kurabilmek için tercih edilmiştir.
* **Tailwind CSS (via CDN):** Modern bir "Enterprise B2B SaaS Dashboard" görünümü elde etmek (Glassmorphism cam efekti, dinamik uyarı renkleri, modern KPI tabloları) ve "Mobile-First" yaklaşımıyla geliştirme sürecini hızlandırmak için kullanılmıştır.
* **Tipografi:** Kurumsal ve okunabilir bir yazılım hissi yaratmak amacıyla Google Fonts üzerinden `Plus Jakarta Sans` ve `JetBrains Mono` entegre edilmiştir.

### 🧠 2. Intelligence & Data (Yapay Zeka ve Veri Mimarisi)
* **AI Engine (Google Gemini 2.5 Flash API):** Kurumsal siparişlerin "Semantik Fizibilite Filtresi" (Ağır sanayinin reddedilip; Doğal Kozmetik, Tekstil, Hafif Montaj, Paketleme, İleri Dönüşüm dikeyine onay verilmesi) algoritmasını doğal dil işleme yeteneğiyle milisaniyeler içinde çözmek için seçilmiştir.
* **Algoritmik Lojistik Motoru (Smart Routing & Milk Run):** Bölgesel teslimat önceliği (81 il ve ilçe tabanlı), kapasite aşımında Waitlist (ATP) pazarlığı ve 50 adet altı siparişlerde 72 Saatlik Ortak Kargo havuzunu hesaplayan karar ağaçları Vanilla JS ile kodlanmıştır.
* **JSON Data Management & LocalStorage:** "Bölgesel Kooperatif Hub" veritabanı (Üretici, bölge, kapasite, SLA güven puanı, ihraç durumu) JSON formatında yapılandırılmıştır. MVP (Minimum Viable Product) aşamasında sunucu maliyeti yaratmamak ve verilerin sayfada kalıcı olmasını sağlamak (Sipariş geçmişi, Timeline) adına tarayıcının `localStorage` teknolojisi entegre edilmiştir.

### 🛠️ 3. Development & Workflow (Geliştirme Araçları)
* **IDE (Cursor AI):** Gelişmiş AI destekli kodlama ile hata ayıklama (debugging) sürecini minimize etmek, PRD dokümanlarındaki karmaşık algoritmaları (%30 Emeğe Saygı Payı, 30 Dk Onay Kuralı) koda hızlıca dönüştürmek için tercih edilmiştir.
* **Source Control (GitHub):** Versiyon kontrolü, kodun yedeklenmesi ve projenin açık kaynak Buildathon standartlarına uygunluğu için kullanılmıştır.

### 🌐 4. Deployment (Yayınlama Hattı)
* **Hosting & CI/CD (Netlify):** Statik web uygulamalarının sürekli entegrasyon (CI/CD) prensibiyle saniyeler içinde internete yayılması, canlı testlerin güvenli bir ortamda yapılabilmesi ve `ENV_API_KEY` gibi çevresel değişkenlerin güvenle saklanabilmesi için en verimli çözüm olarak seçilmiştir.

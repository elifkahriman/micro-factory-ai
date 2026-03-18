# 📋 PRD: Micro Factory AI - Akıllı Üretim Dağıtım Sistemi

## 1. Proje Vizyonu ve Kapsamı
**Micro Factory AI**, coğrafi olarak dağınık, mikro ölçekli kadın üreticileri tek bir sanal fabrika (Virtual Factory) çatısı altında birleştiren yapay zeka tabanlı bir üretim yönetim sistemidir. 

Projenin temel amacı; geleneksel yöntemlerle yönetilmesi imkansız olan "çok parçalı ve belirsiz" üretim kapasitesini, **Gemini AI**'ın akıl yürütme (reasoning) yetenekleriyle optimize ederek kurumsal tedarik zincirine dahil etmektir.

---

## 2. Hedef Kullanıcı Analizi ve İhtiyaçlar

| Kullanıcı Grubu | Temel İhtiyaç | Çözüm Yaklaşımı |
| :--- | :--- | :--- |
| **Kurumsal Alıcı (B2B)** | Hızlı termin süresi, kalite standardı ve etik üretim. | Tek noktadan sipariş girişi ve şeffaf kapasite takibi. |
| **Mikro Üretici (Kadınlar)** | Esnek çalışma saatleri ve adil iş dağılımı. | Doğal dille kapasite bildirimi ve yetkinliğe dayalı iş ataması. |

---

## 3. Detaylı Fonksiyonel Gereksinimler

### 3.1. Akıllı Kapasite Yönetimi (AI-Powered Capacity Engine)
* **Veri Yapısı:** Sistem, arka planda 20-30 kişilik kurgusal (sentetik) bir üretici havuzu tutar. Her üreticinin günlük max üretim adedi, yetkinlik seviyesi (Acemi/Usta) ve haftalık müsaitlik takvimi bulunur.
* **AI Analizi:** Gemini, sipariş geldiğinde tüm üreticilerin verilerini saniyeler içinde tarar. Basit bir aritmetik bölme yerine; üreticilerin hızlarını ve takvimlerini dikkate alan bir **Yöneylem Analizi** gerçekleştirir.

### 3.2. Dinamik Sipariş Formu ve Dağıtım Algoritması
* **Esnek Girdi:** Kullanıcı ürün tipini, karmaşıklığını ve toplam adedi seçer.
* **Optimizasyon Öncelikleri:** 1. **Adalet:** İş yükünü üreticilerin kapasite oranlarına göre orantılamak.
    2. **Verimlilik:** Acil siparişlerde en hızlı üreticileri önceliklendirmek.
    3. **Sürdürülebilirlik:** Tek bir üreticiye aşırı yük binmesini (Overload) engellemek.

---

## 4. Teknik Mimari (System Architecture)

* **Frontend:** HTML5, Tailwind CSS ve Modern JavaScript (Vanilla JS). Mobil öncelikli (Responsive) tasarım.
* **Zeka Katmanı (Core AI):** **Google Gemini 2.0 Flash API**. Planlama mantığı, sistem komutları (System Instructions) ile tanımlanacaktır.
* **Veri Yönetimi:** JSON formatında yapılandırılmış "Producers Database".

---

## 5. Başarı Metrikleri (KPIs)
* **Hesaplama Hızı:** Kompleks bir siparişin 10 saniyeden kısa sürede tüm ağa dağıtılması.
* **Doluluk Oranı:** Mevcut kapasitenin en az %90 verimlilikle planlanması.
* **Hata Payı:** Manuel planlamadaki matematiksel hataların AI tarafından %0'a indirilmesi.

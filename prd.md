# 📋 PRD: Micro Factory AI - Akıllı Üretim Dağıtım Sistemi

## 1. Proje Vizyonu ve Kapsamı
**Micro Factory AI**, evden üretim yapan kadınları ve yerel kooperatifleri tek bir dijital üretim ağı çatısı altında birleştiren yapay zeka tabanlı bir yönetim sistemidir. 

Projenin temel amacı; dağınık ve mikro ölçekli kadın emeğini, yapay zekanın analiz yetenekleriyle optimize ederek kurumsal tedarik zincirine güçlü ve sürdürülebilir bir şekilde dahil etmektir.

---

## 2. Hedef Kullanıcı Analizi

| Kullanıcı Grubu | Temel İhtiyaç | Çözüm Yaklaşımı |
| :--- | :--- | :--- |
| **Kurumsal Alıcı (B2B)** | Hızlı termin süresi ve etik üretim. | Tek noktadan sipariş girişi ve şeffaf kapasite takibi. |
| **Kadın Üreticiler** | Esnek çalışma ve adil iş dağılımı. | Kapasite bildirimi ve yetkinliğe dayalı iş ataması. |

---

## 3. Fonksiyonel Gereksinimler

### 3.1. Akıllı Kapasite Yönetimi
* **Veri Yapısı:** Arka planda kurgusal bir üretici havuzu (İsim, günlük kapasite, uzmanlık seviyesi ve müsaitlik) tutulur.
* **Analiz Süreci:** Yapay zeka motoru, sipariş geldiğinde tüm üretici verilerini tarar. Üreticilerin hızlarını ve takvimlerini dikkate alan bir kapasite planlaması gerçekleştirir.

### 3.2. Dinamik Sipariş Formu ve Dağıtım Algoritması
* **Esnek Girdi:** Kullanıcı ürün tipini ve toplam adedi seçer.
* **Optimizasyon Öncelikleri:** 1. **Adalet:** İş yükünü üreticilerin kapasite oranlarına göre dağıtmak.
    2. **Verimlilik:** Teslimat süresini minimize etmek için uygun kapasiteleri eşleştirmek.
    3. **Denge:** Tek bir üreticiye aşırı yük binmesini (Overload) engellemek.

---

## 4. Teknik Mimari

* **Arayüz (Frontend):** HTML5, Tailwind CSS ve JavaScript. Mobil uyumlu tasarım.
* **Zeka Katmanı:** Yapay Zeka API Entegrasyonu. Planlama mantığı sistem talimatları ile tanımlanacaktır.
* **Veri Yönetimi:** JSON formatında yapılandırılmış üretici veritabanı.

---

## 5. Başarı Metrikleri
* **Hız:** Siparişin saniyeler içinde tüm ağa dağıtılması.
* **Verimlilik:** Mevcut kapasitenin en yüksek oranda (optimize) kullanılması.
* **Doğruluk:** Matematiksel hataların ve kapasite aşımlarının engellenmesi.

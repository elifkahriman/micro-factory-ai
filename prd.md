# 📋 PRD: Micro Factory AI - Distributed Assembly Network (DAN)

## 1. Proje Vizyonu ve Stratejik Hedef
**Micro Factory AI**, merkezi fabrikaların hantal, yüksek maliyetli ve karbon yoğun yapısını; merkeziyetsiz kadın emeği ve yapay zeka senkronizasyonu ile yıkan otonom bir üretim yönetim sistemidir. Sistem, atıl üretim kapasitesini (ev atölyeleri ve yerel kooperatifler) kurumsal B2B tedarik zincirlerine profesyonel bir **"Sanal Üretim Katmanı"** olarak entegre eder.

---

## 2. Detaylı Fonksiyonel Gereksinimler

### 2.1. Semantik AI Fizibilite ve Güvenlik Filtresi
* **AI Karar Motoru:** Her kurumsal sipariş, Gemini 2.5 Flash API tarafından semantik analize tabi tutulur.
* **Kapsam Dışı Reddi:** Ağır sanayi, kaynak, döküm veya otomotiv yedek parçası (Örn: Aks, Motor, Silah, Beton) içeren talepler "Endüstriyel Kapsam Dışı" gerekçesiyle otonom olarak reddedilir.
* **Onaylı 5 Ana Üretim Kategorisi:**
    1.  **Doğal Kozmetik & Kimya:** Butik sabun, doğal mum, ruj ve krem üretimi.
    2.  **Tekstil & Örme:** Amigurumi, bez çanta, makrome ve nakış işlemleri.
    3.  **Hafif Montaj (Light Assembly):** Kablo demeti bantlama, priz/soket birleştirme, takı montajı.
    4.  **Paketleme & Tasnif:** Promosyon kutusu hazırlama, abonelik kutusu dizimi ve vida/somun poşetleme.
    5.  **İleri Dönüşüm (Upcycling) & Gıda:** Atık kumaşlardan sürdürülebilir ürünler ve kooperatif denetimli butik gıda.

### 2.2. Akıllı Bölgesel Yönlendirme (Smart Routing)
* **81 İl Lojistik Özgürlüğü:** Kullanıcılar Türkiye'nin 81 iline ve ilçelerine özgürce teslimat rotası çizebilir.
* **Lojistik Optimizasyonu:** Siparişler, karbon emisyonunu minimize etmek için öncelikle müşterinin seçtiği teslimat bölgesindeki üreticilere atanır.
* **ATP (Available to Promise):** Talep bölgesel kapasiteyi aşarsa, sistem güven puanı yüksek komşu bölgeye taşma (overflow) yapar veya müşteriden **"Waitlist" (Bekleme Sırası)** onayı alır.

### 2.3. Yeşil Lojistik: Milk Run ve Hub Mimarisi
* **Bölgesel Hub'lar (Şahıs Değil, Kurum):** Sistemde şahıs isimleri (Ayşe, Fatma) yer almaz. Kurumsal marka hammaddeyi ilgili ilçedeki "Kooperatif Hub'ına" bırakır; üretici malzemeyi buradan alır ve iş bitiminde kalite kontrol için geri getirir.
* **72 Saat Yeşil Havuz:** 50 adet altındaki mikro siparişler, lojistik maliyetini ve karbon yükünü sıfırlamak adına mahalle bazlı "72 Saatlik Yeşil Havuzda" bekletilerek konsolide edilir.

### 2.4. Algoritmik Yönetişim ve SLA Sistemi
* **30 Dakika Onayı & Yedekleme:** İşi onaylaması için kooperatife/üreticiye 30 dakika tanınır; aksi halde iş otomatik olarak yedek (backup) üreticiye aktarılır.
* **Disiplin Protokolü:** Her üretici 10 üzerinden bir "Güven Puanına" sahiptir. 3 SLA ihlali (gecikme/hata) yapan üretici 6 ay askıya alınır, 6 ihlale ulaşan üretici 3 yıl sistemden ihraç edilir.

### 2.5. Emeği Koruma Kalkanı (Finansal Güvence)
* **Kademeli İptal & %30 Emeğe Saygı Payı:** 1. **%100 İade:** Üretici henüz işi onaylamadıysa.
    2. **%30 Kesinti:** Üretici işi onaylayıp Hub'dan malzeme aldıysa, B2B cari hesabından %30 kesilerek üretici kadına tazminat olarak aktarılır.
    3. **İptal Edilemez:** Üretim %50 aşamasını geçtiyse iptal butonu kapanır.
* **B2B Cari Sistem:** Kurumsal firmalar için kredi kartı yerine cari hesap ve faturalandırma mantığıyla çalışılır.

---

## 3. Teknik Mimari ve UI Gereksinimleri
* **Frontend:** HTML5, Tailwind CSS, Vanilla JS (Enterprise Dashboard Tasarımı).
* **AI Engine:** Google Gemini 2.5 Flash API (Fizibilite Analizi ve Karar Motoru).
* **Takip Sistemi:** "Alındı -> AI Onayı -> Üretimde -> Kargoda" aşamalarını gösteren görsel timeline.
* **State Management:** `localStorage` (Sipariş geçmişi ve üretici performans verileri).

---

## 4. Başarı Metrikleri (KPIs)
* **Operasyonel Hız:** Karmaşık bir kurumsal siparişin 10 saniyeden kısa sürede otonom dağıtılması.
* **Sürdürülebilirlik:** Geleneksel lojistik modellerine göre karbon ayak izinde %70 azalma sağlanması.
* **Sosyal Etki:** Dezavantajlı kadın emeğinin %100 kayıtlı ve B2B standartlarında güvenceli ekonomiye dahil edilmesi.

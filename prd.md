# 📋 PRD: Micro Factory AI - Distributed Assembly Network (DAN)

**Sürüm:** 1.6 (Final Build - Ultra Detailed)  
**Durum:** Buildathon Teslim Hazır / WhatsApp Bot & ESG Entegre  
**Kapsam:** B2B Merkeziyetsiz Üretim Yönetimi ve ESG Lojistik Katmanı  

---

## 1. Proje Vizyonu ve Stratejik Hedef
**Micro Factory AI**, merkezi fabrikaların yüksek maliyetli, hantal ve karbon yoğun yapısını; merkeziyetsiz kadın emeği ve yapay zeka (Gemini + WhatsApp Bot) senkronizasyonu ile dönüştüren otonom bir üretim yönetim sistemidir. Sistem, Türkiye genelindeki atıl üretim kapasitesini (ev atölyeleri ve yerel kooperatifler) kurumsal B2B tedarik zincirlerine profesyonel, SLA güvenceli bir **"Sanal Üretim Katmanı"** olarak entegre eder.

---

## 2. Fonksiyonel Gereksinimler & Algoritmik Kurallar

### 2.1. Semantik AI Fizibilite ve Güvenlik Filtresi (Gemini 2.5 Flash)
* **Kati Reçete Denetimi:** Sistem sadece ürün ismine bakmaz. Kullanıcı; **Renk, Beden/Boyut, Gramaj veya Teknik Ölçü** (Örn: 35x45cm bez çanta veya Siyah L Beden) girmek zorundadır. Reçete detayları semantik olarak yetersizse (Örn: Sadece sayı girilmesi) AI otonom olarak reddeder.
* **Zırhlı Güvenlik Duvarı (Red List):** * **Ağır Sanayi:** Aks, motor, beton, döküm, şanzıman, kaynak ve endüstriyel boya içeren talepler reddedilir.
    * **Hırdavat/Metal İşçiliği:** Vida, çivi, somun, civata, perçin vb. parçalar; ev tipi üretime uygun olmadığı ve özel ekipman gerektirdiği için kati olarak engellenir.
* **Onaylı 5 Ana Üretim Kategorisi:**
    1. **Doğal Kozmetik & Kimya:** Butik sabun, mum, krem, aromatik yağlar.
    2. **Tekstil & Örme:** Amigurumi, bez çanta, makrome, nakış, butik tekstil.
    3. **Hafif Montaj:** Kablo demeti bantlama, takı montajı, ahşap obje birleştirme.
    4. **Paketleme & Tasnif:** Promosyon/Abonelik kutusu hazırlama, set oluşturma.
    5. **İleri Dönüşüm & Butik Gıda:** Atık kumaş ürünleri ve kooperatif denetimli kuru gıda/reçel.

### 2.2. Omni-Channel Saha İletişimi (WhatsApp Business API)
* **Teknoloji Bariyerini Yıkma:** Üretici kadınların dashboard takibi zorunluluğu kaldırılarak, tüm operasyonel iletişim WhatsApp üzerinden kurgulanmıştır.
* **İnteraktif Bot Akışı (Twilio/WhatsApp):**
    * **İş Atama:** Uygun üreticiye "Ürün - Adet - Net Kazanç - Teslim Tarihi" bilgilerini içeren anlık mesaj gider.
    * **Hızlı Onay (30 Dakika):** Üretici telefonundan "ONAY" veya "EVET" yazarak işi rezerve eder. 30 dakika içinde yanıtlanmayan iş otonom olarak yedek üreticiye devredilir.
    * **Saha Veri Girişi:** Üretici; "Malzemeyi Aldım", "Üretime Başladım", "Hub'a Teslim Ettim" statülerini bot üzerinden sisteme akıtır.

### 2.3. Akıllı Bölgesel Yönlendirme (Smart Routing)
* **81 İl ve İlçe Entegrasyonu:** Türkiye'nin tüm illeri ve 922 ilçesi (Mengen/Bolu gibi lokal noktalar dahil) lojistik ağda tanımlıdır.
* **Lojistik Optimizasyonu:** Siparişler, karbon emisyonunu minimize etmek için öncelikle müşterinin seçtiği teslimat bölgesindeki **Bölgesel Hub (Kooperatif)** ağlarına atanır.
* **Kapasite Yönetimi (ATP - Available to Promise):** Talep bölgesel kapasiteyi aşarsa, sistem kalan miktarı otomatik olarak **"⏳ Kapasite Aşımı (Sıraya Alındı)"** statüsüyle kuyruğa alır; kullanıcı onay verirse süreç başlatılır.

### 2.4. Yeşil Lojistik: Milk Run ve Hub Mimarisi
* **Bölgesel Hub Mimarisi:** Üretim şahıs bazlı kargo trafiğiyle değil, kurumsal "Kooperatif Hub'ları" üzerinden yürütülür. Marka hammaddeyi Hub'a bırakır, üretici malzemeyi buradan alır ve bitmiş ürünü kalite kontrol (QC) için geri getirir.
* **Havuzlu Dağıtım (Milk-Run):** 50 adet altındaki mikro siparişler için kullanıcıdan **"Günlük Bölgesel Dağıtım Havuzu"** onayı alınır. Bu modda karbon emisyonu sıfırlanır ve lojistik maliyeti minimize edilir.

### 2.5. Operasyonel Hakemlik ve Emeği Koruma (SLA)
* **%30 Emeğe Saygı Payı:** Onaylanmış ve üretime başlanmış siparişlerin iptalinde, mikro üreticinin hazırlık emeğini ve zaman kaybını tazmin etmek adına B2B cari hesabından **%30 kesinti** uygulanır. Sipariş henüz onaylanmamışsa (sıradaysa) %100 iade yapılır.
* **Kalite Kontrol (QC) & Disiplin Protokolü:** Ürünler Hub'da son kontrolden geçer. 3 SLA ihlali (gecikme/hata) yapan üretici 6 ay askıya alınır, 6 ihlalde sistemden kalıcı ihraç edilir.

---

## 3. Teknik Mimari ve UI Gereksinimleri
* **Frontend:** HTML5, Tailwind CSS, Vanilla JS (Bağımsız, hızlı render).
* **AI Engine:** Google Gemini 2.5 Flash API (Fizibilite Analizi ve Karar Motoru).
* **State Management (V16 Persistence):** `localStorage` tabanlı veri mimarisi. "Strict Null Logic" ile geçmiş silindiğinde Karbon/Ağaç sayacı senkronize olarak `0` değerine çekilir ve "falsy value" (sıfırın hata olarak algılanması) hataları engellenir.
* **UI UX:** Uzun reçetelerde esneyen (Flex-layout) sağ panel, canlı ağ akışı (live feed) ve parlatılmış yüksek okunurluklu footer alanı.

---

## 4. Başarı Metrikleri (KPIs)
* **Sürdürülebilirlik:** Geleneksel lojistik modellerine göre karbon ayak izinde **%70 azalma**.
* **Operasyonel Verimlilik:** Kurumsal bir siparişin 3 saniyede otonom lojistik planına dönüşmesi.
* **Sosyal Etki:** Dezavantajlı kadın emeğinin %100 kayıtlı, B2B SLA güvenceli ve profesyonel ekonomiye dahil edilmesi.
# 📋 PRD: Micro Factory AI - Akıllı Üretim Dağıtım Sistemi

## 1. Proje Vizyonu
**Micro Factory AI**, evden üretim yapan kadınları ve yerel kooperatifleri tek bir sanal fabrika çatısı altında birleştiren yapay zeka tabanlı bir yönetim sistemidir. Kendi fiziksel fabrikasını kurmak yerine, mevcut atıl kapasiteyi teknolojiyle senkronize eden bir "Üst Akıl" olarak çalışır.

---

## 2. Detaylı Fonksiyonel Gereksinimler (Sistem Nasıl Çalışır?)

### 2.1. Akıllı Kapasite ve Fizibilite Filtresi
Kullanıcı evde yapılamayacak bir ağır sanayi siparişi girerse, AI bunu otomatik reddeder. Sistem sadece şu kategorileri işleme alır:
* **Tekstil ve Örme:** Amigurumi (örgü oyuncak), bez çanta, makrome, el örgüsü ve nakış.
* **Hafif Montaj (Light Assembly):** Otomotiv yan sanayisi için kablo demeti bantlama, elektrik prizi/soketi birleştirme, takı ve mandal montajı.
* **Paketleme ve Tasnif:** Abonelik kutularının içine ürün dizilmesi, kurumsal promosyon/hediye paketlerinin hazırlanması, vida/somun poşetlemeleri.
* **İleri Dönüşüm (Upcycling):** Fabrika atık kumaşlarından kırkyama (patchwork) çanta üretimi gibi ESG (Sürdürülebilirlik) odaklı işler.
* **Butik Gıda:** Yerel kooperatif onaylı salça, reçel ve konserve üretimi.

* **Esnek Sipariş (ATP):** Talep edilen adet ağın kapasitesini aşarsa, AI reddetmek yerine "Eldeki X adedi hemen planlayalım, kalan Y adet için süreyi uzatalım mı?" pazarlığı yapar.

### 2.2. Hammadde ve Hub Lojistiği (Sıfır Cep Harcaması)
* **Hammadde Tedariği:** Kadınlar malzemeyi kendi cebinden almaz. Kurumsal marka, malzemeyi üreticilerin bulunduğu ilçelerdeki "Bölgesel Toplama Merkezlerine" (Yerel kooperatifler veya belediye lokalleri - Hub) bırakır. Üretici malzemeyi buradan alır, işler ve geri getirir.
* **Kalite Kontrol ve Sevkiyat:** Kalite kontrolü bu yerel Hub'larda yapılır ve markaya tek bir koli ile sevk edilir. Kargo evleri tek tek gezmez.
* **72 Saat Kargo Havuzu:** Bireysel müşterilerin küçük siparişleri (1-2 adet), lojistik maliyetini düşürmek için sistemde 72 saat bekletilir ve mahalledeki diğer siparişlerle "Ortak Kargo" (Milk Run) yapılır.

### 2.3. Algoritmik Yönetişim: SLA ve Oyunlaştırma
* **30 Dakika Onayı:** Üreticiye iş onayı için 30 dk verilir. Onaylamazsa iş saniyeler içinde yedek (backup) üreticiye geçer.
* **Ustalık Rozeti:** İşleri hatasız teslim edenlerin "Güven Puanı" artar ve "Usta" rozeti alırlar. AI, en kârlı kurumsal işleri ilk olarak Ustalara yönlendirir.

### 2.4. Emeği Koruma Kalkanı (Kademeli İptal Politikası)
Müşteri siparişi iptal etmek isterse sistem şu kuralları işletir:
1. **%0 Kesinti (Tam İade):** Üretici henüz işi onaylamadıysa.
2. **%30 Kesinti (Emeğe Saygı Payı):** Üretici işi onaylamış ve yerel merkezden malzemeyi almışsa, sipariş bedelinin %30'u markadan kesilerek üretici kadına tazminat olarak ödenir.
3. **İptal Edilemez (%100):** Üretim %50 aşamasına geldiyse iptal butonu kapanır.

---

## 3. Teknik Mimari ve Başarı Metrikleri
* **Arayüz (Frontend):** HTML5, Tailwind CSS, JS (Endüstriyel SaaS Dashboard).
* **Zeka (Backend):** Gemini API (Karar Motoru) ve `localStorage` (Veri Kalıcılığı).
* **KPI'lar:** Kapasitenin %90 verimle planlanması, sıfır hatalı lojistik ve karbon salınımında %70 düşüş.

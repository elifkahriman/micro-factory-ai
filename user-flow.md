# 🌊 Kullanıcı Akışı (User Flow) - Micro Factory AI (DAN)

Bu belge, kurumsal bir B2B müşterisinin ve bölgesel bir kooperatif üreticisinin Micro Factory AI platformundaki uçtan uca etkileşim haritasını (User Journey) tanımlar.

### 🏢 Adım 1: Kurumsal Giriş ve Talep Oluşturma
1. **B2B Portal Erişimi:** Kullanıcı, kurumsal hesabıyla sisteme şifreli giriş yapar. Sistem kredi kartı sormaz, "B2B Cari Hesap" ve faturalandırma mantığıyla çalışır.
2. **Sipariş Girişi:** Ürün tanımını, adedini, onaylı 5 kategoriden birini (Örn: Doğal Kozmetik, Hafif Montaj) ve teslimat rotasını (Türkiye'nin 81 ilinden herhangi biri özgürce girilebilir) sisteme işler.

### 🤖 Adım 2: Semantik AI Fizibilite Filtresi
3. **Güvenlik Ağı (Gemini 2.5 Flash):** AI, siparişin ev/kooperatif şartlarına uygunluğunu milisaniyeler içinde denetler.
   - **Kapsam Dışı Reddi:** Sipariş ağır sanayi, otomotiv parçası, döküm veya kaynak (Örn: Aks, Motor, Beton) içeriyorsa anında otonom olarak reddedilir.
   - **Onay:** Sistem sadece Doğal Kozmetik, Tekstil, Hafif Montaj, Paketleme ve İleri Dönüşüm/Gıda kategorilerine geçiş izni verir.

### 🧠 Adım 3: Smart Routing ve Lojistik Planlama
4. **Bölgesel Lojistik Önceliği:** Sipariş onaylandıktan sonra AI, karbon ayak izini minimize etmek için işi **öncelikle teslimat bölgesindeki** (Örn: Müşteri Ankara'daysa İç Anadolu Hub'larındaki) üreticilere atar.
5. **Yeşil Havuz (Milk Run):** Sipariş 50 adet ve altındaysa, karbon emisyonunu sıfırlamak için otomatik olarak "72 Saatlik Ortak Kargo Havuzu"na dahil edilir.
6. **Kapasite Kontrolü (ATP):** İstek, bölgesel ağın gücünü aşıyorsa, AI kapasite taşması (overflow) yapar veya müşteriye esnek teslimat için "Waitlist" (Bekleme Sırası) pazarlığı teklif eder.

### 👩‍🏭 Adım 4: Üretici Onayı ve Hub Lojistiği (SLA)
7. **30 Dakika Onay Kuralı:** Otonom plan müşteriye sunulup onaylandığında, iş seçilen üreticilere düşer. Üreticiye işi onaylaması için 30 dakika süre tanınır (Onaylanmayan iş anında yedek üreticiye geçer).
8. **Hammadde Döngüsü:** Üretici, hammaddeyi kurumsal markanın bıraktığı kendi ilçesindeki "Bölgesel Hub"dan (Kooperatif Merkezi) teslim alarak üretime başlar. Kargo şahısların evine tek tek gitmez.

### 🛡️ Adım 5: Emeği Koruma Kalkanı (İptal Senaryoları)
9. Sipariş B2B tarafında iptal edilmek istenirse, kademeli koruma kalkanı devreye girer:
   - **%100 İade:** Üretici henüz işi onaylamadıysa iptal ücretsizdir.
   - **%30 Kesinti:** Üretici işi onaylamış ve Hub'dan malzemeyi almışsa, B2B cari hesaptan **%30 "Emeğe Saygı Payı"** kesilerek üreticiye tazminat olarak aktarılır.
   - **İptal Edilemez:** Üretim %50 aşamasını geçtiyse iptal butonu otonom olarak kapanır.

### 📦 Adım 6: Kalite Kontrol ve Performans Yönetimi
10. Üretimi/Montajı biten ürünler üretici tarafından tekrar yerel Hub'a teslim edilir. Son Kalite Kontrol (QC) burada yapılıp, tüm ürünler kurumsal markaya tek bir koli olarak sevk edilir.
11. **Oyunlaştırma ve Disiplin (3/6 Kuralı):**
    - Başarılı teslimat, üreticinin "Güven Puanını" 10 üzerinden artırır ve ona "Usta" rozeti kazandırır.
    - Hata veya gecikme durumunda: **3 ihlal yapan üretici 6 ay, 6 ihlal yapan üretici 3 yıl sistemden ihraç edilir.**

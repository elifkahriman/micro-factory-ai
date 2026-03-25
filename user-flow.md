# 🌊 Kullanıcı Akışı (User Flow) - Micro Factory AI (DAN)

Bu belge, kurumsal bir B2B müşterisinin ve merkeziyetsiz kooperatif ağının Micro Factory AI platformundaki uçtan uca etkileşim haritasını (User Journey) tanımlar.

---

### 🏢 Adım 1: Kurumsal Giriş ve Akıllı Talep Oluşturma
1.  **B2B Portal Erişimi:** Kullanıcı, kurumsal kimliği ile sisteme giriş yapar. Sistem, "B2B Cari Hesap" ve kurumsal faturalandırma mantığıyla çalışır.
2.  **Sipariş Girişi:** Ürün adını, miktarını ve 81 il/ilçeyi kapsayan dinamik teslimat rotasını belirler.
3.  **Zorunlu Reçete Girişi:** AI denetiminden geçmek için ürünün **Renk, Beden/Ölçü, Gramaj veya Teknik Ölçü** (Örn: 35x45cm) gibi detaylarını girmek zorundadır. Eksik bilgi durumunda sistem "Eksik Veri" uyarısı vererek süreci durdurur.

---

### 🤖 Adım 2: Semantik AI Fizibilite Filtresi (Gemini 2.5 Flash)
4.  **Güvenlik ve Kapsam Denetimi:** AI, siparişi milisaniyeler içinde semantik analize tabi tutur:
    * **Kapsam Dışı Reddi:** Sipariş ağır sanayi, otomotiv (Aks, Motor), döküm veya **Metal İşçiliği/Hırdavat (Vida, Somun, Çivi)** içeriyorsa otonom olarak reddedilir. Kullanıcıya "Üretim Ağı Kapsamı Dışı" gerekçesi sunulur.
    * **Onay Protokolü:** Sistem sadece ev/kooperatif üretimine uygun 5 ana kategoriye (Doğal Kozmetik, Tekstil, Hafif Montaj, Paketleme, İleri Dönüşüm/Gıda) geçiş izni verir.

---

### 🧠 Adım 3: Smart Routing ve Yeşil Lojistik Planlama
5.  **Bölgesel Lojistik Önceliği:** AI, karbon emisyonunu düşürmek için siparişi öncelikle teslimat bölgesindeki en uygun **Kooperatif Hub'larına** atar.
6.  **Yeşil Havuz (Milk-Run):** Sipariş 50 adet altındaysa, karbon emisyonunu minimize etmek için **24 Saat Günlük Milk-Run Havuzu** onayı istenir. Bu modda lojistik rotası otonom olarak konsolide edilir.
7.  **ATP (Kapasite Kontrolü):** Talep bölgesel kapasiteyi aşarsa, AI sistemi kilitlemez; fazla miktarı otomatik olarak **"⏳ Kapasite Aşımı (Sıraya Alındı)"** statüsüyle kuyruğa alır.

---

### 📱 Adım 4: WhatsApp Bot Bildirimi ve Üretici Onayı (SLA)
8.  **WhatsApp Anlık Bildirimi:** Sistem tarafından seçilen uygun üreticinin telefonuna Twilio/WhatsApp API üzerinden anlık mesaj gider:
    > *"Yeni İş Ataması! 📦 Ürün: Bez Çanta | Adet: 100 | Kazanç: ₺9.000 | Teslim: 3 Gün. Onaylıyor musunuz? (EVET / HAYIR)"*
9.  **30 Dakika Onay Kuralı:** Üretici telefonundan **"EVET"** yazarak işi onaylar. Eğer 30 dakika içinde yanıt gelmezse, AI işi otomatik olarak "Yedek Üretici"nin WhatsApp'ına yönlendirir.
10. **Hammadde Döngüsü:** Onay sonrası üreticiye Hub lokasyonu gönderilir. Üretici malzemeyi Hub'dan aldığında bot üzerinden **"Malzemeyi Teslim Aldım"** onayı verir. Bu onay, finansal koruma kalkanını (SLA) tetikler.

---

### 🛡️ Adım 5: Emeği Koruma Kalkanı (İptal Yönetimi)
11. Sipariş B2B tarafında iptal edilmek istenirse, V16 finansal algoritması devreye girer:
    * **%100 İade:** Üretici henüz WhatsApp üzerinden işi onaylamadıysa iptal tamamen ücretsizdir.
    * **%30 Emeğe Saygı Payı:** Üretici işi onaylamış ve malzemeyi teslim almışsa (WhatsApp onayı referans alınır), B2B cari hesaptan **%30 kesinti** yapılarak üretici kadına tazminat olarak aktarılır.
    * **İptal Kilidi:** Üretim süreci %50 aşamasını geçtiyse iptal butonu otonom olarak devre dışı bırakılır.

---

### 📦 Adım 6: Kalite Kontrol, Red ve Performans Denetimi
12. **Final QC (Kalite Kontrol):** Üretimi biten ürünler yerel Hub'a getirilir. Kalite kontrol Hub yöneticileri (Kooperatif sorumluları) tarafından yapılır.
13. **Red ve Yeniden Üretim:** Ürün standart dışıysa (Defolu, hatalı ölçü vb.) Hub'da reddedilir. Üreticiye WhatsApp üzerinden düzeltme emri gider. Bu durum üreticinin **Güven Puanı**'ndan düşülür.
14. **Sevk ve Disiplin (3/6 Kuralı):** Onaylanan ürünler markaya tek koli olarak sevk edilir. Hata veya gecikme durumunda **3 ihlalde 6 ay, 6 ihlalde 3 yıl sistemden ihraç** protokolü otonom işletilir.
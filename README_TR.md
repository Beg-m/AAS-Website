# AUTOMATIC ATTENDANCE SYSTEM (AAS) — Web Interface

## 📋 Proje Özeti

**Otomatik Yoklama Sistemi (AAS)**, yüz tanıma teknolojisi kullanarak öğrencilerin derslere katılımını otomatik olarak takip eden bir web uygulamasıdır. Bu proje, React (frontend) ve Node.js/Express (backend) teknolojileri kullanılarak geliştirilmiştir.

**Ana Özellikler:**
- AI destekli yüz tanıma ile otomatik yoklama
- Öğrenci, öğretmen ve ders yönetimi
- Detaylı yoklama raporları ve istatistikler
- Kullanıcı dostu web arayüzü
- Tek port üzerinden çalışan unified server yapısı

---

## 🛠️ Kullanılan Teknolojiler

### Frontend
- **React 19.2.0** - Modern UI framework
- **Vite 7.2.4** - Hızlı build tool ve development server
- **React Router DOM 7.9.6** - Sayfa yönlendirme
- **React Icons 5.5.0** - İkon kütüphanesi
- **CSS3** - Stil yönetimi

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - İlişkisel veritabanı
- **pg (node-postgres)** - PostgreSQL client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables yönetimi

### Development Tools
- **ESLint** - Code linting
- **Docker** - Containerization (opsiyonel)
- **Git** - Version control

---

## 📁 Proje Yapısı

```
AAS-Website-main/
├── backend-node/              # Node.js backend sunucusu
│   ├── config/
│   │   └── db.js             # Veritabanı bağlantı yapılandırması
│   ├── routes/               # API route dosyaları
│   │   ├── auth.js          # Kimlik doğrulama endpoint'leri
│   │   ├── students.js      # Öğrenci yönetimi endpoint'leri
│   │   ├── instructors.js   # Öğretmen yönetimi endpoint'leri
│   │   ├── courses.js       # Ders yönetimi endpoint'leri
│   │   ├── attendance.js    # Yoklama endpoint'leri
│   │   ├── reports.js       # Rapor endpoint'leri
│   │   └── departments.js   # Bölüm endpoint'leri
│   ├── server.js            # Ana Express sunucusu
│   └── package.json         # Backend bağımlılıkları
│
├── src/                      # React frontend kaynak dosyaları
│   ├── components/          # React bileşenleri
│   │   ├── Login.jsx       # Giriş sayfası
│   │   ├── Register.jsx    # Kayıt sayfası
│   │   ├── Dashboard.jsx   # Ana dashboard
│   │   ├── Students.jsx    # Öğrenci yönetimi sayfası
│   │   ├── Instructors.jsx # Öğretmen yönetimi sayfası
│   │   ├── Courses.jsx     # Ders yönetimi sayfası
│   │   ├── Attendance.jsx  # Yoklama sayfası
│   │   ├── Reports.jsx     # Rapor sayfası
│   │   └── Settings.jsx    # Ayarlar sayfası
│   ├── utils/
│   │   └── api.js          # API çağrı yardımcı fonksiyonları
│   ├── App.jsx             # Ana React uygulaması
│   └── main.jsx            # Uygulama giriş noktası
│
├── public/                   # Statik dosyalar
├── dist/                     # Build edilmiş production dosyaları
├── docker-compose.yml        # Docker yapılandırması
├── vite.config.js           # Vite yapılandırması
└── package.json             # Frontend bağımlılıkları
```

---

## 🚀 Proje Geliştirme Aşamaları (Adım Adım)

### **AŞAMA 1: Proje Planlama ve Gereksinim Analizi**

#### 1.1. Proje Kapsamının Belirlenmesi
- Otomatik yoklama sistemi için gereksinimler toplandı
- Sistem mimarisi tasarlandı
- Kullanılacak teknolojiler belirlendi

#### 1.2. Veritabanı Şeması Tasarımı
Aşağıdaki ana tablolar tasarlandı:
- **students** - Öğrenci bilgileri (ID, ad, soyad, email, fotoğraf yolu, yüz verisi)
- **instructors** - Öğretmen bilgileri (ID, ad, email, bölüm)
- **courses** - Ders bilgileri (ID, ders adı, öğretmen ID)
- **departments** - Bölüm bilgileri (ID, bölüm adı)
- **attendance** - Yoklama kayıtları (ID, öğrenci ID, ders ID, tarih, durum)
- **student_course** - Öğrenci-ders ilişki tablosu (many-to-many)

#### 1.3. API Endpoint Tasarımı
RESTful API yapısı planlandı:
- `/api/login` - Kullanıcı girişi
- `/api/students` - Öğrenci CRUD işlemleri
- `/api/instructors` - Öğretmen listeleme
- `/api/courses` - Ders listeleme
- `/api/attendance` - Yoklama kayıtları
- `/api/reports` - Rapor oluşturma
- `/api/departments` - Bölüm listeleme

---

### **AŞAMA 2: UI/UX Tasarımı**

#### 2.1. Canva ile Tasarım Aşaması
- Tüm sayfa tasarımları önce Canva'da görsel olarak tasarlandı
- Kullanıcı akışları (user flow) belirlendi
- Renk paleti ve tipografi seçildi

#### 2.2. Tasarılan Sayfalar
1. **Login Sayfası** - Kullanıcı girişi için form
2. **Register Sayfası** - Yeni kullanıcı kaydı
3. **Dashboard** - Ana kontrol paneli ve özet istatistikler
4. **Öğrenci Yönetimi** - Öğrenci listesi, ekleme, düzenleme, silme
5. **Öğretmen Yönetimi** - Öğretmen listesi ve filtreleme
6. **Ders Yönetimi** - Ders listesi ve filtreleme
7. **Yoklama Sayfası** - Yoklama kayıtlarının görüntülenmesi ve yönetimi
8. **Raporlar** - Detaylı yoklama raporları ve istatistikler
9. **Ayarlar** - Sistem ayarları

---

### **AŞAMA 3: Frontend Geliştirme (React + Vite)**

#### 3.1. Proje Kurulumu
```bash
# Vite ile React projesi oluşturuldu
npm create vite@latest . -- --template react
npm install
```

#### 3.2. React Router Kurulumu
- Sayfa yönlendirme için React Router DOM yüklendi
- Route yapısı `App.jsx` içinde tanımlandı

#### 3.3. Bileşen Geliştirme
Her sayfa için ayrı bir bileşen oluşturuldu:

**Login.jsx**
- Kullanıcı adı ve şifre girişi
- API'ye authentication isteği gönderimi
- Başarılı girişte dashboard'a yönlendirme

**Register.jsx**
- Yeni kullanıcı kayıt formu
- Form validasyonu
- API'ye kayıt isteği gönderimi

**Dashboard.jsx**
- Sistem özet istatistikleri
- Hızlı erişim linkleri
- Grafik ve görselleştirmeler

**Students.jsx**
- Öğrenci listesi tablosu
- Arama ve filtreleme özellikleri
- CRUD işlemleri (Create, Read, Update, Delete)
- Sayfalama (pagination)

**Instructors.jsx**
- Öğretmen listesi
- Bölüm bazlı filtreleme
- Detaylı öğretmen bilgileri

**Courses.jsx**
- Ders listesi
- Öğretmen bazlı filtreleme
- Ders detayları

**Attendance.jsx**
- Yoklama kayıtları listesi
- Tarih, ders, öğrenci bazlı filtreleme
- Yoklama durumu görüntüleme ve düzenleme

**Reports.jsx**
- Yoklama özet raporları
- İstatistiksel analizler
- PDF/Excel export özelliği (planlandı)

**Settings.jsx**
- Kullanıcı ayarları
- Sistem yapılandırmaları

#### 3.4. API Yardımcı Fonksiyonları
`src/utils/api.js` dosyası oluşturuldu:
- Merkezi API çağrı fonksiyonu
- Hata yönetimi
- Authentication token yönetimi
- Tüm API endpoint'leri için wrapper fonksiyonlar

#### 3.5. Stil Dosyaları
Her bileşen için ayrı CSS dosyası oluşturuldu:
- Modern ve responsive tasarım
- Mobil uyumlu layout
- Tutarlı renk şeması

---

### **AŞAMA 4: Backend Geliştirme (Node.js + Express)**

#### 4.1. Backend Projesi Kurulumu
```bash
cd backend-node
npm init -y
npm install express cors pg dotenv
```

#### 4.2. Veritabanı Yapılandırması
`config/db.js` dosyası oluşturuldu:
- PostgreSQL connection pool yapılandırması
- Environment variables ile bağlantı bilgileri
- Connection event handler'ları (connect, error)

**Veritabanı Bağlantı Ayarları:**
- Host: localhost (veya DB_HOST env variable)
- Port: 5433 (veya DB_PORT env variable)
- Database: aas_database (veya DB_NAME env variable)
- User: postgres (veya DB_USER env variable)
- Password: postgres (veya DB_PASSWORD env variable)

#### 4.3. Express Sunucusu Oluşturulması
`server.js` dosyası oluşturuldu:

**Middleware Yapılandırması:**
- CORS (Cross-Origin Resource Sharing) yapılandırması
- JSON body parser
- URL encoded body parser
- Static file serving (production build için)

**Route Yapısı:**
- Tüm API route'ları `/api` prefix'i ile başlar
- Route dosyaları `routes/` klasöründe modüler olarak organize edildi

#### 4.4. Route Dosyalarının Geliştirilmesi

**routes/auth.js**
- `POST /api/login` - Kullanıcı girişi
- `POST /api/register` - Kullanıcı kaydı

**routes/students.js**
- `GET /api/students` - Tüm öğrencileri listele (query params: search, department)
- `GET /api/students/:id` - ID'ye göre öğrenci getir
- `POST /api/students` - Yeni öğrenci ekle
- `PUT /api/students/:id` - Öğrenci bilgilerini güncelle
- `DELETE /api/students/:id` - Öğrenci sil
- `GET /api/students/courses` - Öğrenci-ders ilişkilerini getir

**routes/instructors.js**
- `GET /api/instructors` - Tüm öğretmenleri listele (query params: search, department)

**routes/courses.js**
- `GET /api/courses` - Tüm dersleri listele (query params: search, instructor_id)

**routes/attendance.js**
- `GET /api/attendance` - Yoklama kayıtlarını getir (query params: name_surname, course, date, search)
- `POST /api/attendance` - Yeni yoklama kaydı oluştur

**routes/reports.js**
- `GET /api/reports/attendance-summary` - Yoklama özet raporu (query params: course, department, start_date, end_date)
- `GET /api/reports/attendance-rate` - Yoklama oranları (query params: course, department)

**routes/departments.js**
- `GET /api/departments` - Tüm bölümleri listele

#### 4.5. Hata Yönetimi
- Global error handling middleware eklendi
- Tüm hatalar JSON formatında döndürülüyor
- Console'da hata loglama

#### 4.6. Health Check Endpoint
- `GET /api/health` - Sunucu durumu kontrolü için endpoint

---

### **AŞAMA 5: Frontend-Backend Entegrasyonu**

#### 5.1. API Yapılandırması
`src/utils/api.js` dosyasında:
- Base URL `/api` olarak ayarlandı (relative path)
- Tüm API çağrıları bu utility fonksiyonları üzerinden yapılıyor
- Error handling ve response parsing merkezi olarak yönetiliyor

#### 5.2. CORS Yapılandırması
Backend'de CORS ayarları:
- Frontend portları (5173, 3000) ve backend portu (5001) için izin verildi
- Credentials desteği aktif

#### 5.3. Component-API Entegrasyonu
Her React bileşeninde:
- `useState` ile API'den gelen veriler state'te tutuldu
- `useEffect` ile component mount olduğunda API çağrıları yapıldı
- Loading ve error state'leri yönetildi
- Kullanıcı etkileşimlerinde (form submit, buton click) API çağrıları tetiklendi

---

### **AŞAMA 6: Production Build ve Unified Server Yapısı**

#### 6.1. Frontend Production Build
```bash
npm run build
```
- Vite, `src/` klasöründeki React uygulamasını `dist/` klasörüne build eder
- Optimize edilmiş, minify edilmiş JavaScript ve CSS dosyaları oluşturulur
- Build dosyaları statik olarak servis edilebilir hale gelir

#### 6.2. Unified Server Yapılandırması
`backend-node/server.js` dosyasında yapılan değişiklikler:

**Static File Serving:**
```javascript
const buildPath = path.join(__dirname, '..', 'dist');
app.use(express.static(buildPath));
```

**Single Page Application (SPA) Routing:**
```javascript
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Route not found' });
  }
  res.sendFile(path.join(buildPath, 'index.html'));
});
```

#### 6.3. Tek Port Üzerinden Çalışma
- Backend sunucusu hem API endpoint'lerini hem de frontend'i aynı porttan (5001) servis eder
- API istekleri `/api/*` path'i ile backend'e yönlendirilir
- Diğer tüm istekler React uygulamasına yönlendirilir
- Bu sayede CORS sorunları ortadan kalkar ve deployment kolaylaşır

---

### **AŞAMA 7: Git Repository Yönetimi**

#### 7.1. Git Repository Başlatma
```bash
git init
git remote add origin https://github.com/Beg-m/AAS-Website.git
```

#### 7.2. Dosya Yapısı Commit Edildi
- Tüm proje dosyaları commit edildi
- `.gitignore` dosyası ile gereksiz dosyalar hariç tutuldu

#### 7.3. Remote Repository ile Senkronizasyon
```bash
git pull origin main --allow-unrelated-histories
```
- GitHub repository'den mevcut değişiklikler çekildi
- Local ve remote değişiklikler merge edildi

---

## 📦 Kurulum ve Çalıştırma

### Gereksinimler
- **Node.js** (v18 veya üzeri)
- **npm** (Node.js ile birlikte gelir)
- **PostgreSQL** (v12 veya üzeri)
- **Git** (opsiyonel, repository'yi klonlamak için)

### Adım 1: Projeyi İndirin

```bash
# GitHub'dan klonlayın
git clone https://github.com/Beg-m/AAS-Website.git
cd AAS-Website-main
```

### Adım 2: Frontend Bağımlılıklarını Yükleyin

```bash
# Proje kök dizininde
npm install
```

Bu komut şunları yükler:
- React ve React DOM
- React Router DOM
- React Icons
- Vite ve development dependencies
- ESLint ve diğer linting araçları

### Adım 3: Backend Bağımlılıklarını Yükleyin

```bash
cd backend-node
npm install
```

Bu komut şunları yükler:
- Express.js
- PostgreSQL client (pg)
- CORS
- dotenv

### Adım 4: Veritabanı Kurulumu

PostgreSQL veritabanınızın çalıştığından emin olun. Ardından veritabanını oluşturun:

```bash
# PostgreSQL'e bağlanın ve veritabanı oluşturun
createdb aas_database

# Veya psql ile
psql -U postgres
CREATE DATABASE aas_database;
```

**Not:** Veritabanı şeması (tablolar) Python backend veya migration script'leri ile oluşturulmalıdır. Şu anda Node.js backend sadece mevcut tablolara erişim sağlar.

### Adım 5: Environment Variables (Opsiyonel)

Eğer varsayılan veritabanı ayarlarından farklı kullanmak istiyorsanız, `backend-node` klasöründe `.env` dosyası oluşturun:

```env
PORT=5001
DB_HOST=localhost
DB_PORT=5433
DB_NAME=aas_database
DB_USER=postgres
DB_PASSWORD=postgres
```

### Adım 6: Frontend'i Build Edin

```bash
# Proje kök dizininde
npm run build
```

Bu komut `dist/` klasöründe production-ready dosyalar oluşturur.

### Adım 7: Sunucuyu Başlatın

```bash
cd backend-node
npm start
```

Sunucu `http://localhost:5001` adresinde başlatılacaktır.

### Adım 8: Uygulamaya Erişin

Tarayıcınızda şu adresi açın:
```
http://localhost:5001
```

---

## 🔌 API Endpoint'leri

Tüm API endpoint'leri `/api` prefix'i ile başlar ve JSON formatında yanıt döner.

### Authentication
- `POST /api/login` - Kullanıcı girişi
  - Body: `{ username, password }`
  - Response: `{ token, user }`

### Students (Öğrenciler)
- `GET /api/students` - Tüm öğrencileri listele
  - Query params: `search`, `department`
- `GET /api/students/:id` - ID'ye göre öğrenci getir
- `POST /api/students` - Yeni öğrenci ekle
  - Body: `{ name, surname, email, department_id, ... }`
- `PUT /api/students/:id` - Öğrenci bilgilerini güncelle
- `DELETE /api/students/:id` - Öğrenci sil
- `GET /api/students/courses` - Öğrenci-ders ilişkileri
  - Query params: `search`, `course`

### Instructors (Öğretmenler)
- `GET /api/instructors` - Tüm öğretmenleri listele
  - Query params: `search`, `department`

### Courses (Dersler)
- `GET /api/courses` - Tüm dersleri listele
  - Query params: `search`, `instructor_id`

### Attendance (Yoklama)
- `GET /api/attendance` - Yoklama kayıtlarını getir
  - Query params: `name_surname`, `course`, `date`, `search`
- `POST /api/attendance` - Yeni yoklama kaydı oluştur
  - Body: `{ student_id, course_id, date, status }`

### Reports (Raporlar)
- `GET /api/reports/attendance-summary` - Yoklama özet raporu
  - Query params: `course`, `department`, `start_date`, `end_date`
- `GET /api/reports/attendance-rate` - Yoklama oranları
  - Query params: `course`, `department`

### Departments (Bölümler)
- `GET /api/departments` - Tüm bölümleri listele

### Health Check
- `GET /api/health` - Sunucu durumu
  - Response: `{ status: "ok", message: "AAS API is running" }`

---

## 🗄️ Veritabanı Yapısı

### Tablolar

**students**
- `student_id` (PRIMARY KEY)
- `name`
- `surname`
- `email`
- `photo_path`
- `face_data`
- `department_id` (FOREIGN KEY -> departments)

**instructors**
- `instructor_id` (PRIMARY KEY)
- `name`
- `email`
- `department_id` (FOREIGN KEY -> departments)

**courses**
- `course_id` (PRIMARY KEY)
- `course_name`
- `instructor_id` (FOREIGN KEY -> instructors)

**departments**
- `department_id` (PRIMARY KEY)
- `department_name`

**attendance**
- `attendance_id` (PRIMARY KEY)
- `student_id` (FOREIGN KEY -> students)
- `course_id` (FOREIGN KEY -> courses)
- `date`
- `status`

**student_course**
- `student_id` (FOREIGN KEY -> students)
- `course_id` (FOREIGN KEY -> courses)
- PRIMARY KEY (student_id, course_id)

---

## 🚀 Development Mode

Geliştirme sırasında frontend ve backend'i ayrı ayrı çalıştırabilirsiniz:

### Frontend Development Server
```bash
# Proje kök dizininde
npm run dev
```
Frontend `http://localhost:5173` adresinde çalışacaktır (Vite default portu).

### Backend Development Server
```bash
cd backend-node
npm run dev
```
Backend `http://localhost:5001` adresinde çalışacaktır.

**Not:** Development modunda, frontend'in API çağrıları için `src/utils/api.js` dosyasında base URL'in doğru yapılandırıldığından emin olun.

---

## 🐳 Docker Kullanımı (Opsiyonel)

Proje `docker-compose.yml` dosyası ile Docker container'ları olarak çalıştırılabilir. Detaylar için `DOCKER_SETUP.md` dosyasına bakın.

```bash
docker-compose up -d
```

---

## 📝 Önemli Notlar

1. **Single Port Architecture:** Production modunda, hem frontend hem backend tek bir porttan (5001) servis edilir. Bu sayede CORS sorunları ortadan kalkar ve deployment kolaylaşır.

2. **API Base URL:** Frontend'de API çağrıları relative path (`/api`) kullanır. Bu sayede aynı origin'den geldiği için CORS gerektirmez.

3. **Build Process:** Her değişiklikten sonra production'a deploy etmek için frontend'i tekrar build etmeniz gerekir:
   ```bash
   npm run build
   ```

4. **Veritabanı Şeması:** Node.js backend, mevcut veritabanı tablolarına erişim sağlar. Tabloların Python backend veya SQL script'leri ile önceden oluşturulması gerekir.

5. **Environment Variables:** Veritabanı bağlantı bilgileri için `backend-node/.env` dosyası oluşturulabilir. Varsayılan değerler `config/db.js` dosyasında tanımlıdır.

---

## 🤝 Geliştiriciler

- **Begüm Karadayı**
- **Melisa Yönder**
- **Melisa Çelik**

---

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

---

## 🔗 İlgili Dokümantasyon

- [Backend Node.js README](backend-node/README.md)
- [Docker Setup Guide](DOCKER_SETUP.md)

---

## 🎯 Gelecek Geliştirmeler

- [ ] Yüz tanıma modülü entegrasyonu
- [ ] PDF/Excel export özelliği
- [ ] Real-time yoklama takibi
- [ ] Mobil uygulama geliştirme
- [ ] Authentication token yönetimi iyileştirmesi
- [ ] Unit ve integration testleri
- [ ] CI/CD pipeline kurulumu
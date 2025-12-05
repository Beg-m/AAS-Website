# AAS Backend - Node.js + Express

Node.js ve Express kullanılarak oluşturulmuş backend API.

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
cd backend-node
npm install
```

2. `.env` dosyasını kontrol edin (zaten hazır)

3. Sunucuyu başlatın:
```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

## API Endpoints

Tüm endpoint'ler `/api` prefix'i ile başlar:

- `POST /api/login` - Kullanıcı girişi
- `GET /api/students` - Tüm öğrencileri listele
- `POST /api/students` - Yeni öğrenci ekle
- `GET /api/students/courses` - Öğrenci-kurs ilişkileri
- `GET /api/instructors` - Tüm öğretmenleri listele
- `GET /api/courses` - Tüm dersleri listele
- `GET /api/attendance` - Yoklama kayıtları
- `GET /api/reports/attendance-summary` - Yoklama özeti
- `GET /api/reports/attendance-rate` - Yoklama oranları
- `GET /api/departments` - Tüm bölümleri listele

## Veritabanı

PostgreSQL veritabanı Docker container'ında çalışıyor:
- Host: localhost
- Port: 5433
- Database: aas_database
- User: postgres
- Password: postgres


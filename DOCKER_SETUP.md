# Docker ile PostgreSQL Kurulumu

## 1. Docker Desktop Kurulumu

Docker Desktop'ı manuel olarak kurmanız gerekiyor:

1. Docker Desktop'ı indirin: https://www.docker.com/products/docker-desktop/
2. İndirilen `.dmg` dosyasını açın
3. Docker.app'i Applications klasörüne sürükleyin
4. Docker Desktop'ı başlatın (Applications klasöründen)
5. Docker Desktop'ın başlamasını bekleyin (menü çubuğunda Docker ikonu görünecek)

## 2. PostgreSQL Container'ını Başlatma

Docker Desktop kurulduktan sonra:

```bash
# Proje dizinine gidin
cd /Users/begumkaradayi/Desktop/AAS-Website-main

# PostgreSQL container'ını başlatın
docker-compose up -d
```

Bu komut:
- PostgreSQL 14 container'ını başlatır
- Veritabanını otomatik oluşturur (`aas_database`)
- Şema dosyasını otomatik yükler (`schema.sql`)
- Port 5432'de çalışır

## 3. Container Durumunu Kontrol Etme

```bash
# Container'ların durumunu kontrol edin
docker-compose ps

# PostgreSQL loglarını görüntüleyin
docker-compose logs postgres
```

## 4. Veritabanına Bağlanma

```bash
# PostgreSQL container'ına bağlanın
docker-compose exec postgres psql -U postgres -d aas_database
```

## 5. Backend'i Başlatma

Backend `.env` dosyası zaten hazır (Docker ayarlarıyla uyumlu):

```bash
cd backend
pip install -r requirements.txt
python app.py
```

## 6. Container'ı Durdurma

```bash
# Container'ı durdurun (veriler korunur)
docker-compose stop

# Container'ı durdurup verileri silin
docker-compose down

# Container'ı durdurup verileri ve volume'ları silin
docker-compose down -v
```

## Sorun Giderme

- **"docker: command not found"**: Docker Desktop'ın çalıştığından emin olun
- **"port 5432 already in use"**: Yerel PostgreSQL servisini durdurun: `brew services stop postgresql@14`
- **Container başlamıyor**: Docker Desktop'ın çalıştığını kontrol edin

## Avantajlar

✅ Şifre sorunu yok  
✅ Otomatik veritabanı oluşturma  
✅ Otomatik şema yükleme  
✅ Kolay temizleme ve yeniden başlatma  
✅ İzole ortam (sistem PostgreSQL'ini etkilemez)


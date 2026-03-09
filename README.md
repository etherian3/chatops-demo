# 🚀 ChatOps Deployment Bot

Bot ChatOps sederhana yang dibangun menggunakan **Node.js** dan **Express**. Bot ini memungkinkan pengguna untuk memicu (trigger) _pipeline deployment_ di GitHub Actions langsung dari Slack melalui _Slash Command_.

## 🌟 Fitur Utama

- **Integrasi Slack**: Menerima perintah _Slash Command_ (contoh: `/deploy production` atau `/deploy staging`) dari Slack.
- **Integrasi GitHub Actions**: Memicu alur kerja (workflow) `deploy.yml` di GitHub menggunakan GitHub REST API.
- **Notifikasi Instan**: Memberikan respons instan (sementara) di _channel_ Slack bahwa _deployment_ telah berhasil dipicu.

## 🛠️ Teknologi yang Digunakan

- [Node.js](https://nodejs.org/) - Lingkungan eksekusi JavaScript (ES Modules `type: "module"`)
- [Express](https://expressjs.com/) - Framework web untuk menangani webhook/endpoint Slack
- [Axios](https://axios-http.com/) - Klien HTTP untuk berinteraksi dengan GitHub REST API
- [Dotenv](https://github.com/motdotla/dotenv) - Untuk manajemen _environment variables_

## 📁 Struktur Proyek

```text
chatops/
├── .github/
│   └── workflows/
│       └── deploy.yml   # Konfigurasi GitHub Actions untuk deployment
├── app/
│   └── app.js           # Kode aplikasi utama yang akan dites/dideploy
├── bot/
│   └── server.js        # Kode utama server/bot pengelola Slack command
├── .env                 # File environment variables 
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Persyaratan Sistem

- **Node.js** versi 18 atau lebih baru.
- Akun GitHub dan **Personal Access Token (PAT)** dengan akses ke repositori yang sesuai (sektor `repo` atau `workflow`).
- Akun Slack Workspace dengan akses untuk membuat **Slack App** dan konfigurasinya.

## 🚀 Panduan Instalasi & Penggunaan

### 1. Kloning Repositori

```bash
git clone https://github.com/etherian3/chatops-demo.git chatops
cd chatops
```

### 2. Instalasi Dependensi

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat sebuah file `.env` di direktori utama (root) proyek berdasarkan file yang sudah ada:

```env
GITHUB_TOKEN=ghp_TokenGitHubAndaDiSini
REPO=username/nama-repositori
```

_Keterangan:_

- `GITHUB_TOKEN`: GitHub Personal Access Token yang memiliki izin untuk memicu Actions (`workflow` scope).
- `REPO`: Format dari repositori target (contoh: `etherian3/chatops-demo`).

### 4. Menjalankan Server (Lokal)

Untuk menyalakan bot chatops secara lokal di port `3000`:

```bash
node bot/server.js
```

Jika server berhasil berjalan, Anda akan melihat log:
`ChatOps bot running on port 3000`

### 5. Menggunakan Ngrok (Untuk Testing Webhook Slack)

Agar Slack bisa berkomunikasi dengan server lokal Anda, gunakan [Ngrok](https://ngrok.com/) untuk mengekspos port `3000`:

```bash
ngrok http 3000
```

Salin URL `https://xxxx.ngrok-free.app` yang dihasilkan oleh ngrok. URL ini akan menjadi basis untuk Endpoint Slack Anda.

### 6. Konfigurasi di Slack API

1. Buka [Slack API Applications](https://api.slack.com/apps) dan buat aplikasi baru.
2. Buka menu **Slash Commands**.
3. Buat Command baru, misalnya `/deploy`.
4. Isi **Request URL** dengan URL Ngrok ditambah endpoint proyek (Cth: `https://xxxx.ngrok-free.app/slack/deploy`).
5. Instal aplikasi ke dalam workspace Slack Anda.
6. Sekarang Anda bisa masuk ke channel Slack dan mengetik: `/deploy staging` atau `/deploy production`.

## 🤖 GitHub Actions Workflow (`deploy.yml`)

Aplikasi ini sudah dilengkapi dengan _workflow setup_ di `.github/workflows/deploy.yml`. Alur kerja ini akan mendengarkan event `workflow_dispatch` (dipicu oleh webhook dari bot ini) dan menerima argumen `env` untuk mengeksekusi aksi deployment sesuai environment target.

---

_Dibuat untuk memudahkan operasional deployment sehari-hari melalui ChatOps!_

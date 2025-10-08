# Memendar Backend

Backend API per l'applicazione Memendar - un'applicazione di calendario per meme che permette agli utenti di condividere e votare meme organizzati per mese e anno.

## 📋 Descrizione

Memendar Backend è un'API REST sviluppata con Node.js ed Express che gestisce l'autenticazione degli utenti, la gestione delle stanze (room), e la pubblicazione e votazione di meme attraverso un calendario mensile.

## 🚀 Tecnologie Utilizzate

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Database NoSQL
- **Mongoose** - ODM per MongoDB
- **Passport.js** - Autenticazione
- **Express Session** - Gestione sessioni
- **Connect-Mongo** - Store sessioni su MongoDB
- **Express Validator** - Validazione dati
- **bcrypt** - Hashing password
- **CORS** - Cross-Origin Resource Sharing

## 📁 Struttura del Progetto

```
memendar-backend/
├── index.mjs                 # Entry point dell'applicazione
├── package.json              # Dipendenze e script
├── mongoose/
│   └── schemas/             # Schemi Mongoose
│       ├── Calendar.mjs     # Schema calendario
│       ├── Meme.mjs         # Schema meme
│       ├── Room.mjs         # Schema stanze
│       └── User.mjs         # Schema utenti
├── routes/
│   ├── index.mjs           # Router principale
│   └── users.mjs           # Route utenti
├── strategies/             # Strategie Passport.js
└── utils/
    ├── helpers.mjs         # Funzioni di utilità
    └── validationSchema.mjs # Schemi di validazione
```

## 🔧 Prerequisiti

- **Node.js** (versione 18 o superiore)
- **pnpm** (versione 10.8.1 o superiore)
- **MongoDB** (in esecuzione su localhost:27017)

## 📦 Installazione

1. Clona il repository:

```bash
git clone https://github.com/unasites/memendar-backend.git
cd memendar-backend
```

2. Installa le dipendenze con pnpm:

```bash
pnpm install
```

3. Assicurati che MongoDB sia in esecuzione:

```bash
# Su Windows (se installato come servizio)
net start MongoDB

# Oppure avvia manualmente
mongod
```

## 🏃 Avvio dell'Applicazione

### Modalità Sviluppo (con nodemon)

```bash
pnpm start
```

### Modalità Produzione

```bash
node index.mjs
```

Il server sarà disponibile su `http://localhost:3000`

## 🗄️ Modelli Dati

### User

- `username`: String (required, unique)
- `password`: String (required, hashed)
- `createdAt`: Date
- `avatarUrl`: String
- `roomIds`: Array di ObjectId (riferimento a Room)
- `role`: String (enum: 'user', 'owner', 'admin')

### Meme

- `imageUrl`: String (required)
- `title`: String (required)
- `createdAt`: Date
- `roomId`: ObjectId (riferimento a Room, required)
- `voteCount`: Number
- `month`: Number
- `year`: Number

### Room

Schema per la gestione delle stanze/gruppi

### Calendar

Schema per l'organizzazione del calendario

## 🔐 Autenticazione

L'applicazione utilizza:

- **Passport.js** per la gestione dell'autenticazione
- **Express Session** per mantenere le sessioni utente
- **bcrypt** per l'hashing sicuro delle password
- **MongoDB** come store per le sessioni

## 🌐 CORS

Il server è configurato per accettare richieste da qualsiasi origine (`*`) con i seguenti metodi:

- GET
- POST
- PUT
- DELETE

**Nota**: In produzione, è consigliato limitare le origini consentite.

## 🔒 Configurazione Sessioni

- **Secret**: Configurato (da modificare in produzione)
- **Cookie maxAge**: 24 ore
- **Secure**: false (da impostare a true in produzione con HTTPS)
- **HttpOnly**: true
- **SameSite**: lax

## 📝 API Endpoints

Le route sono organizzate nel modulo `routes/`:

- `/users` - Gestione utenti e autenticazione
- Altre route definite in `routes/index.mjs`

## 🛠️ Sviluppo

Il progetto utilizza **nodemon** per il reload automatico durante lo sviluppo.

```bash
pnpm start
```

## 📜 Licenza

ISC

## 👤 Autore

Progetto sviluppato per ITS Incom

## 🤝 Contribuire

1. Fork il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le tue modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## ⚠️ Note di Sicurezza

Prima di andare in produzione:

- [ ] Cambia il secret della sessione con una chiave sicura
- [ ] Imposta `secure: true` nei cookie se usi HTTPS
- [ ] Configura CORS per accettare solo origini specifiche
- [ ] Usa variabili d'ambiente per le configurazioni sensibili
- [ ] Implementa rate limiting
- [ ] Aggiungi logging appropriato

## 🐛 Bug e Problemi

Per segnalare bug o problemi, apri una issue su GitHub.

---

**Made with ❤️ by UnaSites**

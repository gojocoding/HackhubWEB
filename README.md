<h1>HackHub – Relazione tecnica del progetto</h1>

1. Introduzione

HackHub è una piattaforma web full-stack progettata per la gestione degli hackathon e delle attività collaborative associate.

L'applicazione nasce con l'obiettivo di centralizzare alcune delle principali operazioni legate all'organizzazione degli hackathon, offrendo un'interfaccia intuitiva e distinguendo le funzionalità disponibili in base al ruolo dell'utente.

Il sistema consente la registrazione e l'autenticazione degli utenti, la consultazione degli hackathon, la creazione di nuove competizioni da parte degli amministratori e la creazione di team da parte degli utenti registrati.

Il progetto è stato sviluppato adottando un'architettura client-server, con separazione tra Frontend e Backend, comunicanti attraverso API REST.

2. Tecnologie utilizzate

Il progetto utilizza uno stack tecnologico basato su Java e Spring Boot per il Backend e Angular per il Frontend.

Backend

Java 21

Spring Boot 3.2.4

Spring Security

Spring Data JPA

Hibernate ORM

Maven

JWT (JSON Web Token)

BCrypt

Frontend

Angular 22

TypeScript

HTML5

CSS3

Angular Router

Angular HttpClient

Database

MySQL

Persistenza relazionale tramite Spring Data JPA e Hibernate.

3. Architettura del sistema

HackHub adotta un'architettura a livelli (Layered Architecture) per il Backend e un'architettura basata su componenti e servizi per il Frontend.

I due livelli applicativi comunicano tramite richieste HTTP verso endpoint REST.

3.1 BACKEND – SPRING BOOT

Il Backend è responsabile della gestione della logica applicativa, della persistenza dei dati e della sicurezza delle operazioni.

La struttura segue una separazione delle responsabilità:

Controller: ricevono le richieste HTTP, gestiscono i parametri e restituiscono le risposte al client.

Service: contengono la logica di business e coordinano le operazioni applicative.

Repository: gestiscono l'accesso al database attraverso Spring Data JPA.

Entity: rappresentano le entità del dominio e definiscono la mappatura tra oggetti Java e tabelle relazionali.

Security: contiene la configurazione di Spring Security, la gestione dei ruoli e il filtro per la verifica dei token JWT.

Questa organizzazione permette di mantenere separata la logica di presentazione dalla logica applicativa e dall'accesso ai dati.

3.2 FRONTEND – ANGULAR

Il Frontend è sviluppato utilizzando Angular e segue il paradigma Single Page Application (SPA).

L'interfaccia è organizzata in componenti, pagine e servizi, con una gestione centralizzata della navigazione e della comunicazione con il Backend.

I principali elementi architetturali sono:

Components: gestiscono le diverse schermate dell'applicazione e la relativa interazione con l'utente.

Services: si occupano della comunicazione HTTP con le API REST del Backend.

Routing: gestisce la navigazione tra Homepage, Login, Registrazione e area Hackathon.

Guards: proteggono le rotte riservate agli utenti autenticati, verificando la presenza e la validità temporale del token.

Interceptors: aggiungono automaticamente il token JWT all'header Authorization delle richieste HTTP, quando disponibile.

La separazione tra componenti e servizi consente di mantenere il codice organizzato e facilita la manutenzione dell'interfaccia.

4. Autenticazione e sicurezza – JWT

Per la gestione dell'autenticazione è stato implementato un sistema stateless basato su JSON Web Token (JWT).

Il processo di autenticazione si articola nelle seguenti fasi:

L'utente inserisce username e password attraverso il modulo di Login.

Il Frontend invia le credenziali al Backend tramite una richiesta HTTP.

Il Backend verifica le credenziali attraverso il servizio di autenticazione.

La password viene confrontata con il valore hash memorizzato nel database utilizzando BCrypt.

In caso di autenticazione corretta, viene generato un JWT contenente l'identificativo dell'utente e il relativo ruolo.

Il token viene restituito al Frontend e utilizzato nelle successive richieste verso le risorse protette.

Il Backend verifica la firma e la scadenza del token attraverso un filtro personalizzato basato su OncePerRequestFilter.

L'utilizzo di un'autenticazione stateless evita la necessità di mantenere sessioni applicative lato server.

4.1 Protezione delle password

Le password degli utenti non vengono memorizzate in chiaro nel database.

Per la protezione delle credenziali viene utilizzato BCrypt, tramite l'interfaccia PasswordEncoder di Spring Security.

Durante la registrazione viene generato l'hash della password, mentre durante il login viene utilizzato il metodo matches() per verificarne la corrispondenza.

4.2 Autorizzazione basata sui ruoli

Il sistema distingue due ruoli:

USER: utente registrato.

ADMIN: amministratore della piattaforma.

Le autorizzazioni vengono applicate anche lato Backend attraverso Spring Security, impedendo l'esecuzione di operazioni non consentite anche quando vengono inviate richieste direttamente alle API.

5. Funzionalità applicative

5.1 GESTIONE DEGLI HACKATHON

La piattaforma permette agli utenti autenticati di consultare gli hackathon disponibili.

Gli amministratori dispongono inoltre delle seguenti funzionalità:

Creazione di nuovi hackathon.

Modifica del nome degli hackathon esistenti.

Gestione delle informazioni e degli stati degli eventi.

La creazione di un hackathon prevede anche l'associazione automatica dell'utente amministratore come Organizer, senza richiedere al Frontend di specificarne manualmente l'identificativo.

5.2 GESTIONE DEI TEAM

Gli utenti con ruolo USER possono creare un nuovo team attraverso l'interfaccia Angular.

Durante la creazione:

Il sistema genera un identificativo univoco per il team.

Il Backend recupera automaticamente l'identità dell'utente dal JWT.

Il creatore viene associato al team con il ruolo LEADER.

Vengono effettuati controlli per evitare la creazione di team con nomi duplicati e per impedire che un utente appartenga a più team.

5.3 GESTIONE DEGLI STATI

Gli hackathon prevedono differenti stati applicativi, rappresentati attraverso classi dedicate.

Tra gli stati implementati sono presenti:

InIscrizioneState

InCorsoState

InValutazioneState

ConclusoState

Questa organizzazione permette di rappresentare le diverse fasi del ciclo di vita di un hackathon attraverso una gestione basata sullo stato dell'evento.

6. Validazione e gestione degli errori

La validazione dei dati viene effettuata principalmente lato Backend, attraverso le funzionalità di Spring Boot e Jakarta Validation.

Sono presenti controlli per verificare la correttezza dei dati ricevuti, impedire registrazioni duplicate e gestire le richieste non valide.

La gestione centralizzata delle eccezioni attraverso un componente RestControllerAdvice permette di restituire risposte HTTP coerenti con le diverse situazioni:

Codice HTTP

Significato

400

Bad Request – dati mancanti o non validi

401

Unauthorized – autenticazione mancante o non valida

403

Forbidden – operazione non autorizzata

404

Not Found – risorsa non trovata

409

Conflict – conflitto con lo stato dei dati

500

Internal Server Error – errore interno del server

7. Sicurezza delle API e protezione dei dati

Durante lo sviluppo sono state considerate alcune delle principali vulnerabilità delle applicazioni web.

7.1 SQL Injection

L'accesso ai dati viene gestito attraverso Spring Data JPA e i metodi derivati dei Repository, evitando la costruzione manuale di query SQL attraverso concatenazioni di stringhe.

Sono state effettuate prove manuali con input contenenti caratteri e istruzioni tipiche di tentativi di SQL Injection.

7.2 Cross-Site Scripting (XSS)

Il Frontend utilizza l'interpolazione standard di Angular per visualizzare i dati dinamici, sfruttando i meccanismi di escaping automatico del framework.

Sono state effettuate verifiche manuali utilizzando payload HTML e JavaScript nei campi di input e controllando il comportamento della loro visualizzazione nell'interfaccia.

7.3 CORS

È stata configurata una policy CORS per consentire la comunicazione tra il Backend e il Frontend durante lo sviluppo locale, limitando l'origine, i metodi HTTP e gli header ammessi.

7.4 Protezione degli endpoint

Le operazioni riservate vengono protette lato Backend attraverso regole di autorizzazione basate sui ruoli, oltre alla verifica dell'autenticazione JWT.

8. Persistenza dei dati – MySQL

Per la persistenza dei dati viene utilizzato MySQL, un database relazionale.

L'interazione tra applicazione Java e database è gestita attraverso Spring Data JPA e Hibernate, che permettono di mappare le entità Java sulle corrispondenti tabelle relazionali.

La configurazione del progetto utilizza Hibernate per la gestione dello schema e Spring Data JPA per le operazioni di lettura e scrittura.

Durante l'inizializzazione dell'applicazione vengono inoltre creati alcuni dati dimostrativi, tra cui utenti e hackathon, qualora le rispettive tabelle risultino vuote.

9. Configurazione e avvio del progetto

9.1 Prerequisiti

Per eseguire HackHub in ambiente locale sono necessari:

Java 21 o versione compatibile.

Maven.

Node.js e npm.

MySQL Server.

IntelliJ IDEA o un IDE equivalente.

9.2 Configurazione del database

Creare il database MySQL:

CREATE DATABASE hackhub_db;

9.3 Configurazione delle variabili d'ambiente

Il Backend utilizza le seguenti variabili d'ambiente:

DB_USERNAME=nome_utente_mysql
DB_PASSWORD=password_mysql
JWT_SECRET_BASE64=chiave_segreta_base64

Queste variabili devono essere configurate nell'ambiente di esecuzione del Backend.

9.4 Avvio del Backend

Dalla cartella contenente il file pom.xml eseguire:

mvn spring-boot:run

Il Backend sarà disponibile all'indirizzo:

http://localhost:8080

9.5 Avvio del Frontend

Dalla cartella hackhub-frontend eseguire:

npm install
npx ng serve

Il Frontend sarà disponibile all'indirizzo:

http://localhost:4200

10. Account dimostrativi

All'avvio dell'applicazione, se il database non contiene utenti, vengono inseriti automaticamente alcuni account dimostrativi.

Tra questi è presente un account ADMIN e diversi account USER.

Le credenziali degli account dimostrativi utilizzano la password:

password123

Queste credenziali sono destinate esclusivamente alla dimostrazione e alla verifica delle funzionalità del progetto.

11. Conclusioni

HackHub rappresenta un progetto full-stack sviluppato con l'obiettivo di applicare concretamente le principali tecnologie utilizzate nello sviluppo di applicazioni web moderne.

La separazione tra Frontend e Backend, l'utilizzo di API REST, la persistenza relazionale, l'autenticazione JWT e la gestione delle autorizzazioni permettono di realizzare una piattaforma organizzata e modulare.

Particolare attenzione è stata dedicata alla sicurezza delle credenziali, alla protezione degli endpoint e alla validazione dei dati.

Il progetto costituisce una base applicativa dimostrativa sulla quale potranno essere introdotte ulteriori funzionalità e attività di miglioramento.
# Politikk Statistikk

Politikk Statistikk er en webapplikasjon for å utforske og analysere informasjon om politisk arbeid på Stortinget.

Applikasjonen henter data fra Stortingets åpne API og presenterer informasjon om partier, politikere, saker, voteringer og politiske temaer på en mer oversiktlig måte.

## Funksjonalitet

- Oversikt over partiene på Stortinget
- Oversikt over politikere og deres tilhørighet
- Søk og filtrering av politiske saker
- Informasjon om voteringer og stemmegivning
- Statistikk over politikeres stemmegivning
- Statistikk fordelt på politiske temaer
- Egne profilsider for politikere
- Oversikt over politikeres deltakelse i voteringer
- Responsivt grensesnitt for desktop og mobil

## Teknologier

Prosjektet er utviklet med:

- **TypeScript**
- **React**
- **Next.js**
- **Tailwind CSS**
- **shadcn/ui**
- **Prisma**
- **Supabase**
- **Vercel**

Data om Stortinget hentes fra **Stortingets åpne API**, mens Supabase brukes som database og for autentisering.

## Arkitektur

Applikasjonen bruker Next.js som rammeverk og er bygget med en kombinasjon av server- og klientkomponenter.

Data fra Stortingets API synkroniseres til en relasjonsdatabase. Prisma brukes som ORM for å håndtere datamodellen og kommunikasjonen med databasen.

For eksempel lagres informasjon om politikere, partier, politiske temaer og stemmegivning i databasen. Dette gjør det mulig å utføre beregninger og lage statistikk uten å måtte hente all informasjon direkte fra Stortingets API hver gang en side lastes inn.

## Datakilde

Prosjektet benytter **Stortingets åpne API** som kilde for informasjon om blant annet:

- Politikere
- Partier
- Saker
- Voteringer
- Politiske temaer

Dataene er bearbeidet og organisert i prosjektets database for å gjøre dem tilgjengelige for applikasjonens statistikk og visninger.

### Forutsetninger

Du trenger:

- Node.js
- En Supabase-database
- Miljøvariabler for database og autentisering

### Installering

Klon repositoriet:

```bash
git clone <repository-url>
cd <repository-name>

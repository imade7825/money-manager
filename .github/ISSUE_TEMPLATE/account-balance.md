
# Account Balance

## Value Proposition

**As a user**

**I want to** see the total balance of my transactions,

**so that** I can quickly understand my overall financial situation.

## Description

Capstone Group Todo: Add wireframes

## Acceptance Criteria

- The account balance is displayed at the top of the transactions list.
- The balance includes the sum of all incomes and expenses.
- The balance updates in real-time as transactions are added, edited, or deleted.
- The account balance has a visual distinction based on its value (positive or negative).
- Display the income and expense for the current day 

## Tasks

- [ ] Create feature branch `feature/account-balance`
- [ ] Capstone Group Todo: Add tasks
- [ ] Create a Header  <h1> 
- [ ] Create a component for the balance 
- [ ] Create a <nav> component at the bottom of the page 
- [ ] Create a H3 heading with current date
---------------
- [ ] Implement in format Euro(cents) the currency
- [ ]


Summen & Anzeige
 Saldo berechnen und darstellen (Format € 1.000,00).

AK: Bei Beispiel [ +1000€, −500€ ] wird 500€ angezeigt.

 Heutige Einnahmen/Ausgaben berechnen (separat, als positive Beträge zeigen).

AK: Keine heutigen Einnahmen ⇒ Text „Keine!“.


Echtzeit-Updates

 Add: Beim Hinzufügen neuer Transaktion sofort neu berechnen.

 Edit: Beim Bearbeiten (Betrag, Typ, Datum) Saldo & Tageswerte aktualisieren.

 Delete: Beim Löschen neu berechnen.

AK: Alle drei Aktionen aktualisieren Saldo/Tageswerte ohne Reload.

Tech-Hinweis: In React useMemo für Selektoren; mit SWR mutate (optimistic).

Visuelle Unterscheidung des Saldos

 Positiv: grüner Stil/Icon (z. B. ▲), Negativ: roter Stil/Icon (▼), 0: neutral.

AK: Farbe + Symbol (nicht nur Farbe → Barrierefreiheit), Kontrast erfüllt WCAG.

 Sanfte Animation bei Wertänderung (z. B. Zahl „count up/down“).


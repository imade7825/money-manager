# Transactions List 

## Value Proposition

**As a user**

**I want to** import and export transaction data as csv format,

**so that** i can easily save or transfer my data.
## Description
Capstone Group Todo: Add wireframes

## Acceptance Criteria

- Export of transaction data
- A button labeld "Export" initiates the export process
- The exported CSV file includes transaction data (name, category, date, amount, type) with a header row
- The file is downloaded as transactions.csv
- A success message is displayed after the export
- Import of transaction data
- A button labeled "Import" opens a file selecting dialog for a CSV file
- The CSV file is checked for correct columns (name, category, date, amount, type)
- Data are added to the transaction list an displayed
- In case of errors is a simple error message displayed

## Tasks

- [ ] Create feature branch `feature/import-export-csv`
- [ ] Define a CSV format with columns (name, category, date, amount, type)
- [ ] Create an API route `"/api/transactions/export"` to handle CSV export
- [ ] Fetch transaction data from the database and convert it into CSV file
- [ ] Set the filename to transactions.csv for download
- [ ] Create an API route `"/api/transactions/import"` to handle CSV import
- [ ] Validate the CSV file to ensure it contains the required columns
- [ ] Save valid transactions data to the database and return a success or error response
- [ ] Create a component `ImportExportDataInCsv`
- [ ] A button labled "Export" triggert a `GET` request to the export API route
- [ ] A button labled "Import" that opens a file selection dialog 

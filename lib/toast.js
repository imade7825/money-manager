import { toast } from "react-toastify";

export const notify = {
  
  //crud
  saved: () => toast.success("Transaction saved!"),
  deleted: () => toast.success("Transaction deleted!"),
  error: () => toast.error("Please try again."),

  //export/import - success
  dataSaved: () => toast.success("Done: Data saved."),
  importSuccessful: () => toast.success("Import successful."),
  exportSuccessful: () =>
  toast.success("Export successful. File has been downloaded."),
  dataSavedCount: (count) =>
  count != null
    ? toast.success(`Done: saved ${count} rows.`)
    : toast.success("Done: Data saved."),

  //import status/infos
  importImProgress: () => toast.info("Import in progress."),
  missedSelectedFile: () =>
    toast.info("Please choose a .csv file before importing."),
  selectCsvFile: () => toast.info("Please select a .csv file."),

  //export/import - error
  importFailed: () => toast.error("Import failed!"),
  parseImportFailed: () => toast.error("Import failed: CSV conatins errors"),
  importFailedCantReadData: () => toast.error("Import failed: can't read data."),
  exportFailed: () => toast.error("Export failed!"),
  noDataToExport: () => toast.error("No data to export!"),
};

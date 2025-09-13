import styled from "styled-components";
import Papa from "papaparse";
import { mutate } from "swr";
import { notify } from "@/lib/toast";

export default function ImportExportDataInCsv({
  transactions = [], //list der datensätze aus dem frontend, standard leer verhinder (undefined)
}) {
  //Nimmt die bereits vorhandenen Datensätze aus dem Frontend(hier: importedItems)
  //und erstellt daraus eine csv datei
  async function handleExport() {
    try {
      //exportiere die bereits im Frontend vorhandenen Items
      if (transactions.length === 0) {
        notify.noDataToExport();
        return;
      }

      //papaparse macht aus einem Array von Objekten eine csv datei
      const rowsForCsv = transactions.map((item) => ({
        name: item?.name ?? "",
        category: item?.category ?? "",
        date: item?.date ? new Date(item.date).toISOString().slice(0, 10) : "",
        amount: Number(item?.amount ?? 0),
        type: item?.type ?? "",
      }));
      const csvText = Papa.unparse(rowsForCsv, {
        columns: ["name", "category", "date", "amount", "type"],
      });

      //csv im browser zum downlod anbieten
      //aus dem csv-text ein blob-objekt bauen(datei ähnlicher speicher im browser)
      const csvBlob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });

      //aus dem blob temporäre url erzeugen, auf die der browser zugreifen kann
      const objectUrl = URL.createObjectURL(csvBlob);

      //ein <a>element(link) browser starten downloads zuverlässig über link
      const anchorElement = document.createElement("a");

      //den link so konfigurieren, dass er auf der temporäre datei zeigt
      anchorElement.href = objectUrl;

      //dem browser sagen unter werlchen namen gespeichert wird
      anchorElement.download = "transactions.csv";

      document.body.appendChild(anchorElement); //link ins DOM hängen
      anchorElement.click(); //click simulieren download
      anchorElement.remove(); //aufräumen
      URL.revokeObjectURL(objectUrl); //temporäre URL freigeben
      notify.exportSuccessful();
    } catch (error) {
      console.error(error);
      notify.exportFailed();
    }
  }

  //schickt alle importierte zeilen in einem request and die save-many route
  async function saveImportedTransactionsToDB(transactions) {
    //post an die neue api-route /api/transactions/save-many
    //senden {transactions:[..]im json-body}
    try {
      const response = await fetch("/api/transactions/save-many", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactions }), //backend erwartet: { name, amount, category, type, date }
      });

      let payload = null;
      try {
        payload = await response.json();
      } catch {}

      if (!response.ok) {
        throw new Error(payload?.message || `Failed (HTTP ${response.status})`); // (Toasts im Caller)
        // console.error("Save failed(Server-Error).");
        // notify.importFailedCantReadData();
      }

      return payload;
    } catch (error) {
      // netzwerkfehler (z. B. offline) oder clientfehler
      console.error("Save failed(network/client)");
    }
  }

  //read and import selected csv file
  async function handleImportSubmit(event) {
    event.preventDefault(); //formular nicht klassisch abschicken

    const formElement = event.currentTarget; //das <form> element
    const formData = new FormData(formElement); //formdata aus dem formular
    const selectedFile = formData.get("csvFile"); //datei aus dem <input name="csvFile">

    if (!selectedFile) {
      notify.missedSelectedFile();
      return;
    }
    //prüfe ob der dateiname mit .csv endet
    if (!/\.csv$/i.test(selectedFile.name)) {
      notify.selectCsvFile();
      return;
    }

    try {
      notify.importImProgress();

      //papaparse liest die datei direkt im browser
      Papa.parse(selectedFile, {
        header: true, //erste zeile = spaltennamen
        skipEmptyLines: true, //leere zeilen ignorieren

        //wenn papaparse fertig ist
        complete: async (results) => {
          try {
            //falls parser fehler gemeldet hat: anzeigen & abbrechen
            if (results?.errors?.length) {
              console.error(results.errors);
              notify.parseImportFailed();
              return;
            }
            //rohdaten in ein einheitliches format bringen
            const importedRows = (results?.data ?? []) //data ist ein array je csv zeile
              .map((row) => {
                //jede zeile aus der csv in unser objekt-format übertragen
                return {
                  name: String(row?.name ?? "").trim(), //text trimmen
                  category: String(row?.category ?? "").trim(), //text trimmen
                  //datum: wenn vorhanden, so belassen. sonst leer
                  date: row?.date ?? "",
                  //betrag: erst , durch . ersetzen dann Number()
                  amount: Number(String(row?.amount ?? "").replace(",", ".")),
                  //typ klein schreiben (erwartet: "income" oder "expense")
                  type: String(row?.type ?? "")
                    .trim()
                    .toLowerCase(),
                };
              })
              //validierung: pflichtfelder prüfen
              .filter(
                (normalized) =>
                  normalized.name && //name muss vorhanden
                  normalized.category &&
                  normalized.date &&
                  Number.isFinite(normalized.amount) && //betrag muss zahl sein
                  (normalized.type === "income" ||
                    normalized.type === "expense") //typ muss gültig sein
              );
            if (!importedRows.length) {
              notify.importFailed();
              return;
            }
            const { inserted } = await saveImportedTransactionsToDB(
              importedRows
            );

            notify.importSuccessful();
            notify.dataSaved();
            notify.dataSavedCount(inserted);
            mutate("/api/transactions");
            //formular leeren, damit dieselbe datei ggf. erneut gewählt werden kann
            formElement.reset();
          } catch (error) {
            console.error(error);
            notify.importFailed();
          }
        },

        //falls beim lesen/parsen der datei fehler passiert
        error: (parseError) => {
          console.error(parseError);
          notify.importFailedCantReadData();
        },
      });
    } catch (error) {
      console.error(error);
      notify.importFailed();
    }
  }

  return (
    <Wrapper>
      <Row>
        {/* export button: startet den csv download aus vorhandenen frontend-daten */}
        <Button type="button" onClick={handleExport}>
          Export CSV
        </Button>
        {/* import formular: datei wählen und auto-submit durch onChange */}
        <form onSubmit={handleImportSubmit}>
          <VisuallyHiddenInput
            type="file"
            id="csvFile" //fürs label
            name="csvFile" //name im formdata
            accept=".csv,text/csv" //nur csv erlauben
            onChange={(event) => event.currentTarget.form?.requestSubmit()} //direkt abschicken
          />
          <Button as="label" htmlFor="csvFile">
            Import CSV
          </Button>
        </form>
      </Row>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: grid;
  gap: 12px;
  align-items: start;
  max-width: 560px;
`;
const Row = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f7f7f7;
  font-weight: 600;
  transition: transform 0.05s ease-in-out;
  &:hover {
    transform: translateY(-1px);
  }
`;

const Status = styled.div`
  font-size: 14px;
  color: #333;
`;

const VisuallyHiddenInput = styled.input`
  width: 1px;
  height: 1px;
  padding: 0;
`;

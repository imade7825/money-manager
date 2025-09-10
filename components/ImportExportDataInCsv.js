import { useState } from "react";
import styled from "styled-components";

export default function ImportExportDataInCsv({ onImported, importedItems }) {
  const [statusMessage, setStatusMessage] = useState(null);

  //call api, receive csv, trigger file download
  async function handleExport() {
    try {
      setStatusMessage(null);

      //export only the imported items
      let url = "/api/transactions/export";
      if (Array.isArray(importedItems) && importedItems.length > 0) {
        const ids = importedItems
          .map((t) => t && t._id)
          .filter(Boolean)
          .join(",");
        if (ids) {
          url += `?ids=${encodeURIComponent(ids)}`;
        }
      }
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) throw new Error("Export failed");

      const csvFileBlob = await response.blob();
      const downloadUrl = URL.createObjectURL(csvFileBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = "transactions.csv";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      URL.revokeObjectURL(downloadUrl);

      setStatusMessage("Export successful. File has been downloaded.");
    } catch (error) {
      console.error(error);
      setStatusMessage("Export failed.");
    }
  }

  //read and import selected csv file
  async function handleImportSubmit(event) {
    event.preventDefault();
    setStatusMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("csvFile");

    if (!(file instanceof File)) {
      setStatusMessage("Please choose a .csv file before importing.");
      return;
    }
    if (!/\.csv$/i.test(file.name)) {
      setStatusMessage("Please select a .csv file.");
      return;
    }

    try {
      setStatusMessage("Import in progress...");
      const fileContent = await file.text();

      const response = await fetch("/api/transactions/import", {
        method: "POST",
        headers: { "Content-Type": "text/csv; charset=utf-8" },
        body: fileContent,
      });

      const result = await response.json();
      if (!response.ok) {
        setStatusMessage(result?.message || "Import failed.");
        return;
      }

      setStatusMessage(result?.message || "Import successful.");
      if (typeof onImported === "function") {
        onImported(result.items ?? []);
      }
      form.reset(); // erlaubt, dieselbe Datei erneut zu wählen
    } catch (err) {
      console.error(err);
      setStatusMessage("Import failed.");
    }
  }

  return (
    <Wrapper>
      <Row>
        <Button type="button" onClick={handleExport}>
          Export CSV
        </Button>
        <form onSubmit={handleImportSubmit}>
          <VisuallyHiddenInput
            id="csvFile"
            name="csvFile"
            accept=".csv,text/csv"
            onChange={(event) => event.currentTarget.form?.requestSubmit()}
          />
          <Button as="label" htmlFor="csvFile">
            Import CSV
          </Button>
        </form>
      </Row>
      {statusMessage && <Status role="status">{statusMessage}</Status>}
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

const VisuallyHiddenInput = styled.input.attrs({ type: "file" })`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
`;

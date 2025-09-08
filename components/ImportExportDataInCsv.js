import { useRef, useState } from "react";
import styled from "styled-components";

export default function ImportExportDataInCsv({ onImported }) {
  const fileInputRef = useRef(null);
  const [statusMessage, setStatusMessage] = useState(null);

  async function handleExport() {
    try {
      setStatusMessage(null);
      const response = await fetch("/api/transactions/export", {
        method: "GET",
      });
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


//open file dailog
function handlePickFile() {
  setStatusMessage(null);
  fileInputRef.current?.click();
}

//read and import selected csv file
async function handleFileChange(event) {
  try {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!/\.csv$/i.test(selectedFile.name)) {
      setStatusMessage("Please select a .csv file.");
      return;
    }

    const fileContent = await selectedFile.text();
    setStatusMessage("Import in progress...");

    const response = await fetch("/api/transactions/import", {
      method: "POST",
      headers: { "Content-Type": "text/csv; charset=utf-8" },
      body: fileContent,
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const errorMessage = result?.message || "Import failed.";
      setStatusMessage(errorMessage);
      return;
    }

    setStatusMessage(result?.message || "Import successful.");
    onImported?.(result);
    event.target.value = "";
  } catch (error) {
    console.error(error);
    setStatusMessage("Import failed.");
  }
}
return (
  <Wrapper>
    <Row>
      <Button type="button" onClick={handleExport}>
        Export CSV
      </Button>
      <Button type="button" onClick={handlePickFile}>
        Import CSV
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
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

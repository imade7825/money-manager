import useSWR from "swr";
import styled from "styled-components";
import CategoryPieChart from "@/components/CategoryPieChart";
import AccountBalanceTimeLine from "@/components/AccountBalanceTimeline";
import { Card } from "@/components/ui/Primitives";
import { useState } from "react";

//helpers
function formatDate(isoString) {
  if (!isoString) return "...";

  return new Date(isoString).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function computeRange(preset) {
  const today = new Date();
  const toDateISO = today.toISOString().slice(0, 10);

  function toISODateString(date) {
    return new Date(date).toISOString().slice(0, 10);
  }

  function subtractDaysFromToday(numberOfDays) {
    const date = new Date(today);
    date.setDate(date.getDate() - numberOfDays);
    return toISODateString(date);
  }

  function firstDayOfCurrentYear() {
    return today.getFullYear() + "-01-01";
  }

  if (preset === "7") return { from: subtractDaysFromToday(6), to: toDateISO };
  if (preset === "30")
    return { form: subtractDaysFromToday(29), to: toDateISO };
  if (preset === "90")
    return { from: subtractDaysFromToday(89), to: toDateISO };
  if (preset === "ytd") return { from: firstDayOfCurrentYear(), to: toDateISO };
  if (preset === "all") return { from: "", to: toDateISO };
  return { form: "", to: toDateISO };
}

export default function Analytics() {
  const {
    data: transactions = [],
    error,
    isLoading,
  } = useSWR("/api/transactions");

  // Tabs
  const [view, setView] = useState("pie");

  // Range state default -> 30 days

  const initial = computeRange("30");
  const [preset, setPreset] = useState("30");
  const [dateFrom, setDateFrom] = useState(initial.from);
  const [dateTo, setDateTo] = useState(initial.to);

  if (error) return <StatusMessage>Failed to load transactions</StatusMessage>;
  if (isLoading) return <StatusMessage>Loading transactions...</StatusMessage>;

  function applyPreset(preset) {
    const { from, to } = computeRange(preset);
    setPreset(preset);
    setDateFrom(from);
    setDateTo(to);
  }

  function onCustomChange({ from, to }) {
    setPreset("custom");
    setDateFrom(from || "");
    setDateTo(to || "");
  }

  const showRangeBadge = preset !== "all" && (dateFrom || dateTo);

  return (
    <div>
      <Tabs role="tablist" aria-label="Analytics views">
        <TabButton role="tab" onClick={() => setView("pie")}>
          Categories
        </TabButton>
        <TabButton role="tab" onClick={() => setView("time")}>
          Time
        </TabButton>
      </Tabs>
      {view === "pie" && (
        <ChartWrapper
          as="figure"
          aria-labelledby="chart-title"
          role="group"
          data-tour="analytics-chart"
        >
          <ChartTitle id="chart-title">Transactions by Category</ChartTitle>
          <Card>
            <CategoryPieChart transactions={transactions} aria-hidden />
          </Card>
          <ScreenReaderfigcaption>
            <p role="note" aria-label="Pie chart summary">
              Pie chart showing expenses by category.Largest category is Food
              (350€).
            </p>
          </ScreenReaderfigcaption>
        </ChartWrapper>
      )}

      {view === "time" && (
        <section>
          <RangeBar aria-label="Time range selection">
            <PresetButton
              onClick={() => applyPreset("7")}
              $active={preset === "7"}
            >
              7d
            </PresetButton>
            <PresetButton
              onClick={() => applyPreset("30")}
              $active={preset === "30"}
            >
              30d
            </PresetButton>
            <PresetButton
              onClick={() => applyPreset("90")}
              $active={preset === "90"}
            >
              90d
            </PresetButton>
            <PresetButton
              onClick={() => applyPreset("ytd")}
              $active={preset === "ytd"}
            >
              YTD
            </PresetButton>
            <Spacer />
            <label>
              From
              <input
                type="date"
                value={dateFrom}
                onChange={(e) =>
                  onCustomChange({ from: e.target.value, to: dateTo })
                }
              />
            </label>
            <label>
              To
              <input
                type="date"
                value={dateTo}
                onChange={(e) =>
                  onCustomChange({ from: dateFrom, to: e.target.value })
                }
              />
            </label>
          </RangeBar>

          {showRangeBadge && (
            <ActiveRange aria-live="polite">
              {formatDate(dateFrom)} – {formatDate(dateTo)}
            </ActiveRange>
          )}

          <AccountBalanceTimeLine
            transactions={transactions}
            startDate={dateFrom || undefined}
            endDate={dateTo || undefined}
          />
        </section>
      )}
    </div>
  );
}

const ChartWrapper = styled.section`
  max-width: 560px;
  margin: 0 auto;
  padding: 12px;
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
`;

const ChartTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: left;
`;

const StatusMessage = styled.p`
  margin: 16px 20px;
  font-size: 0.95rem;
  color: var(--muted-foreground, #6b7280);
`;

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 0 auto 10px;
`;

const TabButton = styled.button`
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: ${({ $active }) =>
    $active ? "var(--pb-100)" : "var(--surface-elevated)"};
  color: ${({ $active }) => ($active ? "var(--pb-800)" : "inherit")};
`;

const RangeBar = styled.div`
  max-width: 560px;
  margin: 0 auto 6px;
  padding: 8px;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(4, auto) 1fr repeat(2, minmax(0, 1fr));
  align-items: center;
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
`;

const PresetButton = styled.button`
  border-radius: 12px;
  padding: 6px 10px;
  background: ${({ $active }) =>
    $active ? "var(--pb-100)" : "var(--surface-elevated)"};
  color: ${({ $active }) => ($active ? "var(--pb-800)" : "inherit")};
`;

const Spacer = styled.div`
  flex: 1;
`;

const ActiveRange = styled.p`
  max-width: 560px;
  margin: 6px auto 8px;
  text-align: center;
  opacity: 0.85;
`;

const ScreenReaderfigcaption = styled.figcaption`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 1px, 1px);
  white-space: nowrap;
  border: 0;
`;

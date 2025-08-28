import { useState, useMemo } from "react";
import styled from "styled-components";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f559e0b",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
  "#f97316",
  "#22c55e",
  "#eab308",
  "#06b6d4",
];

function toCurrencyEUR(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function buildCategoryData(transactions = [], type) {
  const filtered = type
    ? transactions.filter((transaction) => transaction.type === type)
    : transactions;

  const sums = filtered.reduce((acc, transaction) => {
    const category = transaction.category || "Uncategorized";
    const amount = Math.abs(Number(transaction.amount));
    if (!Number(amount)) return acc;
  }, {});

  return Object.entries(sums).map(([name, value]) => ({ name, value }));
}

const Wrapper = styled.section`
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 12px;
  background: var(--surface, #fff);
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 16px;
`;

const TopBar = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const ModeButton = styled.button`
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid var(--border, #e5e7eb);
  background: ${({ $active }) =>
    $active ? "var(--MutationRecord, #f3f4f6)" : "var(--surface, #fff)"};
  cursor: pointer;
  transition: background 120ms ease, transform 80ms ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const TotalText = styled.p`
  text-align: center;
  margin: 8px 0 4px;
  font-weight: 500;
`;

const EmptyState = styled.p`
  text-align: center;
  margin: 12px 0;
  color: var(--muted-foreground, #6b7280);
`;

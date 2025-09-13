export function getSteps() {
  return [
    {
      element: '[data-tour="introApp"]',
      popover: {
        title: "Hello in Money Manager App",
        description:
          "This a simple way to overview your finances.",
        side: "top",
        align: "start",
      },
    },
    {
      element: '[data-tour="balance-summary"]',
      popover: {
        title: "Balance overview",
        description:
          "This shows your total balance. It updates as you add, edit or delete transactions.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: '[data-tour="filter-bar"]',
      popover: {
        title: "Filter your view",
        description:
          "Filter by category or time. Use presets or a custom date range.",
        side: "top",
        align: "start",
      },
    },
    {
      element: '[data-tour="time-filter"]',
      popover: {
        title: "Time presets",
        description:
          "Quickly switch between Today, Last 7 days, This month, or set a custom range.",
        side: "right",
        align: "start",
      },
    },
    {
      element: '[data-tour="transactions-list"]',
      popover: {
        title: "Transactions",
        description: "Your entries appear here. Edit or delete them anytime.",
        side: "top",
        align: "start",
      },
    },
    {
      element: '[data-tour="edit-transaction"]',
      popover: {
        title: "Edit a transaction",
        description: "Update name, amount, type, category, or date.",
        side: "left",
        align: "center",
      },
    },
    {
      element: '[data-tour="delete-transaction"]',
      popover: {
        title: "Delete a transaction",
        description: "Remove an entry. You will be asked to confirm.",
        side: "left",
        align: "center",
      },
    },
    {
      element: '[data-tour="nav-create"]',
      popover: {
        title: "Add new transaction",
        description: "Tap here to add income or expense.",
        side: "top",
        align: "center",
      },
    },
    {
      element: '[data-tour="nav-analytics"]',
      popover: {
        title: "Charts & insights",
        description: "Open analytics to see your spending by category.",
        side: "top",
        align: "center",
      },
    },

    {
      element: '[data-tour="per-page"]',
      popover: {
        title: "Items per page",
        description:
          "Choose how many transactions you see at once: 10, 15, or 20. Changing this resets to page 1.",
        side: "bottom",
        align: "center",
      },
    },

    {
      element: '[data-tour="csv-export"]',
      popover: {
        title: "Export your data",
        description: "Click here to download your transactions as a CSV file.",
        side: "bottom",
        align: "center",
      },
    },
    {
      element: '[data-tour="csv-import"]',
      popover: {
        title: "Import data",
        description: "Bring your own CSV and import transactions into the app.",
        side: "bottom",
        align: "center",
      },
    },
    // …

    {
      element: '[data-tour="analytics-chart"]',
      popover: {
        title: "Category breakdown",
        description:
          "A pie chart summarizes your categories. Use it to spot trends.",
        side: "bottom",
        align: "start",
      },
    },
  ];
}

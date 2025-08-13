export const EXPENSE_FILTERS = {
  ALL: "all",
  LASTWEEK: "lastweek",
  LASTMONTH: "lastmonth",
  LAST3MONTH: "last3month",
} as const;

export const FILTERS_BUTTONS = {
  [EXPENSE_FILTERS.ALL]: {
    literal: "Todos",
    href: `/?filter=${EXPENSE_FILTERS.ALL}`,
  },
  [EXPENSE_FILTERS.LASTWEEK]: {
    literal: "Semana pasada",
    href: `/?filter=${EXPENSE_FILTERS.LASTWEEK}`,
  },
  [EXPENSE_FILTERS.LASTMONTH]: {
    literal: "Mes pasado",
    href: `/?filter=${EXPENSE_FILTERS.LASTMONTH}`,
  },
  [EXPENSE_FILTERS.LAST3MONTH]: {
    literal: "Hace 3 meses",
    href: `/?filter=${EXPENSE_FILTERS.LAST3MONTH}`,
  },
} as const;

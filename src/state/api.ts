import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 

// Interface for the individual product in topProducts array
interface TopProduct {
  productId: number;
  productName: string;
  totalSales: number;
}

// Interface for the salesSummary section
interface SalesSummary {
  totalSales: number;
  totalProfit: number;
}

// Interface for the purchaseSummary section
interface PurchaseSummary {
  totalPurchase: number;
  totalCost: number;
}

// Interface for the expenseSummary section
interface ExpenseSummary {
  totalExpenses: number;
}

// Interface for individual expenseSummaryByCategory
interface ExpenseCategorySummary {
  categoryId: number;
  categoryName: string;
  totalExpenses: number;
}

// Interface for individual profitByCategory
interface ProfitCategorySummary {
  categoryId: number;
  categoryName: string;
  totalProfit: number;
}

// Interface for individual outOfStockProducts
interface OutOfStockProduct {
  productId: number;
  productName: string;
}

// Main Dashboard Response interface
interface DashboardMetrics {
  topProducts: TopProduct[];
  salesSummary: SalesSummary;
  purchaseSummary: PurchaseSummary;
  expenseSummary: ExpenseSummary;
  expenseSummaryByCategory: ExpenseCategorySummary[];
  profitByCategory: ProfitCategorySummary[];
  outOfStockProducts: OutOfStockProduct[];
}


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process .env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics"],
    endpoints: (build) => ({
      getDashboardMetrics: build.query<DashboardMetrics, void>({
        query: () =>"/dashboard",
        providesTags:  ["DashboardMetrics"]
      })
    }),
  });
  
export const {
  useGetDashboardMetricsQuery,
} = api; 
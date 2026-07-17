// hooks/useCompanyStats.ts

import { useEffect, useState } from "react";
import api from "@/lib/api";

export function useCompanyStats() {
  const [stats, setStats] = useState({
    yearsInIndustry: 0,
    customersServed: 0,
    assetsManaged: 0,
    portfolios: 0,
  });

  useEffect(() => {
    api
      .get("public/company-stats")
      .then((res) => setStats(res.data))
      .catch(console.error);
  }, []);

  return stats;
} 
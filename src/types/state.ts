export interface State {
  id: string;
  name: string;
  population: number;
  // https://meric.mo.gov/data/cost-living-data-series
  costOfLivingIndex: number;
  // https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_violent_crime_rate
  violentCrimeRate: number;
  realEstateTax: number;
  salesTax: number;
  personalIncomeTax: TaxBracket[];
  // Some states have an alternate tax brackets for higher personal income.
  highIncomeTax?: AlternateTaxBracket;
  corporateTax: TaxBracket[];
}

export interface AlternateTaxBracket {
  minimumIncome: number;
  personalIncomeTax: TaxBracket[];
}

export interface TaxBracket {
  taxRate: number;
  minimumIncome: number;
}

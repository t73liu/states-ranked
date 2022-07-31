export interface State {
  id: string;
  name: string;
  population: number;
  // https://www.bea.gov/data/income-saving/personal-income-by-state
  perCapitaIncome: number;
  // https://en.wikipedia.org/wiki/List_of_U.S._states_by_median_home_price
  medianHousePrice: number;
  // https://meric.mo.gov/data/cost-living-data-series
  costOfLivingIndex: number;
  // https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_violent_crime_rate
  violentCrimeRate: number;
  realEstateTax: number;
  salesTax: number;
  personalIncomeTaxBrackets: TaxBracket[];
  // Some states have an alternate tax brackets for higher personal income.
  highIncomeTaxBrackets?: AlternateTaxBracket;
  corporateTaxBrackets: TaxBracket[];

  // Derived average tax rate.
  personalIncomeTax: number;
  corporateTax: number;
}

export interface AlternateTaxBracket {
  minimumIncome: number;
  personalIncomeTax: TaxBracket[];
}

export interface TaxBracket {
  taxRate: number;
  minimumIncome: number;
}

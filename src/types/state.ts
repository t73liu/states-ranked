export interface State {
  id: string;
  name: string;
  population: number;
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

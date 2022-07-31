<script lang="ts">
  import { formatCurrency, formatPercent } from "../utils/numbers";
  import { State, TaxBracket } from "../types/state";
  import json from "../data/states.json";

  let columns = [
    {
      key: "name",
      displayName: "State",
      selected: true,
      render: (state: State) => `${state.name} (${state.id})`,
    },
    {
      key: "population",
      displayName: "Population",
      selected: false,
      render: (state: State) => state.population.toLocaleString(),
    },
    {
      key: "personalIncomeTax",
      displayName: "Income Tax",
      selected: true,
      render: (state: State) => formatPercent(state.personalIncomeTax),
    },
    {
      key: "realEstateTax",
      displayName: "Real Estate Tax",
      selected: true,
      render: (state: State) => formatPercent(state.realEstateTax),
    },
    {
      key: "salesTax",
      displayName: "Sales Tax",
      selected: false,
      render: (state: State) => formatPercent(state.salesTax),
    },
    {
      key: "corporateTax",
      displayName: "Corporate Tax",
      selected: true,
      render: (state: State) => formatPercent(state.corporateTax),
    },
    {
      key: "costOfLivingIndex",
      displayName: "Cost of Living Index",
      selected: true,
      render: (state: State) => state.costOfLivingIndex,
    },
    {
      key: "perCapitaIncome",
      displayName: "Per Capita Income",
      selected: false,
      render: (state: State) => formatCurrency(state.perCapitaIncome),
    },
    {
      key: "medianHousePrice",
      displayName: "Median House Price",
      selected: true,
      render: (state: State) => formatCurrency(state.medianHousePrice),
    },
    {
      key: "violentCrimeRate",
      displayName: "Violent Crime Rate",
      selected: false,
      render: (state: State) => state.violentCrimeRate,
    },
  ];
  let sortColumn = { col: "name", ascending: true };
  let personalIncome = 100000;
  let corporateIncome = 100000;

  const isColumnSelected = (column: string): boolean => {
    return columns.some((c) => c.key === column && c.selected);
  };

  const calcTaxRate = (taxBrackets: TaxBracket[], amount: number): number => {
    let taxOwed = 0;
    let remainingAmount = amount;
    let bracketIndex = taxBrackets.length - 1;
    while (remainingAmount > 0 && bracketIndex >= 0) {
      const bracket = taxBrackets[bracketIndex];
      if (remainingAmount > bracket.minimumIncome) {
        taxOwed += (remainingAmount - bracket.minimumIncome) * bracket.taxRate;
        remainingAmount = bracket.minimumIncome;
      }
      bracketIndex -= 1;
    }
    const taxRate = taxOwed / amount;
    return Math.round(taxRate * 100000) / 100000;
  };

  let selectedStates: Record<string, boolean> = {};
  let states = json as State[];
  states.map((s) => {
    s.corporateTax = calcTaxRate(s.corporateTaxBrackets, corporateIncome);
    if (s.highIncomeTax && personalIncome > s.highIncomeTax.minimumIncome) {
      s.personalIncomeTax = calcTaxRate(
        s.highIncomeTax.taxBrackets,
        personalIncome
      );
    } else {
      s.personalIncomeTax = calcTaxRate(
        s.personalIncomeTaxBrackets,
        personalIncome
      );
    }
  });

  $: updatePersonalIncomeTaxRates = (num) => {
    personalIncome = num;
    for (let s of states) {
      if (s.highIncomeTax && personalIncome > s.highIncomeTax.minimumIncome) {
        s.personalIncomeTax = calcTaxRate(
          s.highIncomeTax.taxBrackets,
          personalIncome
        );
      } else {
        s.personalIncomeTax = calcTaxRate(
          s.personalIncomeTaxBrackets,
          personalIncome
        );
      }
    }
    states = states;
  };

  $: updateCorporateTaxRates = (num) => {
    corporateIncome = num;
    for (let s of states) {
      s.corporateTax = calcTaxRate(s.corporateTaxBrackets, corporateIncome);
    }
    states = states;
  };

  $: toggleColumn = (column) => {
    columns.map((c) => {
      if (c.key === column) {
        c.selected = !c.selected;
      }
    });
    columns = columns;
  };

  $: toggleState = (stateId) => {
    selectedStates[stateId] = !selectedStates[stateId];
  };

  $: sortBy = (column) => {
    if (sortColumn.col == column) {
      sortColumn.ascending = !sortColumn.ascending;
    } else {
      sortColumn.col = column;
      sortColumn.ascending = true;
    }

    const sortModifier = sortColumn.ascending ? 1 : -1;
    let sort = (a, b) =>
      a[column] < b[column]
        ? -1 * sortModifier
        : a[column] > b[column]
        ? sortModifier
        : 0;
    states = states.sort(sort);
  };
</script>

<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 mb-6 w-full group">
      <label
        for="income"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Personal Income
      </label>
      <input
        type="number"
        id="income"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="100000"
        value={personalIncome}
        on:input={(e) => updatePersonalIncomeTaxRates(e.target.value)}
        required
      />
      <label
        for="corporate"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Corporate Income
      </label>
      <input
        type="number"
        id="corporate"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="100000"
        value={corporateIncome}
        on:input={(e) => updateCorporateTaxRates(e.target.value)}
        required
      />
    </div>
    <div class="relative z-0 mb-6 h-full w-full group">
      <ul
        class="overflow-y-auto h-36 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        {#each columns as column}
          {#if column.key !== "name"}
            <li
              class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id={`col-${column.key}`}
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  on:click={() => toggleColumn(column.key)}
                  checked={isColumnSelected(column.key)}
                />
                <label
                  for={`col-${column.key}`}
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {column.displayName}
                </label>
              </div>
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  </div>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
    <thead
      class="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white"
    >
      <tr>
        <th scope="col" class="p-4">
          <div class="flex items-center">
            <input
              id="checkbox-all-search"
              type="checkbox"
              disabled
              class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="checkbox-all-search" class="sr-only">checkbox</label>
          </div>
        </th>
        {#each columns as column}
          {#if isColumnSelected(column.key)}
            <th
              scope="col"
              class="cursor-pointer	py-3 px-6"
              on:click={() => sortBy(column.key)}
            >
              {column.displayName}
            </th>
          {/if}
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each states as state}
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td class="p-4 w-4">
            <div class="flex items-center">
              <input
                id={`select-${state.id}`}
                type="checkbox"
                checked={Boolean(selectedStates[state.id])}
                on:click={() => toggleState(state.id)}
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for={`select-${state.id}`} class="sr-only">checkbox</label>
            </div>
          </td>
          {#each columns as column}
            {#if column.key === "name"}
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {column.render(state)}
              </th>
            {:else if isColumnSelected(column.key)}
              <td class="py-4 px-6">
                {column.render(state)}
              </td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<script lang="ts">
  import { formatPercent } from "../utils/numbers";
  import {State, TaxBracket} from "../types/state";
  import json from "../data/states.json";

  let sortColumn = { col: "name", ascending: true };
  let personalIncome = 100000;
  let corporateIncome = 100000;

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
  }

  let selectedStates = {};
  let states = (json as State[])
  states.map((s) => {
    s.corporateTax = calcTaxRate(s.corporateTaxBrackets, corporateIncome);
    s.personalIncomeTax = calcTaxRate(s.personalIncomeTaxBrackets, personalIncome);
  });

  $: updatePersonalIncomeTaxRates = (num) => {
    personalIncome = num;
    for (let s of states) {
      s.personalIncomeTax = calcTaxRate(s.personalIncomeTaxBrackets, personalIncome);
    }
    states = states;
  }

  $: updateCorporateTaxRates = (num) => {
    corporateIncome = num;
    for (let s of states) {
      s.corporateTax = calcTaxRate(s.corporateTaxBrackets, corporateIncome);
    }
    states = states;
  }

  $: toggleState = (stateId) => {
    selectedStates[stateId] = !selectedStates[stateId];
  }

  $: sortBy = (column) => {
    if (sortColumn.col == column) {
      sortColumn.ascending = !sortColumn.ascending
    } else {
      sortColumn.col = column
      sortColumn.ascending = true
    }

    const sortModifier = (sortColumn.ascending) ? 1 : -1;
    let sort = (a, b) =>
      (a[column] < b[column])
        ? -1 * sortModifier
        : (a[column] > b[column])
          ? sortModifier
          : 0;
    states = states.sort(sort);
  }
</script>

<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
  <div>
    <label for="income"
           class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      Personal Income
    </label>
    <input type="number"
           id="income"
           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="100000"
           value={personalIncome}
           on:input={e => updatePersonalIncomeTaxRates(e.target.value)}
           required>
  </div>
  <div>
    <label for="corporate"
           class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      Corporate Income
    </label>
    <input type="number"
           id="corporate"
           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="100000"
           value={corporateIncome}
           on:input={e => updateCorporateTaxRates(e.target.value)}
           required>
  </div>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" class="p-4">
        <div class="flex items-center">
          <input id="checkbox-all-search"
                 type="checkbox"
                 class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
          <label for="checkbox-all-search" class="sr-only">checkbox</label>
        </div>
      </th>
      <th scope="col" class="cursor-pointer py-3 px-6" on:click={() => sortBy("name")}>
        State
      </th>
      <th scope="col" class="cursor-pointer	py-3 px-6" on:click={() => sortBy("population")}>
        Population
      </th>
      <th scope="col" class="cursor-pointer	py-3 px-6" on:click={() => sortBy("personalIncomeTax")}>
        Income Tax
      </th>
      <th scope="col" class="cursor-pointer	py-3 px-6" on:click={() => sortBy("realEstateTax")}>
        Real Estate Tax
      </th>
      <th scope="col" class="cursor-pointer	py-3 px-6" on:click={() => sortBy("salesTax")}>
        Sales Tax
      </th>
      <th scope="col" class="cursor-pointer	py-3 px-6" on:click={() => sortBy("corporateTax")}>
        Corporate Tax
      </th>
      <th scope="col" class="cursor-pointer	py-3 px-6" on:click={() => sortBy("costOfLivingIndex")}>
        Cost of Living Index
      </th>
      <th scope="col" class="cursor-pointer	py-3 px-6" on:click={() => sortBy("violentCrimeRate")}>
        Violent Crime Rate
      </th>
    </tr>
    </thead>
    <tbody>
      {#each states as state}
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="p-4 w-4">
            <div class="flex items-center">
              <input type="checkbox"
                     checked={selectedStates[state.id]}
                     on:click={() => toggleState(state.id)}
                     class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label class="sr-only">checkbox</label>
            </div>
          </td>
          <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {state.name}
          </th>
          <td class="py-4 px-6">
            {state.population.toLocaleString()}
          </td>
          <td class="py-4 px-6">
            {formatPercent(state.personalIncomeTax)}
          </td>
          <td class="py-4 px-6">
            {formatPercent(state.realEstateTax)}
          </td>
          <td class="py-4 px-6">
            {formatPercent(state.salesTax)}
          </td>
          <td class="py-4 px-6">
            {formatPercent(state.corporateTax)}
          </td>
          <td class="py-4 px-6">
            {state.costOfLivingIndex}
          </td>
          <td class="py-4 px-6">
            {state.violentCrimeRate}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

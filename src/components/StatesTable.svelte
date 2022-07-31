<script lang="ts">
  import { formatPercent } from "../utils/numbers";
  import { State } from "../types/state";
  import json from "../data/states.json";
  const states = json as State[];
</script>

<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" class="p-4">
        <div class="flex items-center">
          <input id="checkbox-all-search" type="checkbox"
                 class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
          <label for="checkbox-all-search" class="sr-only">checkbox</label>
        </div>
      </th>
      <th scope="col" class="py-3 px-6">
        State
      </th>
      <th scope="col" class="py-3 px-6">
        Population
      </th>
      <th scope="col" class="py-3 px-6">
        Income Tax
      </th>
      <th scope="col" class="py-3 px-6">
        Real Estate Tax
      </th>
      <th scope="col" class="py-3 px-6">
        Sales Tax
      </th>
      <th scope="col" class="py-3 px-6">
        Corporate Tax
      </th>
      <th scope="col" class="py-3 px-6">
        Cost of Living Index
      </th>
      <th scope="col" class="py-3 px-6">
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
            {formatPercent(state.realEstateTax)}
          </td>
          <td class="py-4 px-6">
            {formatPercent(state.realEstateTax)}
          </td>
          <td class="py-4 px-6">
            {formatPercent(state.salesTax)}
          </td>
          <td class="py-4 px-6">
            {formatPercent(state.salesTax)}
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

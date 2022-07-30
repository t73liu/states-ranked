<script lang="ts">
  import { formatPercent } from "../utils/numbers";
  import { State } from "../types/state";
  import json from "../data/states.json";
  const states = json as State[];
</script>

<div class="overflow-x-auto relative">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" class="py-3 px-6">
        State
      </th>
      <th scope="col" class="py-3 px-6">
        Population
      </th>
      <th scope="col" class="py-3 px-6">
        Real Estate Tax
      </th>
      <th scope="col" class="py-3 px-6">
        Sales Tax
      </th>
    </tr>
    </thead>
    <tbody>
      {#each states as state}
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {state.name}
          </th>
          <td class="py-4 px-6">
            {state.population.toLocaleString()}
          </td>
          <td class="py-4 px-6">
            {formatPercent(state.realEstateTax)}
          </td>
          <td class="py-4 px-6">
            {formatPercent(state.salesTax)}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

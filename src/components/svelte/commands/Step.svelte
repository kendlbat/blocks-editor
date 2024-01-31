<script lang="ts">
    import stepdelay from "@lib/stores/stepdelay";

    let stepdelaybridge = 100;

    $: stepdelay.set(stepdelaybridge);
</script>

<span class="flex flex-row flex-nowrap gap-1">
    <input
        class="w-14 rounded text-center text-xs dark:bg-gray-700 dark:text-white"
        type="text"
        name="stepdelay"
        id="stepdelay-input"
        maxlength="4"
        pattern="[0-9]+"
        inputmode="numeric"
        title="Step delay (ms)"
        bind:value={stepdelaybridge}
    />
</span>

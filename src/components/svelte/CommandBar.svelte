<script lang="ts">
    import Run from "./commands/Run.svelte";
    import Step from "./commands/Step.svelte";
    import Stop from "./commands/Stop.svelte";
    import Export from "./commands/Export.svelte";
</script>

<div class="flex flex-row flex-wrap gap-1 print:hidden">
    <Run />
    <Step />
    <Stop />
    <Export />
</div>

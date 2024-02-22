<script lang="ts">
    import { Button, Tooltip } from "flowbite-svelte";
    import { PlaySolid } from "flowbite-svelte-icons";
    import { run, runningListener } from "@lib/scripts/runner";
</script>

<Button on:click={run} disabled={$runningListener}>
    <PlaySolid class="h-3 w-3"></PlaySolid>
</Button>
<Tooltip>Run</Tooltip>

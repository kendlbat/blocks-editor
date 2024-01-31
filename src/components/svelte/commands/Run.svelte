<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { PlaySolid } from "flowbite-svelte-icons";
    import { run, runningListener } from "@lib/scripts/runner";

    let running: boolean = false;

    runningListener.subscribe((value) => {
        running = value;
    });
</script>

<Button on:click={run} disabled={running}>
    <PlaySolid class="h-3 w-3"></PlaySolid>
</Button>

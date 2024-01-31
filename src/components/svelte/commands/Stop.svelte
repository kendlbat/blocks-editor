<script lang="ts">
    import { Button, Tooltip } from "flowbite-svelte";
    import { CloseSolid } from "flowbite-svelte-icons";
    import { stop, runningListener } from "@lib/scripts/runner";

    let running: boolean = false;

    runningListener.subscribe((value) => {
        running = value;
    });
</script>

<Button on:click={stop} disabled={!running}>
    <CloseSolid class="h-3 w-3" />
</Button>
<Tooltip>Stop</Tooltip>

<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { PlaySolid } from "flowbite-svelte-icons";
    import { run } from "@lib/scripts/runner";
</script>

<Button on:click={run}>
    <PlaySolid class="h-3 w-3"></PlaySolid>
</Button>

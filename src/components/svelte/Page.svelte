<script lang="ts">
    import ControlBar from "./ControlBar.svelte";
    import CommandBar from "./CommandBar.svelte";
    import Program from "./Program.svelte";
    import mainprogram from "@lib/stores/mainprogram";
</script>

<div class="space-y-2 p-2">
    <ControlBar></ControlBar>
    <CommandBar></CommandBar>

    <Program bind:p={$mainprogram}></Program>
</div>

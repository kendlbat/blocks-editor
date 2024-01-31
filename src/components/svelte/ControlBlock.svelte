<script lang="ts">
    /*
    Create control block:

    [SLOT] -> For dropping other control blocks
    
    */
    import { Tooltip } from "flowbite-svelte";

    export let id: string;
    export let name: string = id;
    export let tooltip: string | undefined = undefined;

    function createControlClick() {
        return;
    }
</script>

<div
    class="inline-block cursor-move rounded-lg bg-primary-600 p-2 px-3 text-white"
    draggable="true"
    role="button"
    tabindex="0"
    on:dragstart={(e) => {
        e.dataTransfer?.setData(
            "application/json",
            JSON.stringify({
                type: "control",
                id,
            }),
        );
    }}
    on:click={createControlClick}
    on:keypress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
            createControlClick();
        }
    }}
>
    <span>{name}</span>
</div>
{#if tooltip !== undefined}
    <Tooltip>{tooltip}</Tooltip>
{/if}

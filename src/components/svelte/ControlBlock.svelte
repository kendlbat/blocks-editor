<script lang="ts">
    /*
    Create control block:

    [SLOT] -> For dropping other control blocks
    
    */

    import { createEventDispatcher } from "svelte";
    import { Button } from "flowbite-svelte";

    export let id: string;
    export let name: string = id;

    const dispatch = createEventDispatcher();
</script>

<div
    class="inline-block cursor-move rounded-lg bg-primary-600 p-2 px-3 text-white"
    draggable="true"
    role="none"
    on:dragstart={(e) => {
        e.dataTransfer?.setData(
            "application/json",
            JSON.stringify({
                type: "control",
                id,
            }),
        );
    }}
>
    {name}
</div>

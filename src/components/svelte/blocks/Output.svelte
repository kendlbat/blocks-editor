<script lang="ts">
    import Block from "../Block.svelte";
    import { Select } from "flowbite-svelte";
    import declared from "@lib/stores/declared";

    let selectable: Array<{ name: string; value: string }> = [];

    export let name = "";

    declared.subscribe((d) => {
        selectable = Object.values(d).map((v) => ({
            value: v.name,
            name: v.name,
        }));
    });
</script>

<Block id="output">
    <pre class="inst">
        {`alert(JSON.stringify(vars["${name}"]));`}
    </pre>
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="inline-block w-20 pt-2">OUTPUT</span>
        <Select
            items={selectable}
            placeholder=""
            underline
            class="inline-block w-40"
            size="sm"
            bind:value={name}
        ></Select>
    </div>
</Block>

<svelte:options accessors />

<script lang="ts">
    import Block from "../Block.svelte";
    import { Select } from "flowbite-svelte";
    import declared from "@lib/stores/declared";

    let selectable: Array<{ name: string; value: string }> = [];

    export let p: {
        name: string;
    } = {
        name: "",
    };

    let namebridge = p.name;

    $: p = { name: namebridge };

    declared.subscribe((d) => {
        selectable = [];
        d.forEach((v) => {
            selectable.push({
                value: v,
                name: v,
            });
        });
    });
</script>

<Block id="output" bind:p>
    <input
        type="hidden"
        class="inst"
        value={`// OUTPUT\nalert("Value of variable '${namebridge}': " + JSON.stringify(${namebridge}) + "\\nType: '" + typeof(${namebridge}) + "'");`}
    />
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="inline-block w-20 pt-2">OUTPUT</span>
        <Select
            items={selectable}
            placeholder=""
            underline
            class="inline-block w-40"
            size="sm"
            bind:value={namebridge}
        ></Select>
    </div>
</Block>

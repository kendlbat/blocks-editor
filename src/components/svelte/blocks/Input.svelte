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

    $: p = {
        name: namebridge,
    };

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

<Block id="input" bind:p>
    <input
        type="hidden"
        class="inst"
        value={`// INPUT\n${namebridge} = prompt("Enter value for variable ${namebridge}:"); `}
    />
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="inline-block w-20 pt-2">INPUT</span>
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

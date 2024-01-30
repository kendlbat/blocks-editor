<svelte:options accessors />

<script lang="ts">
    import Block from "../Block.svelte";
    import { Input } from "flowbite-svelte";
    import declared from "@lib/stores/declared";
    import { PlusSolid, TrashBinOutline } from "flowbite-svelte-icons";
    import Program from "../Program.svelte";

    export let p: {
        condition: string;
        program: Array<any>;
    } = {
        condition: "",
        program: [],
    };

    let selectable: Array<{ name: string; value: string }> = [];

    declared.subscribe((d) => {
        selectable = [];
        d.forEach((v) => {
            selectable.push({
                value: v,
                name: v,
            });
        });
    });

    let conditionbridge = p.condition;
    let programbridge = p.program;

    $: p = {
        condition: conditionbridge,
        program: programbridge,
    };
</script>

<Block id="while" heightClass="min-h-1" bind:p>
    <input
        type="hidden"
        class="inst"
        value={`// WHILE\nwhile (${conditionbridge.replace("`", "")}) {`}
    />
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">WHILE</span>
        <Input
            size="sm"
            class="w-40"
            bind:value={conditionbridge}
            placeholder="Condition"
        />
    </div>
    <div class="ml-10 mt-2 rounded bg-white bg-opacity-5">
        <Program subroutine={true} bind:p={programbridge}></Program>
    </div>
    <input type="hidden" class="inst" value={`}`} />
</Block>

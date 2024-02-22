<svelte:options accessors />

<script lang="ts">
    import Block from "../Block.svelte";
    import { Input } from "flowbite-svelte";
    import Program from "../Program.svelte";
    import { updateAllP } from "@lib/util";
    export let destroy: () => void;
    export const id: string = "while";
    export let p: {
        condition: string;
        program: Array<any>;
    } = {
        condition: "",
        program: [],
    };

    let conditionbridge = p.condition;
    let programbridge = p.program;

    $: p = {
        condition: conditionbridge,
        program: programbridge,
    };
</script>

<Block id="while" heightClass="min-h-1" bind:p {destroy}>
    <input
        type="hidden"
        class="inst"
        value={`// WHILE
__step();
while (${conditionbridge.replace("`", "")}) {`}
    />
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">WHILE</span>
        <Input
            size="sm"
            class="w-40"
            bind:value={conditionbridge}
            placeholder="Condition"
            on:change={() => setTimeout(updateAllP, 10)}
        />
    </div>
    <div class="ml-10 mt-2 rounded bg-white bg-opacity-5">
        <Program subroutine={true} bind:p={programbridge}></Program>
    </div>
    <input type="hidden" class="inst" value={`}`} />
</Block>

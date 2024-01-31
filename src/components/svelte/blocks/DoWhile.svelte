<svelte:options accessors />

<script lang="ts">
    import Block from "../Block.svelte";
    import { Input } from "flowbite-svelte";
    import Program from "../Program.svelte";
    export let destroy: () => void;
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

<Block id="dowhile" heightClass="min-h-1" bind:p {destroy}>
    <input
        type="hidden"
        class="inst"
        value={`// DO..WHILE
__step();
do {`}
    />
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">DO</span>
        <div class="ml-3 mt-2 w-full rounded bg-white bg-opacity-5">
            <Program subroutine={true} bind:p={programbridge}></Program>
        </div>
    </div>
    <div class="mt-2 flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">WHILE</span>
        <Input
            size="sm"
            class="w-40"
            bind:value={conditionbridge}
            placeholder="Condition"
        />
    </div>
    <input
        type="hidden"
        class="inst"
        value={`} while (${conditionbridge.replace("`", "")});`}
    />
</Block>

<svelte:options accessors />

<script lang="ts">
    import Block from "../Block.svelte";
    import { Input, Select } from "flowbite-svelte";
    import Program from "../Program.svelte";
    export let destroy: () => void;
    export const id: string = "for";
    export let p: {
        variable: string;
        initial: any;
        increment: any;
        end: any;
        program: Array<any>;
    } = {
        variable: "",
        initial: 0,
        increment: 1,
        program: [],
        end: "",
    };

    let selectable: Array<{ name: string; value: string }> = [];
    let declared = new Set<string>();

    const updateDecl = () => {
        let el: NodeListOf<HTMLInputElement> =
            document.querySelectorAll("input.decl");
        declared.clear();
        el.forEach((e) => {
            declared.add(e.value);
        });
        selectable = [];
        declared.forEach((v) => {
            selectable.push({
                value: v,
                name: v,
            });
        });
    };

    document.addEventListener("declupdate", updateDecl);
    updateDecl();

    let variablebridge = p.variable;
    let initialbridge = p.initial;
    let incrementbridge = p.increment;
    let endbridge = p.end;
    let programbridge = p.program;

    $: p = {
        variable: variablebridge,
        initial: initialbridge,
        increment: incrementbridge,
        end: endbridge,
        program: programbridge,
    };
</script>

<Block id="while" heightClass="min-h-1" bind:p {destroy}>
    <input
        type="hidden"
        class="inst"
        value={`// FOR
__step();
for (let ${variablebridge} = ${initialbridge}; ${variablebridge} ${incrementbridge > 0 ? "<" : ">"} ${endbridge}; ${variablebridge} += ${incrementbridge}) {`}
    />
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">FOR</span>
        <Select
            items={selectable}
            placeholder=""
            underline
            class="inline-block w-20"
            size="sm"
            bind:value={variablebridge}
        ></Select>
        <span class="pt-2">=</span>
        <Input
            size="sm"
            class="w-16 text-center"
            bind:value={initialbridge}
            placeholder="Start"
        />
        <span class="pt-2"
            >; {variablebridge.trim() != "" ? variablebridge : "?"}
            {incrementbridge > 0 ? "<" : ">"}</span
        >
        <Input
            size="sm"
            class={`w-16 text-center`}
            color={endbridge.trim() == "" ? "red" : "base"}
            bind:value={endbridge}
            placeholder="End"
        />
        <span class="pt-2"
            >; {variablebridge.trim() != "" ? variablebridge : "?"} +=
        </span>
        <Input
            size="sm"
            class="w-16 text-center"
            bind:value={incrementbridge}
            placeholder="Increment"
        />
    </div>
    <div class="ml-10 mt-2 rounded bg-white bg-opacity-5">
        <Program subroutine={true} bind:p={programbridge}></Program>
    </div>
    <input type="hidden" class="inst" value={`}`} />
</Block>

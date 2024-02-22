<svelte:options accessors />

<script lang="ts">
    import { updateAllP } from "@lib/util";
    import Block from "../Block.svelte";
    import { Select } from "flowbite-svelte";
    export let destroy: () => void;
    export const id: string = "input";

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
</script>

<Block id="input" bind:p {destroy}>
    <input
        type="hidden"
        class="inst"
        value={`// INPUT
__step();
${namebridge} = prompt("Enter value for variable ${namebridge}:"); `}
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
            on:change={async () => setTimeout(updateAllP, 1)}
        ></Select>
    </div>
</Block>

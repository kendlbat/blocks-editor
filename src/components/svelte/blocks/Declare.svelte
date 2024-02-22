<svelte:options accessors />

<script lang="ts">
    import { updateAllP } from "@lib/util";
    import Block from "../Block.svelte";
    import { Input } from "flowbite-svelte";
    export let destroy: () => void;
    export const id: string = "declare";
    export let p: {
        name: string;
        tval: any;
    } = {
        name: "",
        tval: "",
    };

    let namebridge = p.name;
    let tvalbridge = p.tval;

    let declarationinp: HTMLInputElement;

    $: namebridge &&
        (() => {
            if (!declarationinp) return;
            declarationinp.value = namebridge;
            document.dispatchEvent(new CustomEvent("declupdate"));
        })();

    $: p = {
        name: namebridge,
        tval: tvalbridge,
    };
</script>

<Block id="declare" bind:p {destroy}>
    <input
        bind:this={declarationinp}
        type="hidden"
        class="decl"
        value={namebridge}
    />
    <input
        type="hidden"
        class="inst"
        value={`// DECLARE
__step();
let ${namebridge} = ${tvalbridge.trim() == "" ? "undefined" : tvalbridge};`}
    />
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">DECLARE</span>
        <Input
            size="sm"
            class="w-40"
            on:input={function () {
                // @ts-ignore
                namebridge = this.value;
            }}
            bind:value={namebridge}
            on:change={() => setTimeout(updateAllP, 10)}
            color={namebridge.trim() == "" ? "red" : "base"}
            placeholder="Variable Name"
        />
        <Input
            size="sm"
            class="w-40"
            on:input={function () {
                // @ts-ignore
                tvalbridge = this.value;
            }}
            bind:value={tvalbridge}
            on:change={() => setTimeout(updateAllP, 10)}
            placeholder="Initial Value"
        />
    </div>
</Block>

<svelte:options accessors />

<script lang="ts">
    import { updateAllP } from "@lib/util";
    import Block from "../Block.svelte";
    import { Select, Input, Tooltip } from "flowbite-svelte";
    import { BullhornOutline } from "flowbite-svelte-icons";
    export let destroy: () => void;
    let selectable: Array<{ name: string; value: string }> = [];

    export const id: string = "output";
    export let p: {
        name: string;
        advanced: boolean;
    } = {
        name: "",
        advanced: false,
    };

    let namebridge = p.name;
    let advancedbridge = p.advanced;

    $: p = {
        name: namebridge,
        advanced: advancedbridge,
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

    let jsval: string = "// OUTPUT PROTO";

    $: jsval = advancedbridge
        ? `// OUTPUT
__step();
alert(${namebridge});`
        : `// OUTPUT
__step();
alert("Value of variable '${namebridge}': " + JSON.stringify(${namebridge}) + "\\nType: '" + typeof(${namebridge}) + "'");`;

    advancedbridge = advancedbridge;

    document.addEventListener("declupdate", updateDecl);
    updateDecl();
</script>

<Block id="output" bind:p {destroy}>
    <input type="hidden" class="inst" value={jsval} />
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="inline-block w-20 pt-2">OUTPUT</span>
        {#if !advancedbridge}
            <Select
                items={selectable}
                placeholder=""
                underline
                class="ml-2 inline-block w-[calc(100%-2rem)]"
                size="sm"
                bind:value={namebridge}
                on:change={async () => setTimeout(updateAllP, 1)}
            />
            <span class="w-full"></span>
        {:else}
            <Input
                size="md"
                class="ml-2 w-full"
                bind:value={namebridge}
                on:change={async () => setTimeout(updateAllP, 1)}
                placeholder="Expression"
            />
        {/if}
        <button
            class="px-2 hover:text-primary-600 focus:text-primary-600"
            on:click={() => {
                advancedbridge = !advancedbridge;
            }}
        >
            <BullhornOutline
                class={"h-5 w-5 opacity-0 group-hover:opacity-70" +
                    (advancedbridge ? " -mt-[2px]" : " mt-[2px]")}
            />
            <Tooltip class="opacity-100">Toggle advanced mode</Tooltip>
        </button>
    </div>
</Block>

<svelte:options accessors />

<script lang="ts">
    import Block from "../Block.svelte";
    import { Select, Input } from "flowbite-svelte";
    import declared from "@lib/stores/declared";

    export let p: {
        name: string;
        tval: any;
    } = {
        name: "v1",
        tval: 0,
    };

    let oldname = p.name;

    declared.update((d) => {
        if (d.has(p.name)) return d;
        d = d.add(p.name);
        return d;
    });

    let namebridge = p.name;
    let tvalbridge = p.tval;

    $: p = {
        name: namebridge,
        tval: tvalbridge,
    };

    $: declared.update((d) => {
        if (oldname == p.name) return d;
        d.delete(oldname);
        d = d.add(p.name);
        oldname = p.name;
        return d;
    });
</script>

<Block id="declare" bind:p>
    <pre class="inst">
        {`let ${namebridge} = ${tvalbridge};`}
    </pre>
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">DECLARE</span>
        <Input
            size="sm"
            class="w-40"
            bind:value={namebridge}
            placeholder="Variable Name"
        />
        <Input
            size="sm"
            class="w-40"
            bind:value={tvalbridge}
            placeholder="Initial Value"
        />
    </div>
</Block>

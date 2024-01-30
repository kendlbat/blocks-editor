<script lang="ts">
    import Block from "../Block.svelte";
    import { Select, Input } from "flowbite-svelte";
    import declared from "@lib/stores/declared";

    let selectable: Array<{ name: string; value: string }> = [];

    export let p: {
        name: string;
        action: string;
    } = {
        name: "",
        action: "",
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

<Block id="assign" bind:p>
    <pre class="inst">
        {`${p.name} = ${p.action.replace(/\`/g, "")}`}
    </pre>
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">ASSIGN</span>
        <Select
            items={selectable}
            placeholder=""
            underline
            class="inline-block w-40"
            size="sm"
            bind:value={p.name}
        ></Select>
        <Input
            size="sm"
            class="w-40"
            bind:value={p.action}
            placeholder="Value"
        />
    </div>
</Block>

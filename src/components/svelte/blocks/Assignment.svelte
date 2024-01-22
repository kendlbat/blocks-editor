<script lang="ts">
    import Block from "../Block.svelte";
    import { Select, Input } from "flowbite-svelte";
    import declared from "@lib/stores/declared";

    let selectable: Array<{ name: string; value: string }> = [];

    export let name = "";
    export let action = "";

    declared.subscribe((d) => {
        selectable = Object.values(d).map((v) => ({
            value: v.name,
            name: v.name,
        }));
    });
</script>

<Block id="assign">
    <pre class="inst">
        {`vars["${name}"] = {"type": vars["${name}"].type, "value": eval(\`${JSON.stringify(action.replace(/\`/g, ""))}\`)} ;`}
    </pre>
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">ASSIGN</span>
        <Select
            items={selectable}
            placeholder=""
            underline
            class="inline-block w-20"
            size="sm"
            bind:value={name}
        ></Select>
        <Input size="sm" class="w-40" bind:value={action} placeholder="Value" />
    </div>
</Block>

<script lang="ts">
    import Block from "../Block.svelte";
    import { Select, Input } from "flowbite-svelte";
    import declared from "@lib/stores/declared";

    export let name: string = "var";
    export let type: string = "number";

    let tval: any;

    let id = crypto.randomUUID();

    $: tval = {
        number: 0,
        string: '""',
        boolean: false,
    }[type];

    $: declared.update((d) => {
        d[id] = {
            type: type,
            name: name,
        };
        return d;
    });
</script>

<Block id="declare">
    <pre class="inst">
        {`vars["${name}"] = {"type": "${type}", "value": ${tval} };`}
    </pre>
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">DECLARE</span>
        <Select
            size="sm"
            class="inline-block w-20 cursor-pointer pl-2"
            placeholder=""
            underline
            bind:value={type}
            items={[
                {
                    value: "number",
                    name: "number",
                },
                {
                    value: "string",
                    name: "string",
                },
                {
                    value: "boolean",
                    name: "boolean",
                },
            ]}
        />
        <Input
            size="sm"
            class="w-40"
            bind:value={name}
            placeholder="Variable Name"
        />
    </div>
</Block>

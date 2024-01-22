<script lang="ts">
    import Block from "../Block.svelte";
    import { Input } from "flowbite-svelte";
    import declared from "@lib/stores/declared";
    import { PlusSolid, TrashBinOutline } from "flowbite-svelte-icons";

    let selectable: Array<{ name: string; value: string }> = [];

    let condition: string = "";

    let elifs: Array<{
        condition: string;
        blocks: Array<{
            id: string;
            custom: Record<string, any>;
        }>;
    }> = [];

    declared.subscribe((d) => {
        selectable = Object.values(d).map((v) => ({
            value: v.name,
            name: v.name,
        }));
    });
</script>

<Block id="if" heightClass="min-h-28">
    <pre class="inst">
        {`if (eval(\`${condition.replace("`", "")}\`)) {`}
    </pre>
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">IF</span>
        <Input
            size="sm"
            class="w-40"
            bind:value={condition}
            placeholder="Condition"
        />
        <span class="mt-3"
            ><PlusSolid
                class="ml-1.5 mr-2 h-5 w-5 cursor-pointer opacity-70 hover:text-primary-600"
                on:click={() => {
                    elifs.push({
                        condition: "",
                        blocks: [],
                    });
                    elifs = elifs;
                }}
            ></PlusSolid></span
        >
    </div>
    <pre class="inst">
        {`}`}
    </pre>
    {#each elifs as elif}
        <div>
            <pre class="inst">
                {`else if (eval(\`${elif.condition.replace("`", "")}\`)) {`}
            </pre>
            <div class="mt-2 flex flex-row flex-nowrap gap-2">
                <span class="w-20 pt-2">ELIF</span>
                <Input
                    size="sm"
                    class="w-40"
                    bind:value={elif.condition}
                    placeholder="Condition"
                />
                <TrashBinOutline
                    class="ml-1.5 mr-2 mt-3 h-5 w-5 cursor-pointer opacity-70 hover:text-red-500"
                    on:click={function (e) {
                        e.stopPropagation();
                        // @ts-ignore
                        e.target?.parentElement.parentElement.remove();
                    }}
                />
            </div>
            <pre class="inst">
                {`}`}
            </pre>
        </div>
    {/each}
    <pre class="inst">
        {`else {`}
    </pre>
    <div class="mb-2 mt-2 flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">ELSE</span>
        <Input
            size="sm"
            class="w-40"
            bind:value={condition}
            placeholder="Condition"
        />
    </div>
    <pre class="inst">
        {`}`}
    </pre>
</Block>

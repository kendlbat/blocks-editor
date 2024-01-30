<script lang="ts">
    import Block from "../Block.svelte";
    import { Input } from "flowbite-svelte";
    import declared from "@lib/stores/declared";
    import { PlusSolid, TrashBinOutline } from "flowbite-svelte-icons";
    import Program from "../Program.svelte";

    export let p: {
        condition: string;
        program: Array<any>;
        elifs: Array<{
            condition: string;
            program: Array<any>;
        }>;
        else: Array<any>;
    } = {
        condition: "",
        program: [],
        elifs: [],
        else: [],
    };

    let selectable: Array<{ name: string; value: string }> = [];

    $: console.log(p);

    declared.subscribe((d) => {
        selectable = [];
        d.forEach((v) => {
            selectable.push({
                value: v,
                name: v,
            });
        });
    });

    let conditionbridge = p.condition;
    let programbridge = p.program;
    let elifbridge = p.elifs;
    let elsebridge = p.else;
    $: p.condition = conditionbridge;
    $: p.program = programbridge;
    $: p.elifs = elifbridge;
    $: p.else = elsebridge;
</script>

<Block id="if" heightClass="min-h-1" bind:p>
    <pre class="inst">
        {`if (${conditionbridge.replace("`", "")}) {`}
    </pre>
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">IF</span>
        <Input
            size="sm"
            class="w-40"
            bind:value={conditionbridge}
            placeholder="Condition"
        />
        <span class="mt-2"
            ><PlusSolid
                class="ml-1.5 mr-2 h-5 w-5 cursor-pointer opacity-70 hover:text-primary-600"
                on:click={() => {
                    elifbridge.push({
                        condition: "",
                        program: [],
                    });
                    elifbridge = elifbridge;
                }}
            ></PlusSolid></span
        >
    </div>
    <div class="ml-10 mt-2 rounded bg-white bg-opacity-5">
        <Program subroutine={true} bind:p={programbridge}></Program>
    </div>
    <pre class="inst">
        {`}`}
    </pre>
    {#each elifbridge as elif, idx}
        <div>
            <pre class="inst">
                {`else if (${elif.condition.replace("`", "")}) {`}
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
                    class="ml-1.5 mr-2 mt-2 h-5 w-5 cursor-pointer opacity-70 hover:text-red-500"
                    on:click={function (e) {
                        e.stopPropagation();
                        // @ts-ignore
                        this.parentElement.parentElement.remove();
                    }}
                />
            </div>
            <div class="ml-10 mt-2 rounded bg-white bg-opacity-5">
                <Program subroutine={true} bind:p={elifbridge[idx]["program"]}
                ></Program>
            </div>
            <pre class="inst">
                {`}`}
            </pre>
        </div>
    {/each}
    <pre class="inst">
        {`else {`}
    </pre>
    <div class="mt-2 flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">ELSE</span>
    </div>
    <div class="mb-2 ml-10 mt-2 rounded bg-white bg-opacity-5">
        <Program subroutine={true} bind:p={elsebridge}></Program>
    </div>
    <pre class="inst">
        {`}`}
    </pre>
</Block>

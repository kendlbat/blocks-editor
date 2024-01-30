<script lang="ts">
    import Block from "../Block.svelte";
    import { Input } from "flowbite-svelte";
    import declared from "@lib/stores/declared";
    import { PlusSolid, TrashBinOutline } from "flowbite-svelte-icons";
    import Program from "../Program.svelte";

    export let p: {
        condition: string;
        cases: Array<{
            condition: string;
            program: Array<any>;
        }>;
        default: Array<any>;
    } = {
        condition: "",
        cases: [],
        default: [],
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
    let casebridge = p.cases;
    let defaultbridge = p.default;
    $: p.condition = conditionbridge;
    $: p.cases = casebridge;
    $: p.default = defaultbridge;
</script>

<Block id="switch" heightClass="min-h-1" bind:p>
    <pre class="inst">
        {`switch (${conditionbridge.replace("`", "")}) {`}
    </pre>
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">SWITCH</span>
        <Input
            size="sm"
            class="w-40"
            bind:value={conditionbridge}
            placeholder="Condition"
        />
        <span
            class="mt-2"
            role="none"
            on:keydown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    casebridge.push({
                        condition: "",
                        program: [],
                    });
                    casebridge = casebridge;
                }
            }}
            ><PlusSolid
                class="ml-1.5 mr-2 h-5 w-5 cursor-pointer opacity-70 hover:text-primary-600 focus:text-primary-600"
                role="button"
                tabindex="0"
                on:click={() => {
                    casebridge.push({
                        condition: "",
                        program: [],
                    });
                    casebridge = casebridge;
                }}
            ></PlusSolid></span
        >
    </div>

    {#each casebridge as scase, idx}
        <div>
            <pre class="inst">
                {`case (${scase.condition.replace("`", "")}): {`}
            </pre>
            <div class="mt-2 flex flex-row flex-nowrap gap-2">
                <span class="w-20 pt-2">CASE</span>
                <Input
                    size="sm"
                    class="w-40"
                    bind:value={scase.condition}
                    placeholder="Value"
                />
                <TrashBinOutline
                    class="ml-1.5 mr-2 mt-2 h-5 w-5 cursor-pointer opacity-70 hover:text-red-500 focus:text-red-500"
                    role="button"
                    tabindex="0"
                    on:click={function (e) {
                        e.stopPropagation();
                        // @ts-ignore
                        this.parentElement.parentElement.remove();
                    }}
                    on:keydown={function (e) {
                        e.stopPropagation();
                        if (e.key === "Enter" || e.key === " ") {
                            // @ts-ignore
                            this.parentElement.parentElement.remove();
                        }
                    }}
                />
            </div>
            <div class="ml-10 mt-2 rounded bg-white bg-opacity-5">
                <Program subroutine={true} bind:p={casebridge[idx]["program"]}
                ></Program>
            </div>
            <pre class="inst">
                {`break;}`}
            </pre>
        </div>
    {/each}
    <pre class="inst">
        {`default: {`}
    </pre>
    <div class="mt-2 flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">DEFAULT</span>
    </div>
    <div class="mb-2 ml-10 mt-2 rounded bg-white bg-opacity-5">
        <Program subroutine={true} bind:p={defaultbridge}></Program>
    </div>
    <pre class="inst">
        {`}}`}
    </pre>
</Block>

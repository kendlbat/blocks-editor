<svelte:options accessors />

<script lang="ts">
    import Block from "../Block.svelte";
    import { Input } from "flowbite-svelte";
    import { PlusSolid, TrashBinOutline } from "flowbite-svelte-icons";
    import Program from "../Program.svelte";
    import { updateAllP } from "@lib/util";
    export const id: string = "switch";
    export let destroy: () => void;
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

    let conditionbridge = p.condition;
    let casebridge = p.cases;
    let defaultbridge = p.default;
    $: p = {
        condition: conditionbridge,
        cases: casebridge,
        default: defaultbridge,
    };
</script>

<Block id="switch" heightClass="min-h-1" bind:p {destroy}>
    <input
        type="hidden"
        class="inst"
        value={`// SWITCH
__step();
switch (${conditionbridge.replace("`", "")}) {`}
    />
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">SWITCH</span>
        <Input
            size="sm"
            class="w-40"
            bind:value={conditionbridge}
            on:change={async () => setTimeout(updateAllP, 1)}
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
            <input
                type="hidden"
                class="inst"
                value={`case (${scase.condition.replace("`", "")}): {`}
            />
            <div class="mt-2 flex flex-row flex-nowrap gap-2">
                <span class="w-20 pt-2">CASE</span>
                <Input
                    size="sm"
                    class="w-40"
                    bind:value={scase.condition}
                    on:change={async () => setTimeout(updateAllP, 1)}
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
            <input type="hidden" class="inst" value={`break;}`} />
        </div>
    {/each}
    <input type="hidden" class="inst" value={`default: {`} />
    <div class="mt-2 flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">DEFAULT</span>
    </div>
    <div class="mb-2 ml-10 mt-2 rounded bg-white bg-opacity-5">
        <Program subroutine={true} bind:p={defaultbridge}></Program>
    </div>
    <input type="hidden" class="inst" value={`}}`} />
</Block>

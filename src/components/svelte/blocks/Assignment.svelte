<svelte:options accessors />

<script lang="ts">
    import Block from "../Block.svelte";
    import { Select, Input } from "flowbite-svelte";

    let selectable: Array<{ name: string; value: string }> = [];

    export const id: string = "assign";
    export let destroy: () => void;
    export let p:
        | {
              name: string;
              action: string;
          }
        | undefined;

    if (!p)
        p = {
            name: "",
            action: "",
        };

    let namebridge = p.name;
    let actionbridge = p.action;

    let declared: Set<string> = new Set();

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

    document.addEventListener("declupdate", updateDecl);
    updateDecl();

    $: p = {
        name: namebridge,
        action: actionbridge,
    };
</script>

<Block id="assign" bind:p {destroy}>
    <input
        type="hidden"
        class="inst"
        value={`// ASSIGN
__step();
${namebridge} = ${actionbridge.trim() == "" ? "undefined" : actionbridge};`}
    />
    <div class="flex flex-row flex-nowrap gap-2">
        <span class="w-20 pt-2">ASSIGN</span>
        <Select
            items={selectable}
            placeholder=""
            underline
            class="inline-block w-40"
            size="sm"
            on:change={function () {
                // @ts-ignore
                namebridge = this.value;
            }}
            bind:value={namebridge}
        ></Select>
        <Input
            size="sm"
            class="w-40"
            bind:value={actionbridge}
            placeholder="Value"
        />
    </div>
</Block>

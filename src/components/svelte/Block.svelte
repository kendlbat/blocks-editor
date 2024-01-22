<script lang="ts">
    import { Select } from "flowbite-svelte";
    import { TrashBinOutline } from "flowbite-svelte-icons";
    import { controls } from "@lib/scripts/controls";
    import programcontainer from "@lib/stores/programcontainer";

    export let id: string;
    let blockcont: Element;
    let programcont: Element | null = null;

    programcontainer.subscribe((p) => {
        programcont = p;
    });
</script>

<div
    bind:this={blockcont}
    class="group flex h-14 flex-row flex-nowrap border-t-primary-600 dark:text-white [&.dragover]:border-t-4"
    role="none"
    draggable="true"
    on:dragenter={(e) => {
        e.preventDefault();
        e.stopPropagation();

        blockcont.classList.add("dragover");
    }}
    on:dragleave={(e) => {
        e.preventDefault();
        e.stopPropagation();

        blockcont.classList.remove("dragover");
    }}
    on:dragover={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!blockcont.classList.contains("dragover")) {
            blockcont.classList.add("dragover");
        }
    }}
    on:drop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        blockcont.classList.remove("dragover");
        let data = e.dataTransfer?.getData("application/json");
        if (!data) return;

        const { type, id } = JSON.parse(data);

        if (type !== "control") return;

        if (!programcont) return;

        controls[id]({ target: programcont, anchor: blockcont });
    }}
    on:dragstart={(e) => {
        e.dataTransfer?.setData(
            "application/json",
            JSON.stringify({
                type: "control",
                id,
            }),
        );
    }}
    on:dragend={(e) => {
        e.preventDefault();
        e.stopPropagation();
        blockcont.remove();
    }}
>
    <span class="inline-block h-full w-full pl-2 pt-2">
        <slot />
    </span>
    <span class="my-auto opacity-0 group-hover:opacity-100">
        <TrashBinOutline
            class="ml-1.5 mr-2 h-5 w-5 cursor-pointer opacity-70 hover:text-red-500"
            on:click={(e) => {
                e.stopPropagation();
                blockcont.remove();
            }}
        />
    </span>
</div>

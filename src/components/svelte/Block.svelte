<script lang="ts">
    import { Select } from "flowbite-svelte";
    import { TrashBinOutline } from "flowbite-svelte-icons";
    import { controls } from "@lib/scripts/controls";
    import programcontainer from "@lib/stores/programcontainer";

    export let id: string;
    let blockcont: Element;
    let programcont: Element | null = null;

    export let p: any;

    programcontainer.subscribe((p) => {
        programcont = p;
    });

    export let heightClass = "h-14";
</script>

<div
    bind:this={blockcont}
    class={`${heightClass} group flex flex-row flex-nowrap border-t-primary-600 dark:text-white [&.dragover]:border-t-4`}
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

        const { type, id, p } = JSON.parse(data);

        if (type !== "control") return;

        if (!programcont) return;
        console.log(p);

        if (blockcont.parentElement) {
            let el = controls[id]({
                target: blockcont.parentElement,
                anchor: blockcont,
            });
            if (p) el.$set({ p });
        }
    }}
    on:dragstart={(e) => {
        e.dataTransfer?.setData(
            "application/json",
            JSON.stringify({
                type: "control",
                id,
                p,
            }),
        );
        console.log("dragstart", p);
    }}
    on:dragend={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (blockcont) blockcont.remove();
    }}
>
    <span class="inline-block h-full w-full pl-2 pt-2">
        <slot />
    </span>
    <span
        class="my-auto opacity-0 group-hover:opacity-100"
        role="none"
        on:keypress={(e) => {
            e.stopPropagation();
            if (e.key === "Enter" || e.key === " ") blockcont.remove();
        }}
    >
        <TrashBinOutline
            role="button"
            tabindex="0"
            on:click={(e) => {
                e.stopPropagation();
                blockcont.remove();
            }}
            class="ml-1.5 mr-2 h-5 w-5 cursor-pointer opacity-70 hover:text-red-500"
        />
    </span>
</div>

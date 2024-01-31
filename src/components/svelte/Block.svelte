<svelte:options accessors />

<script lang="ts">
    import { TrashBinOutline } from "flowbite-svelte-icons";
    export let destroy: () => void;

    export let id: string;
    let blockcont: HTMLDivElement;

    export let p: Record<string, any> | undefined;

    export let heightClass = "h-16";
</script>

<div
    bind:this={blockcont}
    class={`statementblock ${heightClass} group flex flex-row flex-nowrap border-t-primary-600 pb-[4px] dark:text-white [&.dragover]:border-t-4 [&:not(.dragover)]:pt-[4px]`}
    role="none"
    draggable="true"
    on:dragenter={(e) => {
        e.stopPropagation();

        blockcont.classList.add("dragover");
    }}
    on:dragleave={(e) => {
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
        blockcont?.classList.remove("dragover");
    }}
    on:dragstart={(e) => {
        e.stopPropagation();
        e.dataTransfer?.setData(
            "application/json",
            JSON.stringify({
                type: "control",
                id,
                p,
            }),
        );
    }}
    on:dragend={(e) => {
        e.stopPropagation();
        destroy();
    }}
>
    <span class="inline-block h-full w-full pl-2 pt-2">
        <slot />
    </span>
    <span
        class="my-auto opacity-0 group-focus-within:opacity-100 group-hover:opacity-100"
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

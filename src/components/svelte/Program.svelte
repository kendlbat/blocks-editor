<script lang="ts">
    // Holds the main program
    import { controls } from "@lib/scripts/controls";
    import programcontainer from "@lib/stores/programcontainer";

    let draggingOver = false;

    export let p: Array<{
        p: any;
        id: string;
    }> = [];

    // On update of p
    $: () => {
        if (!subroutine) programcontainer.set(container);

        container.innerHTML = "";

        p.forEach((b) => {
            let el = controls[b.id]({ target: container });
            el.$set({ p: b.p });
        });

        return () => {
            container.innerHTML = "";
        };
    };

    let container: Element;

    export let subroutine = false;

    $: if (!subroutine) programcontainer.set(container);

    $: console.log(draggingOver);
</script>

<div
    bind:this={container}
    class={`rounded border pb-4 [&>*]:border-b ${subroutine ? "h-full min-h-10 w-full" : "w-[600px]"}`}
    on:dragenter={(e) => {
        e.stopPropagation();
        draggingOver = true;
    }}
    on:dragleave={(e) => {
        e.stopPropagation();
        draggingOver = false;
    }}
    on:dragover={(e) => {
        e.stopPropagation();
        e.preventDefault();
    }}
    on:drop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        draggingOver = false;
        console.log("dropped");

        const data = e.dataTransfer?.getData("application/json");
        if (!data) return;

        const { type, id, p } = JSON.parse(data);
        if (type !== "control") return;

        console.log("Create control:", id);

        let el = controls[id]({ target: container });
        if (p) el.$set({ p });
        else el.$set({ p: {} });
    }}
    role="main"
    style:border-color={draggingOver ? "teal" : ""}
></div>

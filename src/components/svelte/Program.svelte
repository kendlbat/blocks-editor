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
    $: (() => {
        if (!subroutine) programcontainer.set(container);
        if (!container) return;

        p = p.filter((_) => _.p !== undefined);

        container.innerHTML = "";

        // console.log("Building program");

        p.forEach((b) => {
            let el = controls[b.id]({
                target: container,
                // @ts-ignore
                props: { p: b.p },
            });
        });
    })();

    let container: Element;

    export let subroutine = false;

    $: if (!subroutine) programcontainer.set(container);
</script>

<div
    bind:this={container}
    class={`resize-x rounded border pb-4 [&>*]:border-b ${subroutine ? "h-full min-h-10 w-full" : "w-[600px]"}`}
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

        const data = e.dataTransfer?.getData("application/json");
        if (!data) return;

        const { type, id, persistance } = JSON.parse(data);
        if (type !== "control") return;

        // console.log("Create control:", type, id, p);

        let el = controls[id]({
            target: container,
            // @ts-ignore
            props: persistance != undefined ? { p: persistance } : {},
        });

        p.push({
            id,
            p: el.p,
        });

        p = p;
    }}
    role="main"
    style:border-color={draggingOver ? "teal" : ""}
></div>

<script lang="ts">
    // Holds the main program
    import { controls } from "@lib/scripts/controls";
    import programcontainer from "@lib/stores/programcontainer";
    import type { SvelteComponent } from "svelte";

    let draggingOver = false;

    let runningid = 0;

    export let p: Array<{
        p: any;
        id: string;
        rid: number;
    }> = [];

    // On update of p
    $: p &&
        (() => {
            if (!subroutine) programcontainer.set(container);
            if (!container) return;

            p = p.filter((_) => _.p);

            container.innerHTML = "";
            if (p.length === 0) return;

            // console.log("Building program");
            console.table(p);

            elements = [];
            p.forEach((b) => {
                let el = controls[b.id]({
                    target: container,
                    // @ts-ignore
                    props: {
                        p: b.p,
                        destroy: () => {
                            elements = elements.filter((_) => _.rid !== b.rid);
                            updateP();
                        },
                    },
                });
                elements.push({ el, rid: b.rid });
            });
        })();

    let container: Element;

    export let subroutine = false;

    let elements: { el: SvelteComponent; rid: number }[] = [];

    $: if (!subroutine) programcontainer.set(container);

    function updateP() {
        // Filter elements with undefined p
        elements = elements.filter((e) => e.el.p);

        // Update p
        p = elements.map((e) => ({
            id: e.el.id,
            p: e.el.p,
            rid: e.rid,
        }));
    }

    // $: console.log(p);
</script>

<div
    bind:this={container}
    class={`resize-x rounded border pb-4 [&>*.statementblock.active]:border-[3px] [&>*.statementblock.active]:border-primary-600 [&>*]:border-b ${subroutine ? "h-full min-h-10 w-full" : "w-[600px]"}`}
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
    on:drop={function (e) {
        e.stopImmediatePropagation();
        draggingOver = false;

        const data = e.dataTransfer?.getData("application/json");
        if (!data) return updateP();

        const j = JSON.parse(data);
        if (j.type !== "control") return;

        let el;
        const rid = runningid++;

        function destroy() {
            console.log("Destroying", rid);
            elements = elements.filter((_) => _.rid !== rid);
            updateP();
        }

        let anchored = e.target == container;

        // console.log("Create control:", type, id, p);
        if (anchored) {
            el = controls[j.id]({
                target: container,
                // @ts-ignore
                props: j.p != undefined ? { p: j.p, destroy } : { destroy },
            });

            elements.push({ el, rid });
        } else {
            if (
                !(e.target instanceof Element) ||
                !(e.target instanceof HTMLElement)
            )
                return;

            let anc = null;
            anc = e.target;
            if (!anc.classList.contains("statementblock"))
                anc = e.target.closest(".statementblock");
            if (!anc) return;
            el = controls[j.id]({
                target: container,
                // @ts-ignore
                props: j.p != undefined ? { p: j.p, destroy } : { destroy },
                anchor: anc,
            });

            // Get how-manyth child is the anchor
            let idx = Array.from(container.children).indexOf(anc);
            if (idx === -1) {
                elements.push({ el, rid });
            } else {
                elements.splice(idx - 1, 0, { el, rid });
            }
        }
        elements = elements;
        updateP();
    }}
    role="main"
    style:border-color={draggingOver ? "teal" : ""}
></div>

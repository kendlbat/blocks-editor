<script lang="ts">
    // Holds the main program
    import { controls } from "@lib/scripts/controls";
    import programcontainer from "@lib/stores/programcontainer";

    let draggingOver = false;

    let runningid = 0;

    export let p: Array<{
        // For call-by-reference, wrapped
        r: {
            p: any;
            id: string;
            rid: number;
        };
    }> = [];

    // On update of p
    $: p &&
        (() => {
            if (!subroutine) programcontainer.set(container);
            if (!container) return;

            p = p.filter((_) => _.r.p);

            container.innerHTML = "";
            if (p.length === 0) return;

            // console.log("Building program");
            console.table(p);

            p.forEach((b) => {
                let el = controls[b.r.id]({
                    target: container,
                    // @ts-ignore
                    props: {
                        p: b.r.p,
                        destroy: () => {
                            p = p.filter((_) => _.r.rid !== b.r.rid);
                        },
                    },
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
    on:drop={function (e) {
        e.stopImmediatePropagation();
        draggingOver = false;

        const data = e.dataTransfer?.getData("application/json");
        if (!data) return;

        const j = JSON.parse(data);
        if (j.type !== "control") return;

        let el;
        const rid = runningid++;

        function destroy() {
            // console.log("Destroying", rid);
            p = p.filter((_) => _.r.rid !== rid);
        }

        let anchored = e.target == container;

        /**
         * @type {{id: string, p: any, rid: number}}
         */ // @ts-ignore
        let ref;

        // console.log("Create control:", type, id, p);
        if (anchored) {
            el = controls[j.id]({
                target: container,
                // @ts-ignore
                props:
                    j.p != undefined
                        ? { p: j.p, destroy: destroy }
                        : { destroy: destroy },
            });

            ref = {
                r: {
                    id: j.id,
                    p: el.p,
                    rid,
                },
            };

            p.push(ref);
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
                props:
                    j.p != undefined
                        ? { p: j.p, destroy: destroy }
                        : { destroy: destroy },
                anchor: anc,
            });

            ref = {
                r: {
                    id: j.id,
                    p: el.p,
                    rid,
                },
            };

            // Get how-manyth child is the anchor
            let idx = Array.from(container.children).indexOf(anc);
            if (idx === -1) {
                p.push(ref);
            } else {
                p.splice(idx - 1, 0, ref);
            }
        }

        // Bind to element's p
        ref.r.p = el.p;
    }}
    role="main"
    style:border-color={draggingOver ? "teal" : ""}
></div>

<script lang="ts">
    // Holds the main program
    import { controls } from "@lib/scripts/controls";
    import programcontainer from "@lib/stores/programcontainer";

    let draggingOver = false;

    let container: Element;

    $: programcontainer.set(container);

    $: console.log(draggingOver);
</script>

<div
    bind:this={container}
    class="w-1/2 min-w-96 rounded border pb-4 [&>*]:border-b"
    on:dragenter={() => {
        draggingOver = true;
    }}
    on:dragleave={() => {
        draggingOver = false;
    }}
    on:dragover={(e) => {
        e.preventDefault();
    }}
    on:drop={(e) => {
        e.preventDefault();
        draggingOver = false;
        console.log("dropped");

        const data = e.dataTransfer?.getData("application/json");
        if (!data) return;

        const { type, id } = JSON.parse(data);
        if (type !== "control") return;

        console.log("Create control:", id);

        controls[id]({ target: container });
    }}
    role="main"
    style:border-color={draggingOver ? "teal" : ""}
></div>

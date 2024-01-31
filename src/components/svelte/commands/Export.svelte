<script lang="ts">
    import { Button, Tooltip } from "flowbite-svelte";
    import { FileExportSolid } from "flowbite-svelte-icons";

    const exportJS = () => {
        const inst: Array<string> = [];

        document.querySelectorAll(".inst").forEach((el) => {
            if (el instanceof HTMLInputElement) inst.push(el.value);
        });

        let exp = inst.join("\n").replaceAll("__step();\n", "");

        exp =
            "// Exported from https://bbe.kendlbat.dev/\n// Blocks Editor made by https://kendlbat.dev/\n" +
            exp;

        // Download
        const element = document.createElement("a");
        const file = new Blob([exp], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "export.js";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        element.remove();
    };
</script>

<Button on:click={exportJS}>
    <FileExportSolid class="h-3 w-3" />
</Button>
<Tooltip>Export to JavaScript</Tooltip>

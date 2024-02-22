<script lang="ts">
    import { Button, Tooltip } from "flowbite-svelte";
    import {
        DownloadSolid,
        FileExportSolid,
        UploadSolid,
    } from "flowbite-svelte-icons";
    import mainprogram from "@lib/stores/mainprogram";
    import { updateAllP } from "@lib/util";

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

    const exportCustom = () => {
        updateAllP();
        let exp = JSON.stringify($mainprogram);

        // Download
        const element = document.createElement("a");
        const file = new Blob([exp], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "export.kbb";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        element.remove();
    };

    const importCustom = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".kbb";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const contents = e.target?.result;
                    if (typeof contents === "string") {
                        mainprogram.set(JSON.parse(contents));
                    }
                };
                reader.readAsText(file);
            }
            input.remove();
        };
        input.click();
    };

    $: localStorage.setItem("bbe-mainprogram", JSON.stringify($mainprogram));

    let stored = localStorage.getItem("bbe-mainprogram");
    if (stored) {
        mainprogram.set(JSON.parse(stored));
    }
</script>

<Button on:click={exportJS}>
    <FileExportSolid class="h-3 w-3" />
</Button>
<Tooltip>Export to JavaScript</Tooltip>
<Button on:click={exportCustom}>
    <DownloadSolid class="h-3 w-3" />
</Button>
<Tooltip>Export kbb</Tooltip>
<Button on:click={importCustom}>
    <UploadSolid class="h-3 w-3" />
</Button>
<Tooltip>Import kbb</Tooltip>

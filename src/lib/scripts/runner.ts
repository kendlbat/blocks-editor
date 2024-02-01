import stepdelay from "@lib/stores/stepdelay";
import { writable } from "svelte/store";

let running: boolean = false;
let stoprequest: boolean = false;
let stepresolve: (() => void) | undefined = undefined;

export let runningListener = writable(false);

export const run = async () => {
    if (running) return;
    console.log("Running");
    running = true;
    runningListener.set(true);
    stoprequest = false;

    let delay: number = 0;
    stepdelay.subscribe((v) => (delay = v));

    // Function declarations to be used in eval
    async function __step(idx: number): Promise<void> {
        console.log("Stepping", idx);
        // TODO: Implement logic for pause, delay, step and stop

        let prev = document.querySelector(".statementblock.active");
        if (prev) prev.classList.remove("active");

        if (stoprequest) {
            running = false;
            runningListener.set(false);
            stoprequest = false;
            throw new Error("Stop requested");
        }

        // Find parent with statementblock class
        let curr = inst[idx].elem.closest(".statementblock");
        if (curr) {
            curr.classList.add("active");
        }

        await new Promise<void>((resolve) => {
            stepresolve = resolve;
            setTimeout(() => resolve(), delay);
        });

        if (stoprequest) {
            let prev = document.querySelector(".statementblock.active");
            if (prev) prev.classList.remove("active");
            running = false;
            runningListener.set(false);
            stoprequest = false;
            throw new Error("Stop requested");
        }

        // confirm("Step");
    }

    // @ts-ignore
    globalThis.__step = __step;

    const inst: Array<{
        inst: string;
        elem: HTMLInputElement;
    }> = [];

    document.querySelectorAll(".inst").forEach((el) => {
        if (el instanceof HTMLInputElement)
            inst.push({
                inst: el.value,
                elem: el,
            });
    });

    let readyToRun: string = inst.reduce((acc: string, curr, idx) => {
        return (
            acc +
            curr.inst.replace("__step()", `await globalThis.__step(${idx})`) +
            "\n"
        );
    }, "");

    readyToRun = `(async () => {
try {
${readyToRun}
} catch (e) {
    alert("Error:\n" + e);
}
(async () => {
// cleanup
let prev = document.querySelector(".statementblock.active");
if (prev) prev.classList.remove("active");
running = false;
runningListener.set(false);
})();
})();`;

    console.log(readyToRun);

    eval(readyToRun);
};

export const stop = async () => {
    stoprequest = true;
    if (stepresolve !== undefined) stepresolve();
};

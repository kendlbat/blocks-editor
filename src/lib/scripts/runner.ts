export const run = async () => {
    console.log("Running");

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

    // Function declarations to be used in eval
    function __step(idx: number): void {
        console.log("Stepping", idx);
        // TODO: Implement logic for pause, delay, step and stop

        let prev = document.querySelector(".statementblock.active");
        if (prev) prev.classList.remove("active");

        // Find parent with statementblock class
        let curr = inst[idx].elem.closest(".statementblock");
        if (curr) {
            curr.classList.add("active");
        }

        confirm("Step");
    }

    let readyToRun: string = inst.reduce((acc: string, curr, idx) => {
        return acc + curr.inst.replace("__step()", `__step(${idx})`) + "\n";
    }, "");

    console.log(readyToRun);

    try {
        eval(readyToRun);
    } catch (e) {
        alert(`Error:\n${e}`);
    }
};

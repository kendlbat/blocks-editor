export const run = async () => {
    console.log("Running");

    const inst: string[] = [];

    document.querySelectorAll(".inst").forEach((el) => {
        if (el instanceof HTMLInputElement) inst.push(el.value);
    });

    console.log(inst.join("\n"));

    eval(inst.join("\n"));
};

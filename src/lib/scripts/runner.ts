export const run = async () => {
    console.log("Running");

    const inst: string[] = [];

    document.querySelectorAll(".inst").forEach((el) => {
        inst.push(el.innerHTML.trim());
    });

    console.log(inst.join("\n"));

    eval(inst.join("\n"));
};

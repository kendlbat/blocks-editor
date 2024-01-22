export const run = async () => {
    console.log("Running");

    const inst: string[] = ["let vars = {};"];

    document.querySelectorAll(".inst").forEach((el) => {
        inst.push(el.innerHTML.trim());
    });

    eval(inst.join("\n"));
};

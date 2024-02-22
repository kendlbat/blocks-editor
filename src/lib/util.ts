export function htmlDecode(input: string): string {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent || "";
}

export function updateAllP() {
    let allP = document.querySelectorAll(".programcontainer");
    allP.forEach((p) => {
        p.dispatchEvent(new CustomEvent("updatep"));
    });
}

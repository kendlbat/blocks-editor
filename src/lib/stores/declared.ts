import { writable } from "svelte/store";

const declared = writable<Set<string>>(new Set());

// declared.subscribe((v) => {
//     console.log(v);
// });

export default declared;

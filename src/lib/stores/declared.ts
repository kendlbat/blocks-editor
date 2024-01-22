import { writable } from "svelte/store";

const declared = writable<{ [key: string]: { type: string; name: string } }>(
    {},
);

declared.subscribe((v) => {
    console.log(v);
});

export default declared;

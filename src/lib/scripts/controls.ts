import type { ComponentConstructorOptions, SvelteComponent } from "svelte";
import Declare from "@components/svelte/blocks/Declare.svelte";
import Input from "@components/svelte/blocks/Input.svelte";
import Output from "@components/svelte/blocks/Output.svelte";
import Assignment from "@components/svelte/blocks/Assignment.svelte";
import If from "@components/svelte/blocks/If.svelte";
import Switch from "@components/svelte/blocks/Switch.svelte";
import While from "@components/svelte/blocks/While.svelte";
import DoWhile from "@components/svelte/blocks/DoWhile.svelte";
import For from "@components/svelte/blocks/For.svelte";

interface IControl {
    id: string;
    ui: SvelteComponent;
}

export const controls: {
    [key: string]: (
        options: ComponentConstructorOptions<{
            p: any;
            destroy: () => void;
        }>,
        custom?: Record<string, any>,
    ) => SvelteComponent<{ p?: any; id?: string; destroy?: () => void }>;
} = {
    // @ts-ignore
    declare: (options) => new Declare(options),
    // @ts-ignore
    input: (options) => new Input(options),
    // @ts-ignore
    output: (options) => new Output(options),
    // @ts-ignore
    assign: (options) => new Assignment(options),
    // @ts-ignore
    if: (options) => new If(options),
    // @ts-ignore
    switch: (options) => new Switch(options),
    // @ts-ignore
    while: (options) => new While(options),
    // @ts-ignore
    dowhile: (options) => new DoWhile(options),
    // @ts-ignore
    for: (options) => new For(options),
};

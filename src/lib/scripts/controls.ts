import type { ComponentConstructorOptions, SvelteComponent } from "svelte";
import Declare from "@components/svelte/blocks/Declare.svelte";
import Input from "@components/svelte/blocks/Input.svelte";
import Output from "@components/svelte/blocks/Output.svelte";
import Assignment from "@components/svelte/blocks/Assignment.svelte";
import If from "@components/svelte/blocks/If.svelte";
import Switch from "@components/svelte/blocks/Switch.svelte";
import While from "@components/svelte/blocks/While.svelte";
import DoWhile from "@components/svelte/blocks/DoWhile.svelte";

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
    ) => SvelteComponent<{ p?: any; id?: string; destroy: () => void }>;
} = {
    declare: (options) => new Declare(options),
    input: (options) => new Input(options),
    output: (options) => new Output(options),
    assign: (options) => new Assignment(options),
    if: (options) => new If(options),
    switch: (options) => new Switch(options),
    while: (options) => new While(options),
    dowhile: (options) => new DoWhile(options),
};

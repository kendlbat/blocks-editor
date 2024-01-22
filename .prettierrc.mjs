/**
 * @type {import("prettier").Config}
 */
export default {
    plugins: [
        "prettier-plugin-svelte",
        "prettier-plugin-astro",
        "prettier-plugin-tailwindcss",
    ],
    overrides: [
        {
            files: ["*.astro"],
            options: {
                parser: "astro",
            },
        },
    ],
    semi: true,
    tabWidth: 4,
};

import { defineMDSveXConfig as defineConfig } from "mdsvex";

const config = defineConfig({
  extensions: [".md"],

  smartypants: {
    dashes: "oldschool",
  },
});

export default config;

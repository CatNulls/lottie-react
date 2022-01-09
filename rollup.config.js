import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from "autoprefixer";
import babel from "rollup-plugin-babel";
import dts from "rollup-plugin-dts";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import packageJSON from "./package.json";

/**
 * Get the extension for the minified files
 * @param pathToFile
 * @return string
 */
const minifyExtension = (pathToFile) => pathToFile.replace(/\.js$/, ".min.js");

/**
 * Get the extension for the TS definition files
 * @param pathToFile
 * @return string
 */
const dtsExtension = (pathToFile) => pathToFile.replace(".js", ".d.ts");

/**
 * Definition of the common plugins used in the rollup configurations
 */
const reusablePluginList = [
  typescript(),
  postcss({
    plugins: [autoprefixer],
    use: ["sass"],
    extract: true,
  }),
  babel({
    exclude: "node_modules/**",
  }),
  external(),
  resolve(),
  commonjs(),
];

const input = "./src/index.ts";

/**
 * Definition of the rollup configurations
 */
const exports = {
  cjs: {
    input,
    output: {
      file: packageJSON.main,
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    external: ["lottie-web"], // TODO: should we add "react", "react-dom"?
    plugins: reusablePluginList,
  },
  cjs_min: {
    input,
    output: {
      file: minifyExtension(packageJSON.main),
      format: "cjs",
      exports: "named",
    },
    external: ["lottie-web"], // TODO: should we add "react", "react-dom"?
    plugins: [...reusablePluginList, terser()],
  },
  umd: {
    input,
    output: {
      file: packageJSON.browser,
      format: "umd",
      sourcemap: true,
      name: "lottie-react",
      exports: "named",
      globals: {
        react: "React",
        "lottie-web": "Lottie",
      },
    },
    external: ["lottie-web"],
    plugins: reusablePluginList,
  },
  umd_min: {
    input,
    output: {
      file: minifyExtension(packageJSON.browser),
      format: "umd",
      exports: "named",
      name: "lottie-react",
      globals: {
        react: "React",
        "lottie-web": "Lottie",
      },
    },
    external: ["lottie-web"],
    plugins: [...reusablePluginList, terser()],
  },
  es: {
    input,
    output: {
      file: packageJSON.module,
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    external: ["lottie-web"], // TODO: should we add "react", "react-dom"?
    plugins: reusablePluginList,
  },
  es_min: {
    input,
    output: {
      file: minifyExtension(packageJSON.module),
      format: "es",
      exports: "named",
    },
    external: ["lottie-web"], // TODO: should we add "react", "react-dom"?
    plugins: [...reusablePluginList, terser()],
  },
  dts: {
    input: dtsExtension(input),
    output: {
      file: packageJSON.types,
      format: "es",
    },
    plugins: [dts()],
  },
};

export default [
  exports.cjs,
  exports.cjs_min,
  exports.umd,
  exports.umd_min,
  exports.es,
  exports.es_min,
  exports.dts,
];

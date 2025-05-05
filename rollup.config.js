import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import pkg from "./package.json";
import copy from "rollup-plugin-copy";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      exclude: ["**/__tests__", "**/*.test.tsx"],
    }),
    copy({
      targets: [{ src: "src/assets/**/*", dest: "dist/assets" }],
    }),
  ],
  external: ["react", "react-native", "util", /\.svg$/],
};

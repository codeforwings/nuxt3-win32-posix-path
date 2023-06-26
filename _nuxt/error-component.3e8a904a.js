import { d as o, o as f, c as g, n as k, g as x, u as t } from "./entry.c56b0477.js";
const h = {
  __name: "nuxt-error-page",
  props: {
    error: Object
  },
  setup(c) {
    var a;
    const { error: s } = c;
    (s.stack || "").split(`
`).splice(1).map((e) => ({
      text: e.replace("webpack:/", "").replace(".vue", ".js").trim(),
      internal: e.includes("node_modules") && !e.includes(".cache") || e.includes("internal") || e.includes("new Promise")
    })).map((e) => `<span class="stack${e.internal ? " internal" : ""}">${e.text}</span>`).join(`
`);
    const n = Number(s.statusCode || 500), r = n === 404, u = (a = s.statusMessage) != null ? a : r ? "Page Not Found" : "Internal Server Error", p = s.message || s.toString(), i = void 0, d = o(() => import("./error-404.1a54b88f.js").then((e) => e.default || e)), l = o(() => import("./error-500.10923184.js").then((e) => e.default || e)), m = r ? d : l;
    return (e, _) => (f(), g(t(m), k(x({ statusCode: t(n), statusMessage: t(u), description: t(p), stack: t(i) })), null, 16));
  }
}, E = h;
export {
  E as default
};

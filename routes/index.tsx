import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  const cwd = Deno.cwd();
  const filePath = new URL(req.url, `file://${cwd}`).pathname;
  const importMeta = import.meta;

  return (
    <div class="page">
      <h1>Hello World</h1>
      <p>Current working directory: {cwd}</p>
      <p>Requested file path: {filePath}</p>
      <p>import.meta.url: {importMeta.url}</p>
      <p>import.meta.main: {importMeta.main}</p>
    </div>
  );
});
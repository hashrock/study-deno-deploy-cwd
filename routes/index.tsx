import { defineRoute } from "$fresh/server.ts";
import { walk } from "https://deno.land/std/fs/walk.ts";

export default defineRoute(async (req, ctx) => {
  const cwd = Deno.cwd();
  const filePath = new URL(req.url, `file://${cwd}`).pathname;
  const importMeta = import.meta;

  const root = await walk("/");
  const rootFiles = [];
  let i = 0;
  for await (const file of root) {
    if(file.path.includes("node_modules")) continue;
    rootFiles.push(file.path);
    i++;
    if (i > 100) break;
  }
  return (
    <div class="page">
      <h1>Hello World</h1>
      <p>Current working directory: {cwd}</p>
      <p>Requested file path: {filePath}</p>
      <p>import.meta.url: {importMeta.url}</p>
      <p>import.meta.main: {importMeta.main}</p>

      <h2>Root Files</h2>
      <ul>
        {rootFiles.map((file) => <li>{file}</li>)}
      </ul>
    </div>
  );
});

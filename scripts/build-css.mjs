import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import * as sass from "sass";

const root = path.resolve("htdocs");

async function findEntrypoints(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await findEntrypoints(entryPath));
      continue;
    }

    if (
      path.basename(directory) === "scss" &&
      entry.name.endsWith(".scss") &&
      !entry.name.startsWith("_")
    ) {
      files.push(entryPath);
    }
  }

  return files;
}

for (const sourcePath of await findEntrypoints(root)) {
  const outputDirectory = path.join(path.dirname(path.dirname(sourcePath)), "css");
  const outputPath = path.join(outputDirectory, `${path.basename(sourcePath, ".scss")}.css`);
  const result = sass.compile(sourcePath, {
    loadPaths: [path.join(root, "common", "scss")],
    style: "expanded",
  });

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputPath, `${result.css}\n`);
  console.log(`${path.relative(root, sourcePath)} -> ${path.relative(root, outputPath)}`);
}

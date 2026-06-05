#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const write = args.has("--write");
const includeDirs = args.has("--include-dirs");

const ignoredDirs = new Set([
  ".agents",
  ".codex",
  ".git",
  ".vscode",
  "dist",
  "node_modules",
]);

function toKebabCase(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .toLowerCase();
}

function formatFileName(fileName) {
  if (fileName.startsWith(".")) {
    return fileName;
  }

  const extension = path.extname(fileName);
  const baseName = path.basename(fileName, extension);
  const formattedBase = toKebabCase(baseName);
  const formattedExtension = extension.toLowerCase();

  if (!formattedBase) {
    return fileName;
  }

  return `${formattedBase}${formattedExtension}`;
}

function formatDirName(dirName) {
  return toKebabCase(dirName) || dirName;
}

function collectEntries(currentDir, entries) {
  const dirents = fs.readdirSync(currentDir, { withFileTypes: true });

  for (const dirent of dirents) {
    const absolutePath = path.join(currentDir, dirent.name);
    const relativePath = path.relative(root, absolutePath);

    if (dirent.isDirectory()) {
      if (ignoredDirs.has(dirent.name)) {
        continue;
      }

      collectEntries(absolutePath, entries);

      if (includeDirs) {
        const formattedName = formatDirName(dirent.name);
        if (formattedName !== dirent.name) {
          entries.push({
            from: absolutePath,
            to: path.join(currentDir, formattedName),
            displayFrom: relativePath,
            displayTo: path.relative(root, path.join(currentDir, formattedName)),
          });
        }
      }

      continue;
    }

    if (!dirent.isFile()) {
      continue;
    }

    const formattedName = formatFileName(dirent.name);
    if (formattedName === dirent.name) {
      continue;
    }

    entries.push({
      from: absolutePath,
      to: path.join(currentDir, formattedName),
      displayFrom: relativePath,
      displayTo: path.relative(root, path.join(currentDir, formattedName)),
    });
  }
}

function assertNoCollisions(entries) {
  const targets = new Map();

  for (const entry of entries) {
    const targetKey = entry.to.toLowerCase();
    const existingTarget = targets.get(targetKey);

    if (existingTarget) {
      throw new Error(
        `Rename collision:\n  ${existingTarget.displayFrom} -> ${existingTarget.displayTo}\n  ${entry.displayFrom} -> ${entry.displayTo}`,
      );
    }

    if (
      fs.existsSync(entry.to) &&
      path.resolve(entry.from).toLowerCase() !== path.resolve(entry.to).toLowerCase()
    ) {
      throw new Error(`Target already exists: ${entry.displayTo}`);
    }

    targets.set(targetKey, entry);
  }
}

function renameEntries(entries) {
  const sortedEntries = [...entries].sort((a, b) => {
    const depthDifference = b.from.split(path.sep).length - a.from.split(path.sep).length;
    return depthDifference || b.from.localeCompare(a.from);
  });

  for (const [index, entry] of sortedEntries.entries()) {
    const temp = path.join(path.dirname(entry.from), `.rename-${process.pid}-${index}.tmp`);
    fs.renameSync(entry.from, temp);
    fs.renameSync(temp, entry.to);
  }
}

const entries = [];
collectEntries(root, entries);
assertNoCollisions(entries);

if (entries.length === 0) {
  console.log("All file names already match the formatter.");
  process.exit(0);
}

for (const entry of entries) {
  console.log(`${entry.displayFrom} -> ${entry.displayTo}`);
}

if (!write) {
  console.log("\nDry run only. Re-run with --write to rename files.");
  process.exit(0);
}

renameEntries(entries);
console.log(`\nRenamed ${entries.length} item${entries.length === 1 ? "" : "s"}.`);

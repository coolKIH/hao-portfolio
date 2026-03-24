import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'content/posts');

// Ensure running from project root
if (!fs.existsSync(POSTS_DIR)) {
  throw new Error('❌ posts directory not found. Run this from project root.');
}

// 1. Get user input as the raw title
const rawTitle = process.argv.slice(2).join(' ') || 'new-post';

// 2. Convert the raw title into a valid Slug
const slug = rawTitle
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-') // Replace all non-alphanumeric characters with hyphens
  .replace(/^-+|-+$/g, '');     // Remove leading/trailing hyphens

// 3. Format the date (YYYY-MM-DD HH:mm:ss)
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');

const yyyy = now.getFullYear();
const mm = pad(now.getMonth() + 1);
const dd = pad(now.getDate());
const hh = pad(now.getHours());
const min = pad(now.getMinutes());
const ss = pad(now.getSeconds());

const dateStr = `${yyyy}-${mm}-${dd}`;
const timeStr = `${dateStr} ${hh}:${min}:${ss}`;
// Use an accurate timestamp for the filename (without seconds, to avoid long filenames)
const fileTimestamp = `${dateStr}-${hh}${min}`;

// 4. Construct the filename with date, time, and slug
const fileName = `${fileTimestamp}-${slug || 'untitled'}.mdx`;
const filePath = path.join(POSTS_DIR, fileName);

// 5. Prepare the template content
const template = `---
title: "${rawTitle}"
date: "${timeStr} +0800"
location: ""
tags: []
description: ""
---

How are you doing?
`;

// 6. Execute the write operation
if (fs.existsSync(filePath)) {
  console.error(`⚠️ File already exists: ${fileName}`);
} else {
  // Write the template content to the file
  fs.writeFileSync(filePath, template);
  console.log(`✅ Created file: ${fileName}`);
  console.log(`📝 Titled: ${rawTitle}`);
  console.log(`Filepath: ${filePath}`);
}
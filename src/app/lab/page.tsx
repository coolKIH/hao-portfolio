import fs from 'fs/promises';
import path from 'path';
import LabClient from './LabClient';

/**
 * Server Component to handle file system operations.
 * It reads the MDX template before the page reaches the browser.
 */
export default async function LabPage() {
    // Construct an absolute path to avoid "file not found" errors during deployment
    const filePath = path.join(process.cwd(), 'src', 'app', 'lab', 'playground.mdx');

    let initialContent = '';

    try {
        // Read the file with UTF-8 encoding
        initialContent = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        // Fallback content in case the file is missing or unreadable
        initialContent = '# Error\nPlayground file not found at the specified path.';
        console.error('File read error:', error);
    }

    // Pass the data to the Client Component via props
    return <LabClient defaultContent={initialContent} />;
}
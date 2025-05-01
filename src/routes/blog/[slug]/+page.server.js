import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function load({ params }) {
    try {
        const { slug } = params;
        
        // Define paths to check for the content file
        const mdPath = path.join(process.cwd(), 'static/content/blogs', `${slug}.md`);
        const mdxPath = path.join(process.cwd(), 'static/content/blogs', `${slug}.mdx`);
        
        let filePath;
        if (fs.existsSync(mdPath)) {
            filePath = mdPath;
        } else if (fs.existsSync(mdxPath)) {
            filePath = mdxPath;
        } else {
            throw error(404, `Could not find post: ${slug}`);
        }
        
        // Read the file directly from the filesystem
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Parse frontmatter and content
        const { data: metadata, content } = matter(fileContent);
        
        return {
            metadata: {
                title: metadata.title || slug,
                date: metadata.date,
                ...metadata,
                slug
            },
            content
        };
    } catch (e) {
        console.error(e);
        throw error(404, `Could not find post: ${params.slug}`);
    }
}
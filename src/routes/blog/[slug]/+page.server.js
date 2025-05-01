import { error } from '@sveltejs/kit';
import { marked } from 'marked';

export async function load({ params }) {
    try {
        const { slug } = params;
        
        // Use import.meta.glob to get all markdown files
        const posts = import.meta.glob('/static/content/blogs/*.{md,mdx}', { eager: true, as: 'raw' });
        
        // Find the matching post by slug
        const filePath = Object.keys(posts).find(path => {
            // Extract slug from file path
            const fileSlug = path.split('/').pop().replace(/\.(md|mdx)$/, '');
            return fileSlug === slug;
        });
        
        if (!filePath) {
            throw error(404, `Could not find post: ${slug}`);
        }
        
        const content = posts[filePath];
        
        // Extract and parse frontmatter
        const frontmatterMatch = content.match(/---\r?\n([\s\S]*?)\r?\n---/);
        const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
        const mainContent = content.replace(/---\r?\n[\s\S]*?\r?\n---/, '').trim();
        
        // Parse frontmatter
        const metadata = {};
        frontmatter.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim();
                metadata[key.trim()] = value;
            }
        });
        
        return {
            metadata: {
                title: metadata.title || slug,
                date: metadata.date,
                ...metadata,
                slug
            },
            content: mainContent
        };
    } catch (e) {
        console.error(e);
        throw error(404, `Could not find post: ${params.slug}`);
    }
}
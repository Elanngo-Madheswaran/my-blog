import { error } from '@sveltejs/kit';
import { marked } from 'marked';

export async function load({ params }) {
    try {
        const { slug } = params;
        
        // Import the markdown file directly
        let postContent;
        try {
            postContent = await import(`/static/content/blogs/${slug}.md?raw`);
        } catch (e) {
            try {
                postContent = await import(`/static/content/blogs/${slug}.mdx?raw`);
            } catch (e2) {
                throw error(404, `Could not find post: ${slug}`);
            }
        }
        
        // Extract and parse frontmatter
        const content = postContent.default || postContent;
        const frontmatterMatch = content.match(/---\r?\n([\s\S]*?)\r?\n---/);
        const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
        const mainContent = content.replace(/---\r?\n[\\s\S]*?\r?\n---/, '').trim();
        
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
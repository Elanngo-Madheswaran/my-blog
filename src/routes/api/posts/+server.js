import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    // Use import.meta.glob to get all markdown files
    const postImports = import.meta.glob('/static/content/blogs/*.{md,mdx}', { eager: true, as: 'raw' });
    
    const posts = Object.entries(postImports).map(([path, content]) => {
      // Extract slug from path
      const slug = path.split('/').pop().replace(/\.(md|mdx)$/, '');
      
      // Extract frontmatter with a simple regex approach
      const frontmatterMatch = content.match(/---\r?\n([\s\S]*?)\r?\n---/);
      const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
      
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
        slug,
        title: metadata.title || slug,
        date: metadata.date || new Date().toISOString().split('T')[0],
        excerpt: metadata.excerpt || '',
        ...metadata
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return json([]);
  }
}
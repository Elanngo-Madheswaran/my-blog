import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    // Get list of all files in the blogs directory
    const postsDirectory = path.join(process.cwd(), 'static/content/blogs');
    const filenames = fs.readdirSync(postsDirectory);
    
    const posts = filenames
      .filter(filename => {
        // Only include .md and .mdx files
        return filename.endsWith('.md') || filename.endsWith('.mdx');
      })
      .map(filename => {
        // Remove extension
        const slug = filename.replace(/\.mdx?$/, '');
        
        // Read file content
        const filePath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Parse frontmatter
        const { data } = matter(fileContent);
        
        // Return post metadata
        return {
          slug,
          title: data.title || slug,
          date: data.date,
          excerpt: data.excerpt || '',
          ...data
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return json([]);
  }
}
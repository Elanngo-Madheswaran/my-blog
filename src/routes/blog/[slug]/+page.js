import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function load({ params }) {
  try {
    const { slug } = params;
    
    // Try to find the file with .mdx extension first, then .md
    let filePath;
    
    const mdxPath = path.join(process.cwd(), 'static/content/blogs', `${slug}.mdx`);
    const mdPath = path.join(process.cwd(), 'static/content/blogs', `${slug}.md`);
    
    if (fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath;
    } else {
      throw error(404, `Could not find post: ${slug}`);
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter and content
    const { data, content } = matter(fileContent);
    
    return {
      metadata: {
        title: data.title || slug,
        date: data.date,
        ...data
      },
      content
    };
  } catch (e) {
    console.error(e);
    throw error(404, `Could not find post: ${params.slug}`);
  }
}
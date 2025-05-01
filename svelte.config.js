import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Tell Svelte to handle mdx files
  extensions: ['.svelte', '.md', '.mdx'],

  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md', '.mdx'],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, {
          behavior: 'wrap'
        }]
      ]
    })
  ],

  kit: {
    adapter: adapter()
  }
};

export default config;
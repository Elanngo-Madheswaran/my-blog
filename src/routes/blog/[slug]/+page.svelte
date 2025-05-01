<script>
  import { marked } from 'marked';
  let { data } = $props();
  
  const { metadata, content } = data;
  
  // Parse markdown content to HTML
  const htmlContent = marked(content);
</script>

<svelte:head>
  <title>{metadata.title}</title>
</svelte:head>

<article class="container">
  <header>
    <h1>{metadata.title}</h1>
    <p class="date">{new Date(metadata.date).toLocaleDateString()}</p>
  </header>
  
  <div class="content">
    {@html htmlContent}
  </div>
  
  <footer>
    <a href="/blog">&larr; Back to all posts</a>
  </footer>
</article>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .date {
    color: #777;
    font-style: italic;
  }
  
  .content {
    margin: 2rem 0;
    line-height: 1.7;
  }
  
  .content :global(img) {
    max-width: 100%;
    height: auto;
  }
  
  .content :global(h2) {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .content :global(h3) {
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .content :global(p) {
    margin-bottom: 1.5rem;
  }
  
  .content :global(ul), .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }
  
  footer {
    margin-top: 3rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
  
  footer a {
    color: #0066cc;
    text-decoration: none;
  }
  
  footer a:hover {
    text-decoration: underline;
  }
</style>
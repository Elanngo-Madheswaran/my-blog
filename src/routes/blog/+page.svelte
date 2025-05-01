<script>
  let { data } = $props();
</script>

<svelte:head>
  <title>My Blog</title>
</svelte:head>

<section class="container">
  <h1>My Blog</h1>

  <ul class="post-list">
    {#each data.posts as post}
      <li class="post-item">
        <a href="/blog/{post.slug}">
          <h2>{post.title}</h2>
          <p class="date">{new Date(post.date).toLocaleDateString()}</p>
          {#if post.excerpt}
            <p class="excerpt">{post.excerpt}</p>
          {/if}
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .post-list {
    list-style: none;
    padding: 0;
  }
  
  .post-item {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eee;
  }
  
  .post-item a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  
  .post-item a:hover h2 {
    color: #0066cc;
  }
  
  .date {
    color: #777;
    font-style: italic;
    margin: 0.5rem 0;
  }
  
  .excerpt {
    margin-top: 0.5rem;
  }
</style>
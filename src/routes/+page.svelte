<svelte:head>
  <title>My Website</title>
</svelte:head>

<main class="container">
  <h1>Welcome to My Website</h1>
  <p>This is a personal website with an integrated blog.</p>
  
  <div class="cta">
    <a href="/blog" class="btn">Read My Blog</a>
  </div>
</main>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 4rem 1rem;
    text-align: center;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #555;
  }
  
  .cta {
    margin-top: 2rem;
  }
  
  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #0066cc;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .btn:hover {
    background-color: #0052a3;
  }
</style>
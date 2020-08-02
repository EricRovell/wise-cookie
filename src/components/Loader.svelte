<script>
  import { fade } from "svelte/transition";
</script>

<div class="container">
  <div transition:fade class="loader" />
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 1em;
  }

  .loader::before,
  .loader::after {
    content:"";
    width: 24px;
    height: 24px;
    display: inline-block;
    background:var(--color-3, #58bd55);
  }
  
  .loader::before{
    animation: loader-animate-before 1s ease-in-out infinite;
  }
  
  .loader::after{
    animation:loader-animate-after 1s ease-in-out infinite
  }
  
  @keyframes loader-animate-before {
    0% {
      transform:translateX(-24px) rotate(45deg)
    }
    50% {
      transform:translateX(-8px) rotate(225deg)
    }
    
    100% {
      transform:translateX(-24px) rotate(45deg)
    }
  }
    
  @keyframes loader-animate-after {
    0% {
      transform:translateX(24px) rotate(45deg)
    }
    50% {
      transform:translateX(8px) rotate(-225deg)
    }
    100% {
      transform:translateX(24px) rotate(45deg)
    }
  }
</style>
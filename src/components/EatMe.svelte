<div> 
  <svg class="arrow" viewBox="0 0 100 100">
    <g>
      <path d="M48.8.46a1.54,1.54,0,0,0-.26.25L19.61,29a2.28,2.28,0,0,0,1.52,4H36.36V69.7c0,1.37.3,2.89,1.52,2.89H62.24a3.5,3.5,0,0,0,3.05-2.89V33H79a2.43,2.43,0,0,0,2.14-1.37v-.92A2.44,2.44,0,0,0,80.36,29L51.58.71A2,2,0,0,0,48.8.46Z" />
      <path d="M35.59,79.44a2.3,2.3,0,0,0,2.29,2.29H62.24a2.29,2.29,0,1,0,0-4.57H37.88A2.29,2.29,0,0,0,35.59,79.44Z" />
      <path d="M35.59,88.58a2.29,2.29,0,0,0,2.29,2.28H62.24a2.29,2.29,0,1,0,0-4.57H37.88A2.3,2.3,0,0,0,35.59,88.58Z" />
      <path d="M35.59,97.72A2.29,2.29,0,0,0,37.88,100H62.24a2.29,2.29,0,1,0,0-4.57H37.88A2.29,2.29,0,0,0,35.59,97.72Z" />
    </g>
  </svg>
  <svg class="cookie" viewBox="0 0 98.96 100">
    <title>Untitled-1</title>
    <path d="M28.4,5.57A48.86,48.86,0,0,1,50.21.46c1.5,0,3,.07,4.44.2A48.71,48.71,0,0,1,68,3.8a50.74,50.74,0,0,1,5,2.3A49.59,49.59,0,0,1,88.58,18.94c.2.24.4.5.59.75A49.2,49.2,0,1,1,28.4,5.57" transform="translate(-0.52)" style="fill: #cb7c00;isolation: isolate"/>
    <path d="M8.73,42.76A50,50,0,0,1,21.92,8.83,50.1,50.1,0,0,0,50.28,100,49.49,49.49,0,0,0,86.85,83.88a49.28,49.28,0,0,1-28.36,8.93A49.91,49.91,0,0,1,8.73,42.76Z" transform="translate(-0.52)" style="fill: #a26300;isolation: isolate"/>
    <g>
      <ellipse cx="72.54" cy="49.48" rx="3.05" ry="3.06" style="fill: #793c00"/>
      <ellipse cx="41.06" cy="28.05" rx="3.05" ry="3.06" style="fill: #793c00"/>
      <ellipse cx="28.88" cy="68.87" rx="5.08" ry="5.1" style="fill: #793c00"/>
      <ellipse cx="54.26" cy="69.9" rx="6.09" ry="6.12" style="fill: #793c00"/>
      <ellipse cx="87.77" cy="81.12" rx="5.08" ry="5.1" style="fill: #793c00"/>
      <ellipse cx="20.76" cy="11.72" rx="7.13" ry="7.16" style="fill: #793c00"/>
      <ellipse cx="23.8" cy="45.4" rx="7.11" ry="7.14" style="fill: #793c00"/>
      <ellipse cx="27.86" cy="94.39" rx="4.57" ry="4.59" style="fill: #793c00"/>
    </g>
    <g>
      <ellipse cx="92.87" cy="17.75" rx="6.09" ry="6.12" style="fill: #793c00"/>
      <ellipse cx="68.74" cy="4.41" rx="4.38" ry="4.41" style="fill: #793c00"/>
      <ellipse cx="66.33" cy="26.24" rx="2.9" ry="2.91" style="fill: #793c00"/>
    </g>
  </svg>
  <p>Please, eat a cookie!</p>
</div>

<style>
  div {
    --glow-color: orange;

    width: 100%;
    height: 100%;
    max-height: 250px;
    padding-top: 35px;

    display: grid;
    place-items: center;
    row-gap: 1em;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  .arrow {
    width: 75px;
    height: auto;
    fill: var(--color-3);
    animation: moving-arrow 1.5s ease-in-out infinite alternate;
  }

  .cookie {
    width: 75px;
    height: 75px;
    animation: glowing-cookie 1.5s ease-in-out infinite alternate;
  }

  p {
    font-size: 1.45em;
  }

  @keyframes glowing-cookie {
    from {
      filter: drop-shadow(0 0 5px var(--glow-color));
    }
    to {
      filter: drop-shadow(0 0 15px var(--glow-color));
    }
  }

  @keyframes moving-arrow {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-25px);
    }
  }
</style>
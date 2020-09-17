// The pop() function is called on every click
export function heartExplode(event: any, container) {
  if (!document.body.animate) return;

  // Loop to generate 30 particles at once
  for (let i = 0; i < 30; i++) {
    // We pass the mouse coordinates to the createParticle() function
    createParticle(event.clientX, event.clientY, container);
  }
}

function createParticle(x: number, y: number, container) {
  const particle = document.createElement("particle");
  container.appendChild(particle);
  let width: number | "auto" = Math.floor(Math.random() * 30 + 8);
  let height: number | "auto" = width;
  let destinationX = (Math.random() - 0.5) * 175;
  let destinationY = (Math.random() - 0.5) * 175;
  let rotation = Math.random() * 520;
  let delay = Math.random() * 200;

  particle.innerHTML = ["❤","🧡","💛","💚","💙","💜","🤎"][Math.floor(Math.random() * 7)];
  particle.style.fontSize = `${Math.random() * 14 + 10}px`;
  width = height = "auto";

  particle.style.width = `${width}px`;
  particle.style.height = `${height}px`;
  const animation = particle.animate([
    {
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
      opacity: 1
    },
    {
      transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
      opacity: 0
    }
  ], {
    duration: Math.random() * 1000 + 3000,
    easing: "cubic-bezier(0, .9, .57, 1)",
    delay: delay
  });

  animation.onfinish = () => {
    particle.remove();
  };
}

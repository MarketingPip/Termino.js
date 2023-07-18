
function typeWriter(term) {
  let typewriterEl = null;
  const observer = new MutationObserver(() => {
    typewriterEl = document.body.querySelector(".termino-typewriter");
  });
  observer.observe(document.body, { childList: true, subtree: true });

  return (text, options = {}) => {
    const {
      speed = 100,
      deleteAfter = false,
      loop = false,
      loopDelay = 1000,
      loopCount = 1
    } = options;

    if (!typewriterEl) {
      term.echo(`<span class="termino-typewriter"></span>`);
      typewriterEl = document.body.querySelector(".termino-typewriter");
    }

    async function animateText(text) {
      let i = 0;
      while (i < text.length) {
        await new Promise(resolve => setTimeout(resolve, speed));
        typewriterEl.innerHTML += text.charAt(i);
        i++;
      }
      if (deleteAfter) {
        await new Promise(resolve => setTimeout(resolve, speed));
        while (typewriterEl.innerHTML.length > 0) {
          typewriterEl.innerHTML = typewriterEl.innerHTML.slice(0, -1);
          await new Promise(resolve => setTimeout(resolve, speed));
        }
      }
    }

    async function animate() {
      let loopIndex = 0;
      while (loopIndex < loopCount || loop) {
        await animateText(text);
        loopIndex++;
        if (loopIndex < loopCount || loop) {
          await new Promise(resolve => setTimeout(resolve, loopDelay));
          typewriterEl.innerHTML = "";
        }
      }
    }

    return animate();
  };
}


await typeWriter(term)("Hello, worcvld!", { speed: 150, deleteAfter: true, loopCount:4 })

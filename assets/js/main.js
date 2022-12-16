window.onload = () => {
    document.querySelector('.navbar-toggle').addEventListener('click', (event) => {
      document.querySelector('.left-elements').classList.toggle('left-elements-display');
    });
  }
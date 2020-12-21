// função de click

export function back() {
    const backButton = document.querySelector('#btn-back');
  
      backButton.addEventListener('click', () => {
      window.location = '#';
    });
}  

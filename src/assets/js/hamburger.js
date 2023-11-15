document.querySelector('.hamburger')?.addEventListener('click', () => {
    const navLinksElem = document.querySelector('.nav-links');
    const hamburgerElem = document.querySelector('.hamburger');
    const linesElem = document.querySelector('.hamburger .lines');
    const lineCrossElem = document.querySelector('.hamburger .line-cross');
    if (navLinksElem && hamburgerElem && linesElem && lineCrossElem) {
        navLinksElem.classList.toggle('hidden');
        navLinksElem.classList.toggle('nav-links-hamburger');
        linesElem.classList.toggle('hidden');
        lineCrossElem.classList.toggle('hidden');
    }
});
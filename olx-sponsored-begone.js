function removeElementsWithText() {
    const parentElements = document.querySelectorAll('[data-cy="l-card"]');

    parentElements.forEach(parent => {
        const childElements = parent.querySelectorAll('*');

        childElements.forEach(child => {
            if (child.textContent.includes('Wyróżnione')) {
                child.remove();
            }
        });
    });
}

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
            removeElementsWithText();
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

removeElementsWithText();

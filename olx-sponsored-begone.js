// ==UserScript==
// @name         OLX Sponsored Begone
// @namespace    https://github.com/b13kjack/OLX-Sponsored-Begone-Script
// @version      2024-02-08
// @description  Remove sponsored listings cus they annoy the shit out of me whenever I sort listings and try to browse them.
// @author       You
// @downloadURL  https://raw.githubusercontent.com/b13kjack/OLX-Sponsored-Begone-Script/main/olx-sponsored-begone.js
// @updateURL    https://raw.githubusercontent.com/b13kjack/OLX-Sponsored-Begone-Script/main/olx-sponsored-begone.js
// @supportURL   https://github.com/b13kjack/OLX-Sponsored-Begone-Script/issues
// @match        https://olx.pl/*
// @match        https://*.olx.pl/*
// @match        https://olx.pl*
// @match        https://*.olx.pl*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=olx.pl
// @grant        none
// ==/UserScript==
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

function addButton() {
    const existingButton = document.querySelector('.css-toggle-button');
    if (!existingButton) {
        // Create a new button element
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-testid="toggle-icon" class="css-toggle-icon"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="currentColor" fill-rule="evenodd"></path></svg>';
        toggleButton.classList.add('css-toggle-button');

        // Add event listener to toggle the visibility of sponsored listings
        toggleButton.addEventListener('click', () => {
            const sponsoredListings = document.querySelectorAll('[data-cy="l-card"]');
            sponsoredListings.forEach(listing => {
                if (listing.textContent.includes('Wyróżnione')) {
                    listing.style.display = listing.style.display === 'none' ? 'block' : 'none';
                }
            });
        });

        // Append the toggle button to a different element
        const headerContainer = document.querySelector('.css-1j9yj0v');
        headerContainer.appendChild(toggleButton);
    }
}

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
            removeElementsWithText();
            addButton();
        }
        if (mutation.removedNodes.length) {
            addButton();
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

removeElementsWithText();
addButton();

// ==UserScript==
// @name         OLX Sponsored Begone / Ukrywacz ofert sponsorowanych na OLX
// @namespace    https://github.com/b13kjack/OLX-Sponsored-Begone-Script
// @version      2024-02-08
// @description  Hides sponsored listings / Ukrywa oferty sponsorowane
// @author       b13kjack
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
function ensureToggleButtonExists() {
    const existingButton = document.querySelector('[data-testid="grid-icon"]');

    if (!document.querySelector('[data-testid="grid-icon-duplicate"]') && existingButton) {
        const newButton = document.createElement('button');
        newButton.setAttribute('data-testid', 'grid-icon-duplicate');
        newButton.textContent = 'Toggle Sponsored Listings';
        newButton.style.cssText = window.getComputedStyle(existingButton).cssText;
        existingButton.insertAdjacentElement('afterend', newButton);

        newButton.addEventListener('click', () => {
            toggleSponsoredListings();
        });
    }
}

function toggleSponsoredListings() {
    const parentElements = document.querySelectorAll('[data-cy="l-card"]');

    parentElements.forEach(parent => {
        const childElements = parent.querySelectorAll('*');

        childElements.forEach(child => {
            if (child.textContent.includes('Wyróżnione')) {
                child.style.display = areSponsoredListingsHidden ? 'none' : 'block';
            }
        });
    });

    areSponsoredListingsHidden = !areSponsoredListingsHidden;
}

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                if (areSponsoredListingsHidden) {
                    toggleSponsoredListings();
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

let areSponsoredListingsHidden = true;
toggleSponsoredListings();

setInterval(ensureToggleButtonExists, 1000);
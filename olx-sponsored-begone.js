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
let areSponsoredListingsHidden = true; 
let isRearrangingListings = false;

function ensureToggleButtonExists() {
    if (!document.querySelector('[data-testid="grid-icon-duplicate"]')) {
        const existingButton = document.querySelector('[data-testid="grid-icon"]');
        if (existingButton) {
            const newButton = document.createElement('button');
            newButton.setAttribute('data-testid', 'grid-icon-duplicate');
            newButton.textContent = 'Toggle Sponsored Listings';
            newButton.style.cssText = window.getComputedStyle(existingButton).cssText;
            existingButton.insertAdjacentElement('afterend', newButton);
            newButton.addEventListener('click', toggleSponsoredListings);
        }
    }
}

function toggleSponsoredListings() {
    areSponsoredListingsHidden = !areSponsoredListingsHidden;
    const listingsContainer = document.querySelector('[data-container-for-listings]');

    isRearrangingListings = true;

    document.querySelectorAll('[data-cy="l-card"]').forEach(card => {
        if (card.textContent.includes('Wyróżnione')) {
            card.style.display = areSponsoredListingsHidden ? 'none' : '';
            if (!areSponsoredListingsHidden) {
                listingsContainer.insertBefore(card, listingsContainer.firstChild);
            }
        }
    });

    isRearrangingListings = false;
}

function handleNewListings(mutations) {
    if (isRearrangingListings) return;

    mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
            toggleSponsoredListings();
        }
    });
}

const observer = new MutationObserver(handleNewListings);
observer.observe(document.body, { childList: true, subtree: true });

ensureToggleButtonExists();
if (areSponsoredListingsHidden) {
    toggleSponsoredListings();
}

setInterval(ensureToggleButtonExists, 5000);

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

function createToggleButton() {
    const existingButton = document.querySelector('[data-testid="grid-icon"]');
    if (existingButton && !document.querySelector('[data-testid="grid-icon-duplicate"]')) {
        const newButton = document.createElement('button');
        newButton.setAttribute('data-testid', 'grid-icon-duplicate');
        newButton.textContent = 'Toggle Sponsored Listings';
        newButton.style.cssText = window.getComputedStyle(existingButton).cssText;
        existingButton.insertAdjacentElement('afterend', newButton);
        newButton.addEventListener('click', toggleSponsoredListings);
    }
}

function toggleSponsoredListings() {
    areSponsoredListingsHidden = !areSponsoredListingsHidden;
    const listingsContainer = document.querySelector('[data-container-for-listings]');

    isRearrangingListings = true;

    const allListings = Array.from(document.querySelectorAll('[data-cy="l-card"]'));
    const sponsoredListings = allListings.filter(card => card.textContent.includes('Wyróżnione'));

    if (areSponsoredListingsHidden) {
        sponsoredListings.forEach(card => card.style.display = 'none');
    } else {

        sponsoredListings.forEach(card => {
            card.style.display = '';
            if (!listingsContainer.contains(card)) {
                listingsContainer.insertBefore(card, listingsContainer.firstChild);
            }
        });
    }

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

window.addEventListener('load', () => {
    observer.observe(document.body, { childList: true, subtree: true });
    createToggleButton();
    if (areSponsoredListingsHidden) {
        toggleSponsoredListings();
    }
});
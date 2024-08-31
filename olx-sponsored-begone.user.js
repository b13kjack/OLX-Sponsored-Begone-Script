/* jshint esversion: 6 */
// ==UserScript==
// @name             OLX Sponsored Begone 
// @name:pl          Ukrywacz ofert sponsorowanych na OLX
// @namespace        https://github.com/b13kjack/OLX-Sponsored-Begone-Script
// @version          2024-08-31
// @description      Hides sponsored listings on olx.pl
// @description:pl   Ukrywa oferty sponsorowane na olx.pl
// @author           b13kjack
// @license          MIT
// @downloadURL      https://raw.githubusercontent.com/b13kjack/OLX-Sponsored-Begone-Script/main/olx-sponsored-begone.user.js
// @updateURL        https://raw.githubusercontent.com/b13kjack/OLX-Sponsored-Begone-Script/main/olx-sponsored-begone.user.js
// @supportURL       https://github.com/b13kjack/OLX-Sponsored-Begone-Script/issues
// @match            https://olx.pl/*
// @match            https://*.olx.pl/*
// @match            https://olx.pl*
// @match            https://*.olx.pl*
// @icon             https://www.google.com/s2/favicons?sz=64&domain=olx.pl
// @grant            none
// ==/UserScript==
let areSponsoredListingsHidden = true;

function ensureToggleButtonExists() {
    if (!document.querySelector('[data-testid="grid-icon-duplicate"]')) {
        const existingButton = document.querySelector('[data-testid="grid-icon"]');
        if (existingButton) {
            const newButton = document.createElement('button');
            newButton.setAttribute('data-testid', 'grid-icon-duplicate');
            newButton.textContent = 'Wyświetl/Ukryj Oferty Sponsorowane';
            newButton.style.cssText = window.getComputedStyle(existingButton).cssText;
            existingButton.insertAdjacentElement('afterend', newButton);
            newButton.addEventListener('click', () => {
                areSponsoredListingsHidden = !areSponsoredListingsHidden;
                updateSponsoredListingsVisibility();
            });
        }
    }
}

function updateSponsoredListingsVisibility() {
    const listingsContainer = document.querySelector('[data-container-for-listings]');

    if (areSponsoredListingsHidden) {
        document.querySelectorAll('[data-cy="l-card"]').forEach(card => {
            if (card.textContent.includes('Wyróżnione')) {
                card.style.display = 'none';
            }
        });
    } else {
        const sponsoredListings = [];
        document.querySelectorAll('[data-cy="l-card"]').forEach(card => {
            if (card.textContent.includes('Wyróżnione')) {
                card.style.display = '';
                sponsoredListings.push(card);
            }
        });
        sponsoredListings.reverse().forEach(card => {
            listingsContainer.insertBefore(card, listingsContainer.firstChild);
        });
    }
}

setInterval(ensureToggleButtonExists, 5000);

function handleNewListings(mutations) {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
            updateSponsoredListingsVisibility();
        }
    });
}

const observer = new MutationObserver(handleNewListings);

observer.observe(document.body, { childList: true, subtree: true });

ensureToggleButtonExists();
updateSponsoredListingsVisibility();

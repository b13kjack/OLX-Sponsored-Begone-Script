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

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
            removeElementsWithText();
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

removeElementsWithText();

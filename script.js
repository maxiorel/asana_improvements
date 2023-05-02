// ==UserScript==
// @name         Asana Customizer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       Jan Polzer
// @match        https://app.asana.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=asana.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(".FullWidthPageStructureWithDetailsOverlay--withDetailsOverlayOpen .FullWidthPageStructureWithDetailsOverlay-mainContent{ opacity: 0.2;}")
    GM_addStyle(".FullWidthPageStructureWithDetailsOverlay--withDetailsOverlayOpen .FullWidthPageStructureWithDetailsOverlay-detailsOverlay{ box-shadow: 0 0 300px #aaa; }")
    GM_addStyle(".FullWidthPageStructureWithDetailsOverlay--withDetailsOverlayOpen .FullWidthPageStructureWithDetailsOverlay-detailsOverlay{transform: translateX(-175%) !important;} ")
    GM_addStyle(".FullWidthPageStructureWithDetailsOverlay--shrinkMainContentForOverlay .FullWidthPageStructureWithDetailsOverlay-fullWidth{ width: 100% !important; }")
    GM_addStyle(".SidebarFavoritesAndMore-toggleSpecialSearchesButton{ display: none !important; }")

    var timerID = setTimeout(performIntervalActions, 1000);
    function performIntervalActions() {
        var i;
        // Expand favorites
        var favorites = document.querySelectorAll(".SidebarFavoritesAndMore-toggleSpecialSearchesText");
        favorites.forEach((item) => {
          item.click();
        });
        // Expand "Show More Projects"
        var projects = document.querySelectorAll(".SidebarTeamDetailsProjectsList-showMoreProjectsLink");
        projects.forEach((item) => {
          item.click();
        });
    }

    // Load Subtask automaticaly by Aron Beal (https://forum.asana.com/t/allow-to-load-all-sub-tasks-at-once/43620/12)
    var count = 10;
    var ival = window.setInterval(() => {
      count--;
      if(count <= 0){
        window.clearInterval(ival);
      }
      let links = document.querySelectorAll('.SubtaskGrid-loadMore');
      if(links.length === 0){
        return;
      }
      Array.from(links).map((link) => {
        link.click();
      });
    }, 1000);

    // replace icon in task with closing icon
    var count2 = 10;
    var ival2 = window.setInterval(() => {
      count2--;
      if(count2 <= 0){
        window.clearInterval(ival2);
      }
      document.querySelectorAll('.Icon.CloseIcon').forEach((item) => {
        item.parentNode.innerHTML = '<svg class="Icon XIcon" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M18.1,16L27,7.1c0.6-0.6,0.6-1.5,0-2.1s-1.5-0.6-2.1,0L16,13.9l-8.9-9C6.5,4.3,5.6,4.3,5,4.9S4.4,6.4,5,7l8.9,8.9L5,24.8c-0.6,0.6-0.6,1.5,0,2.1c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4l8.9-8.9l8.9,8.9c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L18.1,16z"></path></svg>';
      });
    }, 1000);


})();

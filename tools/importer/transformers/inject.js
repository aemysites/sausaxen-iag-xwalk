/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-disable no-console */
(() => {
    // Update the flex-direction of the div(s) containing an aside element to 'column'
  
    // Get all aside elements and their parent divs
   
  // Remove site header for NRMA Home Loans pages
  try {
    const href = (window.location && window.location.href) || '';
    if (href.includes('nrma.com.au/home-loans')) {
      const headerSelectors = [
        '#container-f0d5d677e9 > div > div > div',
        'header',
        'div[role="banner"]',
        '.site-header',
        '.c-header',
        '#header',
        'nav.c-global-header',
        'header[aria-label="Site header"]'
      ];
      const tryRemoveHeader = () => {
        let removed = false;
        headerSelectors.forEach((sel) => {
          const nodes = document.querySelectorAll(sel);
          nodes.forEach((node) => {
            if (node && node.parentElement) {
              node.parentElement.removeChild(node);
              removed = true;
            }
          });
        });
        return removed;
      };
      // Try immediately and retry briefly in case header renders late
      tryRemoveHeader();
      let attempts = 0;
      const maxAttempts = 5;
      const interval = setInterval(() => {
        if (tryRemoveHeader() || ++attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 300);
    }
  } catch (e) {
    // noop
  }
  })();
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
  try {
    // remove site header for NRMA Home Loans pages
    document.querySelector('.cmp-header-v2')?.remove();

    // remove modal for NRMA Home Loans pages
    document.querySelector('#chatXfModal')?.remove();

    // remove chatbot for NRMA Home Loans pages
    document.querySelector('#nuanMessagingFrame')?.remove();

    // remove footer for NRMA Home Loans pages
    document.querySelector('.cmp-footer--generic-template')?.remove();

    // Remove site header for NRMA pages
    document.querySelector('#nav-bar')?.remove();
  } catch (e) {
    // noop
  }
})();
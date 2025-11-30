// ==UserScript==
// @name           Mobile buttons for lunabooru.org
// @namespace      de.luckydonald.userstyles.philomenia-booru-mobile-friendly-buttons
// @version      2025.11.30.3
// @description  Retrieves a .css file referenced by @resource and injects it safely under CSP.
// @match        *://derpibooru.org/*
// @match        *://trixiebooru.org/*
// @match        *://ponerpics.org/*
// @match        *://manebooru.art/*
// @match        *://twibooru.org/*
// @match        *://lunabooru.org/*
// @match        *://ponybooru.org/*
// @match        *://tantabus.ai/*
// @grant        GM.info
// @grant        GM.xmlhttpRequest
// @grant        GM.addStyle
// @grant        GM.getResourceText
// @resource     css https://raw.githubusercontent.com/luckydonald/userstyles/mane/ViolentMonkey/philomenia-booru-mobile-friendly-buttons.css
// @updateURL    https://raw.githubusercontent.com/luckydonald/userstyles/mane/ViolentMonkey/philomenia-booru-mobile-friendly-buttons.user.js
// ==/UserScript==

(async function () {
  'use strict';

  console.log('GM.info', { GM_info: GM_info, 'GM.info': GM.info })
  const updateUrl = GM.info.script.updateURL;
  const cssUrl = updateUrl.replace(/\.js$/i, '.css')

  const control = GM.xmlhttpRequest({
      method: 'GET',
      url: cssUrl,
      responseType: 'text',
      anonymous: true,          // no credentials, respects CSP
  });
  const res = await control;
  const resp = await res;
  if (resp.status >= 200 && resp.status < 300) {
      console.debug('Completed css request', { control, res: JSON.stringify(res) });
      GM.addStyle(resp.data);
     return;
  } else {
      console.error('Failed css request', { control, res: JSON.stringify(res) });
      // throw new Error(`HTTP ${resp.satus}`);
  }
  const textResp = await GM.getResourceText('css');
  console.debug('Completed getResourceText request', { textResp });
  const style = GM.addStyle(textResp);
  console.debug('Added css', { style });



})();

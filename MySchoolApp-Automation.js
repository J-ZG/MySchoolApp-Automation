// ==UserScript==
// @name         MySchoolApp Automation
// @namespace    https://github.com/J-ZG/MySchoolApp-Automation
// @version      2.1
// @description  Automatically clicks buttons in the Blackbaud MySchoolApp student portal.
// @author       Odpe
// @match        https://*.myschoolapp.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/J-ZG/MySchoolApp-Automation/main/MySchoolApp-Automation.js
// @updateURL    https://raw.githubusercontent.com/J-ZG/MySchoolApp-Automation/main/MySchoolApp-Automation.js
// ==/UserScript==

(() => {
    'use strict'

    const consoleStyle = 'font-weight: bold'
    const urls = {
        assignmentCenter: '.myschoolapp.com/lms-assignment/assignment-center/student',
        login: '#login'
    }

    const observeNewElements = (callback) => {
        new MutationObserver(callback).observe(document.body, { subtree: true, childList: true, attributes: true })
    }

    if (location.href.includes(urls.assignmentCenter)) {
        console.log(`%cMA: Assignment Center URL`, consoleStyle)
        observeNewElements(() => {
            const listView = document.querySelector('sky-radio[iconname="text-bullet-list"]:not([MA-data-clicked]) input[name="viewMode"]')
            if (!listView) return;
            listView.click()
            listView.closest('sky-radio').setAttribute('MA-data-clicked', 'true')
            console.log(`%cMA Clicked List View:`, consoleStyle, listView)

            const completedNode = document.evaluate(
                "//*[normalize-space(text())='Completed']",
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;
            if (!completedNode) return;
            const label = completedNode.closest('label');
            if (!label) return;
            if (label.getAttribute('MA-data-clicked') === 'true') return;
            const checkbox = label.querySelector('input[type="checkbox"]');
            if (!checkbox) return;
            if (!!label.querySelector('.sky-checkbox-icon-modern-checked')) {
                label.setAttribute('MA-data-clicked', 'true');
                checkbox.click();
                console.log(`%cMA Clicked Completed Checkbox:`, consoleStyle, checkbox)
            }
        })
    }

    addEventListener("hashchange", () => {
        if (window.location.hash === urls.login) {
            console.log(`%cLogin URL`, consoleStyle)
            observeNewElements(() => {
                const nextButton = document.querySelector('input[value="Next"]')
                const rememberMeCheckbox = document.querySelector('input[checked="checked"]')
                const usernameInput = document.querySelector('#Username')
                if (nextButton && rememberMeCheckbox && usernameInput && usernameInput.value.includes('@')) {
                    nextButton.click()
                    console.log(`%cMA Clicked Next Button:`, consoleStyle, nextButton)
                }
            })
        }
    })
    window.dispatchEvent(new Event('hashchange'))
})()

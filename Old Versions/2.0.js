// ==UserScript==
// @name         MySchoolApp Automation
// @namespace    https://github.com/J-ZG/MySchoolApp-Automation
// @version      2.0
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
            const listView = document.querySelector('sky-radio[icon="list"]:not([MA-data-clicked]) input[type="radio"]')
            if (listView) {
                listView.click()
                listView.closest('sky-radio').setAttribute('MA-data-clicked', 'true')
                console.log(`%cMA Clicked List View:`, consoleStyle, listView)
            }
            const completedCheckbox = Array.from(document.querySelectorAll("span.ng-star-inserted:not([MA-data-clicked])"))
                .find(el => el.textContent.includes("Completed"))
                ?.closest("label.sky-checkbox-wrapper.sky-switch")
            if (completedCheckbox && completedCheckbox.querySelector('sky-icon[icon="check"]')) {
                completedCheckbox.click()
                completedCheckbox.querySelector("span.ng-star-inserted").setAttribute('MA-data-clicked', 'true')
                console.log(`%cMA Clicked Completed Checkbox:`, consoleStyle, completedCheckbox)
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

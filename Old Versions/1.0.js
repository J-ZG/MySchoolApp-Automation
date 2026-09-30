// ==UserScript==
// @name         MySchoolApp Automation
// @namespace    https://github.com/J-ZG/MySchoolApp-Automation
// @version      1.0
// @description  Automatically clicks buttons in the Blackbaud MySchoolApp student portal.
// @author       Odpe
// @match        https://*.myschoolapp.com/app*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/J-ZG/MySchoolApp-Automation/main/MySchoolApp-Automation.js
// @updateURL    https://raw.githubusercontent.com/J-ZG/MySchoolApp-Automation/main/MySchoolApp-Automation.js
// ==/UserScript==


(function () {
    'use strict'

    // Timeout (milliseconds) in polling/clicking loops 
    const pollingSpeed = 50

    const style1 = 'font-weight: bold'
    const style2 = 'text-decoration: line-through; color: grey'

    const findAndClick = (identifier) => {
        console.log(`%cMA: Attempting ${identifier}`, style2)
        const element = document.querySelector(identifier)
        if (element) {
            element.click()
            console.log(`%cMA: Clicked ${identifier}`, style1)
        } else {
            setTimeout(() => findAndClick(identifier), pollingSpeed)
        }
    }

    addEventListener("hashchange", () => {
        const currentHash = window.location.hash

        if (currentHash === '#studentmyday/assignment-center') {
            console.log('%cMA: Assignment Center Hash', style1); // This semicolon is REQUIRED
            ['[data-sort="date_due"]', '[data-sort="date_due"]', '#month-view', '#filter-status', '.status-button.active[data-id="1"]', '#btn-filter-apply'].forEach(findAndClick)
        }

        if (currentHash === '#login') {
            console.log('%cMA: Login Hash', style1)
            const checkInputAndCheckbox = () => {
                console.log('%cMA: Checking input & checkbox', style2)
                const input = document.querySelector('#Username')
                const checkbox = document.querySelector('#remember')
                if (input && input.value.includes('@') && checkbox && checkbox.checked) {
                    console.log('%cMA: Input & checkbox conditions met', style1)
                    findAndClick('#nextBtn')
                } else {
                    setTimeout(checkInputAndCheckbox, pollingSpeed)
                }
            }
            checkInputAndCheckbox()
        }
    })

    window.dispatchEvent(new Event('hashchange'))
})()

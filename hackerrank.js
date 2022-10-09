const puppeteer = require('puppeteer');
const url = 'https://www.hackerrank.com/auth/login';
const codeObj = require('./codes');

const personalInfo = require('./info');
const email = personalInfo.email;
const password = personalInfo.password;

// console.log("before");
(async function () {
    try {
        const browserOpenPromise = await puppeteer.launch({
            headless: false, //to show Chrome while Puppeteer is performing its operations. It can be nice to see what’s happening and debug.
            defaultViewport: null,
            args: ["--start-maximized"]
        });

        let browserPages = await browserOpenPromise.pages(); //CURRENTLY OPENED TABS
        let page = browserPages[0]; //BRINGS YOU THE CURRENT TAB
        await page.goto(url);
        //WAITING FOR THE EMAIL ELEMENT TO APPEAR ON THE PAGE: THIS IS A GOOD PRACTICE
        await page.waitForSelector("input[id='input-1']", { visible: true });
        await page.type("input[id='input-1']", email, { delay: 50 });
        //WAITING FOR THE PASSWORD ELEMENT TO APPEAR ON THE PAGE: THIS IS A GOOD PRACTICE
        await page.waitForSelector("input[type='password']", { visible: true });
        await page.type("input[type='password']", password, { delay: 50 });
        await page.click('button[data-analytics="LoginPassword"]', { delay: 50 });
        await waitAndClick('.dashboard-topics .topic-card a[data-attr1="algorithms"]', page);
        await waitAndClick('input[value="warmup"]', page);
        let questionsArr = await page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 50 }); // $$ SIGNIFIES document.querySelectorAll(); AND RETURNS A PROMISE
        await questionSolver(page, questionsArr[1], codeObj.answers[0]);
    }
    catch (err) {
        console.log(err);
    }
})();

async function waitAndClick(selector, cPage) {
    await cPage.waitForSelector(selector);
    let selectorClicked = await cPage.click(selector);
    return selectorClicked;
}

async function questionSolver(page, question, answer) {
    await question.click();
    await waitAndClick('.hr-monaco-editor-parent', page);
    await waitAndClick('.checkbox-input', page);
    await page.waitForSelector('textarea.custominput');
    await page.type('textarea.custominput', answer, { delay: 10 });
    await page.keyboard.down('Control');
    await page.keyboard.press('A', { delay: 100 });
    await page.keyboard.press('X', { delay: 100 });
    await page.keyboard.up('Control');
    await waitAndClick('.hr-monaco-editor-parent', page);
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');
    await page.click('.hr-monaco__run-code', { delay: 50 });
}
const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { buttonDisabled, clickElement, putText, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});


Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client${string}`, {
    setTimeout: 20000,
  });
});

When('user selects date',{timeout: 60 * 1000}, async function () {
  return await clickElement(this.page, "nav[class='page-nav'] a:nth-child(4)");
});

When('user selects session', async function () {
  return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='217']");
});

When('user selects session Mickey mouse', async function () {
  return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='218']");
});

When('user selects 5th row 5th place', async function () {
  return  await clickElement(this.page, "div:nth-child(5) span:nth-child(5)");
});

When('user selects 4th row 3th place', async function () {
  return  await clickElement(this.page, "div:nth-child(4) span:nth-child(3)");
});

When('user selects 4th row 6th place', async function () {
  return  await clickElement(this.page, "div:nth-child(4) span:nth-child(6)");
});

When('user selects 4th row 7th place', async function () {
  return  await clickElement(this.page, "div:nth-child(4) span:nth-child(7)");
});

When('user reserves a seat', async function () {
  return await clickElement(this.page, ".acceptin-button");
});

When('user selects 9th row 2th place', {timeout: 40 * 1000}, async function () {
  return await clickElement(this.page, "div:nth-child(9) span:nth-child(2)");
});

Then('user sees an inactive Book button', {timeout: 60 * 1000}, async function () {
  const actual = await buttonDisabled(this.page, ".acceptin-button");
  await expect(actual).equal(true);
});

Then('user sees {string}', async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

Then('user see {string}', async function (string) {
  const actual = await getText(this.page, ".ticket__info-wrapper");
  const expected = await string;
  expect(actual).contains(expected);
});


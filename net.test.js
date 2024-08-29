const { buttonDisabled, clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe.only("Ticket booking app tests", () => {
  beforeEach(async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  test("Successful booking of one seat", async () => {
    await page.waitForSelector("h1");
    await clickElement(page, "nav[class='page-nav'] a:nth-child(4)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='217']");
    await clickElement(page, "div:nth-child(5) span:nth-child(5)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    const expected = "Вы выбрали билеты";
    await expect(actual).toContain(expected);
  }, 60000);

  test("Successful booking of three seat", async () => {
    await page.waitForSelector("h1");
    await clickElement(page, "nav[class='page-nav'] a:nth-child(4)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='218']");
    await clickElement(page, "div:nth-child(4) span:nth-child(3)");
    await clickElement(page, "div:nth-child(4) span:nth-child(6)");
    await clickElement(page, "div:nth-child(4) span:nth-child(7)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__info-wrapper");
    const expected = "Приятного просмотра!";
    await expect(actual).toContain(expected);
  }, 60000);

  test("Reservation of a occupied seat", async () => {
    await page.waitForSelector("h1");
    await clickElement(page, "nav[class='page-nav'] a:nth-child(4)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='218']");
    await clickElement(page, "div:nth-child(9) span:nth-child(2)");
    const actual = await buttonDisabled(page, ".acceptin-button");
    await expect(actual).toEqual(true);
  }, 60000);
});
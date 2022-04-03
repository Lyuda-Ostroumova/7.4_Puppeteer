const jestConfig = require("./jest.config");

let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    await page.setDefaultTimeout(6000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  });

  test("The first link attribute", async () => {
    await page.setDefaultTimeout(3000);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    await page.setDefaultTimeout(6000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  });
});

 test("Marketplace page", async() => {
  await page.goto("https://github.com/marketplace");
   const pageTitle = await page.title();
   expect(pageTitle).toEqual("GitHub Marketplace · to improve your workflow · GitHub");
 });

describe("Security page", () => {

   beforeEach(async() => {
   await page.goto("https://github.com/features/security/code")
 }, 6000);

 test("Security page header", async() => {
   const pageHeader = await page.$("div.sub-nav-mktg.js-toggler-container.js-sticky.js-position-sticky.top-0.width-full.z-3 > div > a");
   const elementText = await pageHeader.evaluate((el) => el.textContent);
   expect(elementText).toEqual("Security");
  }, 45000);

  test("Contact sales button", async() => {
    const contactBtn = await "div > p:nth-child(3) > a.btn-mktg.mb-3.btn-large-mktg.btn-muted-mktg";
    const contactBtnText = await page.$eval(contactBtn, (el) => el.textContent);
    expect(contactBtnText).toContain("Contact sales");    
  }, 45000);

});


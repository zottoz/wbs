const puppeteer = require('puppeteer');

function ws()
{
  (async () => {
    try {
      const browser = await puppeteer.launch({
        headless: true, 
        args: ['--no-sandbox']
      })

      const page = await browser.newPage();
      await page.goto('https://www.tibiaplay.com/');
      await page.waitForSelector('#lastResults', { timeout: 1000 });

      let listSelector="#lastResults > li";

      var results = await page.evaluate((selector) => {
        const list = Array.from(document.querySelectorAll(selector));
        return list.map(data => [parseInt(data.innerHTML), data._prevClass]);
      }, listSelector);

      console.log(results)


      await browser.close();
    } catch (error) {
      console.log(error);
    }
  })();
}

(function(){
  setInterval(ws, 10000);
})();

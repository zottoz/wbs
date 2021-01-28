const p = require('puppeteer');

function ws()
{
  (async () => {
    try {
      const browser = await p.launch({
        headless: true, 
        args: ['--no-sandbox']
      })

      const page = await browser.newPage()
      await page.goto('https://www.tibiaplay.com/')
      await page.waitForSelector('#lastResults', { timeout: 1000 })

      let seletorDaLista="#lastResults > li"

      var resultado = await page.evaluate((seletor) => {
        const lista = Array.from(document.querySelectorAll(seletor))
        return lista.map(data => [parseInt(data.innerHTML), data._prevClass])
      }, seletorDaLista)


      //remove os itens nulos
      resultado.splice(0,1)
      resultado.splice(9,9)

      console.log(resultado)
      console.log("Proxima leitura...")

      await browser.close()

    } catch (error) {
      console.log(error)
    }
  })();
}

(function(){
  setInterval(ws, 10000)
})();

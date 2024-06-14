import puppeteer from 'puppeteer-extra';

// Stealth plugin issue - There is a good fix but currently this works.
require('puppeteer-extra-plugin-user-data-dir')
require('puppeteer-extra-plugin-user-preferences')
require('puppeteer-extra-plugin-stealth/evasions/chrome.app')
require('puppeteer-extra-plugin-stealth/evasions/chrome.csi')
require('puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes')
require('puppeteer-extra-plugin-stealth/evasions/chrome.runtime')
require('puppeteer-extra-plugin-stealth/evasions/defaultArgs') // pkg warned me this one was missing
require('puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow')
require('puppeteer-extra-plugin-stealth/evasions/media.codecs')
require('puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency')
require('puppeteer-extra-plugin-stealth/evasions/navigator.languages')
require('puppeteer-extra-plugin-stealth/evasions/navigator.permissions')
require('puppeteer-extra-plugin-stealth/evasions/navigator.plugins')
require('puppeteer-extra-plugin-stealth/evasions/navigator.vendor')
require('puppeteer-extra-plugin-stealth/evasions/navigator.webdriver')
require('puppeteer-extra-plugin-stealth/evasions/sourceurl')
require('puppeteer-extra-plugin-stealth/evasions/user-agent-override')
require('puppeteer-extra-plugin-stealth/evasions/webgl.vendor')
require('puppeteer-extra-plugin-stealth/evasions/window.outerdimensions')

import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin())

export default async function handler(req, res) {
  let {body,method} = req

  // Some header shits
  if (method !== 'POST') {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    return res.status(200).end()
  }

  // Some checks...
  if (!body) return res.status(400).end(`No body provided`)
  if (typeof body === 'object' && !body.id) return res.status(400).end(`No url provided`)

  const id = body.id;

  // create browser based on ENV
  const browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      args: [
        "--no-sandbox",
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disable-gpu-shader-disk-cache',
        '--media-cache-size=0',
        '--disk-cache-size=0',
      ]
    })
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  // Set headers,else wont work.
  await page.setExtraHTTPHeaders({ 'Referer': 'https://flixhq.to/' });

  const logger = [];
  const finalResponse= {source:'',subtitle:[]}

  page.on('request', async (interceptedRequest) => {
    await (async () => {
      logger.push(interceptedRequest.url());
      if (interceptedRequest.url().includes('.m3u8')) finalResponse.source = interceptedRequest.url();
      interceptedRequest.continue();
    })();
  });

  page.on('response', async (interceptedResponse) => {
    if (interceptedResponse.url().includes('getSources')) {
      const text = await interceptedResponse.json();
      const sources = JSON.parse(JSON.stringify(text));
      finalResponse.subtitle.push(...sources.tracks);

    }
  });

  try {
    const [req] = await Promise.all([
      page.waitForRequest(req => req.url().includes('.m3u8'), { timeout: 20000 }),
      page.goto(`https://rabbitstream.net/v2/embed-4/${id}?z=&_debug=true`, { waitUntil: 'domcontentloaded' }),
    ]);
  } catch (error) {
    await browser.close();
    return res.status(500).end(`Server Error,check the params.`)
  }
  await browser.close();

  // Response headers.
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
  res.setHeader('Content-Type', 'application/json')
  // CORS
  // res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  //res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  res.json(finalResponse);
};

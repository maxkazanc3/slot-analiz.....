import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Yalnızca POST desteklenir" });
  }

  const { userId, username, password, siteUrl, game } = req.body;

  if (!userId || !username || !password || !siteUrl || !game) {
    return res.status(400).json({ error: "Tüm alanlar zorunludur." });
  }

  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath || "/usr/bin/chromium-browser",
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(siteUrl, { waitUntil: "networkidle2" });

    const analysisResult = {
      game,
      purchaseAmountTL: Math.floor(Math.random() * 50) + 1,
      freespinAvailable: true,
      suggestedBet: Math.floor(Math.random() * 20) + 1,
      estimatedWinRate: "Yüksek",
      timestamp: new Date().toISOString(),
    };

    await browser.close();
    return res.status(200).json(analysisResult);
  } catch (error) {
    if (browser) await browser.close();
    return res.status(500).json({ error: "Analiz hatası: " + error.message });
  }
}
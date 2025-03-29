const puppeteer = require('puppeteer');

async function research(req, res) {
    const search = req.query.search; // Get the search term from the request query
    console.log("Search:",search);
    const url = 'https://indiankanoon.org/browselaws/';

    const main = async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // Evaluate the page content and filter links based on the search term
        const filteredDocs = await page.evaluate((search) => {
            const articleLinks = document.querySelectorAll('a');
            return Array.from(articleLinks)
                .map((link) => {
                    const title = link.textContent;
                    const href = link.href;
                    return { title, href };
                })
                .filter((doc) => doc.title.toLowerCase().includes(search.toLowerCase()));
        }, search);

        await browser.close();
        return filteredDocs;
    };

    try {
        const data = await main();
        console.log(data);
        res.send(data); // Send the filtered data as a JSON response
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
}

module.exports = {
    research
};

const dotenv = require("dotenv");
const SitePrerender = require('site-prerender');
const path = require("path");
const fs = require("fs");

const cwd = process.cwd();
dotenv.config();
const buildDir = process.env.BUILD_DIR;

async function main() {
    if (!buildDir) {
        throw new Error("Build dir is not specified in .env file");
    }
    const distPath = path.join(cwd, buildDir);
    const tmpOutputPath = path.join(cwd, "output");

    const sp = new SitePrerender({
        staticPath: distPath,
        outputFolder: tmpOutputPath,
        routes: ['/', '/oauth'] // routes to crawl
    });

    await sp.init();
    await sp.start();
    await sp.close();

    fs.rmSync(distPath, { recursive: true, force: true }); // eski dist buildini sil
    fs.renameSync(tmpOutputPath, distPath); // outputu dist olarak yeniden isimlendir
}

main();

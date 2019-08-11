import { Browser, Page, launch } from 'puppeteer'
import { PageDetails } from '../schemas/PageDetails';
import { LinkDetails } from '../schemas/LinkDetails';

export class WebService {
    private browser: Browser
    private page: Page
    private url: string

    constructor(url: string) {
        this.url = url
    }

    async init(): Promise<void> {
        this.browser = await launch()
        this.page = await this.browser.newPage()
        await this.page.goto(this.url)
    }

    async getAllDetails(): Promise<Partial<PageDetails>> {
        await this.init()

        const [
            title,
            doctype,
            links
        ] = await Promise.all([
            this.getTitle(),
            this.getHtmlDoctype(),
            this.getLinks()
        ])

        await this.close()

        return {
            doctype,
            title,
            links
        }
    }

    async getTitle(): Promise<string> {
        return await this.page.title()
    }

    async getHtmlDoctype(): Promise<string> {
        return await this.page.evaluate(() => new XMLSerializer().serializeToString(document.doctype))
    }

    async getLinks(): Promise<LinkDetails[]> {
        return await this.page.$$eval('a', (links: HTMLAnchorElement[]) => links.map<LinkDetails>((link: HTMLAnchorElement) => ({
            internal: link.hostname === location.hostname || !link.hostname,
            text: link.text,
            url: link.href
        })))
    }

    async close(): Promise<void> {
        await this.browser.close()
    }
}
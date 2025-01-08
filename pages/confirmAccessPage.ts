import { Page } from "@playwright/test";

export class ConfirmAccessPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async confirmAccess() {
        await this.page.getByLabel('Password').fill(`${process.env.PASSWORD}`);
        await this.page.getByRole('button', { name: 'Confirm' }).click();
    }
}
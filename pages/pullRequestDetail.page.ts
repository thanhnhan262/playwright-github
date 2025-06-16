import { expect, Page } from "@playwright/test";

export default class PullRequestDetailPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async readPullRequestTitle(){
        return await this.page.locator('bdi').textContent();
    }

    /**
     * read state of pull request
     * @returns Open, Merged, Closed
     */
    async readPullRequestStatus(){
        return (await this.page.locator('.State').first().innerText()).trim();
    }
    async mergePullRequest(){
        await this.page.getByRole('button', { name: 'Merge pull request' }).click()
        await this.page.getByRole('button', { name: 'Confirm merge' }).click()
        await expect(this.page.getByRole('heading', { name: 'Pull request successfully' })).toBeVisible()
    }
}   
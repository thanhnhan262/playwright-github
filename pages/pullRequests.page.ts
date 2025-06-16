import { expect, Page } from "@playwright/test";

export default class PullRequestsPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async clickCreateNewPullRequest(){
        await this.page.getByRole('link', { name: 'New pull request' }).click()
        await expect(this.page.getByRole('heading', { name: 'Compare changes' })).toBeVisible()
    }

    async viewPullRequestDetail(pullRequestTitle: string){
        await this.page.getByRole('link', { name: pullRequestTitle }).click()
    }

    async readPullRequestList(): Promise<Array<string>> {
        return this.page.locator('[data-hovercard-type="pull_request"]').allTextContents()
    }
}
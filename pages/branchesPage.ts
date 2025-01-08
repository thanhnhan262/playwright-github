import { de } from "@faker-js/faker";
import { Page } from "@playwright/test";

export default class BranchesPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async createNewBranch(branchName: string, baseBranch: string) {
        await this.page.getByRole('button', { name: 'New branch' }).click()
        await this.page.getByRole('dialog', { name: 'Create a branch' }).getByRole('textbox').fill(branchName)
        await this.page.getByRole('dialog', { name: 'Create a branch' }).getByTestId('anchor-button').click()
        await this.page.getByPlaceholder('Find a branch...').pressSequentially(baseBranch)
        await this.page.locator('[data-component="ActionList.Item--DividerContainer"]').click()
        await this.page.getByRole('dialog', { name: 'Create a branch' }).getByRole('button', { name: 'Create new branch' }).click()
        await this.page.locator('.turbo-progress-bar').waitFor({ state: 'visible' })
        await this.page.locator('.turbo-progress-bar').waitFor({ state: 'detached' })
    }

    async readYourBranchList(): Promise<Array<string>> {
        return await this.page.getByLabel('Your branches').locator('.prc-BranchName-BranchName-jFtg-').allTextContents()
    }
}
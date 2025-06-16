import { expect, Locator, Page } from "@playwright/test";

export default class RepositorySettingsPage{
    readonly page: Page
    public repositoryName: string
    readonly deleteThisRepositoryButtonLocator : Locator

    constructor(page: Page){
        this.page = page
        this.deleteThisRepositoryButtonLocator = this.page.getByRole('button', { name: 'Delete this repository' })
    }


    async deleteRepository(repositoryName: string){
        await this.deleteThisRepositoryButtonLocator.click()
        const dialogLocator = this.page.locator('dialog#repo-delete-menu-dialog')
        await expect(dialogLocator.getByRole('heading', { name:`Delete ${process.env.USERNAME}/${repositoryName}` })).toBeVisible()
        await expect(dialogLocator.locator('.text-center').getByText(`${process.env.USERNAME}/${repositoryName}`)).toBeVisible()
        await dialogLocator.getByRole('button', { name: 'I want to delete this' }).click()
        await expect(dialogLocator.getByText('Unexpected bad things will happen if you don’t read this!')).toBeVisible()
        await expect(dialogLocator).toContainText(`This will permanently delete the ${process.env.USERNAME}/${repositoryName} repository, wiki, issues, comments, packages, secrets, workflow runs, and remove all collaborator associations`)
        await dialogLocator.getByRole('button', { name: 'I have read and understand' }).click()
        await dialogLocator.getByLabel(/To confirm, type/).fill(`${process.env.USERNAME}/${repositoryName}`)
        await dialogLocator.getByRole('button', { name: 'Delete this repository' }).click()
        await expect(this.page.locator('.js-flash-alert')).toHaveText(`Your repository "${process.env.USERNAME}/${repositoryName}" was successfully deleted.`)
    }
}
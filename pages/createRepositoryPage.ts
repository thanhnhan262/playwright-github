import { expect, Page } from "@playwright/test";

export default class CreateRepositoryPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async createRepository(repositoryName: string, description: string, isPrivate: boolean, gitIgnoreTeamplate: string, license: string){  
        await this.page.getByLabel('Repository name*').fill(repositoryName)
        await expect(this.page.getByText(`${repositoryName} is available.`)).toBeVisible()
        
        if(description != ''){
            await this.page.getByLabel('Description').fill(description)
        }

        if(isPrivate){
            await this.page.getByLabel('Private').check()
            await expect(this.page.getByLabel('Private')).toBeChecked()
        }

        if(gitIgnoreTeamplate != 'None'){
            await this.page.getByRole('button', { name: '.gitignore template: None' }).click()
            await this.page.getByPlaceholder('Filter…').pressSequentially(gitIgnoreTeamplate, {delay: 500})
            const item = this.page.locator('[role="listbox"]').locator('[role="option"]')
            expect((await item.all()).length).toEqual(1)
            expect(await item.first().textContent()).toEqual(gitIgnoreTeamplate)
            await item.click()
            await expect(this.page.getByRole('button', { name: `.gitignore template: ${gitIgnoreTeamplate}`})).toBeVisible()
        }

        if(license != 'None'){
            await this.page.getByRole('button', { name: 'License: None' }).click()
            await this.page.getByPlaceholder('Filter…').pressSequentially(license, {delay: 500})
            const item = this.page.locator('[role="listbox"]').locator('[role="option"]')
            expect((await item.all()).length).toEqual(1)
            expect(await item.first().textContent()).toEqual(license)
            await item.first().click()
            await expect(this.page.getByRole('button', { name: `License: ${license}` })).toBeVisible()
        }

        await this.page.locator('button[type="submit"]').getByText('Create repository').click()
    }
}
import { expect, Page } from "@playwright/test";
import CreateRepositoryPage from "./createRepositoryPage";
import RepositoryDetailCodePage from "./repositoryDetailCodePage";

export default class RepositoriesPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async viewRepository(repositoryName: string){
        await this.page.locator('#user-repositories-list').getByRole('link', { name: repositoryName }).click()
        await expect(this.page.locator('#repo-title-component').getByRole('link', { name: repositoryName })).toBeVisible()
    }

    async createRepository(repositoryName: string, description: string = '', isPrivate: boolean = false, gitIgnoreTeamplate: string = 'None', license: string = 'None'){
        await this.page.getByRole('link', { name: 'New' }).click()
        await expect(this.page.getByRole('heading', { name: 'Create a new repository' })).toBeVisible()
        await new CreateRepositoryPage(this.page).createRepository(repositoryName, description, isPrivate, gitIgnoreTeamplate, license)
        await new RepositoryDetailCodePage(this.page).selectLinkWhenSetUpNewRepository('README')
        await new RepositoryDetailCodePage(this.page).addNewFile('README.txt', 'Please README', 'add readme file')
    }

}
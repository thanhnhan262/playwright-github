import { expect, Page } from "@playwright/test";
import CreateRepositoryPage from "./createRepository.page";
import RepositoryDetailCodePage from "./repositoryDetailCode.page";

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
        // await this.page.getByRole('link', { name: 'New' }).click();
        // await this.page.getByRole('textbox', { name: 'Repository name *' }).click();
        // await this.page.getByRole('textbox', { name: 'Repository name *' }).fill(repositoryName);
        // await this.page.getByRole('textbox', { name: 'Description' }).fill(description);
        
        // await this.page.waitForTimeout(3000) //need to improve this point
        
        // await this.page.getByRole('button', { name: 'Create repository' }).click();
        // await this.page.getByRole('link', { name: 'creating a new file' }).click();
        // await this.page.getByRole('textbox', { name: 'File name' }).fill('test.txt');
        // await this.page.getByRole('region', { name: 'Editing test.txt file contents' }).click();
        // await this.page.getByRole('textbox', { name: 'Editing test.txt file' }).fill('this is a test file added when creating new repo');
        // await this.page.getByRole('button', { name: 'Commit changes...' }).click();
        // await this.page.getByRole('textbox', { name: 'Add an optional extended' }).fill('create new repo');
        // await this.page.getByRole('button', { name: 'Commit changes', exact: true }).click();
        // await this.page.getByRole('navigation', { name: 'Breadcrumbs' }).getByTestId('breadcrumbs-repo-link').click();
        // await expect(this.page.getByRole('heading', { name: repositoryName })).toBeVisible();

    }

    async navigateToBranchesPage() {
        await this.page.getByRole('link', { name: 'Branch' }).click();
    }

    async getRepositoryNames(): Promise<string[]>{
        return await this.page.locator('#user-repositories-list h3 a').allInnerTexts()
    }

}
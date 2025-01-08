import { Locator, Page, expect } from "@playwright/test";
import PullRequestDetailPage from "./pullRequestDetailPage";

export default class RepositoryDetailCodePage{
    readonly page: Page
    readonly addFileButtonLocator: Locator


    constructor(page: Page){
        this.page = page
        this.addFileButtonLocator = this.page.getByRole('button', { name: 'Add file' })
    }

    async selectLinkWhenSetUpNewRepository(linkText: string){
        await this.page.locator('.Box-header--blue').getByRole('link', {name: linkText}).click()
        await expect(this.page.getByRole('button', {name: 'Commit changes'})).toBeVisible()
    }

    async addNewFile(fileName: string, fileContent: string, commitMessage: string){
        await this.page.getByPlaceholder('Name your file...').fill(fileName)
        await this.page.locator('file-attachment').getByTestId('codemirror-editor').locator('div.cm-line').fill(fileContent)       
        await this.page.getByRole('button', {name: 'Commit changes...'}).click()
        await expect(this.page.getByPlaceholder(`Create ${fileName}`)).toBeVisible()

        const dialogLocator = this.page.getByRole('dialog', {name: 'Commit changes'})
        await dialogLocator.locator('#commit-message-input').fill(commitMessage)
        await dialogLocator.getByTestId('submit-commit-button').click()
        await expect(dialogLocator.getByRole('button', {name: 'Saving...'})).toBeVisible()
        await dialogLocator.waitFor({ state: 'detached' })
        await this.page.locator('.turbo-progress-bar').waitFor({ state: 'detached' })
    }

    async selectAddFile(){
        await this.addFileButtonLocator.click()
        await this.page.getByRole('menu', { name: 'Add file' }).getByLabel('Create new file').click()
    }

    async selectUploadFile(){
        await this.addFileButtonLocator.click()
        await this.page.getByRole('menu', { name: 'Add file' }).getByLabel('Upload files').click()
        await expect(this.page.locator('input[type="file"]')).toBeVisible()
    }

    private async selectFileAndSetCommitMessage(filePath: Array<string>, commitMessage: string, extendedDescription: string) {
        await this.page.locator('input[type="file"]').setInputFiles(filePath)
        await expect(this.page.locator('.js-upload-progress')).toBeVisible()
        await expect(this.page.locator('.js-manifest-file-list-root')).toBeVisible()
        await this.page.getByPlaceholder('Add files via upload').fill(commitMessage)
        await this.page.getByPlaceholder('Add an optional extended').fill(extendedDescription)
    }

    async selectFilesAndUploadToMain(filePath: Array<string>, commitMessage: string, extendedDescription: string){
        await this.selectFileAndSetCommitMessage(filePath, commitMessage, extendedDescription)
        await this.page.getByRole('button', { name: 'Commit changes' }).click()
        await expect(this.page.getByText('Processing your files…')).toBeVisible()
        await this.page.getByText('Processing your files…').waitFor({ state: 'detached' })
    }

    async selectFilesAndUploadToNewBranch(filePath: Array<string>, commitMessage: string, extendedDescription: string, branchName: string){
        await this.selectFileAndSetCommitMessage(filePath, commitMessage, extendedDescription)
        await this.page.getByLabel('Create a new branch for this').check()
        await this.page.getByPlaceholder('New branch name').fill(branchName)
        await this.page.getByRole('button', { name: 'Propose changes' }).click()
        await expect(this.page.getByText('Processing your files…')).toBeVisible()
    }

    /**
     * Read data from folder-file table
     * Return: Array of folder-files (name - last commit message - last commit date)
     */
    async readFolderFileTable(): Promise<Array<Array<string>>>{
        const rowsLocator = await this.page.locator('[aria-labelledby="folders-and-files"]').locator('.react-directory-row').all()
        let rows = new Array()
        for(const rowLoc of rowsLocator){
            let columns = new Array()
            columns.push(await rowLoc.locator('.react-directory-filename-column a').nth(1).textContent())
            columns.push(await rowLoc.locator('.react-directory-row-commit-cell a').textContent())
            columns.push(await rowLoc.locator('.react-directory-commit-age relative-time').evaluate((host)=>{
                return host.shadowRoot?.textContent?.trim()
            }))
            rows.push(columns)
        }
        return rows
    }

    async compareChangesAndClickCreatePullRequest(targetBranch: string, sourceBranch: string){
        //select target branch
        await this.page.locator('#base-ref-selector').click()
        await this.page.locator('//div[@class="SelectMenu" and .//span[text()="Choose a base ref"]]').getByPlaceholder('Find a branch').pressSequentially(targetBranch)
        await this.page.locator('//div[@class="SelectMenu" and .//span[text()="Choose a base ref"]]').locator('.is-filtering').first().click()
        
        //select source branch
        await this.page.locator('#head-ref-selector').click()
        await this.page.locator('//div[@class="SelectMenu" and .//span[text()="Choose a head ref"]]').getByPlaceholder('Find a branch').pressSequentially(sourceBranch)
        await this.page.locator('//div[@class="SelectMenu" and .//span[text()="Choose a head ref"]]').locator('.is-filtering').first().click()

        await expect(this.page.getByText('Able to merge')).toBeVisible()
        await this.page.getByRole('button', { name: 'Create pull request' }).click()

        await expect(this.page.getByRole('heading', { name: 'Open a pull request' })).toBeVisible()
    }

    /**
     * Open (Create) a new pull request
     * @param targetBranch 
     * @param sourceBranch 
     * @param title 
     * @param description 
     */
    async openPullRequest(title: string, description: string){
        //set title
        await this.page.getByPlaceholder('Title').fill(title)

        //set description
        await this.page.locator('.CommentBox-container textarea').fill(description)

        //create pull request
        await this.page.getByRole('button', { name: 'Create pull request' }).click()
        
        const pullRequestDetailPage = new PullRequestDetailPage(this.page)
        expect(await pullRequestDetailPage.readPullRequestTitle()).toBe(title)
        expect(await pullRequestDetailPage.readPullRequestStatus()).toBe('Open')
    }
}
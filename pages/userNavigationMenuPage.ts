import { expect, Locator, Page } from "@playwright/test";
import RepositoriesPage from "./repositoriesPage";

export default class UserNavigationMenuPage{
    readonly page: Page
    public signedInUser: string
    readonly profileIcon: Locator

    constructor(page: Page){
        this.page = page
        this.profileIcon = this.page.getByLabel('Open user navigation menu')

    }

    async navigateToYourRepositoriesPage(): Promise<RepositoriesPage>{
        await this.profileIcon.click()
        await this.page.getByRole('dialog').getByLabel('Your repositories').click()
        await expect(this.page.locator('.AppHeader-localBar').locator('#repositories-tab')).toBeVisible()
        return new RepositoriesPage(this.page)
    }

    async signOut(){
        await this.profileIcon.click()
        await this.page.getByRole('dialog').getByLabel('Sign out').click()
        await this.page.getByRole('button', { name: 'Sign out', exact: true }).click()
        await expect(this.page.getByRole('link', { name: 'Sign in' })).toBeVisible()
    }
}
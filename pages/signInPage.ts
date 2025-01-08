import { expect, Page } from '@playwright/test'


export default class SignInPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async signIn(username: string, password: string){
        await this.page.getByLabel('Username or email address').fill(username)
        await this.page.getByLabel('Password').fill(password);
        await this.page.getByRole('button', { name: 'Sign in', exact: true }).click();
        await expect(this.page.getByLabel('Open user navigation menu')).toBeVisible()
    }
}
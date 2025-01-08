import { expect, Page } from '@playwright/test'

export default class TopMenuPage{
    readonly page: Page
    public signedInUser: string

    constructor(page: Page){
        this.page = page
    }

    async navigateToSignInPage(){
        await this.page.locator('.HeaderMenu').getByText('Sign in').click()
        await expect(this.page.getByRole('heading', { name: 'Sign in to GitHub' })).toBeVisible()
    }

    async navigateToSignUpPage(){
        await this.page.locator('.HeaderMenu').getByText('Sign up').click()
        await expect(this.page.getByRole('heading', { name: 'Sign up to GitHub' })).toBeVisible()
    }
}
import { expect, Page } from '@playwright/test'
import * as OTPAuth from 'otpauth'

let totp = new OTPAuth.TOTP({
  issuer: "Raccoon",
  label: "GitHub",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: process.env.OTP_SECRET,
})

export default class SignInPage {
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async signIn(username: string, password: string){
        await this.page.getByLabel('Username or email address').fill(username)
        await this.page.getByLabel('Password').fill(password);
        await this.page.getByRole('button', { name: 'Sign in', exact: true }).click();
        await this.page.getByRole('textbox', { name: 'Authentication code' }).fill(totp.generate());
        await expect(this.page.getByLabel('Open user navigation menu')).toBeVisible()
    }
}
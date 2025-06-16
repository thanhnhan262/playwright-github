import { test as setup, expect } from '../utils/custom-fixtures'
import path from 'path'

const signedInState = path.join(__dirname, '../.auth/user.json')

setup('sign in', async ({page, pm}) => {
    await pm.landingPage.navigateToSignInPage()
    await pm.signInPage.signIn(`${process.env.USERNAME}`, `${process.env.PASSWORD}`)
    await page.waitForSelector('[aria-label="Open user navigation menu"]', {state: 'visible'})
    await page.context().storageState({path: signedInState})
})

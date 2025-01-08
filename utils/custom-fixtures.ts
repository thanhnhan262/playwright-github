import { test as base} from '@playwright/test'
import PageManager from '../pages/pageManager'

export type TestOptions = {
    pm: PageManager,
    anotherBaseUrl: string
}

export const test = base.extend<TestOptions>({
    page: async ({page}, use) => {
        await page.goto('/'),
        await use(page)
    },

    anotherBaseUrl: ['', {option: true}],
    
    pm: async ({page}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})

export { expect } from '@playwright/test'
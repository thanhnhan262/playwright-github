import { expect, Page, Locator } from "@playwright/test";

export default class RepositoryDetailPage {
    page: Page;
    readonly repositoryButtonLocator: Locator
    readonly userNameButtonLocator: Locator
    
    constructor(page: Page) {
        this.page = page;
        this.userNameButtonLocator = this.page.locator('.AppHeader-context .AppHeader-context-item').nth(0)
        this.repositoryButtonLocator = this.page.locator('.AppHeader-context .AppHeader-context-item').nth(1)
    }

    async navigateToCodePage() {
        await this.page.getByRole('link', { name: 'Code' }).click();
        await expect(this.page.locator('table[aria-labelledby="folders-and-files"]')).toBeVisible();
    }

    async navigateToPullRequestPage() {
        await this.page.getByRole('link', { name: 'Pull requests' }).nth(1).click();
        await expect(this.page.getByRole('link', { name: 'New pull request' })).toBeVisible();
    }

    async navigateToIssuesPage() {
        await this.page.getByRole('link', { name: 'Issues' }).nth(1).click();
        await expect(this.page.getByRole('link', { name: 'New issue' })).toBeVisible();
    }

    async navigateToWikiPage() {
        await this.page.getByRole('link', { name: 'Wiki' }).click();
        await expect(this.page).toHaveTitle('GitHub · Where software is built');
    }

    async navigateToSettingsPage() {
        await this.page.getByRole('link', { name: 'Settings' }).click();
        await expect(this.page.locator('[aria-label="General settings"]')).toBeVisible();
    }

    async navigateToActionsPage() {
        await this.page.getByRole('link', { name: 'Actions' }).click();
        await expect(this.page).toHaveTitle(/Create new workflow/)
    }

    async navigateToProjectsPage() {
        await this.page.getByRole('link', { name: 'Projects' }).click();
        await expect(this.page.getByRole('button', { name: 'New project' })).toBeVisible();
    }

    async navigateToSecurityPage() {
        await this.page.getByRole('link', { name: 'Security' }).first().click();
        await expect(this.page.getByText('Security overview').first()).toBeVisible();
    }

    async navigateToInsightsPage() {
        await this.page.getByRole('link', { name: 'Insights' }).click();
        await expect(this.page).toHaveTitle(/Pulse/)
    }
}
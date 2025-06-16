import { expect, Locator, Page } from "@playwright/test";

export default class ProfilePage {
    readonly page: Page
    private readonly editProfileButton: Locator
    private readonly nameInput: Locator
    private readonly bioInput: Locator
    private readonly companyInput: Locator
    private readonly locationInput: Locator
    private readonly websiteInput: Locator
    private readonly socialUsernameInput: Locator
    private readonly saveProfileButton: Locator
    private readonly cancelButton: Locator

    constructor(page: Page) {
        this.page = page
        this.editProfileButton = this.page.getByRole('button', { name: 'Edit profile' })
        this.saveProfileButton = this.page.getByRole('button', { name: 'Save', exact: true })
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' })
        this.nameInput = this.page.getByRole('textbox', { name: 'Name' })
        this.bioInput = this.page.getByLabel('Bio')
        this.companyInput = this.page.getByRole('textbox', { name: 'Company' })
        this.locationInput = this.page.getByRole('textbox', { name: 'Location' })
        this.websiteInput = this.page.getByLabel('Website')
        this.socialUsernameInput = this.page.getByRole('textbox', { name: 'Link to social profile 1' })
    }

    private async ensureEditMode() {
        if (await this.saveProfileButton.isVisible()) {
            // Already in edit mode
            return;
        }
        await this.editProfileButton.click();
        await this.saveProfileButton.waitFor({ state: 'visible' });
    }

    private async ensureViewMode() {
        if (await this.editProfileButton.isVisible()) {
            // Already in view mode
            return;
        }
        await this.cancelButton.click();
        await this.editProfileButton.waitFor({ state: 'visible' });
    }

    async editProfile(profileData: {
        name?: string,
        bio?: string,
        company?: string,
        location?: string,
        website?: string,
        socialUsername?: string
    }) {
        await this.ensureEditMode();
        
        if (profileData.name) {
            await this.nameInput.fill(profileData.name)
        }
        if (profileData.bio) {
            await this.bioInput.fill(profileData.bio)
        }
        if (profileData.company) {
            await this.companyInput.fill(profileData.company)
        }
        if (profileData.location) {
            await this.locationInput.fill(profileData.location)
        }
        if (profileData.website) {
            await this.websiteInput.fill(profileData.website)
        }
        if (profileData.socialUsername) {
            await this.socialUsernameInput.fill(profileData.socialUsername)
        }

        await this.saveProfileButton.click()
        await this.editProfileButton.waitFor({ state: 'visible' })
    }

    async getProfileDetails() {
        await this.ensureEditMode();
        const profileData = {
            name: await this.nameInput.inputValue(),
            bio: await this.bioInput.inputValue(),
            company: await this.companyInput.inputValue(),
            location: await this.locationInput.inputValue(),
            website: await this.websiteInput.inputValue(),
            socialUsername: await this.socialUsernameInput.inputValue()
        }
        await this.ensureViewMode();
        return profileData
    }

    async verifyOnProfilePage() {
        await this.ensureViewMode();
    }
}

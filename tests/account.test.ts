import { test, expect } from '../utils/custom-fixtures';

function generateUniqueProfileData() {
    const timestamp = new Date().getTime();
    return {
        name: `Test User ${timestamp}`,
        bio: `Quality Engineer ${timestamp}. Automating tests and ensuring software quality.`,
        company: `Test Corp ${timestamp}`,
        location: `Test City ${timestamp}`,
        website: `https://example.com/user${timestamp}`,
        socialUsername: `https://linkedin.com/in/tester${timestamp}`
    };
}

test('edit profile information', async ({ pm }) => {
    // await pm.page.waitForTimeout(2000); // Intentional delay for demonstration purpose

    const profileData = generateUniqueProfileData();

    await test.step('Navigate to profile page', async () => {
        await pm.topRightMenuPage.navigateToProfilePage();
        await pm.profilePage.verifyOnProfilePage();
    });

    await test.step('Edit profile information', async () => {
        await pm.profilePage.editProfile(profileData);
        // editProfile already has appropriate waits built in
    });

    await test.step('Verify saved profile information', async () => {
        const savedProfileData = await pm.profilePage.getProfileDetails();
        expect(savedProfileData.name).toBe(profileData.name);
        expect(savedProfileData.bio).toBe(profileData.bio);
        expect(savedProfileData.company).toBe(profileData.company);
        expect(savedProfileData.location).toBe(profileData.location);
        expect(savedProfileData.website).toBe(profileData.website);
        expect(savedProfileData.socialUsername).toBe(profileData.socialUsername);
    });
});

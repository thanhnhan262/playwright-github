import path from 'path'
import { test, expect } from '../utils/custom-fixtures'
import { faker } from '@faker-js/faker'
import PullRequestsPage from '../pages/pullRequestsPage'


test('create, add file, delete repository', async ({page, pm})=>{
  //create repository
  const repositoryName = faker.animal.bird().replaceAll(' ', '-').replaceAll('\'','-')
  await pm.userNavigationMenuPage.navigateToYourRepositoriesPage()
  await pm.repositoriesPage.createRepository(repositoryName)
  await pm.userNavigationMenuPage.navigateToYourRepositoriesPage()
  expect(await page.locator('#user-repositories-list a').allInnerTexts()).toContain(repositoryName)

  //add file
  const fileName = faker.book.author().replaceAll(' ', '-') + '.txt'
  const commitMessage = 'this is commit message' + faker.number.int(1000)
  await pm.userNavigationMenuPage.navigateToYourRepositoriesPage()
  await pm.repositoriesPage.viewRepository(repositoryName)
  await pm.repositoryDetailCodePage.selectAddFile()
  await pm.repositoryDetailCodePage.addNewFile(fileName, 'This is file content', commitMessage)
  expect(await pm.repositoryDetailCodePage.readFolderFileTable()).toContainEqual([fileName, commitMessage, 'now'])

  //delete repository
  await pm.repositoryDetailPage.navigateToSettingsPage()
  await pm.repositoryDetailSettingsPage.deleteRepository(repositoryName)
  await expect(page.locator('.js-flash-alert')).toHaveText(`Your repository "${process.env.USERNAME}/${repositoryName}" was successfully deleted.`)
  expect(await page.locator('#user-repositories-list li h3').allTextContents()).not.toContain(repositoryName)
}) 

test('create, upload file, delete repository', async ({page, pm})=>{
  //create repository
  const repositoryName = faker.animal.bird().replaceAll(' ', '-').replaceAll('\'','-')
  await pm.userNavigationMenuPage.navigateToYourRepositoriesPage()
  await pm.repositoriesPage.createRepository(repositoryName)
  await pm.userNavigationMenuPage.navigateToYourRepositoriesPage()
  await expect(page.locator('#user-repositories-list a').first()).toHaveText(repositoryName)

  //add file by uploading
  const fileName1 = 'uploadedFile1.txt'
  const fileName2 = 'uploadedFile2.txt'
  const filePaths = [path.join(__dirname, `../test-data/${fileName1}`), path.join(__dirname, `../test-data/${fileName2}`)]
  const commitMessage = 'this is commit message' + faker.number.int(1000)
  const extendedDescription = 'this is extended description' + faker.number.int(1000)
  await pm.repositoriesPage.viewRepository(repositoryName)
  await pm.repositoryDetailCodePage.selectUploadFile()
  await pm.repositoryDetailCodePage.selectFilesAndUploadToMain(filePaths, commitMessage, extendedDescription)
  expect(await pm.repositoryDetailCodePage.readFolderFileTable()).toContainEqual([fileName1, commitMessage, 'now'])
  expect(await pm.repositoryDetailCodePage.readFolderFileTable()).toContainEqual([fileName2, commitMessage, 'now'])

  //delete repository
  await pm.repositoryDetailPage.navigateToSettingsPage()
  await pm.repositoryDetailSettingsPage.deleteRepository(repositoryName)
  await expect(page.locator('.js-flash-alert')).toHaveText(`Your repository "${process.env.USERNAME}/${repositoryName}" was successfully deleted.`)
  expect(await page.locator('#user-repositories-list li h3').allTextContents()).not.toContain(repositoryName)
}) 

test('create, upload file with new branch, delete repository', async ({page, pm})=>{
  //create repository
  const repositoryName = faker.animal.bird().replaceAll(' ', '-').replaceAll('\'','-')
  await pm.userNavigationMenuPage.navigateToYourRepositoriesPage()
  await pm.repositoriesPage.createRepository(repositoryName)
  await pm.userNavigationMenuPage.navigateToYourRepositoriesPage()
  expect(await page.locator('#user-repositories-list a').allInnerTexts()).toContain(repositoryName)
  
  //add file by uploading to new branch
  await pm.repositoriesPage.viewRepository(repositoryName)
  const fileName1 = 'uploadedFile1.txt'
  const fileName2 = 'uploadedFile2.txt'
  const filePaths = [path.join(__dirname, `../test-data/${fileName1}`), path.join(__dirname, `../test-data/${fileName2}`)]
  const commitMessage = 'this is commit message' + faker.number.int(1000)
  const extendedDescription = 'this is extended description' + faker.number.int(1000)
  const newBranchName = faker.animal.bird().replaceAll(' ', '-').replaceAll('\'','-')
  
  await pm.repositoryDetailCodePage.selectUploadFile()
  await pm.repositoryDetailCodePage.selectFilesAndUploadToNewBranch(filePaths, commitMessage, extendedDescription, newBranchName)
  await pm.repositoryDetailCodePage.openPullRequest(commitMessage, extendedDescription)
  await pm.pullRequestDetailPage.mergePullRequest()

  await pm.repositoryDetailPage.navigateToCodePage()
  expect(await pm.repositoryDetailCodePage.readFolderFileTable()).toContainEqual([fileName1, commitMessage, 'now'])
  expect(await pm.repositoryDetailCodePage.readFolderFileTable()).toContainEqual([fileName2, commitMessage, 'now'])

  //delete repository
  await pm.repositoryDetailPage.navigateToSettingsPage()
  await pm.repositoryDetailSettingsPage.deleteRepository(repositoryName)
  await expect(page.locator('.js-flash-alert')).toHaveText(`Your repository "${process.env.USERNAME}/${repositoryName}" was successfully deleted.`)
  expect(await page.locator('#user-repositories-list li h3').allTextContents()).not.toContain(repositoryName)
})

test('create new repository - new branch - new pull request - merge to main', async ({page, pm})=>{
  
})

test('create pull request', async ({page, pm})=>{

  await page.goto('https://github.com/mtn1987test/Snow-Goose/pulls')
  
  const prTitle = faker.company.name().replaceAll(' ', '-').replaceAll('\'','-')
  await pm.pullRequestsPage.clickCreateNewPullRequest()
  await pm.repositoryDetailCodePage.compareChangesAndClickCreatePullRequest('main', 'mtn1987test-patch-3')
  await pm.repositoryDetailCodePage.openPullRequest(prTitle, 'this is extended description')
  await pm.repositoryDetailPage.navigateToPullRequestPage()
  expect(await new PullRequestsPage(page).readPullRequestList()).toContain(prTitle)

})

test('create new branch', async ({page, pm})=>{
  await page.goto('https://github.com/mtn1987test/White-eared-Hummingbird/branches')
  
  const branchName = faker.company.name().replaceAll(' ', '-').replaceAll('\'','-')
  await pm.branchesPage.createNewBranch(branchName, 'main')
  expect(await pm.branchesPage.readYourBranchList()).toContain(branchName)
})

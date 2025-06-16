import { test, expect } from '../utils/custom-fixtures'

test('create and delete repository', async ({pm})=>{

  const timestamp = new Date().getTime();
  const repositoryName = "Test_Repo_" + timestamp

  //create a new repository
  await test.step('Create a new repository', async () => {
    await pm.topRightMenuPage.navigateToYourRepositoriesPage()
    await pm.repositoriesPage.createRepository(repositoryName)
    await pm.topRightMenuPage.navigateToYourRepositoriesPage()
  })

  //verify the created repository is displayed in repositories list
  await test.step('Verify the created repository is displayed in repositories list', async () => {
    await pm.repositoriesPage.getRepositoryNames().then((repositoryNames) => {
      expect(repositoryNames).toContain(repositoryName)
    })
  });

  //delete repository
  await test.step('Delete the repository', async () => {
    await pm.repositoriesPage.viewRepository(repositoryName)
    await pm.repositoryDetailPage.navigateToSettingsPage()
    await pm.repositorySettingsPage.deleteRepository(repositoryName)
  });

  //verify the deleted repository is not displayed in repositories list
  await test.step('Verify the deleted repository is not displayed in repositories list', async () => {
    await pm.repositoriesPage.getRepositoryNames().then((repositoryNames) => {
      expect(repositoryNames).not.toContain(repositoryName)
    })
  });
});

test('Create a branch', async ({pm}) => {
  
  const timestamp = new Date().getTime();
  const repositoryName = "Test_Repo_" + timestamp

  //create a new repository
  await test.step('Create a new repository', async () => {
    await pm.topRightMenuPage.navigateToYourRepositoriesPage()
    await pm.repositoriesPage.createRepository(repositoryName)
    await pm.topRightMenuPage.navigateToYourRepositoriesPage()
  })

  //verify the created repository is displayed in repositories list
  await test.step('Verify the created repository is displayed in repositories list', async () => {
    await pm.repositoriesPage.getRepositoryNames().then((repositoryNames) => {
      expect(repositoryNames).toContain(repositoryName)
    })
  });

  //create a new branch
  await test.step('Create a new branch', async () => {
    const branchName = "feature-branch-" + timestamp;
    await pm.repositoriesPage.viewRepository(repositoryName)
    await pm.repositoriesPage.navigateToBranchesPage()
    await pm.branchesPage.createNewBranch(branchName, 'main')
    expect(await pm.branchesPage.readYourBranchList()).toContain(branchName)
  });


  //delete repository
  await test.step('Delete the repository', async () => {
    await pm.branchesPage.navigateToRepositoryDetailPage()
    await pm.repositoryDetailPage.navigateToSettingsPage()
    await pm.repositorySettingsPage.deleteRepository(repositoryName)
  });

  //verify the deleted repository is not displayed in repositories list
  await test.step('Verify the deleted repository is not displayed in repositories list', async () => {
    await pm.repositoriesPage.getRepositoryNames().then((repositoryNames) => {
      expect(repositoryNames).not.toContain(repositoryName)
    })
  });
});

import { Page } from "@playwright/test";
import UserNavigationMenuPage from './userNavigationMenuPage'
import TopMenuPage from './topMenuPage'
import SignInPage from './signInPage'
import RepositoriesPage from "./repositoriesPage";
import CreateRepositoryPage from "./createRepositoryPage";
import PullRequestsPage from "./pullRequestsPage";
import PullRequestDetailPage from "./pullRequestDetailPage";
import RepositoryDetailPage from "./repositoryDetailPage";
import RepositoryDetailCodePage from "./repositoryDetailCodePage";
import RepositoryDetailSettingsPage from "./repositoryDetailSettingsPage";
import BranchesPage from "./branchesPage";



export default class PageManager{
    readonly page: Page
    public topMenuPage: TopMenuPage
    public userNavigationMenuPage: UserNavigationMenuPage
    public signInPage : SignInPage
    public repositoriesPage: RepositoriesPage
    public createRepositoryPage: CreateRepositoryPage
    public pullRequestsPage: PullRequestsPage
    public pullRequestDetailPage: PullRequestDetailPage
    public repositoryDetailPage: RepositoryDetailPage
    public repositoryDetailCodePage: RepositoryDetailCodePage
    public repositoryDetailSettingsPage: RepositoryDetailSettingsPage
    public branchesPage: BranchesPage

    constructor(page: Page){
        this.page = page
        this.topMenuPage = new TopMenuPage(this.page)
        this.userNavigationMenuPage = new UserNavigationMenuPage(this.page)
        this.signInPage = new SignInPage(this.page)
        this.repositoriesPage = new RepositoriesPage(this.page)

        this.createRepositoryPage = new CreateRepositoryPage(this.page)
        this.repositoryDetailPage = new RepositoryDetailPage(this.page)
        this.repositoryDetailCodePage = new RepositoryDetailCodePage(this.page)
        this.repositoryDetailSettingsPage = new RepositoryDetailSettingsPage(this.page)
        this.pullRequestsPage = new PullRequestsPage(this.page)
        this.pullRequestDetailPage = new PullRequestDetailPage(this.page)
        this.branchesPage = new BranchesPage(this.page)
    }
}
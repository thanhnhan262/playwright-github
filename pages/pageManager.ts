import { Page } from "@playwright/test";
import TopRightMenu from './topRightMenu.page'
import LandingPage from './landing.page'
import SignInPage from './signIn.page'
import RepositoriesPage from "./repositories.page";
import CreateRepositoryPage from "./createRepository.page";
import PullRequestsPage from "./pullRequests.page";
import PullRequestDetailPage from "./pullRequestDetail.page";
import RepositoryDetailPage from "./repositoryDetail.page";
import RepositoryDetailCodePage from "./repositoryDetailCode.page";
import RepositorySettingsPage from "./repositorySettings.page";
import BranchesPage from "./branches.page";
import ProfilePage from "./profile.page";

export default class PageManager{
    readonly page: Page
    public landingPage: LandingPage
    public topRightMenuPage: TopRightMenu
    public signInPage : SignInPage
    public repositoriesPage: RepositoriesPage
    public createRepositoryPage: CreateRepositoryPage
    public pullRequestsPage: PullRequestsPage
    public pullRequestDetailPage: PullRequestDetailPage
    public repositoryDetailPage: RepositoryDetailPage
    public repositoryDetailCodePage: RepositoryDetailCodePage
    public repositorySettingsPage: RepositorySettingsPage
    public branchesPage: BranchesPage
    public profilePage: ProfilePage

    constructor(page: Page){
        this.page = page
        this.landingPage = new LandingPage(this.page)
        this.topRightMenuPage = new TopRightMenu(this.page)
        this.signInPage = new SignInPage(this.page)
        this.repositoriesPage = new RepositoriesPage(this.page)
        this.createRepositoryPage = new CreateRepositoryPage(this.page)
        this.repositoryDetailPage = new RepositoryDetailPage(this.page)
        this.repositoryDetailCodePage = new RepositoryDetailCodePage(this.page)
        this.repositorySettingsPage = new RepositorySettingsPage(this.page)
        this.pullRequestsPage = new PullRequestsPage(this.page)
        this.pullRequestDetailPage = new PullRequestDetailPage(this.page)
        this.branchesPage = new BranchesPage(this.page)
        this.profilePage = new ProfilePage(this.page)
    }
}
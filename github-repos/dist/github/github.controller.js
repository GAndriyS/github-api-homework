"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubController = void 0;
const common_1 = require("@nestjs/common");
const github_service_1 = require("./github.service");
const favorites_service_1 = require("./favorites.service");
let GithubController = class GithubController {
    constructor(_githubService, _favoritesService) {
        this._githubService = _githubService;
        this._favoritesService = _favoritesService;
    }
    async getTopRatedRepositories(page, sorting) {
        return await this._githubService.getTopRatedRepositories(page, sorting);
    }
    async addFavorite(id) {
        await this._favoritesService.toggleFavorite(id);
        const favorites = await this._favoritesService.getFavorites();
        return favorites;
    }
    async getFavorites() {
        return await this._favoritesService.getFavorites();
    }
};
exports.GithubController = GithubController;
__decorate([
    (0, common_1.Get)('top-rated'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('sorting')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "getTopRatedRepositories", null);
__decorate([
    (0, common_1.Post)('favorites'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "addFavorite", null);
__decorate([
    (0, common_1.Get)('favorites'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "getFavorites", null);
exports.GithubController = GithubController = __decorate([
    (0, common_1.Controller)('github'),
    __metadata("design:paramtypes", [github_service_1.GithubService,
        favorites_service_1.FavoritesService])
], GithubController);
//# sourceMappingURL=github.controller.js.map
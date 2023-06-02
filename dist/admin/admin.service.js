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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const admin_repository_1 = require("./admin.repository");
let AdminService = class AdminService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    getAllUserInfo(userType, User) {
        if (User.role !== 'admin')
            throw new common_1.UnauthorizedException('접근 권한이 없습니다.');
        return this.adminRepository.getAllUserInfo(userType);
    }
    adminDeleteUser(id, User) {
        if (User.role !== 'admin')
            throw new common_1.UnauthorizedException('접근 권한이 없습니다.');
        return this.adminRepository.adminDeleteUser(id);
    }
    adminVerifyManager(id, User) {
        if (User.role !== 'admin')
            throw new common_1.UnauthorizedException('접근 권한이 없습니다.');
        return this.adminRepository.adminVerifyManager(id);
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map
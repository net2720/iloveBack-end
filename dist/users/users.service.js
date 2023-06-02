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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async clientSignUp(body) {
        const { email, name, password, phoneNumber } = body;
        const isUserExist = await this.usersRepository.existByEmail(email);
        if (isUserExist) {
            throw new common_1.UnauthorizedException('해당하는 이메일은 이미 존재합니다.');
        }
        const hashedPassedword = await bcrypt.hash(password, 10);
        const user = await this.usersRepository.clientSignUp({
            email,
            name,
            phoneNumber,
            password: hashedPassedword,
            role: 'client',
            address: null,
        });
        return user;
    }
    async deleteUser(id) {
        return await this.usersRepository.deleteUser(id);
    }
    async getUserInfo(id) {
        const user = await this.usersRepository.getUserInfo(id);
        return user;
    }
    async updateUserInfo(id, body) {
        try {
            if (body.email) {
                throw new common_1.HttpException(console.error, 400);
            }
            if (body.password) {
                const hashedPassedword = await bcrypt.hash(body.password, 10);
                body.password = hashedPassedword;
            }
            const user = await this.usersRepository.updateUserInfo(id, body);
            return user;
        }
        catch (error) {
            return error.message;
        }
    }
    async managerSignUp(body) {
        const { email, name, phoneNumber } = body;
        const hospitalId = body.hospitalId;
        const password = body.password;
        const isUserExist = await this.usersRepository.existByEmail(email);
        if (isUserExist) {
            throw new common_1.UnauthorizedException('해당하는 이메일은 이미 존재합니다.');
        }
        const hashedPassedword = await bcrypt.hash(password, 10);
        const user = Object.assign(Object.assign({}, body), { password: hashedPassedword, hospitalId: body.hospitalId, role: 'manager', adminVerified: 'no' });
        const signUp = await this.usersRepository.managerSignUp(user);
        return signUp;
    }
    async verifyCheck(id, User) {
        const modifyId = Object.values(id);
        if (Number(modifyId) !== User.id) {
            throw new common_1.UnauthorizedException('요청 받은 id값과 현재 유저의 id가 일치하지 않습니다.');
        }
        if (User.role === 'client') {
            return 'type: 1';
        }
        else if (User.role === 'manager') {
            return 'type: 2';
        }
        else if (User.role === 'admin') {
            return 'type: 0';
        }
        else {
            throw new common_1.UnauthorizedException('로그인 인증 과정에 문제가 발생하였습니다.');
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
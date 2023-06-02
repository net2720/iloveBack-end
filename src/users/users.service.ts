import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { CreateManagerDto, CreateUserDto, UpdateUserDto } from './dto/users.dtos';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  //유저 회원 가입 API 입니다.
  async clientSignUp(body: CreateUserDto) {
    const { email, name, password, phoneNumber } = body;
    const isUserExist = await this.usersRepository.existByEmail(email);
    
    //이메일 중복 검사
    if (isUserExist) {
      throw new UnauthorizedException('해당하는 이메일은 이미 존재합니다.');
    }

    const hashedPassedword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.clientSignUp({
      email,
      name,
      phoneNumber,
      password: hashedPassedword,
      role: 'client',
      address: null
    });
    return user;
  }

  //회원 탈퇴 API 입니다.
  async deleteUser(id: number) {
    return await this.usersRepository.deleteUser(id);
  }

  //유저 상세 조회 API입니다.
  async getUserInfo(id: number) {
    const user = await this.usersRepository.getUserInfo(id);
    return user;
  }

  //유저 정보 수정 API입니다.
  async updateUserInfo(id: number, body: UpdateUserDto){
    try{

    if(body.email) {
      throw new HttpException(console.error, 400)
    }

    if(body.password) {
      const hashedPassedword = await bcrypt.hash(body.password, 10)
      body.password = hashedPassedword
    }

    const user = await this.usersRepository.updateUserInfo(id, body);

    return user;
    } catch(error) {
      //에러 처리는 미들웨어가 완성되면 거기에 맞출 계획입니다.
      return error.message;
    }
  }

  //유저 회원 가입 API 입니다.
  async managerSignUp(body: CreateManagerDto) {
    const { email, name, phoneNumber } = body;
    const hospitalId = body.hospitalId;
    const password = body.password;

    const isUserExist = await this.usersRepository.existByEmail(email);
    
    //이메일 중복 검사
    if (isUserExist) {
      throw new UnauthorizedException('해당하는 이메일은 이미 존재합니다.');
    }

    const hashedPassedword = await bcrypt.hash(password, 10);

    const user = {
      ...body,
      password: hashedPassedword,
      hospitalId: Number(body.hospitalId),
      role: 'manager',
      adminVerified: 'yet'
    }
    
    const signUp = await this.usersRepository.managerSignUp(user)

    return signUp;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //유저 조회
  async findByFields(options: FindOneOptions<User>): Promise<User | null> {
    // DB조회라 User(Entity)사용
    return await this.userRepository.findOne(options);
  }

  async save(userDTO: UserDTO): Promise<UserDTO> {
    //암호화
    await this.transfomrPassword(userDTO);
    console.log(userDTO);
    // 클라이언트에서 입력 UserDTO 사용
    const user = this.userRepository.create(userDTO);

    // Entity 변환
    return await this.userRepository.save(user);
  }

  //비밀번호 암호화
  async transfomrPassword(user: UserDTO): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }
}

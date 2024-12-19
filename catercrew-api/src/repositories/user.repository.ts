import User,{ IUserModel } from "../models/UserModel";
import BaseRepository from "./base.repository";


class UserRepository extends BaseRepository<IUserModel>{
    constructor(){
        super(User)
    }

    async findByEmail(email: string): Promise<IUserModel | null>{
        return await this.findOne({email});
    } 
    async findByPhoneNumber(phoneNumber: number): Promise<IUserModel | null>{
        return await this.findOne({phoneNumber});
    }

    async createUser(userData: IUserModel): Promise<IUserModel>{
        return await this.create(userData);
    }

    async updateUser(email: string, userData: Partial<IUserModel>): Promise<IUserModel | null>{
        return await this.updateOne({email}, userData);
    }
}


export default new UserRepository;  
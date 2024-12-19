import {Model, Document, FilterQuery, UpdateQuery} from "mongoose"

class BaseRepository<T extends Document>{
    protected model: Model<T>;

    constructor(model: Model<T>){
        this.model = model;
    }
    
    async create(data: T): Promise<T>{
        const document = new this.model(data);
        return await document.save();
    }

    async findOne(query: FilterQuery<T>): Promise<T | null>{
        return await this.model.findOne(query).exec();
    }

    async findById(id: string): Promise<T | null>{
        return await this.model.findById(id).exec();
    }
    
    async find(query: FilterQuery<T> = {}): Promise<T[]>{
        return await this.model.find(query).exec();
    }

    async updateOne(query: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null>{
        return await this.model.findOneAndUpdate(query, update, {new: true}).exec();
    }

    async deleteById(id: string): Promise<T | null>{
        return await this.model.findByIdAndDelete(id).exec();
    }
    async deleteMany(filter: FilterQuery<T>): Promise<void>{
        await this.model.deleteMany(filter).exec();
    }
}

export default BaseRepository;
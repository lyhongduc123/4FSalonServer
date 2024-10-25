export interface IEntity<Entity = any, Create = any, Update = any> {

    findAll(): Promise<Entity[]>;

    findOne(id: number): Promise<Entity>;

    findBy(where: any): Promise<Entity[]>;

    create(entity: Create): Promise<Entity>;
    
    update(entity: Update): Promise<Entity>;

    remove(id: number): Promise<any>;
}
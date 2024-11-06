export interface IEntity<Entity = any, Create = any, Update = any> {

    findAll(): Promise<Entity[]>;

    findOne(id: any): Promise<Entity>;

    findBy(where: any, relation?: Boolean): Promise<Entity[]>;

    create(entity: Create, relations1?: any, relations2?: any): Promise<Entity>;
    
    update(id: any, entity: Update): Promise<Entity>;

    remove(id: any): Promise<any>;
}
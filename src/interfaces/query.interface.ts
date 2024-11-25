
export interface IQuery {
    where?: any;
    relations?: boolean;
    order?: any;
    skip?: number;
    take?: number;
    page?: number;
    select?: any;
}
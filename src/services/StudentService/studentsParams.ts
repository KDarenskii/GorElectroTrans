import { IStudent, TNewStudent } from "../../models/Student";

interface Params {
    depId: string;
}

export interface PostParams extends Params {
    student: TNewStudent;
}

export interface DeleteParams extends Params {
    studentId: string;
}

export interface PutParams extends Params {
    student: TNewStudent;
}

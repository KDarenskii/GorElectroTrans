export interface IStudent {
    fullName: string;
    studentId: string;
    subdepartmentName: string;
}

export type TNewStudent = Omit<IStudent, "fullName">;

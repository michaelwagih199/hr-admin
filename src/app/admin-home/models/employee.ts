import DepartmentModel from "./departmentModel";
import LocationModel from "./locationModel";

export default class EmployeeModel {
    id!: string;
    employeeName!: string;
    employeAge!: string;
    userName!: string;
    password!: string;
    department!: DepartmentModel;
    location!:LocationModel
}
import Department from "../../model/department"

export const createDepartment = (data) =>{
    const dept = new Department(data)
    return dept.save().then(data => data._id)
}

export const updateDepartment = (newDepartment,oldDepartment) =>{
    const updatedData = {...oldDepartment,...newDepartment}
    return Department.findByIdAndUpdate(oldDepartment._id,updatedData).then(data => data._id)
}
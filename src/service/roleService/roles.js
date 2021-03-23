import Roles from "../../model/roles"

export const createRoles  = (data) => {
    const role = new Roles(data)
    return role.save().then( data => data._id)
}

export const updateRole = (newRole,oldRole) =>{
    const updateData = {...oldRole,...newRole}
    console.log(updateData)
    return Roles.findByIdAndUpdate(oldRole._id,updateData,{upsert:true,new:true}).then(data => {
        console.log(data)
        return data._id
    })
    .catch(error => console.log("In service",error))


}
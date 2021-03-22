import Roles from "../../model/roles"

export const createRoles  = (data) => {
    const role = new Roles(data)
    return role.save().then( data => data._id)
}
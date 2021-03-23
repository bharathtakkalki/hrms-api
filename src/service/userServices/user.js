import bcrypt from 'bcrypt';
import config from '../../config';
import User from '../../model/user';
import { UserCreationError } from '../../utils/errors';

const encryptPassword = (password) => {
    return bcrypt.hash(password,config.salt_rounds)
}

const createUser = (data) => {
    const user = new User(data)
    return user.save()
    .then(user => user._id)
    .catch(error =>{
        console.log(error)
        throw new UserCreationError("User Creation Failed")
    })

}


module.exports = {
    encryptPassword,
    createUser
}
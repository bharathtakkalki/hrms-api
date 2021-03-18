import bcrypt from 'bcrypt';
import config from '../../config';
import User from '../../model/user';

const encryptPassword = (password) => {
    return bcrypt.hash(password,config.salt_rounds)
}

const createUser = (data) => {
    const user = new User(data)
    return user.save()
    .then(user => user._id)
    .catch(error =>{
        throw new UserCreationError("User Creation Failed")
    })

}


module.exports = {
    encryptPassword,
    createUser
}
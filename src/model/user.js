import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    phoneNumber:{
        type:String,
        validate:{
            validator:(value) => /\d{10}/.test(value)
        },
        message: props => `${props.value} is not a valid phone number`
    },
    gender:{
        type:Number,
    },
    dob:{
        type: Date,
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    updatedAt:{
        type:Date,
        default: Date.now()
    }
})

const User = mongoose.model('User',userSchema)

export default User;


// import { getDB } from "../db";

// class User {
//   constructor({ firstName, lastName, email, phoneNumber, password, userName, gender, dob }) {
//     this.collection = "user";
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.userName = userName;
//     this.password = password;
//     this.phoneNumber = phoneNumber;
//     this.gender = gender;
//     this.dob = dob;
//   }

//   static findOne(query = {}) {
//     console.log(query);
//     return new Promise((resolve, reject) => {
//       getDB()
//         .collection("user")
//         .findOne(query, (err, data) => {
//           if (err) {
//             console.log("Unable to Query");
//             reject(err);
//           }
//           resolve(data);
//         });
//     });
//   }

//   static find(query = {}) {
//     return new Promise((resolve, reject) => {
//       getDB()
//         .collection("user")
//         .find(query)
//         .toArray((err, data) => {
//           if (err) {
//             console.log("Unable to Query");
//             reject(err);
//           }
//           resolve(data);
//         });
//     });
//   }

//   save(){
//     return new Promise((resolve, reject) => {
//       const user = {
//         firstName: this.firstName,
//         lastName: this.lastName,
//         email: this.email,
//         phoneNumber: this.phoneNumber,
//         userName: this.userName,
//         gender: this.gender,
//         dob: this.dob,
//       };
//       getDB()
//         .collection(this.collection)
//         .insertOne(user, (err, data) => {
//           if (err) {
//             console.log("Unable to Insert");
//             reject(err);
//           }
//           resolve(data.ops[0]._id);
//         });
//     });
//   };
// }


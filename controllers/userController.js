const User = require('../model/user')
const CustomError = require('../utils/customError')
const cookieToken = require('../utils/cookieToken')
const filUpload = require('express-fileupload')
const cloudinary = require('cloudinary')
const bigPromise = require('../middleware/bigPromise')

exports.signup = bigPromise(async(req,res,next)=>{
    
    if(!req.files){
        return next(new CustomError("Photo is required for signup",400))
    }

    let file = req.files.photo
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath,{        
        folder: "examportal/users",
        width: 150,
        crop:"scale",
    });

    const {name,email,password} = req.body

    if(!email || !name || !password){
        return next(new CustomError("Name, email and password are required",400));
    }

    const user = await User.create({
        name,
        email,
        password,
        photo: {
            id: result.public_id,
            secure_url: result.secure_url
        }
    })

})
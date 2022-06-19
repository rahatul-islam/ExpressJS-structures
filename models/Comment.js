//post,user,body,replies

const{Schema,model}=require('mongoose')
const commentSchema=newSchema({
    post:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    body:{
        type:String,
        required:true,
        trim:true
    },
    replies:[
        {
            body:{
                type:String,
                required:true
            },
            user:{
                type:Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
            createAt:{
                type:Date,
                default: new Date()
            }
        }
    ]
},{
    timestamps:true
})


const Comment=model('Comment', commentSchema)
module.exports=Comment
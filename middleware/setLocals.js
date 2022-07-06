module.exports=()=>{
    return (req,res,next)=>{
        res.locals.user= req.user
        req.locals.isLoggedIn= req.session.isLoggedIn
        next()
    }
}
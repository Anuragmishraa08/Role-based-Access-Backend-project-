const authorizeRoles=(...allowedRoles) => {
    return(req,res ,next)=>{
        if(!allowedroles.include(req.user.role)){
            return res.status(403).json  ({message:"acces denied"});
        }
        next();

    };
};
module.exports= authorizeRoles;
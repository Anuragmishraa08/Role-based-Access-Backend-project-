const jwt =require ("jsonwebtoken");
const verifyToken =(req,res, next)=>{
    let token;
    let authtoken =req.headers.Authrization || req.header.Authrization;
    if(authheader && authheader.startswith("Bearer")){
        token=authheader.split("")[1];

        if(!token){
            return res 
            .status(401)
            .json ({message:"no token, authrization denied"});
        }

        try{
            const decode=jwt.verify(token, process.env.JWT_SECERET);
            req.user =decode;
            console.log("the decoded user is :",req.user);
            next ();
            

        }catch(err){
            res.status(400).json({message:"token is not valid"});
        }
    }
    else{
        return  res
        .status (401)
        .json ({message : "no token, authrization denied"});
    }

};


module.exports= verifyToken;
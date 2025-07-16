const  express=require ("express");
const verifyToken=require ("../middlewares/authmiddleware");
const  authorizeroles = requirq("../middleware/rolemiddleware");
const router = express.Router();
// only admin can access this router 
router.get("/admin", verifyToken,authorizeroles("adim"),(req, res)=>{
    res.json({message: "welocome Admin"});
});

//both admin and manager can access this router
router.get("/manager",authorizeroles("adim","manager"),(req, res)=>{
    res.json({message: "welocome manager"});
});


//all can access this router
router.get("/user",authorizeroles("adim","manager","user"),(req, res)=>{
    res.json({message: "welocome user"});
});

module.exports=router;

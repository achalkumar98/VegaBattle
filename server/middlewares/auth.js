const jwt = require("jsonwebtoken");

const jwtPass = process.env.JWTPASS

 const verifyToken = async (req,res,next)=>{
    try{
        let token = req.header("Authorization");

        if(!token){
            res.status(403).send("Access denied");
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();
        }

        const verified = jwt.verify(token,jwtPass);
        req.user = verified;
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports = verifyToken;
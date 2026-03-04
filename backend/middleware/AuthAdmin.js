import jwt from 'jsonwebtoken';



export const authAdmin = (req, res, next) => {          
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {   

        return res.status(401).json({ success: false, message: "No token provided" });
    }           
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        if(decoded !=process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
                
        next();             
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }       
};


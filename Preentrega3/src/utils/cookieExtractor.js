export const cookieExtractor = req =>{
    let token = null;
    if(req&&req.cookies){
        token=req.cookies["JWT_COOKIE"];
    }
    return token;
}
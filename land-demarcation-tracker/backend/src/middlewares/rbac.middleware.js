export const requireRole = (...roles) => {
  console.log("Checking user role...", roles);
  
    return (req, res, next) => {
      console.log("User role: ", req.user);
      
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }
      next();
    };
};
  
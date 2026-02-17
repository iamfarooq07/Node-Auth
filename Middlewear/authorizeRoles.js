export const authorizeRoles = (...roles) => {
    return (req, res, next) => {

        const userRole = req.user.role?.toLowerCase().trim();
        const allowedRoles = roles.map(r => r.toLowerCase().trim());


        if (!userRole) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    };
};
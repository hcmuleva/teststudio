const jwt = require('jsonwebtoken');
module.exports = (config,{strapi}) => {
    return async (ctx, next) => {
        // console.log("entered")
        if (ctx.request.header.authorization) {
            try {
                const token = ctx.request.header.authorization.split(' ')[1];
                // console.log(token)
                const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
                console.log(decoded)
                const user = await strapi.db.query('plugin::users-permissions.user').findOne({ where: {id: decoded.id}, populate: true });
                console.log(user, " Decoded ")
                if (!user) {
                    return ctx.unauthorized('Invalid token');
                }

                ctx.state.user = user;
                
            } catch (err) {
                console.log(err)
                return ctx.unauthorized('Invalid token');
                
            }
        }
        await next();
         

        
    };
};
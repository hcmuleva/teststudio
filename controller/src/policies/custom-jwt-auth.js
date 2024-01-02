
const jwt = require('jsonwebtoken');
module.exports = async (ctx,config,{strapi}) => {
  console.log(ctx.request.header)
 
  const token = ctx.request.header.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
  console.log(decoded)
  // const user = await strapi.db.query('plugin::users-permissions.user').findOne({ where: {id: decoded.id}, populate: true });
  // ctx.state.user=user
  // console.log(ctx.state.user)
  return true
};
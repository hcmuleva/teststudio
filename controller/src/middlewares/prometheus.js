const { httpRequestDurationMicroseconds, graphqlRequestDurationMicroseconds } = require('./util/metrics');
module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
        const start = Date.now();

        // console.log("f3")
        await next();
        const end = Date.now();
        const responseTimeInMs = end - start;
        const params = ctx.state;
        // console.log("f2",ctx.state.user.isAdmin)
        // console.log("params",params)
        if (ctx.request.url === '/graphql' && ctx.request.method === 'POST') {
            const query = ctx.request.body?.query;

            if (query) {
                // don't print huge introspection queries
                if (query.startsWith("query IntrospectionQuery ")) {
                    console.log("Introspection query ignored");
                } else {
                    // format response for better readability

                    const resp = JSON.parse(ctx.body);
                    // print highlighted query and response
                    console.log(query)
                    let user = undefined
                    if (params.user) {
                        user = await strapi.db.query('plugin::users-permissions.user').findOne({ where: { username: params["user"]["username"] }, populate: true });
                    }
                }
            }
        }

        if (ctx.request.url.startsWith('/api/')) {
            let user = undefined
            if (params.user) {
                user = await strapi.db.query('plugin::users-permissions.user').findOne({ where: { username: params["user"]["username"] }, populate: true });
            }

            if (user) {



                httpRequestDurationMicroseconds
                    .labels(user.id, ctx.request.method, ctx.request.url, ctx.response.status, ctx.response.body?.error?.name)
                    .observe(responseTimeInMs );


            } else {

                // console.log(ctx.response.body.error)
                // console.log(responseTimeInMs)
                httpRequestDurationMicroseconds
                    .labels("null", ctx.request.method, ctx.request.url, ctx.response.status, ctx.response.body?.error?.name)
                    .observe(responseTimeInMs );



            }

        }




    };
};
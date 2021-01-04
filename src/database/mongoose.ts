import { connect } from "mongoose"

export const connectMongoose = ()=> connect(
        process.env.MONGO_URI ?? 'mongodb://localhost:27017/node_graphql_real_time'
);

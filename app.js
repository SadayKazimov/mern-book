const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const { MONGODB } = require('./config.js')

const app = express()

// allow cross-origin requests
app.use(cors())


mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
    console.log('MongoDb Connected')
    return app.listen(4000, () => {
        console.log('now listening for requests on port 4000')
    })
})
    
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
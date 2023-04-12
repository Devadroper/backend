import 'dotenv/config'

const config = {
    port: process.env.PORT || 8080,
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase',
    filesPath: process.env.FILES_PATH || './files',
    secretJwt: process.env.SECRET_JWT
  };
  
  export default config;
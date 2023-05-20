import 'dotenv/config'

const config = {
    port: process.env.PORT || 8080,
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase',
    filesPath: process.env.FILES_PATH || './files',
    secretJwt: process.env.SECRET_JWT || 'SecretJWT',
    nodemailerMail: process.env.NODEMAILER_MAIL,
    nodemailerPass: process.env.NODEMAILER_PASS
  };
  
  export default config;
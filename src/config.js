const NODE_ENV = process.env.NODE_ENV
const config = NODE_ENV === "isDev" ? {
    port:3000,
    db_url:"mongodb://localhost:27017",
    db_name:"test-hrms"
} : {
    port:"8080",
    db_url:"",
    db_name:""
}

export default config;
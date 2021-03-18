const NODE_ENV = process.env.NODE_ENV
const config = NODE_ENV === "isDev" ? {
    port:3000,
    db_url:"mongodb://localhost:27017",
    db_name:"hrms",
    salt_rounds:12
} : {
    port:"8080",
    db_url:"",
    db_name:"",
    salt_rounds:12
}

export default config;
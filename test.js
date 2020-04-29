const event = require("./eventArchi")
module.exports = ()=>{
    event.on("chat",(...args)=>{
        console.log(args)
    })
}
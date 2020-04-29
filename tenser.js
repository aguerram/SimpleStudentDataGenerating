const socket = require("socket.io-client")
const test = require("./test")
const event = require("./eventArchi")
const baseUrl = "ws://24.6.3.22/v2.2/aguerram/tenserflow/" //remote tenserflow socket connection
const io = socket(baseUrl)

let events  = [
    "redoublement",
    "ns",
    "note",
    "lname",
    "name",
    "region"
]

io.on("connection",()=>{
    events.forEach((e)=>{
        event.on(e,(arg)=>{
            io.emit(e,arg)
        })
    })
    events.on("etudiant",(data)=>{
        io.emit("etudiant",data)
    })
    io.on("fixes",(data)=>{
        event.emit("fixes",data)
    })
    io.on("keepGoing",()=>{
        event.emit("keepGoing")
    })
})

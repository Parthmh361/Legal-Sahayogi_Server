const cors = require('cors')
const express = require('express');
const clientRoutes = require('./routes/clientRoutes')
const advocateRoutes = require('./routes/advocateRoutes')
const chatRoute = require('./routes/chatRoute')
const messageRoute = require('./routes/messageRoutes')
const researchRoutes = require('./routes/researchRoutes');
const puppeteer=require('puppeteer');
const BASE_URL = process.env.BASE_URL
const PORT = process.env.PORT || 5000
// const url = 'https://indiankanoon.org/browselaws/'

// const main = async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);
//     // await page.screenshot({ path: 'example.png' });
//      const allDocs = await page.evaluate(() => {
//       const articleLink = document.querySelectorAll('a');
//       return Array.from(articleLink).map((link) => {
//         const title = link.textContent;
//         const href = link.href;
//         return { title, href };
//       });
//     });
//     console.log(allDocs);
//     await browser.close();
    
//   };
//   main();
require('dotenv').config();
const mongoose = require('mongoose');
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api',clientRoutes)
app.use('/api',advocateRoutes)
app.use('/api/chat',chatRoute)
app.use('/api/message',messageRoute)
app.use('/api/research',researchRoutes)
app.get('/',(req,res)=>{
    res.send('Hello World')

})

const corsOptions = {
    origin: `https://lsclient-parth-choudharis-projects.vercel.app/`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
}
const server = app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: corsOptions,
});
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('MongoDB connected successfully'))
.catch((err)=>console.log('MongoDB connection failed',err))
io.on("connection",(socket)=>{
    console.log("connected to socket.io");
    socket.on('setup',(userData)=>{
           socket.join(userData?._id);
           console.log("SOCKET IO",userData?._id);
           socket.emit('connected');
    })
    socket.on('join chat',(room)=>{
       socket.join(room);
       console.log("user joined room", room);
    })
    socket.on('typing',(room)=>{
       socket.in(room).emit('typing');
    })
    socket.on('stop typing',(room)=>{
        socket.in(room).emit('stop typing');
     })

    socket.on('new message',(newMessageRecieved)=>{
          var chat = newMessageRecieved.chat;
          if(!chat.users) return console.log("chat.users not defined");
          chat.users.forEach(user=>{
              if(user._id == newMessageRecieved.sender?._id) return;
              socket.in(user._id).emit("message recieved", newMessageRecieved);
          })
    })
})
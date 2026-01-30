require('dotenv').config()
const express = require("express");
const cors = require("cors");
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
const universitiesRouter = require('./routes/universities');
const taskRouter = require('./routes/task');
const counsellorRouter = require('./routes/counsellor');
const profileRouter = require('./routes/profile');
const timelineRouter = require('./routes/timeline');


const PORT = process.env.PORT || 5000;


const app = express()

const allowedOrigins = [
    'http://localhost:5173'
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json())


app.use('/api', authRouter)
app.use('/api/profile', profileRouter)
app.use("/api/dashboard", dashboardRouter)
app.use("/api/universities", universitiesRouter);
app.use("/api/tasks", taskRouter)
app.use('/api/counsellor', counsellorRouter);
app.use('/api/timeline', timelineRouter)



app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
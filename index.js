import express from "express";
import cors from 'cors';
import prisma from "./dbClient.js"

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

async function init() {
  await prisma.note.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      content: ""
    }
  });
}

init();

app.get('/get-notes' , async (req , res) => {
    try {
        const note = await prisma.note.findUnique({
            where : {
                id : 1
            }
        })
        res.json(note);
    } catch (error){
        res.status(500).json({ error: err.message });
    }
});


app.post('/write-notes', async (req, res) => {
  const { content } = req.body;
  if (content === undefined) {
    return res.status(400).json({ error: "content required" });
  }

  try {
    await prisma.note.update({
      where: { id: 1 },
      data: { content }
    });

    res.json({ message: "content has been saved" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

app.listen(PORT, () => {
  console.log("server started");
});

// and then i need to run this on a docker container instead of my machine
// and finally we move the data from sqlite to postgress
import sqlite3 from "sqlite3";
import express from "express";
import cors from 'cors';
const PORT = 3000;
const app = express();
const db = new sqlite3.Database("DB/notes.db");
app.use(express.json());
app.use(cors());

const query = 'CREATE TABLE IF NOT EXISTS notes (content TEXT NOT NULL , id INTEGER PRIMARY KEY CHECK (id = 1))';
db.exec(query);

db.run(
  "INSERT OR IGNORE INTO notes (id, content) VALUES (1, '')"
);

db.get('SELECT * FROM notes' , (err , row) => {
    console.log(row);
})

app.get('/get-notes' , (req , res) => {
    db.get('SELECT content FROM notes WHERE id = 1' , (err , row) => {
        if (err){
            return res.status(500).json({error : err.message});
        }
        return res.json(row);
    });
})

app.post('/write-notes' , (req , res) => {
    const content = req.body.content;
    db.run("UPDATE notes SET content = ? WHERE id = 1",
        [content] , function(err) {
            if (err) {
                return res.status(500).json({ error:err.message});
            } if (!content){
                return res.status(404).json({error:"file not found"});
            }
            res.json({message:"content has been saved"});
        }
    );
})


app.listen(PORT , () => {
    console.log("server started");
});


// right now i need orm for this to learn how orms work 
// and then i need to run this on a docker container instead of my machine
// and finally we move the data from sqlite to postgress
// 
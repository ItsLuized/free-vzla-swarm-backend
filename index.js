const express = require('express');
const Bee = require('@ethersphere/bee-js');
const app = express();
const cors = require('cors')
const sqlite3 = require('sqlite3');
// http://127.0.0.1:1633
app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const bee = new Bee.Bee('http://localhost:1633')
const beeDebug = new Bee.BeeDebug('http://localhost:1635');
const db = require('./db');

// const uploadImage = async (image) => {
//   const postageBatchId = await beeDebug.getAllPostageBatch();
//   const result = await bee.uploadData(postageBatchId[0].batchID, image)
//   return result.reference
// }

app.post('/createPost', async (req, res) => {
  console.log(`${req.method} - ${req.url} - ${req.body}`)
  const { title, content } = req.body;

  const postageBatchId = await beeDebug.getAllPostageBatch()
  console.log(postageBatchId)
  const result = await bee.uploadData(postageBatchId[0].batchID,
    JSON.stringify({
      title: title,
      content: content
    }));
  console.log(result);
  db.run('INSERT INTO posts(reference) VALUES (?)',
    [result.reference],
    (err) => {
      if (err) console.log("Unable to insert post")
    })

  res.status(200).send({
    status: 200,
    message: "Saved",
    data: result.reference
  })
});

app.post('/getPost', async (req, res) => {
  console.log(`${req.method} - ${req.url} - ${req.body}`)
  const { reference } = req.body;
  const result = await bee.downloadData(reference)
  res.status(200).send({
    status: 200,
    message: "Post downloaded successfully",
    data: result.text()
  })
})

app.get('/getAllPosts', async (req, res) => {
  console.log(`${req.method} - ${req.url}`)
  const postRef = await db.all('SELECT reference FROM posts', async (err, references) => {
    if (err) { console.log(err) }
  })
  let posts = [];
  for (let i = 0; i < postRef.length; i++) {
    console.log(postRef[i])
    posts.push((await (bee.downloadData(postRef[i].reference))).json())

  }
  console.log(posts)
  res.status(200).send({
    status: 200,
    message: "posts fetched",
    data: posts,
    references: postRef
  });
})

app.put("/updatePost", async (req, res) => {
  console.log(`${req.method} - ${req.url} - ${JSON.stringify(req.body)}`)
  const { reference, title, content, tags, image } = req.body;

  let { result } = await db.get('SELECT COUNT(*) as result FROM posts WHERE reference = ?', [reference]);
  if (result == 0) {
    return res.status(404).send({ status: 404, message: "Resources not found" })
  }
  db.run('DELETE FROM posts WHERE reference = ?', [reference])
  // let imageRef = ""
  // if (image != null) {
  //   imageRef = uploadImage(image);
  // }
  const postageBatchId = await beeDebug.getAllPostageBatch();
  result = await bee.uploadData(postageBatchId[0].batchID,
    JSON.stringify({
      title: title,
      content: content,
      tags: tags,
      image: imageRef
    }));
  console.log(result);
  db.run('INSERT INTO posts(reference) VALUES (?)',
    [result.reference],
    (err) => {
      if (err) console.log("Unable to insert post")
    })

  return res.status(200).send({
    status: 200,
    message: "Saved",
    data: result.reference
  })

})

app.delete('/deletePost', async (req, res) => {
  const { reference } = req.body;

  let { result } = await db.get('SELECT COUNT(*) as result FROM posts WHERE reference = ?', [reference]);
  if (result == 0) {
    return res.status(404).send({ status: 404, message: "Resources not found" })
  }
  db.run('DELETE FROM posts WHERE reference = ?', [reference])
  return res.status(200).send({ status: 200, message: "Post deleted successfully" })
})

// LOCAL
app.listen(3001, async () => {
  console.log("App listening at http://localhost:3001");
});
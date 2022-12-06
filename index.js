const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')

const commentsByPostId = {

}

const app = express()
app.use(express.json())
app.use(cors())

app.get('/posts/:id/comments', (req, res) => {
  const {id} = req.params
  res.status(200).send(commentsByPostId[id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const {id} = req.params
  const {content} = req.body
  const comments = commentsByPostId[id] || []
  comments.push({id: commentId, content})
  commentsByPostId[id] = comments
  res.status(201).send(comments)
})

app.listen(4001, () => {
  console.log('Listening on post 4001')
})

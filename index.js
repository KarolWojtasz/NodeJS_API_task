const express = require('express')
const { urlencoded, json } = require('body-parser')
const makeRepositories = require('./middleware/repositories')

const STORAGE_FILE_PATH = 'questions.json'
const PORT = 3000

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(makeRepositories(STORAGE_FILE_PATH))

app.get('/', (_, res) => {
  res.json({ message: 'Welcome to responder!' })
})

app.get('/questions', async (req, res) => {
  const questions = await req.repositories.questionRepo.getQuestions()
  res.json(questions)
})

app.get('/questions/:questionId', (req, res) => {
  req.repositories.questionRepo.getQuestionById(req.params.questionId).then((value) => {
    res.json(value)
  });
})

app.post('/questions', (req, res) => {
  req.repositories.questionRepo.addQuestion(req.body).then((value) => {
    res.json(value)
  });
})

app.get('/questions/:questionId/answers', (req, res) => {
  req.repositories.questionRepo.getAnswers(req.params.questionId).then((value) => {
    res.json(value)
  });
})

app.post('/questions/:questionId/answers', (req, res) => {
  req.repositories.questionRepo.addAnswer(req.params.questionId, req.body).then((value) => {
    res.json(value)
  });
})

app.get('/questions/:questionId/answers/:answerId', (req, res) => {
  req.repositories.questionRepo.getAnswer(req.params.questionId, req.params.answerId).then((value) => {
    res.json(value)
  });
})

app.listen(PORT, () => {
  console.log(`Responder app listening on port ${PORT}`)
})

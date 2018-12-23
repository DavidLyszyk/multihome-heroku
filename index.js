const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
	.get('/tiles', (req, res) => res.render('pages/tiles'))
	.get('/list', (req, res) => res.render('pages/list'))
	.get('/timers', (req, res) => res.render('pages/timers'))
	.get('/events', (req, res) => res.render('pages/events'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

module.exports = app => {
  const express = require('express');
  const router = express.Router({
    mergeParams: true
  });

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.get('/', async (req, res) => {
    let queryOptions = {}
    switch (req.Model.modelName) {
      case 'Category':
        queryOptions.populate = 'parent'
        break;
      case 'Hero':
        queryOptions.populate = [
          { path: 'categories', select: 'name' },
          { path: 'items1', select: ['name', 'icon'] }, 
          { path: 'items2', select: 'name' },
          'partners.hero' ]
        break;
      default:
        break;
    }
    console.log('queryOptions', queryOptions);
    const model = await req.Model.find(req.body).setOptions(queryOptions).limit(100)
    res.send(model)
  })

  router.put('/update', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.body._id, req.body)
    res.send(model)
  })

  router.delete('/delete', async (req, res) => {
    const model = await req.Model.findByIdAndRemove(req.body.id)
    res.send({
      success: true
    })
  })

  router.get('/detail', async (req, res) => {
    const model = await req.Model.findById(req.query.id)
    res.send(model)
  })

  app.use('/admin/api/v1/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({dest:  __dirname + '/../../uploads'})

  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    console.log('req', req.file)
    // require('fs').writeFileSync('./file/' + req.file.originalname, req.file.buffer)
    // console.log('res', res)
    res.send(req.file)
  })
}
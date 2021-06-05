// const fs = require('fs').promises
// const imageToBase64 = require('image-to-base64')
// const svgToDataURL = require('svg-to-dataurl')
const path = require('path')
const Model = require('../models')

const resolveImageUrl = (url) => {
  const arrUrl = url.split('/')
  const arrRoot = process.env.storage.split('/')
  return path.resolve.apply(path, [__dirname, '..', '..'].concat(arrRoot, arrUrl))
}

module.exports = {
  relationImageById (table, id) {
    return new Promise(async resolve => {
      const ImageModel = new Model.Image
      const ImageRelationModel = new Model.ImageRelation
      const imageRelations = await ImageRelationModel.where('relation_name', table).where('relation_id', id).get()
      if (imageRelations.length) {
        const Images = await ImageModel.where('id', imageRelations.find(p => p).image_id).get()
        await Promise.all(
          Images.map(async image => {
            image.url = process.env.api_host + '/' + image.url
            // if (image.ext === 'svg') {
            //   image.url = svgToDataURL(await fs.readFile(resolveImageUrl(image.url)))
            // } else if (image.ext === 'jpg' || image.ext === 'jpeg' || image.ext === 'png') {
            //   image.url = await imageToBase64(resolveImageUrl(image.url))
            // }
          })
        )
        resolve(Images)
        return
      }
      resolve([])
    }).catch(() => {
      console.error('Service error: Image relationImageById handle.'.red)
    })
  }
}
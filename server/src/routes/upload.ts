import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

// it shows when the process is over
const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, // 5 mb
      },
    })
    if (!upload) {
      return reply.status(400).send
    }
    // to know if the upload is a video or image
    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)
    if (!isValidFileFormat) {
      return reply.status(400).send()
    }

    const fileId = randomUUID()
    const extension = extname(upload.filename)

    // it adds a random number at the end of the file name to avoid files with same name
    const fileName = fileId.concat(extension)
    // to save the upload slowly and where to save it
    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', fileName),
    )
    await pump(upload.file, writeStream)

    // creates a url to access files
    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()
    return { fileUrl }
  })
}

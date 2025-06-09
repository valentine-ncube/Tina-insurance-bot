import express from 'express'
import {
  startTinaSession,
  getTinaResponse,
} from '../controllers/tinaController.js'

const router = express.Router()

router.post('/ask-tina', startTinaSession)
router.post('/tina-response', getTinaResponse)

export default router

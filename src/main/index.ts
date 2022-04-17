import { Request, Response } from 'express'
import app from './config/app'

app.get('/', (req: Request, res: Response) => {
  res.sendStatus(200)
})

const PORT = 3333
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))

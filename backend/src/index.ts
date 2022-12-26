import express from "express"
import { apiPassword } from "./password-gen"

const app = express()

app.use(express.json())

app.get("/", apiPassword)

app.listen(4041)

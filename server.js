const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai')


const config = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
})

const openai = new OpenAIApi(config)

const app = express();

app.use(cors());
app.use(express.json());


app.post('/api/generate', async (req, res) => {
    try {
        const description = req.body.description;

        if (!description) {
            return res.status(400).json({ message: 'Description is required' })
        }

        const response = await openai.createImage({
            prompt: description,
            n: 1,
            size: "1024x1024"
        })

        const { data } = response.data;
        const { url: imageUrl } = data[0];

        return res.json({ imageUrl })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})



const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => console.log(`Server started on  http://localhost:${PORT}`));


import {ChatOpenAI} from '@langchain/openai'
import {configDotenv} from 'dotenv'
configDotenv()

const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.2,
    model: process.env.OPENAI_API_MODEL ,
    verbose:true

})

const response = await model.invoke('Write a short story about a robot learning to love.')

for await (const chunk of response) {
   console.log(chunk)
}

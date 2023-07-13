const config = require("../../config");
const api_key = config.chatgpt_key
const { Configuration, OpenAIApi } = require('openai')

const openai = new OpenAIApi(new Configuration({
    apiKey: api_key
}))

const ERR_MESSAGE = "ChatGPT error"
const NO_REPLY = "ChatGPT didn't reply anything"

const askReply = async (chatPost) => {
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: `Imagine that you are a person in public chat and someone posts a message. Give a fun reply to following message: ${chatPost}` 
            },],
        });
        const reply = completion.data.choices[0].message.content
        if (reply && reply.length > 0) {         
            return reply
        } else {
            return {"Message":NO_REPLY}
        }        
    } catch(err) {
        return {"Message":ERR_MESSAGE}
    }
}

module.exports = {askReply};
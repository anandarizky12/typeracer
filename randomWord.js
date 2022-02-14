const axios = require('axios');

const uri = 'http://api.quotable.io/random';


const getRandomWord = async () => {
    // return axios.get(uri).then(res =>{
    //     return res.data.content.split(' ');
    // })
    const response = await axios.get(uri);
    const result =  response.data.content;
    return result.split(" ");
};


module.exports = getRandomWord;
const algorithmia = require('algorithmia')
const algorithmiaApiKey= require('../credentials/algorithmia.json').ApiKey
const sentenceBoundaryDetection = require('sbd')

async function robot(content){
 await fetchContentFromWikipedia(content)
 sanitizeContent(content)
  breakContentIntoSentences(content)

  async function fetchContentFromWikipedia(content){
    const algorithmiaAutenticated =  algorithmia(algorithmiaApiKey)
    const wikipediaAlgorithm = algorithmiaAutenticated.algo('web/WikipediaParser/0.1.2')
   const wikipediaResponde = await wikipediaAlgorithm.pipe({
       "lang" : "pt",
       "articleName" : content.searchTerm
   })
   wikipediaContent = wikipediaResponde.get()
   content.sourceContenOriginal=wikipediaContent.content
  }

  function sanitizeContent(content){
    const withouBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContenOriginal)
    const withoutDatesInParentheses = removeDatesInParentheses(withouBlankLinesAndMarkdown)

    content.sourceContentSanitized = withoutDatesInParentheses

    
    function removeBlankLinesAndMarkdown(text){
        const allLines = text.split("\n")

        const withouBlankLinesAndMarkdown = allLines.filter((line)=>{
            if(line.trim().length === 0 || line.trim().startsWith('=')){
                return false
            }
            return    true
        })
        return withouBlankLinesAndMarkdown.join(' ')
    }

    function removeDatesInParentheses(text) {
        return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
      }
    }
    function breakContentIntoSentences(content){
        content.sentences =[]
        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence) =>
            content.sentences.push({
                text: sentence,
                keywords: [],
                images:[]
            })
        )
        
    }
}

module.exports = robot



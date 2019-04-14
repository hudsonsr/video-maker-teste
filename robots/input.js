const readline = require('readline-sync')
const state = require('./state.js')
 
function robot(){
    const content = {
        maximumSentences: 7
    }

    content.searchTerm = askAndReturnSearhTerm()
    content.prefix = askAndReturnPrefix()
    state.save(content)

    function askAndReturnSearhTerm() {
        return readline.question('Digite o termo a ser pesquisado no wikipedia: ')
    }

    function askAndReturnPrefix(){
        const prefixes = ['Quem e','O que e', 'A historia de']
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Escolha uma opcao: ')
        const selectedPrefixText = prefixes[selectedPrefixIndex]

        return selectedPrefixText 
    }
}

module.exports = robot
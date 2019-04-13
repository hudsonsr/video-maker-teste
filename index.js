const readline = require('readline-sync')
function start() {
	const content = {}
	
	content.searchTerm = askAndReturnSearhTerm()
	content.prefix = askAndReturnPrefix()

	function askAndReturnSearhTerm() {
		return readline.question('Digite o termo a ser pesquisado no wikipedia: ')
	}

	function askAndReturnPrefix(){
		const prefixes = ['Quem e','O que e', 'A historia de']
		const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Escolha uma opcao: ')
		const selectedPrefixText = prefixes[selectedPrefixIndex]

		return selectedPrefixText 
	}
	console.log(content)
}
start()
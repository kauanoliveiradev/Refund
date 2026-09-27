//Seleciona os elementos do form
const amount = document.querySelector('#amount')
const expense = document.querySelector('#expense')
const form = document.querySelector('form')
const category = document.querySelector('#category')

//Seleciona os Elementos da lista
const expenseList = document.querySelector('ul')
const expensesQuantaty = document.querySelector('aside header p span')
const expensesTotal = document.querySelector('aside header h2')

//Convertendo o valor q eu digito para número decimal
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")

    value = Number(value) / 100

    amount.value = formatCurrentyBRL(value)
}

//Formatando o valor q eu digito em dinheiro brasileiro
function formatCurrentyBRL (value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    return value
}


//pegando o formulario e transformando com os detalhes da nova despesa (valort, categoria, nome selecionado...)
form.onsubmit = (event) => {
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    };

    //chama a função
    expenseAdd(newExpense)
}

//Adiciona um novo item na lista
function expenseAdd(newExpense) {
    try {
        //Cria o elemento para adicionar o item (li) na lista (ul)
        const expenseItem = document.createElement('li')
        expenseItem.classList.add('expense')

        //Criando o icone do item 
        const expenseIcone = document.createElement('img')
        expenseIcone.setAttribute('src', `img/${newExpense.category_id}.svg`)
        expenseIcone.setAttribute('alt', newExpense.category_name)

        //Criando a info da despesa
        const expenseInfo = document.createElement('div')
        expenseInfo.classList.add('expense-info')

        //Criando o nome da despesa
        const expenseName = document.createElement('strong')
        expenseName.textContent = newExpense.expense

        //Criando a categoria da despesa
        const expenseCategory = document.createElement('span')
        expenseCategory.textContent = newExpense.category_name

        //Adicionando nome e categoria na div
        expenseInfo.append(expenseName, expenseCategory)

        //Criando o valor da despesa
        const expenseAmout = document.createElement('span')
        expenseAmout.classList.add('expense-amount')
        expenseAmout.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace('R$','')}`


        //Cria o icone de remover
        const removeIcon = document.createElement('img')
        removeIcon.classList.add('remove-icon')
        removeIcon.setAttribute('src', 'img/remove.svg')
        removeIcon.setAttribute('alt', 'remover')
        


        //Adicionando Informações no item
        expenseItem.append(expenseIcone, expenseInfo, expenseAmout, removeIcon)

        //Adiciona o item na lista
        expenseList.append(expenseItem)
        
        //Limpa o formulário para adicionar um novo item
        formClear() 

        //Atualiza os totais
        updateTotals()

        //Cria o icone da categoria
    } catch (error) {
        alert('item da despesa não foi possivel ser atualizado')
        console.log(error)

    }
}



//Atualiza os totais
function updateTotals () {
    try {
        //Recupera todos os itens da lista
        const itens = expenseList.children

        //Atualiza a quantidade de itens da lista
        expensesQuantaty.textContent = `${itens.length} ${itens.length > 1 ? 'despesas' : 'despesa'} `

        //Total
        let total = 0

        //percorrer os itens da despesa
        for (let item = 0; item < itens.length; item++) {
            const itemAmount = itens[item].querySelector('.expense-amount')

            let value = itemAmount.textContent.replace(/[^\d,]/g, '').replace(',','.')

            //Convertendo para float
            value = parseFloat(value)

            //Verificando se é um número válido
            if(isNaN(value)) {
                alert('Não foi possivel calcular o total, o valor não parece ser um número')
            }

            //Incrementando o valor total
            total += Number(value)
        }

        //Criando a span para adicionar o R$ formatado
        const symbolBRL = document.createElement('small')
        symbolBRL.textContent = 'R$'

        //Formata o valor e remove R$ que será exibido pela small com um estilo customizado
        total = formatCurrentyBRL(total).toUpperCase().replace('R$', '')

        //Limpa o conteudo do elemento
        expensesTotal.innerHTML = ''

        //Adicionando o simbolo da moeda e do valor formatado
        expensesTotal.append(symbolBRL, total)




    } catch (error) {
        console.log(error)
    }
}

//Evento que captura o clique nos itens da lista
expenseList.addEventListener('click', function (event) {

    //verifica se o elemento clicado  é o ícone de remover
    if(event.target.classList.contains('remove-icon')) {
        //Obtem o pai li do elemento clicado
        const item = event.target.closest('.expense')

        //Remove o item da lista
        item.remove()
    }

    //Atualiza os totais
    updateTotals()
})

function formClear () {
    //Limpa os inputs
    expense.value = ''
    category.value = ''
    amount.value = ''

    //Coloca o foco no input
    expense.focus()
}
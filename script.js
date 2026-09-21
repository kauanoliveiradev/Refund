const amount = document.querySelector('#amount')
const expense = document.querySelector('#expense')
const fortm = document.querySelector('#form')
const category = document.querySelector('#category')


amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")
    
    value = Number(value) / 100

    amount.value = formatCurrentyBRL(value)
}

function formatCurrentyBRL (value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    return value
}

form.onsubmit = (event) => {
    event.preventDefault()
}
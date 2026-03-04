function operate(n1,n2,op){
    const actions = {
        "+": (a,b) => a+b,
        "-": (a,b) => a-b,
        'x': (a,b) => a*b,
        '/': (a,b) => a/b
    }
    return actions[op]? actions[op](n1,n2):"Invalid Operator"
}
function disable(s1,list){
    let inter = list.filter((item) => item !== s1)
    for(let i=0;i<inter.length;i++ ){
        document.getElementById(inter[i]).disabled = true
    }
}
function enable(list){
    let inter = list
    for(let i=0;i<inter.length;i++ ){
        document.getElementById(inter[i]).classList.remove('toggled')
        document.getElementById(inter[i]).disabled = false
    }
}
function enabledchecker(list){
    for (let i=0;i<list.length;i++){
        if(document.getElementById(list[i]).disabled === false){
            return list[i]
        }
    }
}

const container = document.querySelector("#container")
let symbols = ["7","8","9","DEL","AC","4","5","6","x","/","1","2","3","+","-","0",".","x10","Ans","="]
let numbers = ["1","2","3","4","5","6","7","8","9","0","."]
let signs = ["x","/","+","-","="]
const input = document.createElement("input")
input.style.border = "1px solid black"
input.disabled = true
input.style.width = "200px"
input.style.height = "50px"
input.style.color = "black"
input.style.boxSizing = "border-block"
container.appendChild(input)
const buttons = document.createElement("div")
buttons.id= "buttons"
for (let i=0;i<symbols.length;i++){
    let button = document.createElement("button")
    button.style.flex = "1 0 calc(100% /" + 6 + ")"
    button.style.border= "1px solid gray"
    button.style.boxSizing = "border-block"
    button.style.textAlign= "center"
    button.textContent= symbols[i]
    button.id = symbols[i]
    buttons.appendChild(button)
}
container.appendChild(buttons)
let nb1 = 0
let nb2 = 0
let sign = 0
let result = 0
let liste = document.querySelectorAll("button")
liste.forEach((button) =>{
    button.addEventListener('click',() => {
        if(numbers.includes(button.textContent) === true){
            if(input.value !== "" && 
                signs.every(num => document.getElementById(num).disabled === false)=== true) 
                input.value= input.value + button.textContent
            else if (input.value !== "" && 
                signs.every(num => document.getElementById(num).disabled === false)=== false ){
                        nb1 = Number(input.value)
                        input.value = button.textContent
                    sign = enabledchecker(signs)
                    enable(signs)
                }
            
            else input.value= button.textContent
        }
        else if (signs.includes(button.id)=== true){
            button.classList.toggle('toggled')
            disable(button.id,signs)
            if(nb1 !== 0 && result === 0 || button.id === "=" ){
                enable(signs)
                nb2 = Number(input.value)
                if(sign !==0 ){
                    result = operate(nb1,nb2,sign)
                    console.log(result)
                    input.value = result

        
                }
                }
            nb1 = result
            nb2 = 0
            button.classList.remove('toggled')
            sign = ""
            }
        else if( button.id === "AC"){
                nb1 = 0
                nb2 = 0
                enable(symbols)
                result = 0
                input.value = ""
                sign = 0
            }
        else if (button.id === "DEL") input.value = input.value.slice(0,-1)
        
            
            


        


    })
})
class Despesa {
	constructor(nome, numero, donut, bebida, descricao, valor) {
		this.nome = nome
		this.numero = numero
		this.donut = donut
		this.bebida = bebida
		this.descricao = descricao
		this.valor = valor
	}

	validarDados() {
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros() {

		//array de despesas
		let despesas = Array()

		let id = localStorage.getItem('id')

		//recuperar todas as despesas cadastradas em localStorage
		for(let i = 1; i <= id; i++) {

			//recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i))

			//existe a possibilidade de haver índices que foram pulados/removidos
			//nestes casos nós vamos pular esses índices
			if(despesa === null) {
				continue
			}

            despesa.id = i
			despesas.push(despesa)
		}

		return despesas
	}

	pesquisar(despesa){

		let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()
		console.log(despesasFiltradas);
		console.log(despesa)

		//ano
		if(despesa.nome != ''){
			console.log("filtro de nome");
			despesasFiltradas = despesasFiltradas.filter(d => d.nome == despesa.nome)
		}
			
		//mes
		if(despesa.numero != ''){
			console.log("filtro de numero");
			despesasFiltradas = despesasFiltradas.filter(d => d.numero == despesa.numero)
		}

		//dia
		if(despesa.donut != ''){
			console.log("filtro de donut");
			despesasFiltradas = despesasFiltradas.filter(d => d.donut == despesa.donut)
		}

		//tipo
		if(despesa.bebida != ''){
			console.log("filtro de bebida");
			despesasFiltradas = despesasFiltradas.filter(d => d.bebida == despesa.bebida)
		}

		//descricao
		if(despesa.descricao != ''){
			console.log("filtro de descricao");
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		//valor
		if(despesa.valor != ''){
			console.log("filtro de valor");
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		
		return despesasFiltradas

	}

    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()


function cadastrarDespesa() {

	let nome = document.getElementById('nome')
	let numero = document.getElementById('numero')
	let donut = document.getElementById('donut')
	let bebida = document.getElementById('bebida')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		nome.value, 
		numero.value, 
		donut.value, 
		bebida.value, 
		descricao.value,
		valor.value
	)


	if(despesa.validarDados()) {
		bd.gravar(despesa)

		document.getElementById('modal_titulo').innerHTML = 'Pedido efetuado com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Seu pedido foi efetuado e já está sendo preparado'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		//dialog de sucesso
		$('#modalRegistraDespesa').modal('show') 

		nome.value = '' 
		numero.value = ''
		donut.value = ''
		bebida.value = ''
		descricao.value = ''
		valor.value = ''
		
	} else {
		
		document.getElementById('modal_titulo').innerHTML = 'Erro na efetuação do pedido'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro no pedido, verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		//dialog de erro
		$('#modalRegistraDespesa').modal('show') 
	}
}

function carregaListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false){
		despesas = bd.recuperarTodosRegistros() 
	}
	

	/*

	<tr>
		<td>15/03/2018</td>
		<td>Alimentação</td>
		<td>Compras do mês</td>
		<td>444.75</td>
	</tr>

	*/

	let listaDespesas = document.getElementById("listaDespesas")
    listaDespesas.innerHTML = ''
	despesas.forEach(function(d){

		//Criando a linha (tr)
		var linha = listaDespesas.insertRow();

		//Criando as colunas (td)
		linha.insertCell(0).innerHTML = d.nome

		//Ajustar o tipo
		switch(d.donut){
			case '1': d.donut = 'Morango'
				break
			case '2': d.donut = 'Chocolate'
				break
			case '3': d.donut = 'Doce de Leite'
				break
			case '4': d.donut = 'Leite Ninho'
				break
			case '5': d.donut = 'Limão'
				break
            case '6': d.donut = 'Recheado Chocolate'
                break
            case '7': d.donut = 'Recheado Nutella'
                break
            case '8': d.donut = 'Recheado Morango'
                break
            case '9': d.donut = 'Recheado Goiabada'
                break
            case '10': d.donut = 'Recheado Doce de Leite'
                break
            case '11': d.donut = 'Recheado Leite Ninho'
                break
            case '12': d.donut = 'Recheado Limão'
                break
            case '13': d.donut = 'Recheado Red Velvet'
                break
            case '14': d.donut = 'Especial Kit Kat'
                break
            case '15': d.donut = 'Especial Oreo'
                break
            case '16': d.donut = 'Especial Ovomaltine'
                break
            case '17': d.donut = 'Especial M&Ms'
                break
            case '18': d.donut = 'Especial Napolitano'
                break
            case '19': d.donut = 'Especial Paçoca'
                break
            case '20': d.donut = 'Especial Galak'
                break
            case '21': d.donut = 'Especial Kinder'
                break
            case '22': d.donut = 'Especial Sensação'
                break
            case '23': d.donut = 'Especial Torta de Limão'
                break
            case '24': d.donut = 'Especial Mousse de Maracujá'
                break
            case '25': d.donut = 'Não pedi donuts'
                break
		}
		linha.insertCell(1).innerHTML = d.donut

        switch(d.bebida){
            case '1': d.bebida = 'Café Pequeno'
                break
            case '2': d.bebida = 'Café Médio'
                break
            case '3': d.bebida = 'Café Grande'
                break
            case '4': d.bebida = 'Cappuccino'
                break
            case '5': d.bebida = 'Cappuccino Europeu'
                break
            case '6': d.bebida = 'Chocolate Quente'
                break
            case '7': d.bebida = 'Frappuccino'
                break
            case '8': d.bebida = 'Água'
                break
            case '9': d.bebida = 'Água com Gás'
                break
            case '10': d.bebida = 'Coca-Cola'
                break
            case '11': d.bebida = 'Guaraná Antartica'
                break
            case '12': d.bebida = 'Chá Gelado'
                break
            case '13': d.bebida = 'Suco Natural'
                break
            case '14': d.bebida = 'Não pedi bebida'
                break
        }
		linha.insertCell(2).innerHTML = d.bebida
		linha.insertCell(3).innerHTML = `R$ ${d.valor}`
		
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger btn-sm'
        btn.innerHTML = '<i class="fas fa-times"</i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_','')
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
	})

 }

 
 function pesquisarDespesa(){
	 
	let nome  = document.getElementById("nome").value
	let numero = document.getElementById("numero").value
	let donut = document.getElementById("donut").value
	let bebida = document.getElementById("bebida").value
	let descricao = document.getElementById("descricao").value
	let valor = document.getElementById("valor").value

	let despesa = new Despesa(nome, numero, donut, bebida, descricao, valor)

	let despesas = bd.pesquisar(despesa)
	 
	this.carregaListaDespesas(despesas, true)

 }
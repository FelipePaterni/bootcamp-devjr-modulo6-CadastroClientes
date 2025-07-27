$("#CEPInput").mask("00000-000");
var listClientes = [];
var validCEP = false;

function searchCEP() {
  var CEP = document.getElementById("CEPInput");
  var valueCEP = CEP.value.replace("-", "");
  var url = `https://viacep.com.br/ws/${valueCEP}/json/`;

  cleanForm();
  if (!valueCEP.trim()) {
    CEP.className = "form-control";
    valueCEP = false;
    return;
  }

  if (isValidCEP(valueCEP)) {
    $.getJSON(url, (data) => {
      if (data.erro) {
        return showErro("Esse CEP não existe");

        
      }
      showCEPInfo(data);
      CEP.className = "form-control is-valid";
      validCEP = true;
    }).fail(() => {
      showErro("Esse CEP não existe");
    });
  } else showErro("CEP inválido. Digite 8 números.");
}

function showCEPInfo(data) {
  document.getElementById("EnderecoInput").value = data.logradouro;
  $("#NumeroInput").prop("disabled", false);

  document.getElementById("BairroInput").value = data.bairro;
  document.getElementById("CidadeInput").value = data.localidade;
  document.getElementById("EstadoInput").value = data.uf;
}

function cleanForm() {
  document.getElementById("EnderecoInput").value = "";
  $("#NumeroInput").prop("disabled", true);

  document.getElementById("BairroInput").value = "";
  document.getElementById("CidadeInput").value = "";
  document.getElementById("EstadoInput").value = "";
}

function showErro(textErro) {
  document.getElementById("CEPInput").className = "form-control is-invalid";
  document.getElementById("CEPFeedback").innerHTML = textErro;
  validCEP = false;
}
function isValidCEP(cep) {
  return /^[0-9]{8}$/.test(cep);
}

function save() {
    if(!validCEP) {
        alert("CEP invalido");
        return
    }
  var newCliente = {
    id: listClientes.length + 1,
    nome: `${document.getElementById("NomeInput").value} ${
      document.getElementById("SobrenomeInput").value
    }`,
    endereco:`${document.getElementById("EnderecoInput").value}, ${document.getElementById("NumeroInput").value.trim()}`,
    cep: document.getElementById("CEPInput").value,
    bairro: document.getElementById("BairroInput").value,
    cidade: document.getElementById("CidadeInput").value,
    estado: document.getElementById("EstadoInput").value,
  };
  addNewRow(newCliente);
  listClientes.push(newCliente);
  document.getElementById("formClientes").reset();
}

//on load
loadAlunos();

function loadAlunos() {
  for (let cliente of listClientes) {
    addNewRow(cliente);
  }
}

function addNewRow(cliente) {
  var table = document.getElementById("clientesTable");
  var row = table.insertRow();

  //id
  var idNode = document.createTextNode(cliente.id);
  row.insertCell().appendChild(idNode);

  //nome
  var nomeNode = document.createTextNode(cliente.nome);
  row.insertCell().appendChild(nomeNode);

  //endereço
  var enderecoNode = document.createTextNode(cliente.endereco);
  row.insertCell().appendChild(enderecoNode);

  //cep
  var cepNode = document.createTextNode(cliente.cep);
  row.insertCell().appendChild(cepNode);

  //bairro
  var bairroNode = document.createTextNode(cliente.bairro);
  row.insertCell().appendChild(bairroNode);

  //cidade
  var cidadeNode = document.createTextNode(cliente.cidade);
  row.insertCell().appendChild(cidadeNode);

  //estado
  var estadoNode = document.createTextNode(cliente.estado);
  row.insertCell().appendChild(estadoNode);
}

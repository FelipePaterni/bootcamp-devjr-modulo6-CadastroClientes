function searchCEP() {
  var CEP = document.getElementById("CEPInput");

  if (!CEP.value.trim()){
    CEP.className = "form-control";
    return
  }
  var url = `https://viacep.com.br/ws/${CEP.value}/json/`;

  if (isValidCEP(CEP)) {
    $.getJSON(url, (data) => {
        if(data.erro){
         return showErro("Esse CEP não existe")
        }
      showCEPInfo(data);
      CEP.className = "form-control is-valid";
    }).fail(() => {
      showErro("Esse CEP não existe")
    });
  }else showErro("CEP inválido. Digite 8 números.")
}

function showCEPInfo(data) {
  document.getElementById("EnderecoInput").value = data.logradouro;
  $("#NumeroInput").prop("disabled", false);

  document.getElementById("BairroInput").value = data.bairro;
  document.getElementById("CidadeInput").value = data.localidade;
  document.getElementById("EstadoInput").value = data.uf;
}

function showErro(textErro) {
  document.getElementById("CEPInput").className = "form-control is-invalid";
  document.getElementById("CEPFeedback").innerHTML = textErro;
}
function isValidCEP(cep) {
  return /^[0-9]{8}$/.test(cep);
}

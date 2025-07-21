function searchCEP() {
  var CEP = document.getElementById("CEPInput");

  var url = `https://viacep.com.br/ws/${CEP.value}/json/`;

  try {
    $.getJSON(url, (data) => {

      showCEPInfo(data);
    });
  } catch (error) {}
}

function showCEPInfo(data){
document.getElementById("EnderecoInput").value = data.logradouro;
$("#NumeroInput").prop("disabled", false);
document.getElementById("BairroInput").value = data.bairro;
document.getElementById("CidadeInput").value = data.localidade;
document.getElementById("EstadoInput").value = data.uf;
}
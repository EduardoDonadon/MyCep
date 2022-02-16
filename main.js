async function api(state, city, street) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${state}/${city}/${street}/json/`);
    const formattedResponse = await response.json();
    
    return formattedResponse[0];
  } catch (error) {
    return {
      cep: "dados inválidos"
    } 
  }
}

const form = document.getElementById('form');
const stateInput = document.getElementById('state');
const cityInput = document.getElementById('city');
const streetInput = document.getElementById('street');
const cepSpan = document.getElementById('cepSpan');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  cepSpan.innerHTML = 'carregando...';

  if(!stateInput.value || !cityInput.value || !streetInput.value) return;

  const address = await api(stateInput.value, cityInput.value, streetInput.value);

  if(address.cep) {
    cepSpan.innerHTML = address.cep;
  }
})
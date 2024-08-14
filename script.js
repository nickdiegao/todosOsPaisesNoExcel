const axios = require('axios');
const xlsx = require('xlsx');

// Função para buscar todos os países
async function fetchCountriesData() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados dos países:', error);
        return [];
    }
}

// Função para processar os dados e gerar a planilha
async function createExcelFile() {
    const countriesData = await fetchCountriesData();

    const countries = countriesData.map(country => ({
        name: country.name.common,
        capital: country.capital ? country.capital[0] : 'N/A',
        population: country.population,
        language: country.languages ? Object.values(country.languages).join(', ') : 'N/A',
        currency: country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'
    }));

    // Cria uma nova planilha
    const worksheet = xlsx.utils.json_to_sheet(countries);

    // Cria um novo workbook e adiciona a planilha criada
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Países");

    // Escreve o arquivo Excel
    xlsx.writeFile(workbook, "TodosPaises.xlsx");

    console.log("Arquivo Excel criado com sucesso!");
}

// Executa a função para criar o arquivo Excel
createExcelFile();


/* OUTRA FORMA DE FAZER PORÉM BEM MAIS COMPLEXA!
const xlsx = require('xlsx');

// Dados dos países
const countries = [
    { name: "Brasil", capital: "Brasília", population: 212559417, area: 8515767, language: "Português" },
    { name: "Estados Unidos", capital: "Washington, D.C.", population: 331002651, area: 9833520, language: "Inglês" },
    { name: "Canadá", capital: "Ottawa", population: 37742154, area: 9984670, language: "Inglês/Francês" },
    { name: "Japão", capital: "Tóquio", population: 126476461, area: 377975, language: "Japonês" },
    { name: "Alemanha", capital: "Berlim", population: 83783942, area: 357114, language: "Alemão" },
    { name: "França", capital: "Paris", population: 65273511, area: 643801, language: "Francês" },
    { name: "Austrália", capital: "Camberra", population: 25499884, area: 7692024, language: "Inglês" },
    { name: "Índia", capital: "Nova Délhi", population: 1380004385, area: 3287263, language: "Hindi/Inglês" },
    { name: "Rússia", capital: "Moscou", population: 145934462, area: 17098242, language: "Russo" },
    { name: "China", capital: "Pequim", population: 1439323776, area: 9596961, language: "Mandarim" }
];

// Cria uma nova planilha
const worksheet = xlsx.utils.json_to_sheet(countries);

// Cria um novo workbook e adiciona a planilha criada
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, "Países");

// Escreve o arquivo Excel
xlsx.writeFile(workbook, "Paises.xlsx");

console.log("Arquivo Excel criado com sucesso!");
*/
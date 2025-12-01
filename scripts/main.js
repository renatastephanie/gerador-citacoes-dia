// 1. SELEÇÃO DE ELEMENTOS DOM
const body = document.querySelector('body');
const themeSwitch = document.getElementById('theme-switch');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author')
const generateBtn = document.getElementById('generate-btn');
const twitterShareBtn = document.getElementById('twitter-share-btn');

// URL DA API ZENQUOTES
const API_URL = 'https://zenquotes.io/api/random';

// 2. LÓGICA DE ALTERNÂNCIA DE TEMA (MODO CLARO / ESCURO)
function toggleTheme() {
    // verifica se o checkbox está marcado
    const isDarkMode = themeSwitch.checked;

    // adiciona ou remove a classe 'dark-mode' no body
    if (isDarkMode) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Inicializa o tema ao carregar a página
function initializeTheme() { 
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') { 
        body.classList.add('dark-mode');
        themeSwitch.checked = true; // marca o checkbox
    } else {
        body.classList.remove('dark-mode');
        themeSwitch.checked = false; // desmarca o checkbox
    }
}

// 3. LÓGICA PARA COMPARTILHAR NO TWITTER
function updateTwitterLink(quote, author) { 
    const tweetText = `"${quote}" - ${author} #CitaçãoDoDia #Inspiração`;
    
    // Constrói a URL de compartilhamento. O encodeURIComponent é CRUCIAL
    // para garantir que espaços e caracteres especiais sejam tratados corretamente.
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    twitterShareBtn.setAttribute('href', twitterUrl);
}

// 4. LÓGICA DE BUSCA E EXIBIÇÃO DE CITAÇÃO (API ZENQUOTES)
async function getQuote() {
    // Desabilita o botão para evitar cliques múltiplos enquanto carrega
    generateBtn.disabled = true;
    generateBtn.textContent = 'Carregando...';

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }

        const data = await response.json();

        // A API retorna um array com um objeto
        const quoteData = data[0];
        const quote = quoteData.q;
        const author = quoteData.a;

        // atualiza o DOM
        quoteText.textContent = quote;
        quoteAuthor.textContent = `- ${author}`;
    } catch (error) {
        console.error('Falha ao buscar a citação: ', error);

        // Em caso de erro, exibe uma mensagem de fallback (extra profissional)
        quoteText.textContent = "Erro ao carregar a citação. Tente novamente mais tarde.";
        quoteAuthor.textContent = "— Sistema";
        updateTwitterLink("Erro ao carregar.", "Sistema");
    } finally {
        // Habilita o botão novamente, independentemente do sucesso ou falha
        generateBtn.disabled = false;
        generateBtn.textContent = 'Nova Citação';
    }
}

// 5. EVENT LISTENERS

// Inicializa o tema e carrega a primeira citação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    getQuote();
});

// listener para o botão de geração de citação
generateBtn.addEventListener('click', getQuote);

//Listener para a troca de tema
themeSwitch.addEventListener('change', toggleTheme);
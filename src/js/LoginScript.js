document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const apiUrl = 'http://api.desenvolvimento.web.com/api'

    // Validações
    if (email === "") {
        alert('E-mail não pode ser vazio.');
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, insira um e-mail válido. O e-mail deve ter o formato "xxx@xxx.com".');
        return;
    }

    if (password.length < 8) {
        alert('A senha deve ter no mínimo 8 caracteres.');
        return;
    }

    axios.post(`${apiUrl}/login`, { email, password })
        .then(response => {
            const token = response.data;
            localStorage.setItem('authToken', token);
            localStorage.setItem('loggedInUserEmail', email)

            alert('Login realizado com sucesso!');
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error.response ? error.response.data : error.message);
            alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        });
});

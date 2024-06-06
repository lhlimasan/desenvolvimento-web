document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const apiUrl = 'http://api.desenvolvimento.web.com/api'

    // Validações
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailPattern.test(email)) {
        alert('Por favor, insira um e-mail válido. O e-mail deve ter o formato "xxx@xxx.com".');
        return;
    }

    if (password.length < 8) {
        alert('A senha deve ter no mínimo 8 caracteres.');
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    axios.post(`${apiUrl}/users`, user)
        .then(response => {
            alert('Usuário cadastrado com sucesso!');
            window.location.href = '/login.html';
            document.getElementById('registerForm').reset();

        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error.response ? error.response.data : error.message);
            alert('Erro ao cadastrar usuário. Tente novamente.');
        });
});

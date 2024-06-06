document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'http://api.desenvolvimento.web.com/api';
    const token = localStorage.getItem('authToken'); // Recupera o token do localStorage

    // Função para buscar usuários
    function fetchUsers() {
        axios.get(`${apiUrl}/users`, {
            headers: {
                'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho
            }
        })
            .then(response => {
                const users = response.data;
                const tableBody = document.querySelector("#userTable tbody");
                tableBody.innerHTML = ''; // Limpa a tabela antes de preencher

                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>
            <button class="edit-btn" data-id="${user._id}">Editar</button>
            <button class="delete-btn" data-id="${user._id}">Excluir</button>
          </td>
        `;
                    tableBody.appendChild(row);
                });

                // Adiciona eventos aos botões de editar e excluir
                document.querySelectorAll('.edit-btn').forEach(button => {
                    button.addEventListener('click', handleEditUser);
                });

                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', handleDeleteUser);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
                alert('Erro ao buscar usuários. Verifique se você está autenticado.');
            });
    }

    // Função para lidar com a edição de usuário
    function handleEditUser(event) {
        const userId = event.target.getAttribute('data-id');

        // Busca os dados do usuário
        axios.get(`${apiUrl}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const user = response.data;
                document.getElementById('editName').value = user.name;
                document.getElementById('editEmail').value = user.email;
                document.getElementById('editUserForm').setAttribute('data-id', user._id);

                // Abre o modal
                document.getElementById('editUserModal').style.display = 'block';
            })
            .catch(error => {
                console.error('Erro ao buscar dados do usuário:', error);
                alert('Erro ao buscar dados do usuário.');
            });
    }

    // Função para lidar com a submissão do formulário de edição
    document.getElementById('editUserForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const userId = event.target.getAttribute('data-id');
        const updatedName = document.getElementById('editName').value;
        const updatedEmail = document.getElementById('editEmail').value;

        axios.put(`${apiUrl}/users/${userId}`, {
            name: updatedName,
            email: updatedEmail
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                localStorage.setItem('loggedInUserEmail',updatedEmail)
                alert('Usuário atualizado com sucesso!');
                document.getElementById('editUserModal').style.display = 'none';
                fetchUsers(); // Recarrega a lista de usuários
            })
            .catch(error => {
                console.error('Erro ao atualizar usuário:', error);
                alert('Erro ao atualizar usuário.');
            });
    });


    function handleDeleteUser(event) {
        const userEmail = localStorage.getItem('loggedInUserEmail'); // Recupera o email do usuário logado
        const userId = event.target.getAttribute('data-id');

        // Busca o email do usuário que está sendo excluído
        axios.get(`${apiUrl}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const userToDeleteEmail = response.data.email;

                // Verifica se o email do usuário que está sendo excluído é diferente do email do usuário logado
                if (userEmail !== userToDeleteEmail) {
                    // Se for diferente, exclui o usuário normalmente
                    axios.delete(`${apiUrl}/users/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(response => {
                            alert('Usuário excluído com sucesso!');
                            fetchUsers(); // Recarrega a lista de usuários
                        })
                        .catch(error => {
                            console.error('Erro ao excluir usuário:', error);
                            alert('Erro ao excluir usuário. Verifique se você está autenticado.');
                        });
                } else {
                    // Se for o mesmo, exibe uma mensagem de erro
                    alert('Você não pode excluir seu próprio registro!');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados do usuário a ser excluído:', error);
                alert('Erro ao buscar dados do usuário a ser excluído.');
            });
    }

    // Inicializa a busca de usuários
    fetchUsers();

    // Adiciona um evento ao botão de voltar para a home
    document.getElementById('backHome').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Fechar o modal quando o usuário clica no botão de fechar
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('editUserModal').style.display = 'none';
    });

    // Fechar o modal quando o usuário clica fora do conteúdo do modal
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('editUserModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

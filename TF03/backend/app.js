import express from 'express';
import conection from './models/db.js';       // conexão com o Postgres
import * as sequelizeFuncs from './models/sequelize.js'; // funções do Sequelize

const app = express();
app.use(express.json());

// TESTE DE CONEXÃO
conection.authenticate()
  .then(() => console.log('Conexão com o banco bem-sucedida!'))
  .catch(err => console.error('Erro de conexão:', err));

// HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// LISTAR TODOS OS POSTS
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await sequelizeFuncs.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar posts.', error: err.message });
  }
});

// OBTER POST INDIVIDUAL
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await sequelizeFuncs.getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post não encontrado.' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar post.', error: err.message });
  }
});

// CRIAR POST
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Título e conteúdo são obrigatórios.' });
    }
    await sequelizeFuncs.createPost({ title, content, tags });
    res.status(201).json({ message: 'Post criado.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar post.', error: err.message });
  }
});

// ATUALIZAR POST
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Título e conteúdo são obrigatórios.' });
    }

    const updated = await sequelizeFuncs.updatePost(req.params.id, { title, content, tags });
    if (!updated) return res.status(404).json({ message: 'Post não encontrado.' });

    res.json({ message: 'Post atualizado.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar post.', error: err.message });
  }
});

// DELETAR POST
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const deleted = await sequelizeFuncs.deletePost(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post não encontrado.' });
    res.json({ message: 'Post deletado.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar post.', error: err.message });
  }
});

// PORTA
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
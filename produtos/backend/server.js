const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Rota teste
app.get('/', (req, res) => {
  res.json({ mensagem: '🟢 API rodando!' });
});

// GET - Buscar todos os produtos
app.get('/produtos1', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('produtos1')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// GET - Buscar produto por ID
app.get('/produtos1/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('produtos1')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// POST - Criar novo produto
app.post('/produtos1', async (req, res) => {
  try {
    const { nome, preco, categoria, estoque  } = req.body;
    const { data, error } = await supabase
      .from('produtos1')
      .insert([{ nome, preco, categoria, estoque  }])
      .select();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// PUT - Atualizar produto
app.put('/produtos1/:id', async (req, res) => {
  try {
    const { nome, preco, categoria, estoque } = req.body;
    const { data, error } = await supabase
      .from('produtos1') 
      .update({ nome, preco, categoria, estoque  })
      .eq('id', req.params.id)
      .select();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// DELETE - Deletar produto
app.delete('/produtos1/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('produtos1')
      .delete()
      .eq('id', req.params.id);
    if (error) throw error;
    res.json({ mensagem: '❌ Produto deletado!' });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


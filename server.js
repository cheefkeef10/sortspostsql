const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Параметры подключения к вашей базе данных
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'pepega2002',
  port: 5432, // порт по умолчанию для PostgreSQL
});

app.get('/', function(req, res){
    res.sendfile(__dirname + '/sort.html');
});

app.post('/saveArray', async (req, res) => {
    
  const { array } = req.body;
  try {
    const client = await pool.connect();
    const query = 'INSERT INTO sort_arr1 (array1) VALUES ($1)';
    const values = [array];
    await client.query(query, values);
    client.release();
    res.send('Массив успешно сохранен в базе данных');
  } catch (err) {
    console.error(err);
    res.status(500).send('Произошла ошибка при сохранении массива');
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});

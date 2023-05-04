import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import cors from 'cors';
import { uuid } from 'uuidv4';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const readFile = async () => {
  try {
    const data = await fs.readFile('./data/userData.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const writeFile = async data => {
  try {
    await fs.writeFile('./data/userData.json', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

app.get('/api/items', async (req, res) => {
  const data = await readFile();
  res.json(data);
});

app.get('/api/items/:id', async (req, res) => {
  const data = await readFile();
  const item = data.find(item => item.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

app.post('/api/items', async (req, res) => {
  const data = await readFile();
  const newItem = { id: uuid(), ...req.body };
  // const newItem = { id: data.length + 1, ...req.body };
  data.push(newItem);
  await writeFile(data);
  res.json(newItem);
});

app.put('/api/items/:id', async (req, res) => {
  const data = await readFile();
  const index = data.findIndex(item => item.id === parseInt(req.params.id));

  if (index !== -1) {
    const updatedItem = { ...data[index], ...req.body };
    data[index] = updatedItem;
    await writeFile(data);
    res.json(updatedItem);
  } else {
    res.status(404).send('Item not found');
  }
});

app.delete('/api/items/:id', async (req, res) => {
  const data = await readFile();
  const filteredData = data.filter(item => item.id !== parseInt(req.params.id));
  if (filteredData.length !== data.length) {
    await writeFile(filteredData);
    res.status(204).send();
  } else {
    res.status(404).send('Item not found');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

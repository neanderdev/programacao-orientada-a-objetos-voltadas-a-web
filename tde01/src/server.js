const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3001;

app.use(express.json());

let users = [];

fs.readFile('mocks/users.json', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        users = JSON.parse(data);
    }
});

/**
 * Create
 * Read
 * Update
 * Delete
 */

app.post('/api/users', (req, res) => {
    const { name, username, age, address, email, city, uf, phone } = req.body;

    let id = uuidv4();

    const emailIsExisting = users.find((user) => user.email === email);
    const usernameIsExisting = users.find((user) => user.username === username);

    if (emailIsExisting) {
        res.status(401).json({
            message: 'Email existing!',            
        });        
    } else if (usernameIsExisting) {
        res.status(401).json({
            message: 'Username existing!',            
        });
    } else {
        const data = Object.assign({
            id,
            name,
            username, 
            age, 
            address,
            email, 
            city, 
            uf, 
            phone
        });
    
        users.push(data);
    
        usersFile();
    
        res.status(201).json({
            message: "User created!",
            user: data,
        });
    }    
});

app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find((user) => user.id === id);

    if (user) {
        res.status(200).json({
            user,            
        });          
    } else {
        res.status(401).json({
            message: 'User invalid!',            
        });          
    }    
});

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, username, age, address, email, city, uf, phone } = req.body;
  
    const userIndex = users.findIndex((user) => user.id === id);
  
    users[userIndex] = {
      ...users[userIndex],
      name, 
      username, 
      age, 
      address, 
      email, 
      city, 
      uf, 
      phone,
    };
  
    usersFile();

    res.status(204).send();
});

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find((user) => user.id === id);

    if (user) {
        const userIndex = users.findIndex((user) => user.id === id);
  
        users.splice(userIndex, 1);
        
        usersFile();

        res.status(204).send();
    } else {
        res.status(401).json({
            message: 'User existing!',            
        }); 
    }
});

const usersFile = () => {
    fs.writeFile('mocks/users.json', JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('User Inserted!');
      }
    })
};

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
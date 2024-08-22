const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(express.urlencoded('extended'))
let noisyPeople = [];
let message = ''
// Routes

// 1. Display all noisy people
app.get('/', (req, res) => {
    res.render('index');
});

// 2. Show form to add a new noisy person
app.get('/add', (req, res) => {
    message=''
    res.render('add', {message:message});
});

// 3. Add a new noisy person
app.post('/add', (req, res) => {
    console.log(req.body)
    console.log(req.body, "from user")
    const username= req.body.username
    const noiseLevel = req.body.noiseLevel
    
    let obj = {
        name:username,
        noiseLevel:noiseLevel
    }

    noisyPeople.push(obj)
    message = "You added a noise maker";
    res.render('add.ejs', {message:message});
    console.log(username);
    
});

app.get('/view', (request, response)=>{
    response.render('noisemaker.ejs', {noisyPeople:noisyPeople})
})
app.post('/view', (request, response)=>{
    response.render('noisemaker.ejs', {noisyPeople:noisyPeople})
})

// 4. Show form to edit a noisy person
app.get('/edit/:id', (req, res) => {
    res.render('edit', {user:noisyPeople[req.params.id], id:req.params.id})

});


app.post('/edit/:id', (req, res) => {
    console.log(noisyPeople)
    console.log(noisyPeople[req.params.id], 'current user')
    res.render('edit.ejs', {user:noisyPeople[req.params.id], id:req.params.id})
});

app.post('/updateEdit', (req, res) => {
    let newUser ={
        name: req.body.name,
        noiseLevel: req.body.noiseLevel
    }
   console.log(req.body) 
   noisyPeople.splice(Number(req.body.userid), 1,   newUser)
   res.redirect('/view')
})
// 6. Delete a noisy person
app.post('/delete/:id', (req, res) => {
    noisyPeople.splice(Number(req.params.id),1)
    res.redirect('/view');
});

app.listen(3000, () => {
    console.log('Noisy Classroom app running on http://localhost:3000');
});

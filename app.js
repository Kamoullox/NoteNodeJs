const fs = require('fs');
const chalk = require('chalk');
const yargs = require("yargs");




function loadDatas(path) {
    let data = fs.readFileSync(path);
    return JSON.parse(data.toString());
}


function checkInclude(fullNote, currentNote){
    const even = (note) => note.title === currentNote.title;
    console.log(fullNote.some(even));
    return fullNote.some(even);
}

yargs
    .command({
        command: 'add',
        describe: 'Add one note',
        builder: {
            title: {
                describe: 'Title of the note',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe: 'Body of the note',
                demandOption: true,
                type: 'string'
            },
        },
        handler: (argv) => {
            let currentNote = {title: argv.title, body: argv.body};
            let notes = loadDatas("notes.json");
            let check = checkInclude(notes, currentNote);

            if (!check) {
                notes.push(currentNote);
                fs.writeFile('notes.json',JSON.stringify(notes),(err) => {
                    if(err) throw err;
                    console.log(`La note ${currentNote.title} ajouté`);
                })
            }
            else{
                console.log(`La note ${currentNote.title} est déjà dans la liste de note`);
            }
        }
    })
    .command({
        command: 'remove',
        describe: 'Delete one note',
        builder: {
            title: {
                describe: 'Title of one note',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            let title = argv.title;
            let notes = loadDatas("notes.json");
            let newNotes = notes.filter(note => note.title !== title)
            fs.writeFile('notes.json',JSON.stringify(newNotes),(err) => {
                if(err) throw err;
                console.log(`la note ${title} a bien été supprimé`);
            })
        }
    })
    .command({
        command: 'list',
        describe: 'Display all notes',
        handler: () => {
            console.log(chalk.keyword('pink')("List des notes:"));

            fs.readFile("notes.json", function (err, data) {
                if(err) throw err;
                let notes = JSON.parse(data.toString());
                notes.map(note => {
                    console.log(`${note.title} - ${note.body}`);
                })                
            });
        }
    })
    .argv;
;

// const user = {
//     name: "JB Lavisse",
//     age: 22,
//     job: "Glandeur"
// }

// fs.readFile("messages.json", function (err, data) {
//     if (err) throw err;
//     // const dataString = data.toString();
//     // const dataJSON = JSON.parse(dataString);
//     let messages = JSON.parse(data.toString());
//     console.log(messages);
// })

// fs.writeFile('user.json',JSON.stringify(user),(err) => {
//     if(err) throw err;
//     console.log(`Utilisateur ${user.name} ajouté`);
// })



// let message = "Youhou!";

// fs.appendFile('message.txt',message,(err)=>{
//     if(err) throw err;
//     console.log("Fichier bien modifié");
// })

// fs.readFile('message.txt', 'utf8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// });


// let parameter = process.argv[2];
// switch(parameter) {
//     case 'add':
//         let message = process.argv[3] + '\n';
//         fs.appendFile('users.txt', message,(err)=>{
//             if(err) throw err;
//             console.log(chalk.green("Contact ajouté !"));
//         })
//         break;
//     case 'list':
//         console.log(chalk.keyword('pink')("List des contacts:"));
//         fs.readFile('users.txt', 'utf8', (err, data) => {
//             if(err) throw err;
//             console.log(data);
//         });
//         break;
//     default:
//         console.log(chalk.inverse.bold.red('No comprendar poto !'));
// }



// yargs
//     .command({
//         command: 'add',
//         describe: 'Add someone to contact',
//         builder: {
//             name: {
//                 describe: 'Name of someone',
//                 demandOption: true,
//                 type: 'string'
//             }
//         },
//         handler: (argv) => {
//             let user = {name: argv.name};
//             let users = loadDatas("user.json");
//             users.push(user);
//             fs.writeFile('user.json',JSON.stringify(users),(err) => {
//                 if(err) throw err;
//                 console.log(`Utilisateur ${user.name} ajouté`);
//             })

//         }
//     })
//     .command({
//         command: 'list',
//         describe: 'Display all contact',
//         handler: () => {
//             console.log(chalk.keyword('pink')("List des contacts:"));
//             fs.readFile("user.json", function (err, data) {
//                 if(err) throw err;
//                 let messages = JSON.parse(data.toString());
//                 messages.map(message => {
//                     console.log(message.name);
//                 })                
//             });
//         }
//     })
//     .argv;
// ;



    // let check = true;
    // let test = fullNote.find(note => note.title === currentNote);
    // if (test === undefined) {
    //     check = false
    // }
    // return check
import {Command} from 'commander';
import fs from 'fs';
import chalk from 'chalk';

const program = new Command();
const error_message = chalk.red('Error: The file is not able to read by the program')

program
    .name('readFile')
    .description('CLI to read files details and show it in console')
    .version('1.0.0')

program.command('read')
    .description('Read the file and display characters words and lines')
    .argument('<file>', 'Path of the text file')
    .action((file)=>{
        fs.readFile(file, 'utf8', (err,data)=>{
            if(err){
                console.log(error_message);
                process.exit(1);
            } else{
                const characters = data.length;
                const words = data.split(/\s+/).filter(word =>word.length > 0).length;
                const lines = data.split('\n').length
                console.log(`Content of file are as \n ${data}`);
                console.log(chalk.blue('Lines:')+` ${lines}`);
                console.log(chalk.green('Words:')+` ${words}`);
                console.log(chalk.yellow('Characters:'+` ${characters}`));
            }
        });
    });

program.parse(process.argv)


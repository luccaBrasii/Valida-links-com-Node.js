import pegaArquivo from "./index.js";
import fs from 'fs';
import listaValidada from "./http-validacao.js";

const caminho = process.argv

async function imprimeLista(valida, resultado, identificador = '') {
    if (valida) {
        console.log(
            'lista validada',
            'identificador',
            await listaValidada(resultado));

    } else {
        console.log(
            'lista de links',
            identificador,
            resultado);
    }
}

async function processaTexto(argumentos) {


    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';
    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log('ARQUIVO OU DIRETÓRIO INEXISTENTE!');
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        var resultado = await pegaArquivo(caminho)
        imprimeLista(valida, resultado)


    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)

        arquivos.forEach(async elemento => {
            const lista = await pegaArquivo(`${caminho}/${elemento}`)
            imprimeLista(valida, lista, elemento)
        })
    } else
        console.log('Não existe esse caminho..');
}

processaTexto(caminho)
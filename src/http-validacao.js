function extraiLinks(arrLinks) {
    return arrLinks.map(elemento => Object.values(elemento).join())
}

async function checaStatus(listaURLs) {
    const arrStatus = await Promise
        .all(
            listaURLs.map(async (url) => {
                try {
                    const response = await fetch(url)
                    return response.status;
                } catch (erro) {
                    return manejaErros(erro);
                }
            })
        )
    return arrStatus;
}

function manejaErros(erro) {
    if (erro.cause.code == 'ENOTFOUND') {
        return 'link nao encontrado'
    } else {
        return 'ocorreu algum erro'
    }
}

export default async function listaValidada(lista) {
    const links = extraiLinks(lista)
    const status = await checaStatus(links)

    return lista.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]

    }))
}


const statusOrdemByValue = (value: any) => {
    switch (value) {
        case 1:
            return "Ordem Aberta";
        case 2:
            return "Ordem Fechada";
        case 3:
            return "Orçamento Gerado";
        case 4:
            return "Orçamento Aprovado";
        case 5:
            return "Executando reparo";
        case 6:
            return "(CA)Serviço concluído";
        case 7:
            return "(CN)Serviço concluído";
        case 8:
            return "Entregue ao cliente";
    }
};

export {
    statusOrdemByValue,
};

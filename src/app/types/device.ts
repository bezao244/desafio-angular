export interface Command {
    command: string | null; // Sequência de bytes enviados para execução do comando
    parameters: Parameter[] | null; // Lista de parâmetros aceitos pelo comando
}

// Descrição de um comando
export interface CommandDescription {
    operation: string | null; // Nome da operação executada pelo dispositivo
    description?: string | null; // Descrição e detalhes adicionais sobre a operação e/ou o comando
    command: Command | null;
    result?: string | null; // Descrição do resultado esperado da execução do comando
    format?: string | null; // Definição, usando o padrão OpenAPI para especificação de schemas de dados, do formato dos dados retornados pelo comando
}

// Interface para um dispositivo
export interface Device {
    identifier: string | null; // Identificador do dispositivo
    description?: string | null; // Descrição do dispositivo, incluindo detalhes do seu uso e das informações geradas
    manufacturer?: string | null; // Nome do fabricante do dispositivo
    url?: string | null; // URL de acesso ao dispositivo
    commands: CommandDescription[] | null; // Lista de comandos disponibilizada pelo dispositivo
}

// Lista de identificadores de dispositivos
export type DeviceList = string[];

// Interface para um parâmetro
export interface Parameter {
    name: string | null; // Nome do parâmetro
    description?: string | null; // Descrição do parâmetro, incluindo detalhes de sua utilização, valores possíveis e funcionamento esperado da operação de acordo com esses valores
}
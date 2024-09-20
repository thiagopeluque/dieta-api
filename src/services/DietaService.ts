import { GoogleGenerativeAI } from '@google/generative-ai';

// Importando os Tipos
import { DadosProps } from "../types";

class DietaService {
    async gerarDieta({ nome, peso, altura, idade, sexo, objetivo, nivel }: DadosProps) {
        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
            const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL_TYPE! })
            const response = await model.generateContent(`
                Crie uma dieta completa para uma pessoa com nome: ${nome} do sexo ${sexo} com peso atual: ${peso}kg, altura: ${altura},
                idade: ${idade} anos e com foco e objetivo em ${objetivo}, atualmente nível de atividade: ${nivel} e ignore qualquer outro
                parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa,
                propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual,
                propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a
                propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos
                dessa refeição e pode incluir uma propreidade como suplementos contendo array com sugestão de suplemento que é indicado para o
                sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma
                propriedade pode ter acento.
            `)

            if (response.response && response.response.candidates){
                const responseMarkup = response.response.candidates[0]?.content.parts[0].text as string;
                const responseJsonString = responseMarkup.replace(/```\w*\n/g, "").replace(/\n```/g,"").trim();
                const responseJson = JSON.parse(responseJsonString);
                return { dieta: responseJson }
            }
        } catch (error) {
            console.error('Erro ao gerar dieta:', error);
            throw new Error('Erro ao gerar dieta');
        }
    }
}

export { DietaService }
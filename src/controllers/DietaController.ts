import { FastifyRequest, FastifyReply } from "fastify";

// Importando os Tipos de Dados
import { DadosProps } from "../@types";

// Importando os Services
import { DietaService } from "../services/DietaService";    

class DietaController {
    async handleDieta(request: FastifyRequest, reply: FastifyReply){
        const { nome, peso, altura, idade, sexo, objetivo, nivel } = request.body as DadosProps;

        const dietaService = new DietaService();
        const dieta = await dietaService.gerarDieta({ nome, peso, altura, idade, sexo, objetivo, nivel });
        reply.send(dieta)
    }
}

export { DietaController }
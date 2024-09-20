import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply
} from "fastify";

// Importação dos Controllers
import { DietaController } from "./controllers/DietaController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    // Rota de Teste da API
    fastify.get('/truco', async(request: FastifyRequest, reply: FastifyReply) => { reply.send({ message: 'Seis marreco' }) })
    
    // Rotas de Produção
    fastify.post("/criar-dieta", async( request: FastifyRequest, reply: FastifyReply) => {
        return new DietaController().handleDieta(request, reply)
    });
}

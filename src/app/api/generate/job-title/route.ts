import {decrementUserCredits} from "@/db/actions";
import {getUserCredits} from "@/db/queries";
import {openai} from "@/lib/openai";
import {isValidJSON} from "@/lib/utils";
import {z} from "zod";

const schema = z.object({
  //serve para tipar o body da requisição. Se o body não tiver esses campos, ele retorna erro
  jobTitle: z.string(),
  jobDescription: z.string().optional(),
});

export const POST = async (request: Request) => {
  try {
    const credits = await getUserCredits(); // Get the user credits

    if (credits <= 0) {
      return Response.json(
        {message: "You don't have enough credits to perform this action"},
        {status: 403}
      );
    }

    const body = await request.json();
    const {jobTitle, jobDescription} = schema.parse(body);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
            Crie um conteúdo JSON que será utilizado para popular um currículo, alinhado com o título da vaga: ${jobTitle}${
            !!jobDescription
              ? ` e com a seguinte descrição da vaga: ${jobDescription}`
              : ""
          }. O conteúdo deve ser otimizado para aumentar as chances de match com a vaga, focando nas habilidades mais relevantes.
  
              **Importante**: Não mencione o título da vaga ou dados da empresa no JSON. O conteúdo deve ser escrito de forma profissional e direta, utilizando a metodologia STAR para o campo de "sobre mim" e adotando um tom que destaque as qualificações do candidato.
  
              Estrutura (Gere um JSON válido e bem formatado):
              {
              summary: "Campo usado para sobre mim, usando metodologia tipo STAR, focando em conquistas relevantes para a vaga.",
              headline: "Headline curto em poucas palavras para ficar abaixo do nome do candidato. Normalmente é o nome do cargo",
              skills: [
                {
                  name: "Nome da habilidade mais relevante para a vaga.",
                  keywords: "Palavras-chave relacionadas a essa habilidade, separadas por vírgula, que ajudem a destacar a competência."
                  level: 0-5 (0 para básico, 5 para avançado),
                },
                ...
              ]
            }
          `,
        },
      ],
    });

    const json = completion.choices[0].message.content ?? "";

    if (!isValidJSON(json)) throw new Error("Invalid JSON");

    await decrementUserCredits(1); // Decrement the user credits by 1

    return Response.json({data: json}, {status: 200});
  } catch (error) {
    return Response.json(
      {message: "An error has occurred", error},
      {status: 500}
    );
  }
};

import {openai} from "@/lib/openai";
import {isValidJSON} from "@/lib/utils";
import {z} from "zod";

const schema = z.object({
  //serve para tipar o body da requisição. Se o body não tiver esses campos, ele retorna erro
  content: z.object({}).passthrough(), //passa qualquer objeto
  language: z.string(),
});

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const {content, language} = schema.parse(body);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
          Baseado no JSON abaixo, traduza todos os valores dos campos para a linguagem ${language}, não importa qual linguagem o valor está escrito originalmente. Também aprimore o texto para parecer mais claro e profissional, pois será usado em currículos.
          Também corrija erros gramaticais e de concordância, se necessário.
          Mantenha dados específicos pessoais, links, emails, telefones, etc. como estão, apenas altere o texto dos campos.

          **Lembre-se de retornar um JSON válido e bem formatado.**

          **Não traduza o nome dos campos (as keys do objeto) original, mantenha isso de forma original e traduza o conteúdo dos campos.**

          **JSON:**

        ${JSON.stringify(content, null, 2)}
  `,
        },
      ],
    });

    const json = completion.choices[0].message.content ?? "";

    if (!isValidJSON(json)) throw new Error("Invalid JSON");

    return Response.json({data: json}, {status: 200});
  } catch (error) {
    return Response.json(
      {message: "An error has occurred", error},
      {status: 500}
    );
  }
};

import {formatTailwindHTML} from "@/lib/utils";
import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const {html, structure} = body;

    if (!html || !structure) {
      return Response.json({message: "Invalid parameters"}, {status: 400});
    }

    //o puppeteer gera um PDF apartir de um HTML, como se fosse o 'print' ao clicar com o botão direito em uma pagina
    const brower = await puppeteer.launch();
    const page = await brower.newPage();

    await page.setContent(formatTailwindHTML(html, structure));

    const bodyHeight = await page.evaluate(() => {
      return document.body.scrollHeight + 20;
    });

    const pdf = await page.pdf({
      printBackground: true,
      width: "210mm",
      height: `${bodyHeight}px`,
    });

    await brower.close();

    return new Response(pdf, {
      headers: {"Content-type": "application/pdf"},
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {message: "An error has occured", error},
      {status: 500}
    );
  }
};

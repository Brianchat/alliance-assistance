import { error } from '@sveltejs/kit';
import { Template, BLANK_PDF, generate } from '@pdfme/generator';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

  try{
    const template: Template = {
      basePdf: BLANK_PDF,
      schemas: [
        {
          a: {
            type: 'text',
            position: { x: 0, y: 0 },
            width: 10,
            height: 10
          },
          b: {
            type: 'text',
            position: { x: 10, y: 10 },
            width: 10,
            height: 10
          },
          c: {
            type: 'text',
            position: { x: 20, y: 20 },
            width: 10,
            height: 10
          }
        }
      ]
    };
  
    const inputs = [{ a: 'a1', b: 'b1', c: 'c1' }];
  
    generate({ template, inputs }).then((pdf) => {
      return {pdf};
  
      // Browser
      // const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
      // window.open(URL.createObjectURL(blob));
  
      // Node.js
      // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
    });

  } catch(err) {
    throw error( 500, `Error with PDF creationrequest: ${err}`);
  }
}

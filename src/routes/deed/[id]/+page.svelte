<script>
	import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { PDFDocument } from 'pdf-lib';

    let pdfBytes;

    onMount(async () => {

        const pdfDoc = await PDFDocument.create()
        const page = pdfDoc.addPage()
        page.drawText('You can create PDFs!')
        pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true })

    });

</script>

<h1>{$page.params.id}</h1>
<iframe id="pdf" title="pdf" style="width: 100%; height: 100%;" src={ pdfBytes } ></iframe>


import puppeteer from 'puppeteer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { content, fileName = 'contract.pdf' } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Launch browser
    const browser = await puppeteer.launch({
      headless: 'new', // Use new headless mode
    });
    
    const page = await browser.newPage();

    // Create an HTML template with styling
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${fileName.replace('.pdf', '')}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 40px;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 1px solid #eee;
            }
            .content {
              min-height: 500px;
            }
            .footer {
              margin-top: 50px;
              font-size: 12px;
              text-align: center;
              color: #777;
              border-top: 1px solid #eee;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${fileName.replace('.pdf', '')}</h1>
              <p>Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="content">
              ${content}
            </div>
            <div class="footer">
              <p>This document was generated automatically. Please review before using.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
    
    // Generate PDF
    const pdfBuffer = await page.pdf({ 
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    await browser.close();

    // Return PDF data as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${fileName}`,
      },
    });
    
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
} 
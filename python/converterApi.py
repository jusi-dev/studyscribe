from flask import Flask, request, make_response
from flask_cors import CORS
import os
import tempfile
import logging
from docx2pdf import convert

# Setup logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/convert', methods=['POST'])
def convert_to_pdf():
    if not request.data:
        return {"error": "No data provided"}, 400

    try:
        # Create a temporary file to save the incoming data
        with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as temp_docx:
            temp_docx.write(request.data)
            temp_docx_path = temp_docx.name
            logging.debug(f"Temporary DOCX file created at: {temp_docx_path}")

        # Specify the LaTeX-based PDF engine (e.g., xelatex)
        pdf_path = temp_docx_path.replace(".docx", ".pdf")
        logging.debug(f"Converting {temp_docx_path} to PDF using xelatex")
        convert(temp_docx_path, pdf_path)

        # Read the converted PDF into a BytesIO object
        with open(pdf_path, 'rb') as pdf_file:
            pdf_bytes = pdf_file.read()

        # Clean up the temporary files
        os.remove(temp_docx_path)
        os.remove(pdf_path)

        # Create a response with the PDF binary data
        response = make_response(pdf_bytes)
        response.headers.set('Content-Type', 'application/pdf')
        response.headers.set('Content-Disposition', 'attachment', filename='converted.pdf')

        return response

    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True)

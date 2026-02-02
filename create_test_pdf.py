from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from pathlib import Path

# Create test PDF
pdf_path = Path('rag/uploads/test_document.pdf')
pdf_path.parent.mkdir(parents=True, exist_ok=True)

c = canvas.Canvas(str(pdf_path), pagesize=letter)
c.drawString(100, 750, "Test Document for AI Processing")
c.drawString(100, 720, "")
c.drawString(100, 690, "This is a sample document to test the DocuMind AI system.")
c.drawString(100, 660, "It contains multiple paragraphs of text for analysis.")
c.drawString(100, 630, "")
c.drawString(100, 600, "The document discusses artificial intelligence and machine learning.")
c.drawString(100, 570, "These are rapidly evolving fields with many practical applications.")
c.drawString(100, 540, "")
c.drawString(100, 510, "Key topics include: natural language processing, computer vision,")
c.drawString(100, 480, "and deep learning neural networks.")
c.save()
print(f"Test PDF created: {pdf_path}")

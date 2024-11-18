export async function DELETE(request, { params }) {
    try {
      const { id: ticketId, documentId } = params;
  
      await prisma.document.delete({
        where: {
          id: parseInt(documentId),
          ticketId: parseInt(ticketId)
        }
      });
  
      return NextResponse.json({ message: 'Document deleted successfully' });
  
    } catch (error) {
      console.error('Failed to delete document:', error);
      return NextResponse.json(
        { error: 'Failed to delete document' },
        { status: 500 }
      );
    }
  }
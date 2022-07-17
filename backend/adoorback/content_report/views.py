from django.db import transaction, IntegrityError
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from content_report.models import ContentReport
from content_report.serializers import ContentReportSerializer

from adoorback.permissions import IsNotBlocked
from adoorback.content_types import get_generic_relation_type
from adoorback.validators import adoor_exception_handler


class ContentReportList(generics.CreateAPIView):
    """
    List all content reports, or create a new content report
    """
    queryset = ContentReport.objects.all()
    serializer_class = ContentReportSerializer
    permission_classes = [IsAuthenticated]

    def get_exception_handler(self):
        return adoor_exception_handler

    @transaction.atomic
    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user,
                            post_id=self.request.data['reported_content_id'])
        except IntegrityError:
            pass

from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings


# class ForgotPasswordView(APIView):
#     def post(self, request):
#         subject = 'Subject of the email'
#         message = 'Message of the email'
#         from_email = settings.EMAIL_HOST_USER
#         recipient_list = [request.data['email']]
#         send_mail(subject, message, from_email, recipient_list, fail_silently=False)
#         return Response({'message': 'Email sent successfully'})
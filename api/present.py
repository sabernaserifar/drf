from api.models import Purchase, Inventory
from django.utils import timezone
from api.models import NewUser
from django.db import connection

now = timezone.now()
user = NewUser.objects.all().first()

Purchase_object = Purchase.objects.create(author=user, title="My Purchase", description="A new purchase", timestamp=now, updated=now, active=True, order_time=now, delivery_time=now)

Inventory_object = Inventory.objects.create(title='Material AA', description="A new material", timestamp=now, updated=now, quantity=150.0, unit='gr', content_object=Purchase_object)
print(connection.queries)

from api.models import Inventory
from django.db import connection
Inventory.objects.filter(object_id=1, content_type_id=11)
print(connection.queries)

[{'sql': 'SELECT "api_inventory"."id", "api_inventory"."title", "api_inventory"."description", "api_inventory"."quantity", "api_inventory"."unit", "api_inventory"."timestamp", "api_inventory"."updated", "api_inventory"."content_type_id", "api_inventory"."object_id" FROM "api_inventory" WHERE ("api_inventory"."content_type_id" = 11 AND "api_inventory"."object_id" = 1) LIMIT 21', 'time': '0.002'}]

#
#
# [{'sql': 'SELECT "api_newuser"."id", "api_newuser"."password", "api_newuser"."last_login", "api_newuser"."is_superuser", "api_newuser"."email", "api_newuser"."user_name", "api_newuser"."first_name", "api_newuser"."start_date", "api_newuser"."about", "api_newuser"."is_staff", "api_newuser"."is_active" FROM "api_newuser" ORDER BY "api_newuser"."id" ASC LIMIT 1', 'time': '0.001'}, {'sql': 'INSERT INTO "api_purchase" ("author_id", "title", "description", "timestamp", "updated", "active", "order_time", "delivery_time") VALUES (1, \'My Purchase\', \'A new purchase\', \'2023-02-27T17:34:22.813148+00:00\'::timestamptz, \'2023-02-27T17:34:22.813187+00:00\'::timestamptz, true, \'2023-02-27T17:34:22.744201+00:00\'::timestamptz, \'2023-02-27T17:34:22.744201+00:00\'::timestamptz) RETURNING "api_purchase"."id"', 'time': '0.002'}, {'sql': 'SELECT "django_content_type"."id", "django_content_type"."app_label", "django_content_type"."model" FROM "django_content_type" WHERE ("django_content_type"."app_label" = \'api\' AND "django_content_type"."model" = \'purchase\') LIMIT 21', 'time': '0.010'}, {'sql': 'INSERT INTO "api_inventory" ("title", "description", "quantity", "unit", "timestamp", "updated", "content_type_id", "object_id") VALUES (\'Material AA\', \'A new material\', 150, \'gr\', \'2023-02-27T17:34:22.828679+00:00\'::timestamptz, \'2023-02-27T17:34:22.828694+00:00\'::timestamptz, 10, 9) RETURNING "api_inventory"."id"', 'time': '0.001'}, {'sql': 'INSERT INTO "api_historicalinventory" ("id", "title", "description", "quantity", "unit", "timestamp", "updated", "object_id", "content_type_id", "history_date", "history_change_reason", "history_type", "history_user_id") VALUES (5, \'Material AA\', \'A new material\', 150, \'gr\', \'2023-02-27T17:34:22.828679+00:00\'::timestamptz, \'2023-02-27T17:34:22.828694+00:00\'::timestamptz, 9, 10, \'2023-02-27T17:34:22.830292+00:00\'::timestamptz, NULL, \'+\', NULL) RETURNING "api_historicalinventory"."history_id"', 'time': '0.001'}]
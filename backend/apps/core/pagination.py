from rest_framework.pagination import CursorPagination

class CommentCursorPagination(
    CursorPagination
):
    page_size = 15
    ordering = "-created_at"
    cursor_query_param = "cursor"
from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Status - Social Media App</title>
        <style>
            :root { --primary: #6366f1; --success: #22c55e; --bg: #0f172a; }
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                background-color: var(--bg); 
                color: white; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                margin: 0; 
            }
            .container { 
                text-align: center; 
                padding: 3rem; 
                border: 1px solid #1e293b; 
                border-radius: 20px; 
                background: #1e293b;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            }
            .pulse {
                height: 15px; width: 15px; background-color: var(--success);
                border-radius: 50%; display: inline-block; margin-right: 10px;
                box-shadow: 0 0 0 0 rgba(34, 197, 94, 1);
                animation: pulse-green 2s infinite;
            }
            @keyframes pulse-green {
                0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
                70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
                100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
            }
            h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
            p { color: #94a3b8; font-size: 1.1rem; }
            .badge { 
                background: #334155; padding: 5px 15px; 
                border-radius: 20px; font-size: 0.9rem; color: var(--primary); 
            }
            a { color: var(--primary); text-decoration: none; font-weight: bold; }
            a:hover { text-shadow: 0 0 8px var(--primary); }
        </style>
    </head>
    <body>
        <div class="container">
            <h1><span class="pulse"></span>Server is Active</h1>
            <p>Your Django REST backend is configured correctly.</p>
            <p class="badge">Mode: Debugging Enabled</p>
            <div style="margin-top: 20px;">
                <a href="/api/">Explore API Endpoints →</a>
            </div>
        </div>
    </body>
    </html>
    """
    return HttpResponse(html_content)
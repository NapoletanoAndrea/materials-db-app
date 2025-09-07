#!/bin/bash
LOG="/tmp/deploy-script.log"
{
    echo "=== Deploy started at $(date) ==="
    PR_PATH="/home/webadmin/materials-app/materials-db-app/materials_db_app_project" 

    cd "$PR_PATH" || exit

    # Pull latest code
    git pull origin main

    # Install backend dependencies
    cd backend
    source .venv/bin/activate
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py collectstatic --noinput

    # Install frontend dependencies and build
    cd ../frontend
    npm install
    npm run build

    # Restart services (uWSGI, nginx)
    uwsgi --reload /home/webadmin/materials-app/app.pid
    sudo systemctl restart nginx

} 2>&1 | tee -a "$LOG"
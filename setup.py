import os
import random
import string

# Create the .env file if it doesn't exist
if not os.path.exists('backend/.env'):
    # Generate a random secret key
    secret_key = ''.join(random.choices(string.ascii_letters + string.digits + '!@#$%^&*(-_=+)', k=50))

    # Write the secret key to the .env file
    with open('backend/.env', 'w') as env_file:
        env_file.write(f"SECRET_KEY={secret_key}\n")

# Run pip install to install the project dependencies
os.system('pip install -r requirements.txt')

# Run npm install to install the frontend dependencies
os.system('npm install')

# Run Migrate to Update Database
os.system('python backend/manage.py migrate')

# Populate Database
os.system('python backend/utils.py')
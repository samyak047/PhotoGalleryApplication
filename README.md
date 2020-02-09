# PhotoGalleryApplication
Photo Gallery application implemented using Django(backend) and Angular(frontend). 

1. Create a virtual environment on your machine. 
    ```
    virtualenv -p python your_environment_name
    ```
    
2. Activate the newly created virtual environment:
    ```
    cd your_environment_name
    source bin/activate
    ```
   
3. Install the dependencies for the backend.
    ```
    cd fsf_2019_screening_task1
    pip install -r requirements.txt
    ```
5. Migrate your database.
    ```
    python manage.py makemigrations
    python manage.py migrate 
    ``` 

6. Run the live development server on your machine and test it.
    ```
    python manage.py runserver
    ```
   
7. Run the live development server on your machine and test it.
    ```
    python manage.py runserver
    ```
8. Install Node Modules for Frontend AngularJS (node & npm must be installed )
   ```
   cd frontend/PhotoGalleryApplicaton
   npm install --save   
   ```

9. To Run Frontend 
    ```
   ng serve -o
   ```   
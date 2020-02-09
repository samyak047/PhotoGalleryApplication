# PhotoGalleryApplication
Photo Gallery application implemented using Django(backend) and Angular(frontend).

Dependencies:
    backend: python3 (django)
    frontend: angular

1. Create a virtual environment on your machine. 
    ```
    pip install virtualenv
    virtualenv -p python your_environment_name
    ```
    
2. Activate the newly created virtual environment:
    ```
    cd your_environment_name
    source bin/activate
    ```
   
3. Install the dependencies for the backend.
    ```
    cd ../PhotoGalleryApplication/backend/PhotoGallery
    pip install -r requirements.txt
    ```
  
4. Run the live development server on your machine and test it.
    ```
    python manage.py runserver
    ```
    Now backend server started, in new terminal follow step 5 & 6 to run frontend

5. Install Node Modules for Frontend AngularJS (node & npm must be installed)
   ```
   cd ../PhotoGalleryApplication/frontend
   npm install --save
   ```
   try
   ```
   npm install -g @angular/cli   
   ```
   if there is any version mismatch error then,
   ```
   brew install yarn
   yarn add global @angular/cli
   ```

6. To Run Frontend 
    ```
   ng serve -o
   ```   
*replace python with python3 and pip with pip3 if you have multiple versions of python
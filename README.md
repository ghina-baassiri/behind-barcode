<!-- Banner -->
![BB Logo](https://firebasestorage.googleapis.com/v0/b/behind-barcode.appspot.com/o/images%2FgithubReadmeBanner.jpg?alt=media&token=a7442bac-9814-433f-badc-85b0fe8b2777)

<!-- Title -->
# BB - Behind Barcode

<!-- Project description -->
This project is the final project of the Full Stack Developer bootcamp at SE Factory. BB is a mobile application built using **React Native** for the frontend and **Firebase**, **Laravel** and **MySQL** for the backend. BB addresses the current existing challenges behind the fluctuation of grocery prices and the financial crisis in Lebanon. Through BB we aim to drive competition in the grocery market by revealing the hidden prices behind barcodes, thus, people residing in Lebanon will be able to save up. 

<br>

# Demo

![BB Demo](https://j.gifs.com/LZ7v5v.gif)

<br>

# Installation

The project is divided into two folders/projects, frontend and backend. Each must be installed and handled individually.

## Backend
* Laravel
    
    First, run the following commands
    ```bash
        composer install
        php artisan serve
    ```

    Next, create a database using MySQL then add the tables by using the existing migrations through running the following command.
    ```
        php artisan migrate:fresh
    ```

* Firebase
  
    Requires creating your own project over Firebase, firestore database and your own images in Firebase storage.

<br>

## Frontend
Simply, run the following commands
```bash
    npm install
    expo start
```

#### **Note:** In order to link the frontend with the backend, make sure to have both apps running over the same IP address.

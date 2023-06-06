<p align="center">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/2560px-Nextjs-logo.svg.png" style="display: block; width: 200px; margin: 10px auto;" />
</p>

<p align="center" style="text-align: center"> Powered by: </p>

<p align="center">
  <span>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Next.js_Logotype_Light_Background.svg/591px-Next.js_Logotype_Light_Background.svg.png?20220905191500" style="width: 100px; padding-right: 20px;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
  
  <span>
  <img src="https://cdn.worldvectorlogo.com/logos/tailwind-css-1.svg" style="width: 100px; padding-right: 20px;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
  
   <span>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_619HZPdD3ZHf9O-3HFOeeQkR83Ir9D7LUQ&usqp=CAU" style="width: 100px; padding-right: 20px;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
  
  <span>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" style="width: 40px;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
</p>

<p align="center">
 <span>
  <img src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg" style="width: 100px;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
  
  <span>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/2560px-Node.js_logo_2015.svg.png" style="width: 100px; padding-right: 20px;" />&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
  
  <span>
  <img src="https://gregberge.com/static/3391b102273cbd25da0acce0007703bd/29007/passport.png" style="width: 140px;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
</p>

<br />

I made this project to get some practice with [Next.js](https://nextjs.org/), [Tailwind](https://tailwindcss.com/), [Node.js](https://nodejs.org/en), databases ([Prisma ORM](https://www.prisma.io/)) and user authentication ([Passport.js](https://www.passportjs.org/)). It's a simple fullstack CRUD app to create/read/update/delete posts with the ability to authenticate user.

App consists of 6 pages:

1.  (SSR) [Main Feed](https://www.posteveryday.ca/) contains list of cards (posts). First 16 posts are rendered on the backend (SSR) and another 16 posts are rendering on frontend side. Than you can additionally upload posts by clicking "Load more" button.
2.  (SSG) [Login](https://www.posteveryday.ca/login), where you can login into the app.
3.  (SSG) [Register](https://www.posteveryday.ca/register) to create new user
4.  (SSR) [My Posts](https://www.posteveryday.ca/my-posts), that contains list of posts, created by you. First 16 posts are rendered on the backend (SSR) and another 16 posts are rendering on frontend side. Than you can additionally upload posts by clicking "Load more" button.
5.  (SSR) [Add post](https://www.posteveryday.ca/add-post), a place to create new posts. Each post should contain a tile, image, and html content. Images will be posted on AWS S3 bucket.
6.  (SSR) [Post page](https://www.posteveryday.ca/posts/1) to read the post, and delete/update it if you are the person, who have created it (there is also a "role" field in user data, and if you have an "admin" role you can delete/update any post of any user. You will see this page after clicking on post card in the [Main Feed](https://www.posteveryday.ca/) or [My Posts](https://www.posteveryday.ca/my-posts). When you are updating a post with another image, previous one will be deleted from AWS S3 bucket.
7.  (SSG) [Terms of use](https://www.posteveryday.ca/terms)

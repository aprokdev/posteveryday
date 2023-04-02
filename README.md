
<p align="center">
<img src="https://www.posteveryday.ca/_next/static/media/logo.614a4fab.svg" style="display: block; width: 200px; margin: 10px auto;" />
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
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/2560px-Node.js_logo_2015.svg.png" style="width: 100px; padding-right: 20px;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
  
  <span>
  <img src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg" style="width: 100px;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>

</p>

<br />

I made this project to get some experience with [Next.js](https://nextjs.org/), [Tailwind](https://tailwindcss.com/), [Node.js](https://nodejs.org/en), databases ([Prisma ORM](https://www.prisma.io/)) and user authentication. It's a simple CRUD app to create/read/update/delete blog posts and ability to authenticate user.

App consists of 6 pages:

1.  (SSR) [Main Feed](https://www.posteveryday.ca/) contains list of cards (posts), that you can additionally upload by clicking apropriate button ("Load more")
2.  (SSG) [Login](https://www.posteveryday.ca/login), where you can login into the app.
3.  (SSG) [Register](https://www.posteveryday.ca/register) to create new user
4.  (SSR) [My Posts](https://www.posteveryday.ca/my-posts), that contains list of posts, created by you
5.  (SSR) [Add post](https://www.posteveryday.ca/add-post), a place to create new posts
6.  (SSR) [Post page](https://www.posteveryday.ca/posts/1) to read the post, and delete/update it if you are the person, who have created it (there is also a "role" field in user data, and if you have an "admin" role you can delete/update any user's post.
7.  (SSG) [Terms of use](https://www.posteveryday.ca/terms)

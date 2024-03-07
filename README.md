<img width="697" alt="logo_tonehunt" src="public/log_ax_cloud.jpg">

AIDA-X Cloud is a web application designed to be a central repository for AIDA-X models.

Visit [https://cloud.aida-x.cc/](https://cloud.aida-x.cc/) for the live site.

## Technologies Used

- Supabase: The cloud database used to store and manage user data and NAM models.
- Prisma: The ORM used to manage and query the application's database.
- Remix: The web framework used to build the application.
- Tailwind CSS (v3): The CSS framework used for styling the application.
- Node.js (v18)

## How to setup your local development environment

1. Clone the project
   Clone the existing project to your local machine using Git. Open your terminal and run the following command:

   ```
   git clone https://github.com/scottcorgan/tonehunt.git
   ```

2. Navigate to the project directory in your terminal and install the project dependencies using the following command:

   ```
   npm install
   ```

   This will install all the necessary dependencies for the project, including Remix, Supabase, and Prisma.

3. Set up Supabase for Local Development

   - Go to supabase.io and create an account.
   - Follow this instructions to setup Supabase locally: [https://supabase.com/docs/guides/cli/local-development](https://supabase.com/docs/guides/cli/local-development) (you can skip the Database migrations and Deploy your project sections; we'll cover that below).
   - After running `supabase start` from the previous step, you should see on the terminal all the necessary credentials needed to continue with the setup.
   - For example, to access your local Supabase Dashboard: [http://localhost:54323/](http://localhost:54323/)

4. To set up the environment variables, rename the `.env.example` file as `.env` file and set the necessary environment variables (you should be able to see the credentials from the previous step):

   ```
   SUPABASE_URL= use API URL
   SUPABASE_ANON_KEY= use anon key
   DATABASE_URL= use DB URL
   DIRECT_URL= use DB URL
   ```

   There's additional env variables in the project but they are optional for local enviorement (admin scripts, etc). For more information (like pooling), you can follow this guide: [https://supabase.com/docs/guides/integrations/prisma](https://supabase.com/docs/guides/integrations/prisma).

5. Make sure the Prisma CLI is installed by running `npm install prisma -D` or `yarn add prisma -D` in your project directory.

   Run the following command in your terminal to set up the database:

   ```
   npx prisma migrate dev
   ```

   This will run the Prisma migrations and create the necessary tables in your database.

   To seed the database, run:

   ```
   npx prisma db seed
   ```

   This will populate the database with test data.

6. Setup Triggers, Functions and Buckets in Supabase

   **Create a new Function**

   1. From the left side panel, select `Database`
   2. Select `Functions` and click `Create a new function`
   3. Enter the following:

   - Name of function: `create_new_profile`
   - Schema: select `public`
   - Return type: select `trigger`
   - Definition: enter the following:

   ```
   begin
     insert into public."Profile"(id)
     values(new.id);
     return new;
   end;
   ```

   4. Click on Show advanced settings
   5. Select SECURITY DEFINER
   6. Click Confirm

   **Create a Trigger**

   1. Select `Triggers` from the same previous list
   2. Select `Create a new trigger`
   3. Enter the following:

   - Name of trigger: `create_profiles`
   - Table: select `users auth`
   - Events: select `Insert`
   - Trigger type: select `After the event`
   - Orientation: select `Row`
   - Function to trigger: select the newly created Function from the steps above (`create_new_profile`)
   - Click `Confirm`

   **Create Buckets**

   1. From the left side panel, select `Storage`
   2. Select `Create a new bucket`
   3. Enter `models` as the name of the bucket and enable `Public bucket`
   4. Repeat this process to create another bucket for `avatars`

   **Create Bucket Policy**

   1. In the same Storage page, select `Policies`
   2. On the `Other policies under storage.objects` area, select `New policy`
   3. Select `For Full customization`
   4. Enter `Enable insert for authenticated users only` as the policy name
   5. Select `INSERT` from `Allowed operation`
   6. Select `authenticated` from `Target roles`
   7. Enter `true` on `WITH CHECK expression`
   8. Click `Review` and `Save Policy`

7. Start the project

   ```
   npm run dev
   ```

   This will start the server in development mode and allow you to access the app in your browser at http://localhost:3000.

8. If you need to stop the supabase local container, you should run (in the supabase local folder project):

```
supabase stop --backup
```

This will keep the data from the db available for next time the container starts (not using `--backup` will reset and delete everything from the database and you'll need to run the migrations and seeders again).

## How to contribute

Here are some guidelines to follow when contributing to this project:

1. Familiarize yourself with the project. Before you start contributing, it's important to understand the project's goals and vision. Read the documentation and familiarize yourself with the codebase. This will help you understand how your contributions can align with the project's goals.

2. Check for existing issues in the project's issue tracker to see if there are any open issues that you can work on. This can include bugs, feature requests, or improvements to existing functionality. Make sure to read through the issue description and comments to ensure that you understand the problem or request.

3. Discuss your ideas before starting work on an issue with the project maintainers or other contributors. This can help you get feedback on your proposed solution and ensure that you're heading in the right direction.

4. You can fork the repository to create a copy of the project under your GitHub account that you can work on.

5. Create a new branch in your forked repository to work on your changes. Make sure to give your branch a descriptive name that reflects the changes you're making.

6. Make the necessary changes to the codebase to address the issue you're working on. Make sure to follow the project's coding style and guidelines.

7. If the project has a test suite, write tests to ensure that your changes don't break existing functionality. If the project doesn't have tests, consider adding them as part of your contribution.

8. Once you've made your changes and written tests, commit your changes with a descriptive commit message that explains the changes you've made.

9. Push your changes to your forked repository on GitHub.

10. Submit a pull request (PR) to the original project repository on GitHub. Make sure to give your PR a descriptive title and description that explains the changes you've made. The project maintainers will review your changes and provide feedback.

11. If the project maintainers request changes, make the necessary changes and push them to your forked repository. This will automatically update your PR. Continue addressing feedback until your changes are accepted.

12. Congratulations, you've contributed to ToneHunt! Your contributions will help improve the project for other users and help you grow as a developer.

## Troubleshooting

1. If you encounter an error where Prisma cannot find certain properties and types after making changes to your schemas, it's likely that you need to regenerate your types.
   To do so, run the following command:

   ```
   npm run generateTypes
   ```

   This command will generate TypeScript types based on your Prisma schema. By running this command every time you make changes to your schemas, you can ensure that Prisma can properly find all necessary properties and types.

2. We are still updating the seeder file for Prisma. If you encounter an issue, let us know here or in our discord server (see below) to help you set up the data on your db.

## License

This project is licensed under the MIT License (see the
[LICENSE](LICENSE) file for details).

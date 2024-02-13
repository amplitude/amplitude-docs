# Amplitude Docs.next

This is a working repository for the next version of Amplitude docs.

## Install locally

This site uses the [Statamic](https://statamic.com) CMS. By virtue of being a flat-file by default CMS, Statamic is easy to work with on your local machine, provided you have the correct tooling installed.

This site requires the following:
- GitHub access
- Laravel Herd
- A terminal app
- A code editor (VS Code)

### GitHub

You can use whichever method is more comfortable to interact with the repository, command line or [GitHub Desktop](https://desktop.github.com/). Once you have access to the `amplitude/amplitude-docs` repository, clone the repository locally to your machine.

Once cloned, rename the file `.env.example` to `.env`.

### Laravel Herd

Statamic is built on a PHP framework / ecosystem called [Laravel](https://laravel.com). Laravel provides a tool to install and configure your local PHP environment to install and run Statamic. To run Herd (requires macOS):

1. Download [Herd](https://herd.laravel.com/) and install it.
2. In Herd settings, on the **General** tab, add the *parent folder* to `/amplitude-docs`. For example, if the path to your local `amplitude-docs` folder is `/work/amplitude-docs`, add `/work` as a Herd Path.
3. On the **PHP** tab in Herd's settings, install version `8.2`.
4. On the **Node** tab in Herd's settings, install version `20`.
5. Close the Herd settings.

### Command line

Developing and building with Statamic requires some time in the terminal. You can use the built in macOS terminal, iTerm2, or Warp for extended functionality.

When you have your terminal app of choice ready, navigate to the directory where you cloned the `amplitude-docs` repository.

In that directory, run `composer install`. This reads the application's `composer.json` file and installs any PHP dependencies.

In the same directory, run `npm install` to install NPM dependencies.

Run `php please` to validate the installation. If successful, the terminal displays a list of commands that `please` can run.

Run the command `php pleas make:user` to create a local admin user to interact with the Statamic dashboard. On the fourth step, enable Super user status for the user you create.

### View the site

Run `npm run build` to generate the CSS and javascript assets necessary to display the site.

With a new Super user created, point your browser to `amplitude-docs.test`. All sites that Herd serves use the `.test` tld by default. You should see site in its current state.

To access the control panel, go to `amplitude-docs.test/cp`. The control panel provides access to the front end editing environment for content, navigations, images, and other parts of the site.

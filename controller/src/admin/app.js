
import AuthLogo from './extensions/dell.png';
import MenuLogo from './extensions/dell.png';
import favicon from './extensions/dellIcon.ico';

export default {
  config: {
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: AuthLogo,
      "welcome": "Welcome to TAAS!",

    },
   // Replace the favicon
    head: {
      favicon: favicon,
    },
    // Add a new locale, other than 'en'
    locales: ['fr', 'de'],
    // Replace the Strapi logo in the main navigation
    menu: {
      logo: MenuLogo,
    },
    // Override or extend the theme
    theme: {
      // overwrite light theme properties
      light: {
        colors: {
          primary100: '#f6ecfc',
          primary200: '#e0c1f4',
          primary500: '#ac73e6',
          primary600: '#9736e8',
          primary700: '#8312d1',
          danger700: '#b72b1a'
        },
      },

      // overwrite dark theme properties
      dark: {
         // ...
      }
    },
    // Extend the translations
    translations: {
      fr: {
        'Auth.form.email.label': 'test',
        Users: 'Utilisateurs',
        City: 'CITY (FRENCH)',
        // Customize the label of the Content Manager table.
        Id: 'ID french',
      },
      en: {
        'app.components.LeftMenu.navbrand.title': 'TestPlatform',
        "app.components.LeftMenu.navbrand.workplace":"Test Platform",
        "Auth.form.button.login.strapi": "HELIX Log In",
        "Auth.form.register.subtitle": "Credentials are only used to authenticate in Test Platform. All saved data will be stored in your database.",
        "Auth.form.welcome.subtitle": "Log in to your Test Platform account",
        "Auth.form.welcome.title": "Welcome to TestPlatform!",
        "Settings.application.ee.admin-seats.add-seats": "{isHostedOnDell TAASCloud, select, true {Add seats} other {Contact sales}}",
        "Settings.application.strapi-version": "Test Platform version",
        "Settings.application.strapiVersion": "Test Platform version",
        "Settings.permissions.users.listview.header.subtitle": "All the users who have access to the Test Platform admin panel",
        "admin.pages.MarketPlacePage.offline.subtitle": "You need to be connected to the Internet to access TestEmngine Market.",
        "admin.pages.MarketPlacePage.plugin.tooltip.madeByStrapi": "Made by Helix Test Platform Team Dell",
        "admin.pages.MarketPlacePage.plugin.tooltip.verified": "Plugin verified by Strapi",
        "admin.pages.MarketPlacePage.plugin.version": "Update your Test Platform version: \"{strapiAppVersion}\" to: \"{versionRange}\"",
        "admin.pages.MarketPlacePage.plugin.version.null": "Unable to verify compatibility with your Test Platform version: \"{strapiAppVersion}\"",
        "admin.pages.MarketPlacePage.subtitle": "Get more out of Test Platform",
        "admin.pages.MarketPlacePage.tab-group.label": "Plugins and Providers for Test Platform",
        "app.components.BlockLink.blog.content": "Read the latest news about Test Platform and the ecosystem.",
        "app.components.BlockLink.tutorial.content": "Follow step-by-step instructions to use and customize TestPlatform.",
        "app.components.BlockLink.cloud": "TestPlatform Cloud",
        "app.components.MarketplaceBanner.image.alt": "A TestPlatform logo",
        "components.AutoReloadBlocker.description": "Run TestPlatform with one of the following commands:",
        "global.plugins.sentry.description": "Send TestPlatform error events to Sentry.",
        "notification.version.update.message": "A new version of Test Platform is available!",
        "app.components.HomePage.welcome": "Welcome on board 👋",
        "app.components.HomePage.welcome.again": "Welcome 👋",
        "app.components.HomePage.welcomeBlock.content": "Congrats! You are logged as the first administrator. To discover the powerful features provided by TestPlatform, we recommend you to create your first Content type!",
        "app.components.HomePage.welcomeBlock.content.again": "We hope you are making progress on your project! Feel free to read the latest news about TestPlatform. We are giving our best to improve the product based on your feedback.",
      }
    },
   // Disable video tutorials
    tutorials: false,
   // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },

  bootstrap() {},
};

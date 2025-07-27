# Shrinkit - Frontend (Angular 20 + Tailwind CSS)

This is the frontend for the **Shrinkit** URL Shortener project. It is built using **Angular 20.1.3** and styled with **Tailwind CSS** for modern, responsive UI.

---

## 🚀 Development Server

To start a local development server, run:

```bash
npm install
tailwindcss -i ./src/styles.css -o ./src/output.css --watch &
ng serve
```

Then open your browser at [http://localhost:4200](http://localhost:4200). The application will auto-reload when source files are modified.

---

## 🧱 Code Scaffolding

Angular CLI supports powerful code generation tools. To generate a new component, run:

```bash
ng generate component component-name
```

View all available schematics:

```bash
ng generate --help
```

---

## 🛠️ Building for Production

To compile the application for production:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory. This build is optimized for speed and performance.

---

## ✅ Running Unit Tests

Use the [Karma](https://karma-runner.github.io) test runner:

```bash
ng test
```

---

## 🧪 Running End-to-End Tests

End-to-end (e2e) testing can be executed with:

```bash
ng e2e
```

Note: Angular CLI no longer includes a default e2e framework. You can integrate with tools like **Cypress**, **Playwright**, or **Protractor**.

---

## 🌐 Environment Setup

Create a `.env` file or edit your `environment.ts` to set your backend API URL:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

---

## 📚 Additional Resources

* [Angular CLI Documentation](https://angular.dev/tools/cli)
* [Tailwind CSS Docs](https://tailwindcss.com/docs)
* [Angular + Tailwind Setup Guide](https://tailwindcss.com/docs/guides/angular)

---

## 🤝 Contributing

If you’d like to contribute to the frontend of Shrinkit, check out the main [Shrinkit README](../README.md) for contribution guidelines, architecture, and backend integration.

---

© 2025 Shrinkit Team

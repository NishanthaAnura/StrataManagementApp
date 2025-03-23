
# Strata Management Portal
A Strata Management Company manages multiple buildings and their associated owners, tenants, and maintenance requests.

### Navigate to the project directory
```bash
cd StrataManagement.App
```

### Install dependencies
```bash
npm install
```

### Running the Project

Start the development server
```bash
npm run dev
```
 #### use these keys to run the app on browser
 - press o + enter to open in browser
  - press r + enter to restart the server
  - press u + enter to show server url
  - press c + enter to clear console
  - press q + enter to quit

 ### Customizing the UI
* Material-UI: Use the sx prop or makeStyles to customize components.
* Tailwind CSS: Apply utility classes directly in JSX for quick styling.

### Adding New Features
* Create New Components: Add new components in the src/components directory.
* Update Styles: Use Tailwind CSS or Material-UI for styling.
* Handle API Calls: Use axios or fetch for API interactions, and manage loading/error states.

### Best Practices

* Type Safety: Leverage TypeScript for type safety and better developer experience.
* Responsive Design: Ensure all components are responsive using Material-UI and Tailwind CSS.
* Error Handling: Display meaningful error messages for API failures.
* Loading States: Provide feedback during API calls to enhance user experience.


  
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration
If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:


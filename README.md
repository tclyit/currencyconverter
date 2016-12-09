# currencyconverter
Angular 2 currency converter component (widget)

What inside this README:

1. Description
2. Terminal Commands
3. TO DO next 
4. Setup
5. Demo

Description:
This small project is about currency converter based on API rate source on `Fixer.io`.
- Uses Angular 2
- Build system setup with Webpack
- This app converts currency from 'CAD, USD, EUR' to 'CAD, USD, EUR' rate
- This component can be plug into any other page or component in this project

Terminal Commands:
- `npm install` -- Install all dependencies
- `npm start` -- Run app on localhost:8000 and watches for changes
- `npm run build` -- Build app production version. Compiles scss, typescript and resolves dependencies and also uglifies

TO DO next:
- Add more currency rate option
- Imporove responsive widget
- Implement HTML template using AEM Sightly/HTL (use mock references to a Sling model and i18n labels)
- Improving performance and load
- Test for data, REST API and Angular 2 components
- Add Webpack setup for bundle css separately

Setup:

1. Clone the project from `github`

2. Run `npm install` and make sure that all dependencies installed
   - To verify everything works you can test by running `npm start` commands and viewing on localhost:8000

3. To deploy to production for local testing:
   - You can run `npm run build` commands and wait for everything successfully deployed. It will create a folder name `dist` inside the project folder.
   
   - To test with XAMPP, copy `dist` folder into `C:\xampp\htdocs` (or any path you use XAMPP) folder and rename `dist` folder to `currencyconverter` and that is it. It is time to test currency converter.
   
 Demo:
 
 https://tclyit.github.io/

# Getting Started

## Frontend Setup

### Install Node.js

Install [node.js](https://nodejs.org/en/download/package-manager) on your local machine, this project is built with node v20.14.0

### Install project dependencies

Install project dependencies by running

```bash
npm install
# or
yarn
```

### Start the development server

Start the development server by running:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend Setup

### Import the .cls files

The backend code is available under Prototype.
Download the `Prototype` folder and import the folder on the Management Portal into any namespace. `System Explorer -> Classes -> Browse -> Select Prototype`

### Create Web Application

- On the Management Portal navigate to: `System Administration -> Security -> Application -> Web Application -> Create New Web Application`.

- Fill in the form as shown below
![management portal](/public/management_portal.png)

- The APIs defined in `Prototype/DB/RESTServices.cls` will be available at `http://localhost:52773/api/prototype/*`
  - e.g. For example, the route `/patient` will be available at `http://localhost:52773/api/prototype/patients`
  - ![rest api](/public/restservices.png)

### Importing Data

#### Downloading sample data

- Download the PatientData.csv file from public

#### Import the Data into IRIS

- On the Management Portal navigate to: `System Explorer -> SQL -> Go -> Wizards -> Data Import`.
![management portal](/public/NavigatingManagementPortal.png)

- Enter the path and name of import file, select the namespace and schema to import to and click `Finish`.

## Integration

### Handling CORS

- To integrate IRIS with React, you first need to resolve CORS. There are two ways:

#### Set Response Headers (Backend)

- Add the property inside tour dispatcher class
  
  - ```ObjectScript
    Parameter HandleCorsRequest = 1;
    ```

- Define the `OnPreDispatch` method inside your dispatcher class to set response headers

  - ```ObjectScript
        ClassMethod OnPreDispatch() As %Status
        {
            Do %response.SetHeader("Access-Control-Allow-Credentials","true")
            Do %response.SetHeader("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS")
            Do %response.SetHeader("Access-Control-Max-Age","10000")
            Do %response.SetHeader("Access-Control-Allow-Headers","Content-Type, Authorization, Accept-Language, X-Requested-With")
            quit $$$OK
        }
    ```

#### Use Next.js proxy (Frontend)

- In your `next.config.mjs` file, add in the rewrite function

  - ```javascript
        /** @type {import('next').NextConfig} */
        const nextConfig = {
            async rewrites() {
                return [
                    {
                        source: '/prototype/:path',
                        destination: 'http://localhost:52773/api/prototype/:path'
                    }
                ]
            }
        };

        export default nextConfig;
    ```

### Access REST API

- Then, you can use the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) api to access the REST services
  - e.g. To access the `/patients` endpoint

    - ```typescript
        const getPatientData = async () => {
            const username = '_system'
            const password = 'sys'
            try {
                const response: IPatient[] = await (await fetch("<http://localhost:52773/api/prototype/patients>", {
                method: "GET",
                headers: {
                "Authorization": 'Basic ' + base64.encode(username + ":" + password),
                "Content-Type": "application/json"
                },
            })).json()
            setPatientList(response);
            } catch (error) {
            console.log(error)
            }
        }
        ```

- You may also consider other more powerful data fetching tools to access REST resources such as [redux toolkit query](https://redux-toolkit.js.org/rtk-query/overview)

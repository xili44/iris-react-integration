Class Prototype.DB.RESTServices Extends %CSP.REST
{

Parameter CONTENTTYPE = "application/json";

Parameter HandleCorsRequest = 1;

XData UrlMap [ XMLNamespace = "http://www/intersystems.com/urlmap" ]
{
<Routes>
    <Route Url = "/patients" Method="Get" Call="GetPatients"/>
    <Route Url = "/patient/:id" Method="Post" Call="UpdatePatientName"/>
</Routes>
}

ClassMethod OnPreDispatch() As %Status
{
    Do %response.SetHeader("Access-Control-Allow-Credentials","true")
    Do %response.SetHeader("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS")
    Do %response.SetHeader("Access-Control-Max-Age","10000")
    Do %response.SetHeader("Access-Control-Allow-Headers","Content-Type, Authorization, Accept-Language, X-Requested-With")
    quit $$$OK
}

ClassMethod GetPatients() As %Status
{
    #Dim tStatus As %Status = $$$OK

    #Dim tSQL As %String = "SELECT * FROM Prototype_DB.Patients ORDER BY Name"

    #Dim tStatement As %SQL.Statement = ##class(%SQL.Statement).%New()
    
    Set tStatus = tStatement.%Prepare(tSQL)

    If ($$$ISERR(tStatus)) Return ..ReportHttpStatusCode(..#HTTP400BADREQUEST, tStatus)

    #Dim tResultSet As %SQL.StatementResult

    Set tResultSet = tStatement.%Execute()

    #Dim tPatients As %DynamicArray = []

    While (tResultSet.%Next()) {
        #Dim tPatient As %DynamicObject = {}
        Set tPatient.ID = tResultSet.ID
        Set tPatient.Name = tResultSet.Name
        Set tPatient.Title = tResultSet.Title
        Set tPatient.Gender = tResultSet.Gender
        Set tPatient.DOB = tResultSet.DOB
        Set tPatient.OrderedBy = tResultSet.OrderedBy
        Set tPatient.DateOfOrder = tResultSet.DateOfOrder
        Set tPatient.DateOfReport = tResultSet.DateOfReport
        Set tPatient.Ethnicity = tResultSet.Ethnicity
        Set tPatient.HN = tResultSet.HN
        Do tPatients.%Push(tPatient)
    }
    Do ##class(%JSON.Formatter).%New().Format(tPatients)
    Quit $$$OK
}

ClassMethod UpdatePatientName(pID As %Integer)
{
    #Dim tStatus As %Status = $$$OK
    #Dim tPatient As Prototype.DB.Patients = ##class(Prototype.DB.Patients).%OpenId(pID,, .tStatus)
    If ($$$ISERR(tStatus)) Return ..ReportHttpStatusCode(..#HTTP404NOTFOUND, tStatus)
    #Dim tJSONIn As %DynamicObject = ##class(%DynamicObject).%FromJSON(%request.Content)
    Set tPatient.Name = tJSONIn.Name
    Set tStatus = tPatient.%Save()
    If ($$$ISERR(tStatus)) Return ..ReportHttpStatusCode(..#HTTP400BADREQUEST, tStatus)
    #Dim tJSONOut As %DynamicObject = {}
    Set tJSONOut.message = "patient name updated successfully"
    Set tJSONOut.patient = ##class(%DynamicObject).%New()
    Set tJSONOut.patient.ID = $NUMBER(tPatient.%Id())
    Set tJSONOut.patient.Name = tPatient.Name
    Do ##class(%JSON.Formatter).%New().Format(tJSONOut)
    Quit $$$OK
}

}

// Populeaza materii
$('#cumpar').click(function () {
    function getData() {
        spreadsheetId = '1rJOHFBrBKg4ZeDoTfMk5wKzlouhoKayAsCUE66lTX1w';
        range = 'Sheet1!A1:A'
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: range
        }).then((response) => {
            var result = response.result;
            var numRows = result.values ? result.values.length : 0;

            const materii = result.values;
            $('#materie').append("<option value=\"\" selected disabled hidden>Alege Materia</option>");
            materii.forEach(function (item) {
                const materie = item[0];
                const selectElem = '<option value="' + materie + '">' + materie + '</option>';
                $('#materie').append(selectElem);
            });
        });
    };
    getData();

});

// Populeaza Plangeri
$('#cumpar').click(function () {
    function getData() {
        spreadsheetId = '1Eyyp_is9zJISV0nQQNEPtuXI2StpwybwZtvNAKa_pR0';
        range = 'Sheet1!A1:B'
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: range
        }).then((response) => {
            var result = response.result;
            var numRows = result.values ? result.values.length : 0;

            const plangeri = result.values;
            console.log(plangeri)
            
            plangeri.forEach(function (item, index) {
                $('#plangeri').append("<div class=\"plangereUP\">" + plangeri[index][1] + "</div>");
                $('#plangeri').append("<div class=\"plangereDOWN\">(" + plangeri[index][0] + ")</div>");
                $('#plangeri').append("<br>");
            });
        });
    };
    getData();

});

// Trimite Plangere
$('#sub').click(function () {
    function sendData() {
        var materie = $('#materie').val();
        if (materie == null) {
            alert("Introdu o materie!");
            return false;
        }
        var titlu = $('#titlu').val();
        if (titlu == "") {
            alert("Introdu un titlu!");
            return false;
        }
        var values = [
            [
                materie,
                titlu
            ]
        ];
        var body = {
            values: values
        };
        gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: '1Eyyp_is9zJISV0nQQNEPtuXI2StpwybwZtvNAKa_pR0',
            valueInputOption: 'RAW',
            range: 'Sheet1!A1:A',
            resource: body
        }).then((response) => {
            var result = response.result;
            console.log(`${result.updates.updatedCells} cells appended.`)
        });
    }
    sendData();
});

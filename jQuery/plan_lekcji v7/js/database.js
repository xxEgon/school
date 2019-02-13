var Database = {

    methods: {

        //utworzenie tabeli, przesyłam obiekt do wysłania Ajaxem

        createTables: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        dropTables: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        addData: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        delData: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        getData: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        updateData: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
        registerUser: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl2)
        },
        updateColor: function (obj) {
            return Ajax.send(obj, Settings.urls.databaseUrl)
        },
    }
    
}

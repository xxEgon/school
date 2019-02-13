module.exports = function () {

    var opers = {

        //insert

        Insert: function (collection, data) {
            collection.insert(data, function (err, result) {
                console.log(result)
            });
        },

        //select all - zwraca tablicê pasuj¹cych dokumentów

        SelectAll: function (collection, callback) {
            collection.find({}).toArray(function (err, items) {
                //console.log(items)
                //return items;
                if (err) console.log(err)
                //funkcja zwracaj¹ca dane na zewn¹trz
                else callback(items)
            });
        },

        //select - zwraca tablicê pasuj¹cych dokumentów, z ograniczeniem

        SelectAndLimit: function (collection, login, password, callback) {
            collection.find({ login: login, password: password }).toArray(function (err, items) {
                //console.log(items)
                if (err) console.log(err)
                else callback(items)
            });
        },

        SelectAndLimit2: function (collection, login, callback) {
            collection.find({ login: login }).toArray(function (err, items) {
                //console.log(items)
                if (err) console.log(err)
                else callback(items)
            });
        },

        //delete - usuniêcie poprzez id - uwaga na ObjectID

        DeleteById: function (ObjectID, collection, id) {
            collection.remove({ _id: ObjectID(id) }, function (err, data) {
                console.log(data)
            })
        },

        // update - aktualizacja poprzez id - uwaga na ObjectID
        // uwaga: bez $set usuwa poprzedni obiekt i wstawia nowy
        // z $set - dokunuje aktualizacji tylko wybranego pola

        UpdateById: function (ObjectID, collection, data) {
            collection.updateOne(
                { _id: ObjectID(data.id) },
                { $set: { password: data.password } },
                function (err, data) {
                    console.log("update: " + data)
                })
        },

    }

    return opers;

}
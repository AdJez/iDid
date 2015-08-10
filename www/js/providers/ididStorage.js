app.factory('ididStorage', function($localstorage) {
    var savedIdidsArray,
        newIdidsArray,
        categoriesArray;

    return {
        getIdids: function() {
            savedIdidsArray = $localstorage.getObject('idids');
            return savedIdidsArray;
        },
        addIdid: function(newIdid) {
            newIdidsArray = this.getIdids();
            newIdidsArray.push({ category: newIdid.category,description: newIdid.description });
            $localstorage.setObject('idids',newIdidsArray);
        },
        getCategories: function() {
            categoriesArray = $localstorage.getObject('categories');
            return categoriesArray;
        },
        isFirstTime: function() {
            return ($localstorage.get('ididCount') == '1' ) ? true : false;
        },
        isEmptyList: function() {
            return ($localstorage.getObject('idids').length == 0) ? true : false;
        },
        removeAll: function() {
            $localstorage.removeItem('idids');
        }
    }
})
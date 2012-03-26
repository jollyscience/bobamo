define(['underscore', 'Backbone', 'libs/mojaba/list', 'text!tpl/admin/table.html',
    'text!tpl/admin/table-item.html'], function (_, Backbone, ListView, tableTemplate, listItemTemplate) {

    var Model = Backbone.Model.extend({
        urlRoot:'admin',
        schema:{
            modelName:{
                type:'String'
            },
            title:{
                type:'String'
            },
            labelAttr:{
                type:'String'
            },
            hidden:{
                type:'Checkbox'
            }
        },
        idAttribute:'modelName',
        // defaults:defaults,
        initialize:function () {
        },
//        parse:function(resp){
//            return resp.payload;
//        },
        get:function (key) {
            if (key && key.indexOf('.') > -1) {
                var split = key.split('.');
                var val = this.attributes;
                while (split.length && val)
                    val = val[split.shift()];

                return val;
            }
            return Backbone.Model.prototype.get.call(this, key);
        }

    });

    var Collection = Backbone.Collection.extend({
        model:Model,
        url:'admin/',
        parse:function(resp){
          return resp.payload;
        },
        initialize:function () {
        }
    });

    return ListView.extend({
        template:_.template(tableTemplate),
        listItemTemplate:_.template(listItemTemplate),
        collection:new Collection(),
        model:Model,
        config:{
            title:'Model',
            modelName:'model',
            plural:'Models'
        }

    })
})
;
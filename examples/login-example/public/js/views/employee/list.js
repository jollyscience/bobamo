define(['Backbone', 'jquery', 'Underscore', 'collections/employee', 'text!tpl/employee-list-item.html'], function (Backbone, $, _, collection, employeeListItem) {
    var EmployeeListView = Backbone.View.extend({
//        el:'#content',
        tagName:'ul',

        className:'nav nav-list',

        initialize:function () {
            var self = this;
            if (!this.model){
                this.model = new collection.EmployeeCollection();
                this.model.fetch();
            }
            this.model.bind("reset", this.render, this);
            this.model.bind("add", function (employee) {
                console.log('add', employee);
                $(self.el).append(new EmployeeListItemView({model:employee}).render().el);
            });
        },

        render:function (obj) {
            if (this.options && this.options.container){
                var $c = $(this.options.container);
                $c.empty().append($(this.el));
            }
            $(this.el).empty();
            _.each(this.model.models, function (employee) {
                $(this.el).append(new EmployeeListItemView({model:employee}).render().el);
            }, this);
            return this;
        }
    });
    var EmployeeListItemView = Backbone.View.extend({

        tagName:"li",

        initialize:function () {
            this.template = _.template(employeeListItem);
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.close, this);
        },

        render:function (eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }

    });
    return EmployeeListView;
});
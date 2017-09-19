DemoFileModel.$inject = ['$parse'];

function DemoFileModel($parse) {
    return {
        restrict: 'A', //the directive can be used as an attribute only
        /*
         link is a function that defines functionality of directive
         scope: scope associated with the element
         element: element on which this directive used
         attrs: key value pair of element attributes
         */
        link: function (scope, element, attrs) {
            var model = $parse(attrs.demoFileModel),
                modelSetter = model.assign; //define a setter for demoFileModel

            //Bind change event on the element
            element.bind('change', function () {
                //Call apply on scope, it checks for value changes and reflect them on UI
                scope.$apply(function () {
                    //set the model value
                    modelSetter(scope, element[0].files);
                });
            });
        }
    };
    // return {
    //     restrict: 'A',
    //     link: function (scope, element, attrs) {
    //         var model = $parse(attrs.demoFileModel);
    //         var isMultiple = attrs.multiple;
    //         var modelSetter = model.assign;
    //         element.bind('change', function () {
    //             var values = [];
    //             angular.forEach(element[0].files, function (item) {
    //                 var value = {
    //                    // File Name 
    //                     name: item.name,
    //                     //File Size 
    //                     size: item.size,
    //                     //File URL to view 
    //                     url: URL.createObjectURL(item),
    //                     // File Input Value 
    //                     _file: item
    //                 };
    //                 values.push(value);
    //             });
    //             scope.$apply(function () {
    //                 if (isMultiple) {
    //                     modelSetter(scope, values);
    //                 } else {
    //                     modelSetter(scope, values[0]);
    //                 }
    //             });
    //         });
    //     }
    // };
}
module.exports = DemoFileModel;
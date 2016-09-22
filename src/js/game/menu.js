/**
 * Created by scadinot on 15/06/16.
 */

function GameMenu() {

}

GameMenu.prototype = {
    init : function() {
        $.getJSON("/src/data/menu.json", function(responseData) {
            for (var i = 0; i < responseData.length; i++) {
                $("<div></div>").addClass("item")
                    .append(
                        $("<")
                    )
                responseData[i].name
            }
        });
    }
};
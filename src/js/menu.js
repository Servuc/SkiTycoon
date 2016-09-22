/**
 * Created by scadinot on 07/06/16.
 */

function Menu(game) {
    this.game = game;

    return this;
}

Menu.prototype = {
    initStations: function(response, node, mountainId, i, j) {
        var that = this;
        var myStationsNode = $("<div></div>").attr("data-mountain", mountainId).addClass("small-12 columns").hide();
        for(var k = 0; k < response[i].mountains[j].stations.length; k++) {
            myStationsNode.append(
                $("<div></div>").addClass("small-12 medium-4 large-3 columns").append(
                    $("<div></div>").text(response[i].mountains[j].stations[k].name).addClass("text-center")
                ).append(
                    $("<img />").attr("src", response[i].mountains[j].stations[k].logo).css("max-height", "100px")
                ).attr("data-z", response[i].mountains[j].stations[k].position.z)
                .attr("data-y", response[i].mountains[j].stations[k].position.y)
                .attr("data-x", response[i].mountains[j].stations[k].position.x)
                .click(function() {
                    $("#menuDiv").hide();
                    that.game.getEarth().moveCamera($(this).attr("data-x"), $(this).attr("data-y"), $(this).attr("data-z"))
                })
            );
        }

        node.append(myStationsNode);
    },

    initMountains : function(response, node, countryId, i) {
        var that = this;
        for(var j = 0; j < response[i].mountains.length; j++) {
            node.append(
                $("<div></div>").addClass("small-12 columns").attr("data-country", countryId).attr("data", response[i].mountains[j].id).text(response[i].mountains[j].name).click(function() {
                    $("[data-mountain='" + $(this).attr("data") + "']").slideToggle();
                }).hide()
            );

            that.initStations(response, node, response[i].mountains[j].id, i, j);
        }
    },

    init: function() {
        var myNode = $("#menu");
        var that = this;
        $.getJSON("src/data/stations.json", function(response) {
            for(var i = 0; i < response.length; i++) {

                var myCountry = $("<div></div>").append(
                    $("<div></div>").append(
                        $("<img />").attr("src", response[i].flag).addClass("float-right").css("height", "25px")
                    ).append(
                        $("<span></span>").text(response[i].name)
                    ).attr("data", response[i].id).click(function() {
                        $("[data-country='" + $(this).attr("data") + "']").slideToggle();
                        $("[data-mountain]").slideUp();
                    })
                );

                that.initMountains(response, myCountry, response[i].id, i);
                myNode.append(myCountry);
            }
        });
    }
};